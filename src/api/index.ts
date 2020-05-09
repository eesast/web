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
  unlikeArticle,
} from "./articles";
import {
  login,
  register,
  updateUser,
  getUserId,
  getUsername,
  getUserInfo,
  getUserInfos,
  verifyToken,
} from "./users";
import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  quitTeam,
  addTeamMember,
  getContestId,
  getTeamNum,
} from "./teams";
import { uploadImage } from "./static";
import { startBattle, getBattleHistory, getRooms } from "./rooms";
import {
  getCodes,
  createCode,
  compileCode,
  updateCode,
  deleteCode,
} from "./codes";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://api.eesast.com"
    : "http://localhost:28888";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  login,
  register,
  updateUser,
  verifyToken,
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
  uploadImage,
  startBattle,
  getBattleHistory,
  getRooms,
  getCodes,
  createCode,
  compileCode,
  updateCode,
  deleteCode,
};
