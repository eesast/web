import { createAsyncAction } from "typesafe-actions";
import api from "../../api";
import {
  IGetTeamsAction,
  IGetContestIdAction,
  IThunkResult
} from "../types/actions";
import {
  GET_TEAMS_FAILURE,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
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

export function getTeams(
  self: boolean,
  type: string,
  year: number
): IThunkResult<IGetTeamsAction> {
  return async (dispatch, getState) => {
    dispatch(getTeamsAction.request());

    try {
      const token = getState().auth.token || "";
      if (!getState().teams.contestId) {
        await dispatch(getContestId(type, year));
      }
      const teams = await api.getTeams(
        self,
        getState().teams.contestId!,
        token
      );

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
