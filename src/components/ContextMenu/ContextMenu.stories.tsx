import * as React from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import ContextMenu from "./ContextMenu";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const RowContainer = styled.div`
  margin: ${({ theme }) => theme.spacing * 3}px;
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  button + button {
    margin-left: ${({ theme }) => theme.spacing * 5}px;
  }
`;

export default {
  title: "ContextMenu",
  parameters: {
    component: ContextMenu,
  },
};

export const Overview = () => (
  <Container>
    <RowContainer>
      <ContextMenu
        contents={[
          {
            text: "編集",
            onClick: action("clicked 編集"),
          },
          {
            text: "保存",
            onClick: action("clicked 保存"),
          },
        ]}
      />
    </RowContainer>
  </Container>
);