import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "../index.css";
import App from "../app";
import { client } from "../api/apollo";

test("renders without crashing", () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ConfigProvider locale={zhCN}>
            <App />
          </ConfigProvider>
        </ApolloProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
});
