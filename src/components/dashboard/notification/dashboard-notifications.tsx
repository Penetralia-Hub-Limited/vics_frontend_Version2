"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { NotificationsService } from "@/services/NotificationService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardNotificationCardItem from "./dashboard-notification-card-item";
import { selectUnreadNotifications } from "@/store/notifications/notification-selector";

type CardProps = React.ComponentProps<typeof Card>;

export function DashboardNotificationsComp({ className, ...props }: CardProps) {
  const dispatch = useDispatch();
  const notificationService = new NotificationsService(dispatch);
  const notificationsData = useSelector(selectUnreadNotifications);

  const handleIsRead = async (id: string) => {
    try {
      await notificationService.markNotificationsAsReadById(id);
    } catch (error) {
      if (error instanceof Error) {
        toast(`Error: ${error.cause}`);
        console.error(error.message);
      } else {
        toast("Error marking notification as read");
      }
    }
  };

  return (
    <Card
      className={cn("w-full md:w-[23rem] border border-primary-300", className)}
      {...props}
    >
      <CardHeader className={"my-0 py-5 bg-primary-50 rounded-t-lg"}>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notificationsData.length === 0 ? (
            <div className="flex item-center justify-center">
              <p className="font-semibold text-sm">
                No notifications available
              </p>
            </div>
          ) : (
            notificationsData.map((notification, index) => (
              <DashboardNotificationCardItem
                key={index}
                notification={notification}
                onClick={() => handleIsRead(notification.id)}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
