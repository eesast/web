import { ITimelinesAction } from "../types/actions";
import {
  GET_TIMELINE_FEEDS_REQUEST,
  GET_TIMELINE_FEEDS_SUCCESS,
  GET_TIMELINE_FEEDS_FAILURE
} from "../types/constants";
import { ITimelinesState } from "../types/state";

export default function timelines(
  state: ITimelinesState = {
    fetching: false,
    items: []
  },
  action: ITimelinesAction
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
