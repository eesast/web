import { createAsyncAction, createAction } from "typesafe-actions";
import api from "../../api";
import { ILoginAction, IThunkResult } from "../types/actions";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_USER
} from "../types/constants";
import { IUser } from "../types/state";

export const loginAction = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<undefined, string, Error>();

export function login(
  username: string,
  password: string
): IThunkResult<ILoginAction> {
  return async dispatch => {
    dispatch(loginAction.request());

    try {
      const token = await api.login(username, password);
      dispatch(loginAction.success(token));
    } catch (e) {
      dispatch(loginAction.failure(e));
    }
  };
}

export const updateUserAction = createAction(
  UPDATE_USER,
  (id: number, user: IUser) => ({ id, user })
)();
