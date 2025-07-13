import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { apiSlice } from "./apiSlices";
import appReducer from "./app/appSlice";

const persistConfig = {
  key: "root",
  version: 0,
  storage,
  whitelist: [],
};

const appPersistConfig = {
  key: "app",
  storage,
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  app: persistReducer(appPersistConfig, appReducer),
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
