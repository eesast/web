import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType } from "typesafe-actions";
import { loginAction } from "../actions/auth";
import { getArticleFeedsAction } from "../actions/weekly";
import { getTimelineFeedsAction } from "../actions/timelines";
import { getTeamsAction, getContestIdAction } from "../actions/teams";
import { IAppState } from "./state";

export type IThunkResult<T extends AnyAction> = ThunkAction<
  void,
  IAppState,
  undefined,
  T
>;

export type ILoginAction = ActionType<typeof loginAction>;

export type IAuthAction = ILoginAction;

export type IGetArticleFeedsAction = ActionType<typeof getArticleFeedsAction>;
export type IGetTimelineFeedsAction = ActionType<typeof getTimelineFeedsAction>;

export type IWeeklyAction = IGetArticleFeedsAction;

export type ITimelineAction = IGetTimelineFeedsAction;

export type IGetTeamsAction = ActionType<typeof getTeamsAction>;

export type IGetContestIdAction = ActionType<typeof getContestIdAction>;

export type ITeamsAction = IGetTeamsAction | IGetContestIdAction;

export type IAppAction = IAuthAction | IWeeklyAction | ITeamsAction;
