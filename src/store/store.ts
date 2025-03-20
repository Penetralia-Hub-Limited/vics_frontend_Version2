import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/auth-slice";
import vehicleReducer from "./vehicle/vehicle-slice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  vehicle: vehicleReducer,
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

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
