import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";

const NotFound: React.FC = () => {
  const url = useUrl();
  return (
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
  );
};

export default NotFound;
