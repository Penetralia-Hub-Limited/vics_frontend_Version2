import {
  VICSSVG,
  PenSVG,
  ReportSVG,
  DashboardSVG,
  AssessmentSVG,
  ManagementSVG,
} from "./svgs";
import { Navigation } from "@toolpad/core/AppProvider";

export const sideBarItems: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    segment: "Vehicles",
    icon: <DashboardSVG />,
    children: [
      {
        title: "Plate Number Requests",
        segment: "PlateNumberRequests",
        icon: <VICSSVG />,
      },
      {
        segment: "Assessment",
        title: "Assessment",
        icon: <AssessmentSVG />,
      },
      {
        segment: "Report",
        title: "Report",
        icon: <ReportSVG />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Store Management",
  },
  {
    title: "Stock Management",
    segment: "StockMangement",
    icon: <ManagementSVG />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Vehicle Management",
  },
  {
    title: "Reports",
    segment: "Reports",
    icon: <ReportSVG />,
    children: [
      {
        segment: "Report Sub",
        title: "Report Sub",
        icon: <ReportSVG />,
      },
    ],
  },
  {
    title: "Change of Ownership",
    segment: "ChangeofOwnership",
    icon: <PenSVG />,
    children: [
      {
        title: "Change of Ownership Sub",
        segment: "ChangeofOwnershipSub",
        icon: <PenSVG />,
      },
    ],
  },
];

export const storeManagersideBarItems: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    segment: "Vehicles",
    icon: <DashboardSVG />,
    children: [
      {
        title: "Plate Number Requests",
        segment: "PlateNumberRequests",
        icon: <VICSSVG />,
      },
      {
        segment: "Assessment",
        title: "Assessment",
        icon: <AssessmentSVG />,
      },
      {
        segment: "Report",
        title: "Report",
        icon: <ReportSVG />,
      },
    ],
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Store Management",
  },
  {
    title: "Stock Management",
    segment: "StockMangement",
    icon: <ManagementSVG />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Vehicle Management",
  },
  {
    title: "Reports",
    segment: "Reports",
    icon: <ReportSVG />,
    children: [
      {
        segment: "Report Sub",
        title: "Report Sub",
        icon: <ReportSVG />,
      },
    ],
  },
  {
    title: "Change of Ownership",
    segment: "ChangeofOwnership",
    icon: <PenSVG />,
    children: [
      {
        title: "Change of Ownership Sub",
        segment: "ChangeofOwnershipSub",
        icon: <PenSVG />,
      },
    ],
  },
];
