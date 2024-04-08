import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
import Authenticate, { userRoles } from "../Components/Authenticate";
import { defaultPayload } from "@/api/hooks/user";
import ProfilePage from "./ProfilePage";
import NotFound from "../Components/NotFound";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ResetPage from "./ResetPage";
import UpdatePage from "./UpdatePage";
import DeletePage from "./DeletePage";
import { PageProps } from "..";

export interface UserProps extends PageProps {
  setUser: (token: string | null) => void;
}

const UserSite: React.FC<UserProps> = (props) => {
  const url = useUrl();

  return (
    <Routes>
      <Route
        path="/"
        element={
          props.user.uuid !== defaultPayload.uuid ? (
            <Navigate to={url.link("profile")} />
          ) : (
            <Navigate to={url.link("login")} />
          )
        }
      />
      <Route
        path="profile"
        element={
          <Authenticate role={userRoles} user={props.user}>
            <ProfilePage {...props} />
          </Authenticate>
        }
      />
      <Route
        path="login"
        element={
          props.user.uuid !== defaultPayload.uuid ? (
            <Navigate to={url.link("profile")} />
          ) : (
            <LoginPage {...props} />
          )
        }
      />
      <Route
        path="register"
        element={
          props.user.uuid !== defaultPayload.uuid ? (
            <Navigate to={url.link("profile")} />
          ) : (
            <RegisterPage {...props} />
          )
        }
      />
      <Route path="reset" element={<ResetPage {...props} />} />
      <Route
        path="update"
        element={
          <Authenticate role={userRoles} user={props.user}>
            <UpdatePage {...props} />
          </Authenticate>
        }
      />
      <Route
        path="delete"
        element={
          <Authenticate role={userRoles} user={props.user}>
            <DeletePage {...props} />
          </Authenticate>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserSite;
