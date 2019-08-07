import axios from "axios";
import { getArticleFeeds } from "./articles";
import { login, register } from "./users";

// axios.defaults.baseURL =
//   process.env.NODE_ENV === "production"
//     ? "https://api.eesast.com/v1"
//     : "http://localhost:28888/v1";
axios.defaults.baseURL = "https://api.eesast.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  login,
  register,
  getArticleFeeds
};
