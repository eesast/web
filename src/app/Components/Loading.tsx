import React from "react";
import styled from "styled-components";
import Center from "./Center";
import { Spin } from "antd";

const Container = styled.div`
  height: calc(100vh - 67px);
  width: 100%;
`;

const Loading: React.FC = () => {
  return (
    <Container>
      <Center>
        <Spin size="large" />
      </Center>
    </Container>
  );
};

export default Loading;
