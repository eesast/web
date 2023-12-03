import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import "../index.css";
import App from "../app";
import { client } from "../api/apollo";

test("renders without crashing", () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
});
