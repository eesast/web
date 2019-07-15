import { AxiosError } from "axios";
import { createAsyncAction } from "typesafe-actions";
import api from "../../api";
import { ILoginAction, IThunkResult } from "../types/actions";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from "../types/constants";

export const loginAction = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<undefined, string, AxiosError>();

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
