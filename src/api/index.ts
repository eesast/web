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
      const data = client.readQuery<GetToken>({
        query: gql`
          {
            token @client
          }
        `,
      });
      return {
        headers: {
          ...(data?.token && {
            authorization: `Bearer ${data?.token}`,
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
