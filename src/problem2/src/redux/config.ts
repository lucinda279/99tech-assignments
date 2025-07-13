import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";

import { apiSlice } from "./apiSlices";

import { rtkQueryErrorLogger } from "./middlewares";
import { persistedReducer } from "./reducers";

export const setupStore = (
  preloadedState?: ReturnType<typeof persistedReducer>
) =>
  configureStore({
    preloadedState,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(rtkQueryErrorLogger)
        .concat(apiSlice.middleware),
    devTools: !import.meta.env.PROD,
  });

export const store = setupStore();

export const persistor = persistStore(store);
