/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./user-type";

interface UserState {
  users: User[];
  selectedUser: any | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  success: false,
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
    addUser(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.success = true;
      state.users = [...state.users, action.payload];
    },
    updateUserInState(state, action: PayloadAction<any>) {
      const index = state.users.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    clearUsers(state) {
      state.users = [];
    },
  },
});

export const {
  userStart,
  userSuccess,
  userFail,
  setSelectedUser,
  addUser,
  updateUserInState,
  clearUsers,
} = userSlice.actions;

export default userSlice.reducer;
