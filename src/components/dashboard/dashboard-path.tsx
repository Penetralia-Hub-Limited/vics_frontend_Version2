import { FC, ReactElement } from "react";

interface IDashboardPath {
  pathdata: {
    Icon: ReactElement;
    label: string;
  }[];
}

const DashboardPath: FC<IDashboardPath> = ({ pathdata }) => {
  return (
    <div className={"flex flex-row gap-3"}>
      {pathdata.map((data, index) => {
        return (
          <div
            className={"flex flex-row gap-2 items-center text-neutral-700"}
            key={index}
          >
            {data.Icon}
            <p>{data.label}</p>
            {index < pathdata.length - 1 && <p className={"text-lg"}>/</p>}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardPath;
