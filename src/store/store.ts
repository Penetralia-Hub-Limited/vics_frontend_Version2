import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import plateNumberReducer from "./plateNumber/plate-number-slice";
import authReducer from "./auth/auth-slice";
import userReducer from "./user/user-slice";
import lgaReducer from "./lgas/lga-slice";
import stateReducer from "./states/state-slice";
import companiesReducer from "./company/company-slice";
import vehicleReducer from "./vehicle/vehicle-slice";
import invoiceReducer from "./invoice/invoice-slice";
import serviceTypeReducer from "./service-type/service-type-slice";
import invoiceTypeReducer from "./invoice-type/invoice-type-slice";
import plateNumberOrderReducer from "./plate-number-orders/plate-number-order-slice";
import offenceReducer from "./offence/offence-slice";
import notificationReducer from "./notifications/notifications-slice";

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
  states: stateReducer,
  companies: companiesReducer,
  vehicles: vehicleReducer,
  servicetype: serviceTypeReducer,
  invoices: invoiceReducer,
  invoicetype: invoiceTypeReducer,
  platenumber: plateNumberReducer,
  platenumberorder: plateNumberOrderReducer,
  offences: offenceReducer,
  notification: notificationReducer,
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
