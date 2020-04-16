import styled from "styled-components";

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing * 5}px
    ${({ theme }) => theme.spacing * 4}px ${({ theme }) => theme.spacing * 7}px;
`;

export const EmptyImageContainer = styled.div`
  width: 25%;
  min-width: 137px;
  max-width: 180px;
  img {
    display: block;
    width: 100%;
  }
`;