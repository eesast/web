import axios from "axios";
import { getArticleFeeds } from "./articles";
import {
  login,
  register,
  updateUser,
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
  startBattle,
  getBattleHistory,
  getRooms,
  getCodes,
  createCode,
  compileCode,
  updateCode,
  deleteCode,
};
