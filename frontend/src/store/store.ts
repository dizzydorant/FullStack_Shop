import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/api";
import { cartSlice } from "./slices/cartSlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
