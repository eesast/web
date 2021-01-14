import React from "react";
import Center from "../../components/Center";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Center>
      <Result
        status="404"
        title="404"
        subTitle="RegisterPage"
        extra={
          <Button type="primary">
            <Link to="/home"> 返回主页</Link>
          </Button>
        }
      />
    </Center>
  );
};

export default NotFoundPage;
