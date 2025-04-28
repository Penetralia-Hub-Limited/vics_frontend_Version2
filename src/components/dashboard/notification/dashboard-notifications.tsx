"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardNotificationCardItem from "./dashboard-notification-card-item";

type CardProps = React.ComponentProps<typeof Card>;

const notifications = [
  {
    id: 1,
    title: "Your call has been confirmed.",
    description: "Your request for private vehicle liscence",
    date: new Date(),
  },
  {
    id: 2,
    title: "You have a new message!",
    description: "Your request for private vehicle liscence",
    date: new Date(),
  },
  {
    id: 3,
    title: "Your subscription is expiring soon!",
    description: "Your request for private vehicle liscence",
    date: new Date(),
  },
];

export function DashboardNotificationsComp({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn("w-full border border-primary-300", className)}
      {...props}
    >
      <CardHeader className={"my-0 py-5 bg-primary-50 rounded-t-lg"}>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {notifications.map((notification) => (
            <DashboardNotificationCardItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
