import { hexToRgba } from "./hexToRgba";

export function decomposeColor(color: any): any {
  // Idempotent
  if (color.type) {
    return color;
  }

  if (color.charAt(0) === "#") {
    return decomposeColor(hexToRgba(color));
  }

  const marker = color.indexOf("(");
  const type = color.substring(0, marker);

  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;

  if (type === "color") {
    values = values.split(" ");
    colorSpace = values.shift();
    if (values.length === 4 && values[3].charAt(0) === "/") {
      values[3] = values[3].substr(1);
    }
  } else {
    values = values.split(",");
  }
  values = values.map((value: any) => parseFloat(value));

  return { type, values, colorSpace };
}

export function recomposeColor(color: any) {
  const { type, colorSpace } = color;
  let { values } = color;

  if (type.indexOf("rgb") !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n: any, i: number) => (i < 3 ? parseInt(n, 10) : n));
  } else if (type.indexOf("hsl") !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values = `${colorSpace} ${values.join(" ")}`;
  } else {
    values = `${values.join(", ")}`;
  }

  return `${type}(${values})`;
}

export function hslToRgb(color: any) {
  color = decomposeColor(color);
  const { values } = color;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: any, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = "rgb";
  const rgb = [
    Math.round(f(0) * 255),
    Math.round(f(8) * 255),
    Math.round(f(4) * 255),
  ];

  if (color.type === "hsla") {
    type += "a";
    rgb.push(values[3]);
  }

  return recomposeColor({ type, values: rgb });
}

function getLuminance(color: any) {
  color = decomposeColor(color);

  let rgb =
    color.type === "hsl"
      ? decomposeColor(hslToRgb(color)).values
      : color.values;
  rgb = rgb.map((val: any) => {
    if (color.type !== "color") {
      val /= 255; // normalized
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });

  // Truncate at 3 digits
  return Number(
    (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3),
  );
}

// Use the same logic as
// and mui https://github.com/mui/material-ui/blob/2c70b02e68212c6a708fe05f7a55880e50814607/packages/mui-material/src/styles/createPalette.js#L194-L217
export function getContrastRatio(foreground: any, background: any) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

export function getContrastText(background: any): any {
  const contrastText =
    getContrastRatio(background, "#fff") >= 3 ? "#fff" : "#000";

  if (process.env.NODE_ENV !== "production") {
    const contrast = getContrastRatio(background, contrastText);
    if (contrast < 3) {
      console.log("error");
    }
  }

  return contrastText;
}
