import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cartSlice";

const rootReducer = combineSlices(cartSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];
