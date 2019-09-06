import { createAsyncAction } from "typesafe-actions";
import api from "../../api";
import {
  IGetTeamsAction,
  IGetContestIdAction,
  IThunkResult,
  IGetSelfTeamAction
} from "../types/actions";
import {
  GET_TEAMS_FAILURE,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
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

      for (const team of teams) {
        const leaderUsername = await api.getUsername(team.leader, token);
        team.leaderUsername = leaderUsername;
        team.membersUsername = [];
        for (const id of team.members) {
          if (id === team.leader) {
            team.membersUsername!.push(leaderUsername);
          } else {
            const username = await api.getUsername(id, token);
            team.membersUsername!.push(username);
          }
        }
      }
      dispatch(getTeamsAction.success(teams));
    } catch (e) {
      dispatch(getTeamsAction.failure(e));
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
        const leaderUsername = await api.getUsername(team[0].leader, token);
        team[0].leaderUsername = leaderUsername;
        team[0].membersUsername = [];
        for (const id of team[0].members) {
          if (id === team[0].leader) {
            team[0].membersUsername!.push(leaderUsername);
          } else {
            const username = await api.getUsername(id, token);
            team[0].membersUsername!.push(username);
          }
        }

        dispatch(getSelfTeamAction.success(team[0]));
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
