import { Palette, createPalette } from "./palette";
import { Radius, Space, Depth, Shadows } from "../styles";
import { DepthOptions, depth } from "../styles/depth";
import { deepmerge } from "../utils/deepmerge";
import { DeepPartial } from "../types";

export type ThemeOptions = {
  palette?: DeepPartial<Palette>;
  spacing?: number;
  radius?: number;
  depth?: DepthOptions;
  shadows?: number[];
};

export type Theme = {
  palette: Palette;
  spacing: number;
  radius: number;
  depth: Depth;
  shadows: number[];
};

export function createTheme(options: ThemeOptions = {}): Theme {
  const {
    palette: paletteInput = {},
    spacing: spacingInput,
    radius: radiusInput,
    shadows: shadowInput,
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const spacing = spacingInput || Space;
  const radius = radiusInput || Radius;
  const shadows = shadowInput || Shadows;

  const theme = deepmerge({ palette, spacing, depth, radius, shadows }, other);
  return { ...theme };
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
