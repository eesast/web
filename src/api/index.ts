import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  gql,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import { setContext } from "@apollo/link-context";
import axios from "axios";
import { GetToken } from "./types";

axios.defaults.baseURL = "https://api.eesast.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

const httpLink = new HttpLink({
  uri: "https://api.eesast.com/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const data = client.readQuery<GetToken>({
    query: gql`
      {
        token @client
      }
    `,
  });
  return {
    headers: {
      ...headers,
      ...(data?.token && {
        authorization: `Bearer ${data?.token}`,
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
          authorization: token ? `Bearer ${token}` : "",
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

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
