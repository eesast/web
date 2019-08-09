import axios from "axios";
import { getArticleFeeds } from "./articles";
import { login } from "./users";
import { getTimelineFeeds } from "./timelines";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.eesast.com"
    : "http://localhost:28888";
//axios.defaults.baseURL = "https://api.eesast.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  login,
  getArticleFeeds,
  getTimelineFeeds
};
