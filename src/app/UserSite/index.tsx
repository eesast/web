import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { useUrl } from "../../api/hooks/url";
import Authenticate, { userRoles } from "../Components/Authenticate";
import ProfilePage from "./ProfilePage";
import NotFound from "../Components/NotFound";
import LoginPage from "./LoginPage";
import RegisterUtil from "./RegisterUtil";
import IdentitySelectionProp from "./IdentitySelectionPage";
import InformationProp from "./RegisterPage";
import ResetPage from "./ResetPage";
import UpdatePage from "./UpdatePage";
import DeletePage from "./DeletePage";
import { PageProps } from "..";

export interface UserProps extends PageProps {
  setUser: (token: string | null) => void;
}

const UserSite: React.FC<UserProps> = (props) => {
  const url = useUrl();
  const navigationType = useNavigationType(); // 获取导航类型
  const location = useLocation(); // 获取当前位置

  useEffect(() => {
    if (navigationType !== "POP") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.pathname, navigationType]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          props.user.isLoggedIn ? (
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
          props.user.isLoggedIn ? (
            <Navigate to={url.link("profile")} />
          ) : (
            <LoginPage {...props} />
          )
        }
      />
      <Route
        path="register"
        element={
          props.user.isLoggedIn ? (
            <Navigate to={url.link("profile")} />
          ) : (
            <RegisterUtil {...props} /> // RegisterUtil 接收 props 并管理 Context
          )
        }
      >
                {/* /register/ (Index Route): 默认重定向到 identityselection */}
               {" "}
        <Route index element={<Navigate to="identityselection" replace />} />   
                    {/* 1. /register/identityselection: 移除 {...props} */}
               {" "}
        <Route path="identityselection" element={<IdentitySelectionProp />} /> 
                      {/* 2. /register/information: 移除 {...props} */}
                <Route path="information" element={<InformationProp />} />     
                 {" "}
        {/* 捕获未匹配的 /register/* 路径，重定向到 identityselection */}
               {" "}
        <Route path="*" element={<Navigate to="identityselection" replace />} />
             {" "}
      </Route>
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
