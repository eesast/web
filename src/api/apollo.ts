import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const auth = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  };
};

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_HASURA_HTTPLINK!
      : process.env.REACT_APP_HASURA_DEV_HTTPLINK!,
});

const authLink = setContext(auth).concat(httpLink);

const wsLink = new GraphQLWsLink(
  createClient({
    url:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_HASURA_WSLINK!
        : process.env.REACT_APP_HASURA_DEV_WSLINK!,
    lazy: true,
    connectionParams: auth,
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink,
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
