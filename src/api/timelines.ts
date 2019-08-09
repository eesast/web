import axios from "axios";
import { ITimeline } from "../redux/types/state";

export const getTimelineFeeds = async () => {
  const response = await axios.get(`/v1/timelines`);
  return response.data as ITimeline[];
};
