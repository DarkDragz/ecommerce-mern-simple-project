import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./reducer";
import persistStore from "redux-persist/es/persistStore";
import { setStore } from "../services/store";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

setStore(store);
export const persistor = persistStore(store);
