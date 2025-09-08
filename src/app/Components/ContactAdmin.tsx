import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";

const ContactAdmin: React.FC = () => {
  const url = useUrl();
  return (
    <Result
      status="info"
      title="请联系管理员"
      subTitle="该功能暂不支持在线使用，请联系管理员进行操作"
      extra={
        <Button type="primary">
          <Link to={url.link("user", "site")}>查看用户组</Link>
        </Button>
      }
    />
  );
};

export default ContactAdmin;
