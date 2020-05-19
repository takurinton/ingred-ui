import * as React from "react";
import { fontSize } from "../Typography/Typography";
import { colors } from "../../styles/color";
import { Size } from "../../styles";
import { Props as BaseButtonProps } from "./internal/BaseButton";
import * as Styled from "./styled";
import { Theme, useTheme } from "../../themes";


type ButtonSize = "small" | "medium" | "large";
export type ButtonColor = "primary" | "secondary" | "danger" | "cancel";

export type ButtonColorStyle = {
  normal: {
    background: string;
    color: string;
    boxShadow: string;
    border: string;
  };
  hover: {
    background?: string;
    border: string;
  };
  active: {
    background?: string;
    border: string;
  };
};

const getContainerColorStyles = (
  theme: Theme,
): { [P in ButtonColor]: ButtonColorStyle } => ({
  primary: {
    normal: {
      background: theme.palette.primary.main,
      color: theme.palette.white,
      boxShadow: "0px 0px 16px #0b82f466",
      border: "none",
    },
    hover: {
      background: theme.palette.primary.dark,
      border: "none",
    },
    active: {
      background: theme.palette.primary.deepDark,
      border: "none",
    },
  },
  secondary: {
    normal: {
      background: colors.blue[50] as string,
      color: theme.palette.text.primary,
      boxShadow: "none",
      border: `${Size.Border.Small} solid ${colors.blue[500]}`,
    },
    hover: {
      background: colors.blue[100],
      border: `${Size.Border.Small} solid ${colors.blue[500]}`,
    },
    active: {
      background: colors.blue[200],
      border: `${Size.Border.Small} solid ${colors.blue[500]}`,
    },
  },
  danger: {
    normal: {
      background: theme.palette.danger.main,
      color: theme.palette.white,
      boxShadow: "0px 0px 16px #EB0A4E66",
      border: "none",
    },
    hover: {
      background: theme.palette.danger.dark,
      border: "none",
    },
    active: {
      background: theme.palette.danger.deepDark,
      border: "none",
    },
  },
  cancel: {
    normal: {
      background: "transparent",
      color: theme.palette.black,
      boxShadow: "none",
      border: "none",
    },
    hover: {
      background: colors.basic[300],
      border: "none",
    },
    active: {
      background: colors.basic[400],
      border: "none",
    },
  },
});

const buttonSize: Record<ButtonSize, { minWidth: string; height: string }> = {
  small: {
    minWidth: "64px",
    height: "32px",
  },
  medium: {
    minWidth: "130px",
    height: "42px",
  },
  large: {
    minWidth: "178px",
    height: "48px",
  },
};

export type Props = Omit<BaseButtonProps, "color"> & {
  color?: ButtonColor;
  inline?: boolean;
  size?: ButtonSize;
  onClick?: () => void;
  href?: string;
};

const Button: React.FunctionComponent<Props> = ({
  children,
  color = "primary",
  inline = false,
  size = "medium",
  href,
  ...rest
}) => {
  const theme = useTheme();
  const colorStyle = getContainerColorStyles(theme)[color];
  const horizontalPadding =
    size === "small" ? `10px` : `${theme.spacing * 2}px`;

  const isLink = !!href;
  let anchorProps: any = {};
  if (isLink) {
    anchorProps = {
      as: "a",
      href,
    };
  }

  return (
    <Styled.ButtonContainer
      {...anchorProps}
      {...rest}
      inline={inline}
      horizontalPadding={horizontalPadding}
      normal={{ ...colorStyle.normal }}
      hover={{ ...colorStyle.hover }}
      active={{ ...colorStyle.active }}
      fontWeight={color === "cancel" ? "normal" : "bold"}
      fontSize={
        size === "small" ? `${fontSize["xs"]}px` : `${fontSize["md"]}px`
      }
      height={buttonSize[size].height}
      minWidth={buttonSize[size].minWidth}
    >
      {children}
    </Styled.ButtonContainer>
  );
};

export default Button;
