import { createSelector } from "reselect";
import { RootState } from "../store";
import { NotificationStatus, NotificationProps } from "./notifications-type";

// Base selector
const selectNotificationReducer = (state: RootState) => state.notification;

// All notifications
export const selectAllNotifications = createSelector(
  [selectNotificationReducer],
  (notificationState) => notificationState.notifications
);

// Unread notifications
export const selectUnreadNotifications = createSelector(
  [selectAllNotifications],
  (notifications) => notifications.filter((n: NotificationProps) => !n.is_read)
);

// Active notifications
export const selectActiveNotifications = createSelector(
  [selectAllNotifications],
  (notifications) =>
    notifications.filter(
      (n: NotificationProps) => n.status === NotificationStatus.ACTIVE
    )
);

// Notification by ID
export const selectNotificationById = createSelector(
  [selectAllNotifications, (_: RootState, id: string) => id],
  (notifications, id) =>
    notifications.find((n: NotificationProps) => n.id === id)
);
