import React from "react";
import { Navigate } from "react-router-dom";
import Forbidden from "./Forbidden";
import { message } from "antd";
import { JwtPayload } from "@/api/hooks/user";

interface AuthenticateProps {
  user: JwtPayload | null;
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
  if (!user) {
    message.info("请先登录");
    return <Navigate to="/user/login" />;
  }

  if (role.includes(user.role)) return children;

  if (fallback) return fallback;

  return <Forbidden />;
};

export default Authenticate;
