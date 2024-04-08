import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading: React.FC = () => {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
};

export default Loading;
