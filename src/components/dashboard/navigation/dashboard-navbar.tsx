import { FC } from "react";
import UserProfile from "./dashboard-userprofile";

interface IDashboardNavBar {
  title: string;
}

const DashboardNavBar: FC<IDashboardNavBar> = ({ title }) => {
  return (
    <div className={"flex flex-row items-center"}>
      <div>
        <div>
          <p>{title}</p>
        </div>
        <div>search bar</div>
      </div>

      <div>
        <UserProfile fullName={"David E"} role={""} />
      </div>
    </div>
  );
};

export default DashboardNavBar;
