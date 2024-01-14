import React, { ComponentType } from "react";
import { MenuList } from "./styled";
import { MenuListProps } from "react-select";
import { OptionType } from "../../Select";

export const ReactSelectMenuList: ComponentType<
  MenuListProps<OptionType<any>, boolean>
> = ({ theme, children, ...rest }) => (
  <MenuList selectTheme={theme} {...rest}>
    {children}
  </MenuList>
);
