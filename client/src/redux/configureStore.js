import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import claimsReducer from "./features/claims";
import commentsReducer from "./features/comments";
import statusReducer from "./features/status";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const store = createStore(
  combineReducers({
    claims: claimsReducer,
    comments: commentsReducer,
    status: statusReducer,
  }),
  applyMiddleware(thunk, logger)
);