import React from "react";
import { getUserInfo } from "../../api/helpers/auth";
import Container from "../Components/Container";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
import Authenticate, { userRoles } from "../Components/Authenticate";
import ProfilePage from "./ProfilePage";
import NotFound from "../Components/NotFound";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ResetPage from "./ResetPage";

const UserSite: React.FC = () => {
  const userInfo = getUserInfo();
  const url = useUrl();

  return (
    <Container>
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
              <ProfilePage />
            </Authenticate>
          }
        />
        <Route
          path="login"
          element={
            userInfo ? <Navigate to={url.link("profile")} /> : <LoginPage />
          }
        />
        <Route
          path="register"
          element={
            userInfo ? <Navigate to={url.link("profile")} /> : <RegisterPage />
          }
        />
        <Route path="reset" element={<ResetPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
};

export default UserSite;
