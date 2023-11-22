import { message } from "antd";
import React from "react";
import { Navigate } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";

const RegisterPage: React.FC = () => {
  const url = useUrl();
  message.info("系统维护中，请联系科协软件部");
  return <Navigate to={url.link("home", "site")} />;
};

export default RegisterPage;
