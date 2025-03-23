import { FC } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface IDashboardNotificationCardItem {
  notification: {
    title: string;
    description: string;
    date: Date;
    onClick?: () => void;
  };
}

const DashboardNotificationCardItem: FC<IDashboardNotificationCardItem> = ({
  notification,
}) => {
  const formattedDate = format(notification.date, "h:m:s aaa");

  return (
    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary-500" />
      <div className="space-y-3">
        <div className={"flex flex-row items-center justify-between"}>
          <p className={"text-base font-medium leading-none"}>
            {notification.title}
          </p>
          <p className={"text-sm leading-none text-neutral-700"}>
            {formattedDate}
          </p>
        </div>
        <p className="text-sm text-neutral-800 line-clamp-1">
          {notification.description}
        </p>
        <Button variant={"outline"}>View</Button>
      </div>
    </div>
  );
};

export default DashboardNotificationCardItem;
