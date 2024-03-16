import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotImplemented: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="warning"
      title="本赛事尚不支持此功能"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
      }
    />
  );
};

export default NotImplemented;
