"use client";

import { FC, useState } from "react";
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
  const [idate] = useState<Date>(notification?.date);
  const formattedDate = format(idate.toDateString(), "h:mm:ss aaa");

  return (
    <div className="mb-4 grid grid-cols-[25px_auto] items-start pb-4 last:mb-0 last:pb-0 border-b-1 border-primary-300 last:border-b-0">
      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary-500" />
      <div className="space-y-3">
        <div className={"flex flex-row items-start justify-between w-full"}>
          <p
            className={"text-sm md:text-base font-medium leading-none w-[70%]"}
          >
            {notification.title}
          </p>
          <p
            className={
              "text-xs md:text-sm leading-none text-neutral-700 ml-auto"
            }
          >
            {formattedDate}
          </p>
        </div>
        <p className="text-xs md:text-sm text-neutral-800 line-clamp-1">
          {notification.description}
        </p>
        <Button variant={"outline"}>View</Button>
      </div>
    </div>
  );
};

export default DashboardNotificationCardItem;
