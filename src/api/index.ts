import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";

axios.defaults.baseURL = "https://api.eesast.com";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

const httpLink = new HttpLink({
  uri: "https://api.eesast.com/v1/graphql",
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
  uri: `wss://api.eesast.com/v1/graphql`,
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
  authLink.concat(httpLink)
);

const cache = new InMemoryCache();

const GET_INITIAL_STATE = gql`
  query GetInitialState {
    _id @client
    token @client
    role @client
    email @client
  }
`;

cache.writeQuery({
  query: GET_INITIAL_STATE,
  data: {
    _id: null,
    token: null,
    role: null,
    email: null,
  },
});

export const client = new ApolloClient({
  cache: cache,
  link: splitLink,
});
