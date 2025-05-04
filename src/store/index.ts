import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, REGISTER, PAUSE, PERSIST, PURGE, REHYDRATE, persistReducer } from "redux-persist";

import resumeReducer from "@/slices/resumeSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "resume-persist",
  storage,
  version: 1,
};

const persistResume = persistReducer(persistConfig, resumeReducer);

export const store = configureStore({
  reducer: {
    resume: persistResume,
  },
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    });
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
