import React from "react";
import styled from "styled-components";

interface CenterProps {
  children: React.ReactNode;
  direction?: "row" | "column";
}

const Centered = styled.div<CenterProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: ${(props) => props.direction ?? "row"};
`;

const Center: React.FC<CenterProps> = ({ direction, children }) => {
  return <Centered direction={direction}>{children}</Centered>;
};

export default Center;
