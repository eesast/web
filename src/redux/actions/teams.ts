import { createAsyncAction } from "typesafe-actions";
import api from "../../api";
import {
  IGetTeamsAction,
  IGetTeamNumAction,
  IGetContestIdAction,
  IThunkResult,
  IGetSelfTeamAction
} from "../types/actions";
import {
  GET_TEAMS_FAILURE,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAM_NUM_REQUEST,
  GET_TEAM_NUM_SUCCESS,
  GET_TEAM_NUM_FAILURE,
  GET_SELF_TEAM_REQUEST,
  GET_SELF_TEAM_SUCCESS,
  GET_SELF_TEAM_FAILURE,
  GET_CONTEST_ID_REQUEST,
  GET_CONTEST_ID_SUCCESS,
  GET_CONTEST_ID_FAILURE
} from "../types/constants";
import { ITeam } from "../types/state";

export const getTeamsAction = createAsyncAction(
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILURE
)<undefined, ITeam[], Error>();

//用于获取显示用的队伍列表，原来判断自己的队伍新加了selfTeam
export function getTeams(
  self: boolean,
  type: string,
  year: number,
  begin?: number,
  end?: number
): IThunkResult<IGetTeamsAction> {
  return async (dispatch, getState) => {
    dispatch(getTeamsAction.request());

    try {
      const token = getState().auth.token || "";
      if (!getState().teams.contestId) {
        await dispatch(getContestId(type, year));
      }
      let teams: ITeam[] = [];
      if (begin === 0 || (begin && end!)) {
        teams = await api.getTeams(
          self,
          getState().teams.contestId!,
          token,
          begin,
          end
        );
      } else {
        teams = await api.getTeams(self, getState().teams.contestId!, token);
      }

      teams = await Promise.all(
        teams.map(async team => {
          const leaderUsername = await api.getUsername(team.leader, token);
          const membersUsername = await Promise.all(
            team.members.map(id => api.getUsername(id, token))
          );
          return {
            ...team,
            membersUsername: membersUsername,
            leaderUsername: leaderUsername
          };
        })
      );

      dispatch(getTeamsAction.success(teams));
    } catch (e) {
      dispatch(getTeamsAction.failure(e));
    }
  };
}

export const getTeamNumAction = createAsyncAction(
  GET_TEAM_NUM_REQUEST,
  GET_TEAM_NUM_SUCCESS,
  GET_TEAM_NUM_FAILURE
)<undefined, number, Error>();

export function getTeamNum(
  type: string,
  year: number
): IThunkResult<IGetTeamNumAction> {
  return async (dispatch, getState) => {
    dispatch(getTeamNumAction.request());

    try {
      if (!getState().teams.contestId) {
        await dispatch(getContestId(type, year));
      }
      const num = await api.getTeamNum(getState().teams.contestId!);

      dispatch(getTeamNumAction.success(num));
    } catch (e) {
      dispatch(getTeamNumAction.failure(e));
    }
  };
}

export const getSelfTeamAction = createAsyncAction(
  GET_SELF_TEAM_REQUEST,
  GET_SELF_TEAM_SUCCESS,
  GET_SELF_TEAM_FAILURE
)<undefined, ITeam, Error>();

export function getSelfTeam(
  type: string,
  year: number
): IThunkResult<IGetSelfTeamAction> {
  return async (dispatch, getState) => {
    dispatch(getSelfTeamAction.request());

    try {
      const token = getState().auth.token || "";
      if (!getState().teams.contestId) {
        await dispatch(getContestId(type, year));
      }
      const team = await api.getTeams(true, getState().teams.contestId!, token);

      if (team.length) {
        const selfTeam = team[0];
        selfTeam.leaderUsername = await api.getUsername(selfTeam.leader, token);
        selfTeam.membersUsername = await Promise.all(
          selfTeam.members.map(id => api.getUsername(id, token))
        );

        dispatch(getSelfTeamAction.success(selfTeam));
      } else {
        const noSelfTeam: ITeam = {
          id: 0,
          contestId: 0,
          name: "noSelfTeamUser",
          description: "noSelfTeamUser",
          leader: 0,
          members: [0]
        };
        dispatch(getSelfTeamAction.success(noSelfTeam));
      }
    } catch (e) {
      dispatch(getSelfTeamAction.failure(e));
    }
  };
}

export const getContestIdAction = createAsyncAction(
  GET_CONTEST_ID_REQUEST,
  GET_CONTEST_ID_SUCCESS,
  GET_CONTEST_ID_FAILURE
)<undefined, number, Error>();

export function getContestId(
  type: string,
  year: number
): IThunkResult<IGetContestIdAction> {
  return async dispatch => {
    dispatch(getContestIdAction.request());

    try {
      const contestId = await api.getContestId(type, year);
      dispatch(getContestIdAction.success(contestId));
    } catch (e) {
      dispatch(getContestIdAction.failure(e));
    }
  };
}
