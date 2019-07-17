import axios from "axios";
import { login } from "./users";

// axios.defaults.baseURL =
//   process.env.NODE_ENV === "production"
//     ? "https://api.eesast.com/v1"
//     : "http://localhost:28888/v1";
axios.defaults.baseURL = "https://api.eesast.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  login
};
