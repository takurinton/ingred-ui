import styled from "styled-components";

export const Container = styled.div<{
  minWidth?: string;
  isDisabled?: boolean;
}>`
  min-width: ${({ minWidth }) => minWidth || "auto"};
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "auto")};
`;
