import styled, { css } from "styled-components";

interface RowProps {
  type: "horizontal" | "vertical";
}

const Row = styled.div<RowProps>`
  display: flex;
  ${({ type }) =>
    type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${({ type }) =>
    type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
