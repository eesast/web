import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUrl } from "@/api/hooks/url";

const Container = styled.div`
  height: calc(100vh - 72px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotJoined: React.FC = () => {
  const navigate = useNavigate();
  const url = useUrl();
  return (
    <Container>
      <Result
        status="warning"
        title="您尚未加入队伍"
        extra={
          <Button type="primary" onClick={() => navigate(url.link("team"))}>
            前往组建队伍
          </Button>
        }
      />
    </Container>
  );
};

export default NotJoined;
