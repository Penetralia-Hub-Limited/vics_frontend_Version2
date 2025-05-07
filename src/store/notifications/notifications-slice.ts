import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationProps } from "./notifications-type";

interface NotificationState {
  notifications: NotificationProps[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<NotificationProps[]>) {
      state.notifications = action.payload;
    },
    addNotification(state, action: PayloadAction<NotificationProps>) {
      state.notifications.unshift(action.payload);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) notif.is_read = true;
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAsRead,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
