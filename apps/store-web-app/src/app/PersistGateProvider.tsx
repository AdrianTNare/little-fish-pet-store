"use client";

import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { persistor } from "@/stores/store";
import type { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

export const PersistGateProvider = ({ children }: Props) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};
