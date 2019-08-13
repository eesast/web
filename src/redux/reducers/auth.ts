import jwtDecode from "jwt-decode";
import { IAuthAction } from "../types/actions";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  UPDATE_USER
} from "../types/constants";
import { IAuthState } from "../types/state";
import axios from "axios";

export default function auth(
  state: IAuthState = {
    loggedIn: false,
    loggingIn: false
  },
  action: IAuthAction
): IAuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      axios.defaults.headers.common["Authorization"] = "";
      return {
        ...state,
        loggingIn: true,
        error: null
      };
    case LOGIN_SUCCESS:
      const token = action.payload;
      const decoded = jwtDecode(token) as any;
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return {
        ...state,
        token,
        loggedIn: true,
        loggingIn: false,
        error: null,
        user: decoded
      };
    case LOGIN_FAILURE:
      axios.defaults.headers.common["Authorization"] = "";
      return {
        ...state,
        loggedIn: false,
        loggingIn: false,
        error: action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user,
          id: action.payload.id
        }
      };
  }
  return state;
}
