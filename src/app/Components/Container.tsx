import React from "react";
import styled from "styled-components";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = styled.div`
  height: calc(100vh - 67px);
  width: 100%;
`;

export default Container;
