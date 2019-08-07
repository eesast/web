import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { ActionType } from "typesafe-actions";
import { loginAction } from "../actions/auth";
import { getArticleFeedsAction } from "../actions/weekly";
import { IAppState } from "./state";
import { getTeamsAction } from "../actions/teams";

export type IThunkResult<T extends AnyAction> = ThunkAction<
  void,
  IAppState,
  undefined,
  T
>;

export type ILoginAction = ActionType<typeof loginAction>;

export type IAuthAction = ILoginAction;

export type IGetArticleFeedsAction = ActionType<typeof getArticleFeedsAction>;

export type IWeeklyAction = IGetArticleFeedsAction;

export type IGetTeamsAction = ActionType<typeof getTeamsAction>;

export type ITeamsAction = IGetTeamsAction;

export type IAppAction = IAuthAction | IWeeklyAction | ITeamsAction;
