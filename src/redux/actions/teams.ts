import { createAsyncAction } from "typesafe-actions";
import api from "../../api";
import {
  IGetTeamsAction,
  ISortTeamsAction,
  IGetContestIdAction,
  IThunkResult
} from "../types/actions";
import {
  GET_TEAMS_FAILURE,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  SORT_TEAMS_REQUEST,
  SORT_TEAMS_SUCCESS,
  SORT_TEAMS_FAILURE,
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
      dispatch(sortTeams("byId"));
    } catch (e) {
      dispatch(getTeamsAction.failure(e));
    }
  };
}

export const sortTeamsAction = createAsyncAction(
  SORT_TEAMS_REQUEST,
  SORT_TEAMS_SUCCESS,
  SORT_TEAMS_FAILURE
)<undefined, ITeam[], Error>();

export function sortTeams(rule: string): IThunkResult<ISortTeamsAction> {
  return async (dispatch, getState) => {
    dispatch(sortTeamsAction.request());

    try {
      const teams = getState().teams.items;
      let map = new Map<number, ITeam>();
      let uniTeams: ITeam[] = [];
      for (var i of teams) {
        if (!map.has(i.id)) {
          uniTeams.push(i);
          map.set(i.id, i);
        } else {
          const inMapTeam = map.get(i.id);
          if (inMapTeam && inMapTeam.updatedAt && i.updatedAt) {
            if (Date.parse(inMapTeam.updatedAt) < Date.parse(i.updatedAt)) {
              map.set(i.id, i);
              uniTeams.splice(uniTeams.indexOf(inMapTeam), 1, i);
            }
          }
        }
      }

      switch (rule) {
        case "byId":
          uniTeams.sort((a: ITeam, b: ITeam) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          break;

        case "byName":
          uniTeams.sort((a: ITeam, b: ITeam) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          break;
      }
      dispatch(sortTeamsAction.success(uniTeams));
    } catch (e) {
      dispatch(sortTeamsAction.failure(e));
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
