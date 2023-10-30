import React from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GetUser as GET_USER } from "../api/user.graphql";
import { GetUser, GetUserVariables } from "../api/types";
import { getUserInfo } from "../helpers/auth";
import Loading from "./Loading";

const AuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();

  const userInfo = getUserInfo();

  const { data, loading, error } = useQuery<GetUser, GetUserVariables>(
    GET_USER,
    {
      variables: { _id: userInfo?._id! },
    }
  );
  return (
    <Route {...rest}>
      {loading ? (
        <Loading />
      ) : !error && data?.user[0]?._id ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
};

export default AuthRoute;
