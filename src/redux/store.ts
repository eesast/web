import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import { IAppAction } from "./types/actions";
import { IAppState } from "./types/state";

const appReducer = combineReducers<IAppState, IAppAction>({
  auth
});

const store = createStore<IAppState, IAppAction, {}, {}>(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
