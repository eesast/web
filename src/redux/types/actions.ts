import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType } from "typesafe-actions";
import { loginAction, updateUserAction } from "../actions/auth";
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
export type IUpdateUserAction = ActionType<typeof updateUserAction>;

export type IAuthAction = ILoginAction | IUpdateUserAction;

export type IGetArticleFeedsAction = ActionType<typeof getArticleFeedsAction>;

export type IWeeklyAction = IGetArticleFeedsAction;

export type IGetTimelineFeedsAction = ActionType<typeof getTimelineFeedsAction>;

export type ITimelinesAction = IGetTimelineFeedsAction;

export type IGetTeamsAction = ActionType<typeof getTeamsAction>;

export type IGetContestIdAction = ActionType<typeof getContestIdAction>;

export type ITeamsAction = IGetTeamsAction | IGetContestIdAction;

export type IAppAction =
  | IAuthAction
  | IWeeklyAction
  | ITeamsAction
  | ITimelinesAction;
