import { ITeamsAction } from "../types/actions";
import {
  GET_TEAMS_FAILURE,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS
} from "../types/constants";
import { ITeamsState } from "../types/state";

export default function teams(
  state: ITeamsState = {
    fetching: false,
    items: []
  },
  action: ITeamsAction
): ITeamsState {
  switch (action.type) {
    case GET_TEAMS_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case GET_TEAMS_SUCCESS:
      const newTeams = action.payload;

      return {
        ...state,
        fetching: false,
        items: [...state.items, ...newTeams]
      };
    case GET_TEAMS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
  }
  return state;
}
