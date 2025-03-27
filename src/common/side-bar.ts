import {
  VICSSVG,
  PenSVG,
  ReportSVG,
  DashboardSVG,
  AssessmentSVG,
  ManagementSVG,
  VehicleSVG,
  TaxPayerSVG,
  SalesSVG,
  RenewalsSVG,
  AuditTrialSVG,
  UsersSVG,
  PaymentSVG,
  PrintSVG,
  InsuranceSVG,
  OwnershipSVG,
  CollectionsSVG,
} from "./svgs";
import { ISideBarProps } from "./types";

export const mainDashboardSideBarItems: Array<ISideBarProps> = [
  {
    id: 1,
    groupName: "Main",
    navigation: [
      {
        id: 1,
        title: "Dashboard",
        Icon: DashboardSVG,
        url: "mladashboard",
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: VICSSVG,
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
        Icon: VehicleSVG,
        url: "/mla-admin/vehicles",
        dropdown: [
          {
            id: 1,
            title: "Vehicles Sub",
            Icon: VehicleSVG,
          },
        ],
      },
      {
        id: 2,
        title: "Tax Payer",
        Icon: TaxPayerSVG,
        url: "/mla-admin/tax-payer",
        dropdown: [
          {
            id: 1,
            title: "Tax Payer Sub",
            Icon: TaxPayerSVG,
          },
        ],
      },
      {
        id: 3,
        title: "Renewals",
        Icon: RenewalsSVG,
        url: "/mla-admin/renewals",
        dropdown: [
          {
            id: 1,
            title: "Renewal Sub",
            Icon: PenSVG,
          },
        ],
      },
      {
        id: 4,
        title: "Reports",
        Icon: ReportSVG,
        url: "/mla-admin/reports",
        dropdown: [
          {
            id: 1,
            title: "Reports Sub",
            Icon: ReportSVG,
          },
        ],
      },
      {
        id: 5,
        title: "Change Request",
        Icon: PenSVG,
        url: "/mla-admin/change-request",
        dropdown: [
          {
            id: 1,
            title: "Change Request Sub",
            Icon: PenSVG,
          },
        ],
      },
      {
        id: 6,
        title: "Insurance",
        Icon: InsuranceSVG,
        url: "/mla-admin/insurance",
        dropdown: [
          {
            id: 1,
            title: "Insurance Sub",
            Icon: InsuranceSVG,
          },
        ],
      },
      {
        id: 7,
        title: "Proof of Ownership",
        Icon: OwnershipSVG,
        url: "/mla-admin/proof-of-ownership",
        dropdown: [
          {
            id: 1,
            title: "Proof of Ownership Sub",
            Icon: OwnershipSVG,
          },
        ],
      },
      {
        id: 8,
        title: "Collections",
        Icon: CollectionsSVG,
        url: "/mla-admin/collections",
        dropdown: [
          {
            id: 1,
            title: "Collections Sub",
            Icon: CollectionsSVG,
          },
        ],
      },
      {
        id: 9,
        title: "Change of Ownership",
        Icon: PenSVG,
        url: "/mla-admin/change-of-ownership",
        dropdown: [
          {
            id: 1,
            title: "Change of Ownership Sub",
            Icon: PenSVG,
            url: "",
          },
        ],
      },
    ],
  },
];

