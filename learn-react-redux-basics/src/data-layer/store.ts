import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/reducers";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
});

export type storeRoot = ReturnType<typeof store.getState>;
export type storeDispatcher = typeof store.dispatch;