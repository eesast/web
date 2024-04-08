import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Forbidden from "./Forbidden";
import { message } from "antd";
import { JwtPayload, defaultPayload } from "@/api/hooks/user";

interface AuthenticateProps {
  user: JwtPayload;
  role: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const userRoles = ["user", "student", "teacher", "counselor"];
export const tsinghuaRoles = ["student", "teacher", "counselor"];

const Authenticate: React.FC<AuthenticateProps> = ({
  user,
  role,
  children,
  fallback,
}) => {
  useEffect(() => {
    if (user.uuid === defaultPayload.uuid) {
      message.info({ content: "请先登录", key: "loginMessage" });
    }
  });

  if (user.uuid === defaultPayload.uuid) {
    return <Navigate to="/user/login" />;
  }

  if (role.includes(user.role)) return children;

  if (fallback) return fallback;

  return <Forbidden />;
};

export default Authenticate;
