import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userSlice,
  },
});

export default store;
