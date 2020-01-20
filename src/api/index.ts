import axios from "axios";
import {
  getArticleFeeds,
  getArticle,
  getArticleByAlias,
  postArticle,
  updateArticle,
  likeArticle,
  unlikeArticle
} from "./articles";
import {
  login,
  register,
  updateUser,
  getUserInfo,
  getUserInfos
} from "./users";
import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  quitTeam,
  addTeamMember,
  getContestId,
  getTeamNum
} from "./teams";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.eesast.com"
    : "http://localhost:28888";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  login,
  register,
  updateUser,
  getArticleFeeds,
  getArticle,
  getArticleByAlias,
  postArticle,
  updateArticle,
  likeArticle,
  unlikeArticle,
  getUserInfo,
  getUserInfos,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  quitTeam,
  addTeamMember,
  getContestId,
  getTeamNum
};
