import React from "react";
import { getUserInfo } from "../../api/helpers/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
import Authenticate, { userRoles } from "../Components/Authenticate";
import ProfilePage from "./ProfilePage";
import NotFound from "../Components/NotFound";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ResetPage from "./ResetPage";
import UpdatePage from "./UpdatePage";
import DeletePage from "./DeletePage";
import { PageProps } from "..";

const UserSite: React.FC<PageProps> = ({ mode }) => {
  const userInfo = getUserInfo();
  const url = useUrl();

  return (
    <Routes>
      <Route
        path="/"
        element={
          userInfo ? (
            <Navigate to={url.link("profile")} />
          ) : (
            <Navigate to={url.link("login")} />
          )
        }
      />
      <Route
        path="profile"
        element={
          <Authenticate role={userRoles}>
            <ProfilePage mode={mode} />
          </Authenticate>
        }
      />
      <Route
        path="login"
        element={
          userInfo ? (
            <Navigate to={url.link("profile")} />
          ) : (
            <LoginPage mode={mode} />
          )
        }
      />
      <Route
        path="register"
        element={
          userInfo ? (
            <Navigate to={url.link("profile")} />
          ) : (
            <RegisterPage mode={mode} />
          )
        }
      />
      <Route path="reset" element={<ResetPage mode={mode} />} />
      <Route
        path="update"
        element={
          <Authenticate role={userRoles}>
            <UpdatePage mode={mode} />
          </Authenticate>
        }
      />
      <Route
        path="delete"
        element={
          <Authenticate role={userRoles}>
            <DeletePage mode={mode} />
          </Authenticate>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserSite;
