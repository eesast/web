import React from "react";
import Container from "./Container";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";

const Forbidden: React.FC = () => {
  const url = useUrl();
  return (
    <Container>
      <Result
        status="403"
        title="403"
        subTitle="您暂时没有权限访问该页面"
        extra={
          <Button type="primary">
            <Link to={url.link("user", "site")}>查看用户组</Link>
          </Button>
        }
      />
    </Container>
  );
};

export default Forbidden;
