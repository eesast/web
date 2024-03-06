import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./app";
import { client } from "./api/apollo";
import { onLCP, onFID, onCLS, onINP, onFCP, onTTFB } from "web-vitals";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL_DEV;
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
const router = createHashRouter([{ path: "*", element: <App /> }]);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
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
