import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CustomSVGProps } from "@/common/types";

interface IDashboardPath {
  pathdata: {
    Icon: FC<CustomSVGProps>;
    label: string;
    link: string;
  }[];
  active?: string;
}

const DashboardPath: FC<IDashboardPath> = ({ pathdata, active }) => {
  return (
    <div className={"flex flex-row gap-3"}>
      {pathdata.map((data, index) => {
        return (
          <div
            className={"flex flex-row gap-2 items-center text-neutral-700"}
            key={index}
          >
            <Link
              href={data?.link}
              className={cn(
                "cursor-pointer flex flex-row gap-2 items-center hover:text-primary-500 group",
                active
              )}
            >
              {data.Icon && (
                <data.Icon
                  className={
                    "group-hover:fill-primary-500 fill-neutral-700 w-4 h-4"
                  }
                />
              )}
              <p>{data.label}</p>
            </Link>
            {index < pathdata.length - 1 && <p className={"text-lg"}>/</p>}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardPath;
