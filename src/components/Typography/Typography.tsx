import * as React from "react";
import * as Styled from "./styled";
import { Theme } from "../../themes";
import { useTheme } from "../../themes/useTheme";

export type ColorType =
  | "initial"
  | "primary"
  | "textPrimary"
  | "secondary"
  | "textSecondary"
  | "disabled"
  | "hint"
  | "white";

export type FontSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl"
  | "xxxxl"
  | "xxxxxl"
  | "xxxxxxl"
  | "xxxxxxxl";

export const fontSize: { [key in FontSize]: number } = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 15,
  xl: 16,
  xxl: 18,
  xxxl: 20,
  xxxxl: 24,
  xxxxxl: 28,
  xxxxxxl: 32,
  xxxxxxxl: 40,
};

/*
  textPrimary, textSecondary あたりはここを参考
  https://github.com/mui/material-ui/blob/dd411b017ea7504a14a16821b694ac6aa01d9b6d/packages/mui-material/src/Typography/Typography.js#L77-L83

  theme.palette.text.primary を black にしたかった、基本的にはここともう1箇所(storybook)でしか参照されていないので変えちゃう。
*/
const getColor = (key: ColorType | string, theme: Theme) => {
  switch (key) {
    case "initial":
      return "initial";
    case "textPrimary":
      return theme.palette.text.primary;
    case "primary":
      return theme.palette.primary.main;
    case "secondary":
      return theme.palette.secondary.main;
    case "textSecondary":
      return theme.palette.text.secondary;
    case "disabled":
      return theme.palette.text.disabled;
    case "hint":
      return theme.palette.text.hint;
    case "white":
      return theme.palette.text.white;
    default:
      return key;
  }
};

export type TextAlign = "left" | "center" | "right";

export type FontWeight = "normal" | "bold";

export type TypographyProps = {
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  color?: ColorType | string;
  align?: "left" | "center" | "right";
  size?: FontSize;
  weight?: FontWeight;
  lineHeight?: string;
  // MEMO: Enable to override style with styled-component
  className?: string;
  children: React.ReactNode;
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      component: Component = "p",
      color = "initial",
      align = "left",
      size = "md",
      weight = "normal",
      lineHeight = "1.4",
      className,
    },
    ref,
  ) => {
    const theme = useTheme();
    return (
      <Styled.Container
        ref={ref}
        as={Component}
        color={getColor(color, theme)}
        align={align}
        fontSize={`${fontSize[size]}px`}
        weight={weight}
        lineHeight={lineHeight}
        className={className}
      >
        {children}
      </Styled.Container>
    );
  },
);

export default Typography;
