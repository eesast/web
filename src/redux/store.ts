import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import weekly from "./reducers/weekly";
import timeline from "./reducers/timelines";
import teams from "./reducers/teams";
import { IAppAction } from "./types/actions";
import { IAppState } from "./types/state";

const appReducer = combineReducers<IAppState, AnyAction>({
  auth,
  weekly,
  timeline,
  teams
});

const store = createStore<IAppState, IAppAction, {}, {}>(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
