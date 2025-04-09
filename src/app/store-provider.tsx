"use client";

import { ReactNode, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "@/store/store";
import { persistStore } from "redux-persist";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => makeStore());
  const [persistor, setPersistor] = useState<any>(null);

  useEffect(() => {
    const _persistor = persistStore(store);
    setPersistor(_persistor);
  }, [store]);

  if (!persistor) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
