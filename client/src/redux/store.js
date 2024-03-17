import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";

// console.log(authSlice);

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
