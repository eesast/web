import React from "react";
import { Navigate } from "react-router-dom";
import { getUserInfo } from "../../api/helpers/auth";
import Forbidden from "./Forbidden";
import { message } from "antd";

interface AuthenticateProps {
  role: String[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const userRoles = ["user", "student", "teacher", "counselor"];
export const tsinghuaRoles = ["student", "teacher", "counselor"];

const Authenticate: React.FC<AuthenticateProps> = ({
  role,
  children,
  fallback,
}) => {
  const userInfo = getUserInfo();

  if (!userInfo) {
    message.info("请先登录");
    return <Navigate to="/user/login" />;
  }

  if (role.includes(userInfo.role)) return children;

  if (fallback) return fallback;

  return <Forbidden />;
};

export default Authenticate;
