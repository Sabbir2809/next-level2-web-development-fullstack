import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  // reducer
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },

  // middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
