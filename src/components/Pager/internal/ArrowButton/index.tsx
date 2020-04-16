import * as React from "react";

import * as Styled from "./styled";
import Icon from "../../../Icon";
import { colors } from "../../../../styles/color";
import { useTheme } from "../../../../themes";

type Props = {
  isRight: boolean;
  disabled: boolean;
  onClick: () => void;
};

export const ArrowButton: React.FunctionComponent<Props> = ({
  isRight,
  disabled,
  onClick
}) => {
  const theme = useTheme();
  return (
    <Styled.ArrowButton
      disabled={disabled}
      active={disabled}
      type="button"
      onClick={onClick}
    >
      <Icon
        name={isRight ? "arrow_right" : "arrow_left"}
        size="lg"
        color={disabled ? colors.basic[300] : theme.palette.icon.active}
      />
    </Styled.ArrowButton>
  );
};