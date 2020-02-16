import axios from "axios";
import {
  getArticleFeeds,
  getArticle,
  getArticleByAlias,
  getSelfArticles,
  getSelfArticleNum,
  getPostedArticles,
  getUnderReviewArticles,
  getUnderReviewArticlesNum,
  postArticle,
  updateArticle,
  updateArticleVisibility,
  deleteArticle,
  likeArticle,
  unlikeArticle
} from "./articles";
import {
  login,
  register,
  updateUser,
  getUserId,
  getUsername,
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
import { uploadImage } from "./static";

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
  getSelfArticles,
  getSelfArticleNum,
  getPostedArticles,
  getUnderReviewArticles,
  getUnderReviewArticlesNum,
  postArticle,
  updateArticle,
  updateArticleVisibility,
  deleteArticle,
  likeArticle,
  unlikeArticle,
  getUserId,
  getUsername,
  getUserInfo,
  getUserInfos,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  quitTeam,
  addTeamMember,
  getContestId,
  getTeamNum,
  uploadImage
};
