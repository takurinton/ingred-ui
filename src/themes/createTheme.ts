import { Palette, createPalette } from "./palette";
import { Radius, Space, Depth } from "../styles";
import { DepthOptions, depth } from "../styles/depth";
import { deepmerge } from "../utils/deepmerge";
import { DeepPartial } from "../types";

export type ThemeOptions = {
  palette?: DeepPartial<Palette>;
  spacing?: number;
  radius?: number;
  depth?: DepthOptions;
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
    ...other
  } = options;

  const palette = createPalette(paletteInput);
  const spacing = spacingInput || Space;
  const radius = radiusInput || Radius;

  const theme = deepmerge({ palette, spacing, depth, radius }, other);

  // TODO: shadows の持ち方について考える
  // createTheme 関数をラップするようにするか、ユーザーに渡させるか
  // theme 定義あたりをもう少し丁寧に定義する必要がありそう
  return { ...theme, shadows: [0.08, 0.16] };
}

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
