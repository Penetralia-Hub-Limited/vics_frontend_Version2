"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "@/store/store";
import { persistStore } from "redux-persist";
import Loading from "@/components/general/spinner";

const persistor = persistStore(store);

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading screen={"main"} />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
