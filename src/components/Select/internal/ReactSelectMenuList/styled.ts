import styled, { DefaultTheme } from "styled-components";
import {
  components,
  MenuListProps as ReactSelectMenuListProps,
  Theme,
} from "react-select";
import { addScrollbarProperties } from "../../../../utils/scrollbar";
import { OptionType } from "../..";

type MenuListProps<O> = ReactSelectMenuListProps<O, boolean> & {
  selectTheme: Theme;
};

export const MenuList = styled(components.MenuList).attrs<
  MenuListProps<OptionType<any>>
>(({ selectTheme }) => ({
  theme: selectTheme as Theme & DefaultTheme,
}))<MenuListProps<OptionType<any>>>`
  ${({ maxHeight }) => addScrollbarProperties({ maxHeight: `${maxHeight}px` })}
`;
