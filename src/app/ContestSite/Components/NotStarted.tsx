import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotStarted: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="warning"
      title="本赛事报名尚未开始报名"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
      }
    />
  );
};

export default NotStarted;
