import axiosInstance from "@/utils/axios-instance";
import { getCookie } from "cookies-next";
import { AppDispatch } from "@/store/store";
import {
  setNotifications,
  addNotification,
  markAsRead,
  clearNotifications,
} from "@/store/notifications/notifications-slice";
import { CreateNotificationsProp } from "@/store/notifications/notifications-type";

export class NotificationsService {
  static baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/notifications`;
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  private static getAuthHeader() {
    const token = getCookie("mlToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  // Fetch all notifications
  async getAllNotifications() {
    try {
      const res = await axiosInstance.get(
        NotificationsService.baseUrl,
        NotificationsService.getAuthHeader()
      );
      this.dispatch(setNotifications(res.data.data));
    } catch (error: any) {
      console.error(
        "Failed to fetch notifications:",
        error.response?.data?.message
      );
    }
  }

  // Fetch a single notification by ID
  async getNotificationsById(id: string) {
    try {
      const res = await axiosInstance.get(
        `${NotificationsService.baseUrl}/${id}`,
        NotificationsService.getAuthHeader()
      );
      this.dispatch(addNotification(res.data.data));
    } catch (error: any) {
      console.error(
        "Failed to fetch notification:",
        error.response?.data?.message
      );
    }
  }

  // Mark a notification as read
  async markNotificationsAsReadById(id: string) {
    try {
      await axiosInstance.patch(
        `${NotificationsService.baseUrl}/${id}`,
        { is_read: true },
        NotificationsService.getAuthHeader()
      );
      this.dispatch(markAsRead(id));
    } catch (error: any) {
      console.error(
        "Failed to mark notification as read:",
        error.response?.data?.message
      );
    }
  }

  // Delete a notification
  async deleteNotificationsById(id: string) {
    try {
      await axiosInstance.delete(
        `${NotificationsService.baseUrl}/${id}`,
        NotificationsService.getAuthHeader()
      );
      // You may want to dispatch a removeNotification(id) here if you create one
    } catch (error: any) {
      console.error(
        "Failed to delete notification:",
        error.response?.data?.message
      );
    }
  }

  // Create a new notification
  async createNotifications(payload: CreateNotificationsProp) {
    try {
      const res = await axiosInstance.post(
        NotificationsService.baseUrl,
        payload,
        NotificationsService.getAuthHeader()
      );
      this.dispatch(addNotification(res.data.data));
      return res.data.data;
    } catch (error: any) {
      console.error(
        "Failed to create notification:",
        error.response?.data?.message
      );
    }
  }

  // Clear all notifications (local state only)
  clearLocalNotifications() {
    this.dispatch(clearNotifications());
  }
}
