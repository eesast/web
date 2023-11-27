import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "./index.css";
import App from "./app";
import { client } from "./api/apollo";
import { onLCP, onFID, onCLS, onINP, onFCP, onTTFB } from "web-vitals";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ConfigProvider
          locale={zhCN}
          theme={{
            algorithm: theme.defaultAlgorithm,
            // algorithm: theme.darkAlgorithm,
          }}
        >
          <App />
        </ConfigProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// Measuring performance in our app, pass a function
// Learn more: https://github.com/GoogleChrome/web-vitals, https://bit.ly/CRA-vitals
if (process.env.NODE_ENV === "development") {
  onCLS(console.log); // Cumulative Layout Shift, https://web.dev/cls/
  onFID(console.log); // First Input Delay, https://web.dev/fid/
  onLCP(console.log); // Largest Contentful Paint, https://web.dev/lcp/
  onINP(console.log); // Interaction to next Paint, https://web.dev/inp/
  onFCP(console.log); // First Contentful Paint, https://web.dev/fcp/
  onTTFB(console.log); // Time to First Byte, https://web.dev/ttfb/
}
