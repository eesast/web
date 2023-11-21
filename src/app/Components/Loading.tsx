import React from "react";
import Container from "./Container";
import Center from "./Center";
import { Spin } from "antd";

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
