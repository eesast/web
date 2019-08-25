import { ITeamsAction } from "../types/actions";
import {
  GET_TEAMS_FAILURE,
  GET_TEAMS_REQUEST,
  GET_TEAMS_SUCCESS,
  GET_SELF_TEAM_REQUEST,
  GET_SELF_TEAM_SUCCESS,
  GET_SELF_TEAM_FAILURE,
  GET_CONTEST_ID_REQUEST,
  GET_CONTEST_ID_SUCCESS,
  GET_CONTEST_ID_FAILURE,
  SORT_TEAMS_REQUEST,
  SORT_TEAMS_SUCCESS,
  SORT_TEAMS_FAILURE
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

    case GET_SELF_TEAM_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case GET_SELF_TEAM_SUCCESS:
      const team = action.payload;
      return {
        ...state,
        fetching: false,
        selfTeam: team
      };
    case GET_SELF_TEAM_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };

    case SORT_TEAMS_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case SORT_TEAMS_SUCCESS:
      const sortedTeams = action.payload;
      return {
        ...state,
        fetching: false,
        items: [...sortedTeams]
      };
    case SORT_TEAMS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };

    case GET_CONTEST_ID_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case GET_CONTEST_ID_SUCCESS:
      const contestId = action.payload;

      return {
        ...state,
        fetching: false,
        contestId: contestId
      };
    case GET_CONTEST_ID_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
  }
  return state;
}
