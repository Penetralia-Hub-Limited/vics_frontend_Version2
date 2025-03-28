import { ISideBarProps } from "@/common/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";

export const sidebarData: ISideBarProps[] = [
  {
    id: 1,
    groupName: "Main",
    navigation: [
      {
        id: 101,
        title: "Dashboard",
        url: "/dashboard",
        Icon: DashboardIcon,
      },
      {
        id: 102,
        title: "Renewals",
        url: "/dashboard/renewals",
        Icon: SettingsIcon,
        dropdown: [],
      },
    ],
  },
];
