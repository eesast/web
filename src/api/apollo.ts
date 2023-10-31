import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL!;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_HASURA_HTTPLINK!
      : process.env.REACT_APP_HASURA_DEV_HTTPLINK!,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      ...(token && {
        authorization: `Bearer ${token}`,
      }),
    },
  };
});

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_HASURA_WSSLINK!
      : process.env.REACT_APP_HASURA_DEV_WSSLINK!,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
      const token = localStorage.getItem("token");
      return {
        headers: {
          ...(token && {
            authorization: `Bearer ${token}`,
          }),
        },
      };
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
