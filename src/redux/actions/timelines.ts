import { createAsyncAction } from "typesafe-actions";
import api from "../../api";
import { IGetTimelineFeedsAction, IThunkResult } from "../types/actions";
import {
  GET_TIMELINE_FEEDS_REQUEST,
  GET_TIMELINE_FEEDS_SUCCESS,
  GET_TIMELINE_FEEDS_FAILURE
} from "../types/constants";
import { ITimeline } from "../types/state";

export const getTimelineFeedsAction = createAsyncAction(
  GET_TIMELINE_FEEDS_REQUEST,
  GET_TIMELINE_FEEDS_SUCCESS,
  GET_TIMELINE_FEEDS_FAILURE
)<undefined, { timelines: ITimeline[] }, Error>();

export function getTimelineFeeds(): IThunkResult<IGetTimelineFeedsAction> {
  return async dispatch => {
    dispatch(getTimelineFeedsAction.request());

    try {
      const timelines = await api.getTimelineFeeds();
      dispatch(getTimelineFeedsAction.success({ timelines }));
    } catch (e) {
      dispatch(getTimelineFeedsAction.failure(e));
    }
  };
}
