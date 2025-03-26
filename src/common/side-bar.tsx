import {
  VICSSVG,
  PenSVG,
  ReportSVG,
  DashboardSVG,
  AssessmentSVG,
  ManagementSVG,
  VehicleSVG,
  TaxPayerSVG,
} from "./svgs";
import { ISideBarProps } from "./types";

export const plateNumber: Array<ISideBarProps> = [
  {
    id: 1,
    groupName: "Main",
    navigation: [
      {
        id: 1,
        title: "Dashboard",
        Icon: <DashboardSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: <VICSSVG />,
            url: "",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
    ],
  },
];

export const vehiceManagement: Array<ISideBarProps> = [
  {
    id: 1,
    groupName: "Vehicle",
    navigation: [
      {
        id: 1,
        title: "Vehicles",
        Icon: <VehicleSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Vehicles Sub",
            Icon: <VehicleSVG />,
            url: "",
          },
        ],
      },
      {
        id: 2,
        title: "Tax Payer",
        Icon: <TaxPayerSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Tax Payer Sub",
            Icon: <TaxPayerSVG />,
            url: "",
          },
        ],
      },
      {
        id: 3,
        title: "Renewal",
        Icon: <PenSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Renewal Sub",
            Icon: <PenSVG />,
            url: "",
          },
        ],
      },
      {
        id: 4,
        title: "Reports",
        Icon: <VICSSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Reports Sub",
            Icon: <VICSSVG />,
            url: "",
          },
        ],
      },
      {
        id: 5,
        title: "Change Request",
        Icon: <VICSSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Change Request Sub",

            Icon: <VICSSVG />,
            url: "",
          },
        ],
      },
      {
        id: 6,
        title: "Insurance",
        Icon: <VICSSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Insurance Sub",
            Icon: <VICSSVG />,
            url: "",
          },
        ],
      },
      {
        id: 7,
        title: "Proof of Ownership",
        Icon: <VICSSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Proof of Ownership Sub",
            Icon: <VICSSVG />,
            url: "",
          },
        ],
      },
      {
        id: 8,
        title: "Collections",

        Icon: <VICSSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Collections Sub",

            Icon: <VICSSVG />,
            url: "",
          },
        ],
      },
      {
        id: 9,
        title: "Legacy Assessments",

        Icon: <VICSSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Legacy Assessments Sub",

            Icon: <VICSSVG />,
            url: "",
          },
        ],
      },
      {
        id: 10,
        title: "Change of Ownership",

        Icon: <VICSSVG />,
        url: "",
        dropdown: [
          {
            id: 1,
            title: "Change of Ownership Sub",

            Icon: <VICSSVG />,
            url: "",
          },
        ],
      },
    ],
  },
];
