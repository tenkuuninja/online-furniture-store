import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import categoryReducer from "./categorySlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    category: categoryReducer,
    product: productSlice,
    user: userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
