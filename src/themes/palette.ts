import { colors } from "../styles/color";
import { DeepPartial } from "../types";
import { deepmerge } from "../utils/deepmerge";

export type PaletteColor = {
  deepDark: string;
  dark: string;
  main: string;
  light: string;
  highlight: string;
};

export type PaletteText = {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
  white: string;
};

export type PaletteBackground = {
  default: string;
  dark: string;
  active: string;
  hint: string;
};

export type PaletteIcon = {
  active: string;
  fill: string;
  line: string;
};

export type TextColor = {
  primary: string;
  secondary: string;
  disable: string;
};

export type PaletteAction = {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledBackground: string;
  disabledOpacity: number;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
};

export type Palette = {
  white: string;
  black: string;
  primary: PaletteColor;
  secondary: PaletteColor;
  success: PaletteColor;
  warning: PaletteColor;
  danger: PaletteColor;
  clear: PaletteColor;
  gray: PaletteColor; // TODO: なくすかどうにかする
  text: PaletteText;
  background: PaletteBackground; // TODO: これもなくすかどうにかする
  divider: string;
  border: string; // TODO: PaletteColor
  icon: PaletteIcon;
  action: PaletteAction;
};

export const palette: Palette = {
  white: colors.basic[50] as string, // TODO: type safe に
  black: colors.basic[900],
  primary: {
    deepDark: colors.blue[700],
    dark: colors.blue[600],
    main: colors.blue[500],
    light: colors.blue[200],
    highlight: colors.blue[100],
  },
  secondary: {
    deepDark: colors.basic[700],
    dark: colors.basic[600],
    main: colors.basic[500],
    light: colors.basic[200],
    highlight: colors.basic[100],
  },
  success: {
    deepDark: colors.green[700],
    dark: colors.green[600],
    main: colors.green[500],
    light: colors.green[300],
    highlight: colors.green[100],
  },
  warning: {
    deepDark: colors.yellow[900],
    dark: colors.yellow[600],
    main: colors.yellow[500],
    light: colors.yellow[400],
    highlight: colors.yellow[100],
  },
  danger: {
    deepDark: colors.red[700],
    dark: colors.red[600],
    main: colors.red[500],
    light: colors.red[300],
    highlight: colors.red[100],
  },
  clear: {
    deepDark: colors.basic[600],
    dark: colors.basic[500],
    main: colors.basic[300],
    light: colors.basic[200],
    highlight: colors.basic[100],
  },
  gray: {
    deepDark: colors.basic[600],
    dark: colors.basic[500],
    main: colors.basic[300],
    light: colors.basic[200],
    highlight: colors.basic[100],
  },
  text: {
    // primary: colors.basic[900],
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: colors.basic[700],
    disabled: colors.basic[400],
    hint: colors.basic[400],
    white: "#FFFFFF",
  },
  // primary, secondary で代用する？
  background: {
    default: "#FFFFFF",
    dark: colors.blue[40] as string, // TODO
    active: colors.blue[100],
    hint: colors.blue[50] as string, // TODO
  },
  divider: colors.basic[400],
  icon: {
    active: colors.blue[500],
    fill: colors.basic[700],
    line: colors.basic[600],
  },
  border: colors.basic[200],
  // border: {
  //   deepDark: colors.basic[600],
  //   dark: colors.basic[500],
  //   main: colors.basic[300],
  //   light: colors.basic[200],
  //   highlight: colors.basic[100],
  // },
  // WIP
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.08,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.16,
  },
};

export function createPalette(paletteInput: DeepPartial<Palette>): Palette {
  return deepmerge(palette, paletteInput);
}
