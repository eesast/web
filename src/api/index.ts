import axios from "axios";
import { getArticleFeeds } from "./articles";
import { getTimelineFeeds } from "./timelines";
import { login, register, updateUser, getUsername } from "./users";
import { getTeams, createTeam, addTeamMember, getContestId } from "./teams";

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
  getUsername,
  getTeams,
  createTeam,
  addTeamMember,
  getContestId,
  getTimelineFeeds
};
