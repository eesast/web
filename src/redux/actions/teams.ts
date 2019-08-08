import { createAsyncAction } from "typesafe-actions";
import api from "../../api";
import { IGetTeamsAction, IThunkResult } from "../types/actions";
import {
  GET_TEAMS_FAILURE,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS
} from "../types/constants";
import { ITeam } from "../types/state";

export const getTeamsAction = createAsyncAction(
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_TEAMS_FAILURE
)<undefined, ITeam[], Error>();

export function getTeams(self: boolean): IThunkResult<IGetTeamsAction> {
  return async (dispatch, getState) => {
    dispatch(getTeamsAction.request());

    try {
      const token = getState().auth.token || "";
      const teams = await api.getTeams(self, 1, token);

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
      console.log(e);
      dispatch(getTeamsAction.failure(e));
    }
  };
}
