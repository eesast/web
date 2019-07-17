import jwtDecode from "jwt-decode";
import { IAuthAction } from "../types/actions";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from "../types/constants";
import { IAuthState } from "../types/state";

export default function auth(
  state: IAuthState = {
    loggedIn: false,
    loggingIn: false
  },
  action: IAuthAction
): IAuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        error: null
      };
    case LOGIN_SUCCESS:
      const token = action.payload;
      const decoded = jwtDecode(token) as any;
      return {
        ...state,
        token,
        loggedIn: true,
        loggingIn: false,
        error: null,
        user: decoded
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loggingIn: false,
        error: action.payload
      };
  }
  return state;
}
