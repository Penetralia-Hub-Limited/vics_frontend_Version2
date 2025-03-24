import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserCredentials } from "./auth-user-types";
import { loginAuth } from "@/utils/auth";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials: IUserCredentials, { rejectWithValue }) => {
    try {
      const response = await loginAuth(userCredentials);
      const userData = response.data;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (error) {
      const errorMessage = error as unknown as string;
      return rejectWithValue(errorMessage);
    }
  }
);

interface AuthState {
  user: null | { id: string; email: string };
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: AuthState["user"]; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
