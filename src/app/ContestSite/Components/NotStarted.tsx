import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotStarted: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Result
        status="warning"
        title="本赛事尚未开始报名"
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            返回上一页
          </Button>
        }
      />
    </Container>
  );
};

export default NotStarted;
