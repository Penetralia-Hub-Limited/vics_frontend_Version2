import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import plateNumberReducer from "./plateNumber/plate-number-slice";
import authReducer from "./auth/auth-slice";
import userReducer from "./user/user-slice";
import lgaReducer from "./lgas/lga-slice";
import stateReducer from "./states/state-slice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  lga: lgaReducer,
  platenumber: plateNumberReducer,
  states: stateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
