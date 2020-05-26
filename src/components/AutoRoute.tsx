import React from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { GetUser as GET_USER } from "../api/user.graphql";
import { GetUser, GetId } from "../api/types";
import Loading from "./Loading";

const AuthRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();

  const { data: idData } = useQuery<GetId>(gql`
    {
      _id @client
    }
  `);
  const { data, loading, error } = useQuery<GetUser>(GET_USER, {
    variables: { _id: idData?._id },
  });

  return (
    <Route {...rest}>
      {loading ? (
        <Loading />
      ) : !error && data?.user[0].id ? (
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
