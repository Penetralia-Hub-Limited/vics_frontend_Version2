/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decryptToken, generateToken, initialAuthState } from "@/utils/helpers";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const getLoggedState = () => {
  const mlToken = getCookie("mlToken");

  if (mlToken && typeof mlToken === "string") {
    const parsedToken = decryptToken(mlToken);
    if (parsedToken.success) {
      const authData = parsedToken.data;
      console.log("Parsed State Returned");
      return { ...initialAuthState, isLoggedIn: true, user: authData };
    }
  }
  console.log("Default State Returned");

  return initialAuthState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: getLoggedState(),
  reducers: {
    authStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess: (state, action: PayloadAction<any>) => {
      const token = generateToken(action.payload, "1d");
      setCookie("mlToken", token);
      state.isLoading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    authFail: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      deleteCookie("mlToken");
      state.isLoggedIn = false;
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { authStart, authSuccess, authFail, logout } = authSlice.actions;
export default authSlice.reducer;
