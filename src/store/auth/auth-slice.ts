import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decryptToken, generateToken, initialAuthState } from "@/utils/helpers";

const getLoggedState = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const mlToken = localStorage.getItem("mlToken");

    if (mlToken) {
      const parsedToken = decryptToken(mlToken);
      if (parsedToken.success) {
        const authData = parsedToken.data;
        console.log("Parsed State Returned");
        return { ...initialAuthState, isLoggedIn: true, user: authData };
      }
    }
    console.log("Default State Returned");
  }
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
      localStorage.setItem("mlToken", token);
      state.isLoading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    authFail: (state, action: PayloadAction<string | null>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: () => {
      localStorage.removeItem("mlToken");
      return { isLoading: false, isLoggedIn: false, user: null, error: null };
    },
  },
});

export const { authStart, authSuccess, authFail, logout } = authSlice.actions;
export default authSlice.reducer;
