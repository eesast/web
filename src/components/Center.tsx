import React from "react";
import styled from "styled-components";

const Centered = styled.div<CenterProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: ${(props) => props.direction ?? "row"};
`;

export interface CenterProps {
  direction?: "row" | "column";
}

const Center: React.FC<CenterProps> = ({ direction, children }) => {
  return <Centered direction={direction}>{children}</Centered>;
};

export default Center;
