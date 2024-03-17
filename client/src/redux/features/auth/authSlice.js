import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
};

console.log(initialState);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    builder.addCase(userLogin.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token
    })
    builder.addCase(userLogin.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload;
    })
  },
});

console.log(authSlice);

export default authSlice;
