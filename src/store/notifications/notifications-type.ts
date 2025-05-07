export enum NotificationStatus {
  ACTIVE = "Active",
  NOTACTIVE = "Inactive",
}

export interface NotificationProps {
  id: string;
  company_id: string;
  creator_id: string;
  state_id: string;
  last_updated_id: string;
  title: string;
  content: string;
  status: NotificationStatus;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export type CreateNotificationsProp = {
  state_id: string;
  title: string;
  content: string;
  status: NotificationStatus;
  is_read: boolean;
};
