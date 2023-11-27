import React from "react";
import Center from "./Center";
import { Spin } from "antd";

const Loading: React.FC = () => {
  return (
    <Center direction="column">
      <Center>
        <Spin size="large" />
      </Center>
    </Center>
  );
};

export default Loading;
