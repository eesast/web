import { ITimelineAction } from "../types/actions";
import {
  GET_TIMELINE_FEEDS_REQUEST,
  GET_TIMELINE_FEEDS_SUCCESS,
  GET_TIMELINE_FEEDS_FAILURE
} from "../types/constants";
import { ITimelineState } from "../types/state";

export default function timeline(
  state: ITimelineState = {
    fetching: false,
    items: []
  },
  action: ITimelineAction
): ITimelineState {
  switch (action.type) {
    case GET_TIMELINE_FEEDS_REQUEST:
      return {
        items: [],
        fetching: true,
        error: null
      };
    case GET_TIMELINE_FEEDS_SUCCESS:
      const newTimelines = action.payload.timelines;

      return {
        ...state,
        fetching: false,
        items: [...state.items, ...newTimelines]
      };
    case GET_TIMELINE_FEEDS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
  }
  return state;
}