export const superAdminSidebar = [
  {
    id: 1,
    groupName: "Main",
    navigation: [
      {
        id: 1,
        title: "Dashboard",
        Icon: DashboardSVG,
        url: "/super-admin/dashboard",
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: VICSSVG,
            url: "/super-admin/dashboard/plate-number-request",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
          {
            id: 2,
            title: "Assessment",
            Icon: AssessmentSVG,
            url: "/super-admin/dashboard/assessment",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
          {
            id: 3,
            title: "Sales",
            Icon: SalesSVG,
            url: "/super-admin/dashboard/sales",
            dropdown: [
              { id: 1, title: "Sales Report", url: "" },
              { id: 2, title: "New Plate Sales", url: "" },
            ],
          },
          {
            id: 4,
            title: "Reports",
            Icon: ReportSVG,
            url: "/super-admin/dashboard/report",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    groupName: "Admin",
    navigation: [
      {
        id: 1,
        title: "Users",
        Icon: UsersSVG,
        url: "/super-admin/dashboard",
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: VICSSVG,
            url: "/super-admin/dashboard/plate-number-request",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Configuration",
        Icon: DashboardSVG,
        url: "/super-admin/dashboard",
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: VICSSVG,
            url: "/super-admin/dashboard/plate-number-request",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Stock Management",
        Icon: ManagementSVG,
        url: "/super-admin/dashboard",
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: VICSSVG,
            url: "/super-admin/dashboard/plate-number-request",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Audit Trail",
        Icon: AuditTrialSVG,
        url: "/super-admin/dashboard",
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: VICSSVG,
            url: "/super-admin/dashboard/plate-number-request",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    groupName: "Vehicle Management",
    navigation: [
      {
        id: 1,
        title: "Vehicles",
        Icon: VehicleSVG,
        url: "/super-admin/vehicles",
        dropdown: [
          {
            id: 1,
            title: "Vehicles Sub",
            Icon: VehicleSVG,
            url: "/super-admin/*",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Tax Payer",
        Icon: TaxPayerSVG,
        url: "/super-admin/tax-payer",
        dropdown: [
          {
            id: 1,
            title: "Tax Payer Sub",
            Icon: VICSSVG,
            url: "/super-admin/dashboard/plate-number-request",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Print Management",
        Icon: PrintSVG,
        url: "/super-admin/print-management",
        dropdown: [
          {
            id: 1,
            title: "Print-management",
            Icon: VICSSVG,
            url: "/super-admin/dashboard/plate-number-request",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Renewals",
        Icon: RenewalsSVG,
        url: "/super-admin/renewals",
        dropdown: [
          {
            id: 1,
            title: "Renewals Sub",
            Icon: VICSSVG,
            url: "/super-admin/renewals",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Payment",
        Icon: PaymentSVG,
        url: "/super-admin/payment",
        dropdown: [
          {
            id: 1,
            title: "Renewals Sub",
            Icon: VICSSVG,
            url: "/super-admin/renewals",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Change Request",
        Icon: PenSVG,
        url: "/super-admin/change-request",
        dropdown: [
          {
            id: 1,
            title: "Change Request Sub",
            Icon: VICSSVG,
            url: "/super-admin/renewals",
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

export const SMRAdminSidebar = [
  {
    id: 1,
    groupName: "Main",
    navigation: [
      {
        id: 1,
        title: "Dashboard",
        Icon: DashboardSVG,
        url: "/super-admin/dashboard",
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: VICSSVG,
            url: "/super-admin/dashboard/plate-number-request",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
          {
            id: 2,
            title: "Assessment",
            Icon: AssessmentSVG,
            url: "/super-admin/dashboard/assessment",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
          {
            id: 3,
            title: "Sales",
            Icon: SalesSVG,
            url: "/super-admin/dashboard/sales",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
          {
            id: 4,
            title: "Reports",
            Icon: ReportSVG,
            url: "/super-admin/dashboard/report",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    groupName: "Vehicle Management",
    navigation: [
      {
        id: 1,
        title: "Reports",
        Icon: ReportSVG,
        url: "/smr-admin/reports",
        dropdown: [
          {
            id: 1,
            title: "Vehicles Sub",
            Icon: ReportSVG,
            url: "/super-admin/*",
            dropdown: [
              { id: 1, title: "Requests", url: "" },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Change of Ownership",
        Icon: PenSVG,
        url: "/smr-admin/change-of-ownership",
        dropdown: [
          {
            id: 1,
            title: "Change sub",
            Icon: PenSVG,
            url: "/super-admin/dashboard/plate-number-request",
          },
        ],
      },
    ],
  },
];

export const mlaSideBarItems = [
  {
    id: 1,
    groupName: "Main",
    navigation: [
      {
        id: 1,
        title: "Dashboard",
        Icon: DashboardSVG,
        url: "mla-admin/dashboard",
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: VICSSVG,
            url: "mla-admin/dashboard/plate-number-request",
            dropdown: [
              {
                id: 1,
                title: "Requests",
                url: "dashboard/plate-number-request",
              },
              { id: 2, title: "Assigned Plate Numbers", url: "" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    groupName: "Vehicle",
    navigation: [
      {
        id: 1,
        title: "Vehicles",
        Icon: VehicleSVG,
        url: "mla-admin/vehicles",
        dropdown: [
          {
            id: 1,
            title: "Vehicles Sub",
            Icon: VehicleSVG,
          },
        ],
      },
      {
        id: 2,
        title: "Tax Payer",
        Icon: TaxPayerSVG,
        url: "/mla-admin/tax-payer",
        dropdown: [
          {
            id: 1,
            title: "Tax Payer Sub",
            Icon: TaxPayerSVG,
          },
        ],
      },
      {
        id: 3,
        title: "Renewals",
        Icon: RenewalsSVG,
        url: "/mla-admin/renewals",
        dropdown: [
          {
            id: 1,
            title: "Renewal Sub",
            Icon: PenSVG,
          },
        ],
      },
      {
        id: 4,
        title: "Reports",
        Icon: ReportSVG,
        url: "/mla-admin/reports",
        dropdown: [
          {
            id: 1,
            title: "Reports Sub",
            Icon: ReportSVG,
          },
        ],
      },
      {
        id: 5,
        title: "Change Request",
        Icon: PenSVG,
        url: "/mla-admin/change-request",
        dropdown: [
          {
            id: 1,
            title: "Change Request Sub",
            Icon: PenSVG,
          },
        ],
      },
      {
        id: 6,
        title: "Insurance",
        Icon: InsuranceSVG,
        url: "/mla-admin/insurance",
        dropdown: [
          {
            id: 1,
            title: "Insurance Sub",
            Icon: InsuranceSVG,
          },
        ],
      },
      {
        id: 7,
        title: "Proof of Ownership",
        Icon: OwnershipSVG,
        url: "/mla-admin/proof-of-ownership",
        dropdown: [
          {
            id: 1,
            title: "Proof of Ownership Sub",
            Icon: OwnershipSVG,
          },
        ],
      },
      {
        id: 8,
        title: "Collections",
        Icon: CollectionsSVG,
        url: "/mla-admin/collections",
        dropdown: [
          {
            id: 1,
            title: "Collections Sub",
            Icon: CollectionsSVG,
          },
        ],
      },
      {
        id: 9,
        title: "Change of Ownership",
        Icon: PenSVG,
        url: "/mla-admin/change-of-ownership",
        dropdown: [
          {
            id: 1,
            title: "Change of Ownership Sub",
            Icon: PenSVG,
            url: "",
          },
        ],
      },
    ],
  },
];

export const storeManagerSidebarItems = [
  {
    id: 1,
    groupName: "Main",
    navigation: [
      {
        id: 1,
        title: "Dashboard",
        Icon: DashboardSVG,
        dropdown: [
          {
            id: 1,
            title: "Plate Number Requests",
            Icon: VICSSVG,
            dropdown: [
              {
                id: 1,
                title: "Requests",
                url: "/store-manager-admin/dashboard/plate-number-request",
              },
              {
                id: 2,
                title: "Assign Plate Number",
                url: "/store-manager-admin/dashboard/plate-number-request/assign-plate-number",
              },
            ],
          },
          {
            id: 2,
            title: "Assessment",
            Icon: AssessmentSVG,
            dropdown: [
              {
                id: 1,
                title: "Assessment",
                url: "/store-manager-admin/dashboard/assessment",
              },
            ],
          },
          {
            id: 3,
            title: "Reports",
            Icon: ReportSVG,
            dropdown: [
              {
                id: 1,
                title: "Report",
                url: "/store-manager-admin/dashboard/report",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    groupName: "Store Management",
    navigation: [
      {
        id: 1,
        title: "Stock Management",
        Icon: ManagementSVG,
        url: "/store-manager-admin/stock-management",
      },
    ],
  },
  {
    id: 3,
    groupName: "Vehicle Management",
    navigation: [
      {
        id: 1,
        title: "Reports",
        Icon: ReportSVG,
        dropdown: [
          {
            id: 1,
            title: "Report Sub",
            Icon: ReportSVG,
            url: "/store-manager-admin/reports",
          },
        ],
      },
      {
        id: 2,
        title: "Change of Ownership",
        Icon: PenSVG,
        dropdown: [
          {
            id: 1,
            title: "Change of Ownership Sub",
            Icon: PenSVG,
            url: "/store-manager-admin/change-of-ownership",
          },
        ],
      },
    ],
  },
];
