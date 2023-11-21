import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { getUserInfo } from "../../api/helpers/auth";

export const allRoles = [
  "anonymous",
  "user",
  "student",
  "teacher",
  "counselor",
];
export const userRoles = ["user", "student", "teacher", "counselor"];
export const tsinghuaRoles = ["student", "teacher", "counselor"];

const Authenticate = ({
  role,
  children,
}: {
  role: String[];
  children: JSX.Element;
}) => {
  const userInfo = getUserInfo();
  const location = useLocation();

  if (userInfo && role.includes(userInfo.role)) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Authenticate;
