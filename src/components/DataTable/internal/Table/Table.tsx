import * as React from "react";
import styled from "styled-components";
import { Body } from "./Body";
import { Cell } from "./Cell";
import { Header } from "./Header";
import { Row } from "./Row";

const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export type Props = {
  children: React.ReactNode;
};

export const Table = ({ children }: Props) => <Container>{children}</Container>;

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;