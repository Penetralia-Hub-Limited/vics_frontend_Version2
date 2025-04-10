/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./user-type";

interface UserState {
  users: User[];
  selectedUser: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    userSuccess(state, action: PayloadAction<any[]>) {
      state.isLoading = false;
      state.users = action.payload;
    },
    userFail(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<any>) {
      state.selectedUser = action.payload;
    },
    clearUsers(state) {
      state.users = [];
    },
  },
});

export const { userStart, userSuccess, userFail, setSelectedUser, clearUsers } =
  userSlice.actions;

export default userSlice.reducer;
