import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import adminSlice from "./slices/adminSlice";
import shopSlice from "./slices/shopSlice";
const reducers = {
  authSlice,
  adminSlice,
  shopSlice,
};

const appReducer = combineReducers(reducers);

export const rootReducer = (state, action) => {
  if (action.type === "auth/logoutSuccess") {
    storage.removeItem("persist:root");
    state = undefined;
  }

  return appReducer(state, action);
};
