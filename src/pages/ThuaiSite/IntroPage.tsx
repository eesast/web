import React from "react";
import Center from "../../components/Center";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const IntroPage = () => {
  return (
    <Center>
      <Result
        status="403"
        title="403"
        subTitle="introPage"
        extra={
          <Button type="primary">
            <Link to="/home"> 返回主页</Link>
          </Button>
        }
      />
    </Center>
  );
};

export default IntroPage;
