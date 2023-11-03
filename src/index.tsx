import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./app";
import { client } from "./api/apollo";
import { onLCP, onFID, onCLS, onINP, onFCP, onTTFB } from "web-vitals";

ReactDOM.render(
  // <React.StrictMode> // TODO: wait for antd fix
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  // </React.StrictMode>,
  document.getElementById("root"),
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
