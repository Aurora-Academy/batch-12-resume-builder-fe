import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REGISTER,
  PAUSE,
  PERSIST,
  PURGE,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import resumeReducer from "@/slices/resumeSlice";
import { userReducer } from "@/slices/userSlice";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  resumes: resumeReducer,
  users: userReducer,
  //... other slices
});

const persistConfig = {
  key: "resume-persist",
  storage,
  whitelist: ["resumes"],
  version: 1,
  stateReconciler: autoMergeLevel2,
};

export const store = configureStore({
  reducer: persistReducer<any>(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
