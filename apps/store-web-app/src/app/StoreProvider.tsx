"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { makeStore } from "@/stores/store";
import type { AppStore } from "@/stores/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";

interface Props {
  readonly children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current !== null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);

      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
