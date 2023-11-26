import React from "react";
import Container from "./Container";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";

const NotFound: React.FC = () => {
  const url = useUrl();
  return (
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="未找到您要访问的页面"
        extra={
          <Button type="primary">
            <Link to={url.link("home", "site")}>返回主页</Link>
          </Button>
        }
      />
    </Container>
  );
};

export default NotFound;
