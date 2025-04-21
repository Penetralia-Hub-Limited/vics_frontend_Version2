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
  ConfigurationSVG,
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
      },

      {
        id: 2,
        title: "Plate Number Requests",
        Icon: VICSSVG,
        url: "/super-admin/plate-number-request",
      },
      {
        id: 3,
        title: "Assessment",
        Icon: AssessmentSVG,
        dropdown: [
          {
            id: 1,
            title: "Sales Assessment",
            url: "/super-admin/assessment/sales-assessment",
          },
          {
            id: 2,
            title: "Renewal Assessment",
            url: "/super-admin/assessment/renewal-assessment",
          },
        ],
      },
      {
        id: 4,
        title: "Sales",
        Icon: SalesSVG,
        dropdown: [
          {
            id: 1,
            title: "Sales Report",
            url: "/super-admin/sales/sales-report",
          },
        ],
      },
      {
        id: 5,
        title: "Reports",
        Icon: ReportSVG,
        dropdown: [
          {
            id: 1,
            title: "Plate Number Sales",
            url: "/super-admin/report/plate-number-sales",
          },
          {
            id: 2,
            title: "Assigned Plate Numbers",
            url: "/super-admin/report/assigned-plate-number-report",
          },
          {
            id: 3,
            title: "MLA Stock",
            url: "/super-admin/report/mla-stock-report",
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
            title: "Manage Users",
            url: "/super-admin/user/manage-users",
          },
          {
            id: 2,
            title: "Manage Users Roles",
            url: "/super-admin/user/manage-user-roles",
          },
        ],
      },
      {
        id: 2,
        title: "Configuration",
        Icon: ConfigurationSVG,
        dropdown: [
          {
            id: 1,
            title: "Manage Service",
            url: "/super-admin/configuration/manage-services",
          },
          {
            id: 2,
            title: "Manage Workflow",
            url: "/super-admin/configuration/manage-workflow",
          },
          {
            id: 3,
            title: "Vehicle Make & Model",
            url: "/super-admin/configuration/vehicle-make-model",
          },
          { id: 4, title: "Invoice to Tax", url: "" },
        ],
      },
      {
        id: 3,
        title: "Stock Management",
        Icon: ManagementSVG,
        url: "/super-admin/stock-management",
      },
      {
        id: 4,
        title: "Audit Trial",
        Icon: AuditTrialSVG,
        url: "/super-admin/audit-trial",
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
        url: "/super-admin/vehicle",
      },
      {
        id: 2,
        title: "Tax Payer",
        Icon: TaxPayerSVG,
        url: "/super-admin/tax-payer",
        dropdown: [
          {
            id: 1,
            title: "Tax Payer Dashboard",
            Icon: VICSSVG,
            url: "/super-admin/tax-payer",
          },
          {
            id: 2,
            title: "Assessment",
            Icon: VICSSVG,
            url: "/super-admin/tax-payer/assessment",
          },
        ],
      },
      {
        id: 3,
        title: "Print Management",
        Icon: PrintSVG,
        dropdown: [
          {
            id: 1,
            title: "Print Cards & Stickers",
            url: "/super-admin/print-management/print-cards-stickers",
          },
          {
            id: 2,
            title: "Print Document",
            url: "/super-admin/print-management/print-document",
          },
        ],
      },
      {
        id: 4,
        title: "Renewals",
        Icon: RenewalsSVG,
        url: "/super-admin/renewal",
      },
      {
        id: 5,
        title: "Payment",
        Icon: PaymentSVG,
        dropdown: [
          {
            id: 1,
            title: "VIO Approval",
            url: "/super-admin/payment/vio-approval",
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
            title: "Tax Payer Change Request",
            url: "/super-admin/change-request/tax-payer-request",
          },
          {
            id: 2,
            title: "Vehicle Change Request",
            url: "/super-admin/change-request/vehicle-change-request",
          },
          {
            id: 3,
            title: "Check Payment Status",
            url: "/super-admin/change-request/check-payment-status",
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
        url: "/smr-admin/dashboard",
      },
      {
        id: 2,
        title: "Plate Number Requests",
        Icon: VICSSVG,
        url: "/smr-admin/plate-number-request",
      },
      {
        id: 3,
        title: "Assessment",
        Icon: AssessmentSVG,
        url: "/smr-admin/assessment",
      },
      {
        id: 4,
        title: "Reports",
        Icon: ReportSVG,
        url: "/smr-admin/report",
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
        url: "/smr-admin/sales/service-sales-report",
      },
      {
        id: 2,
        title: "Change of Ownership",
        Icon: PenSVG,
        url: "/smr-admin/change-of-ownership",
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
      },
      {
        id: 2,
        title: "Plate Number Requests",
        Icon: VICSSVG,
        url: "/mla-admin/plate-number-request",
      },
      {
        id: 3,
        title: "Sales",
        Icon: SalesSVG,
        dropdown: [
          {
            id: 1,
            title: "Sales Dashboard",
            url: "/mla-admin/sales/sales-dashboard",
          },
          {
            id: 2,
            title: "Drafts",
            url: "/mla-admin/sales/drafts",
          },
        ],
      },
      {
        id: 4,
        title: "Reports",
        Icon: ReportSVG,
        url: "/mla-admin/report",
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
        url: "/mla-admin/vehicles/dashboard",
      },
      {
        id: 2,
        title: "Tax Payer",
        Icon: TaxPayerSVG,
        url: "/mla-admin/tax-payer",
        dropdown: [
          {
            id: 1,
            title: "Tax Payer Dashboard",
            url: "/mla-admin/tax-payer/dashboard",
          },
          {
            id: 2,
            title: "Assessment",
            url: "/mla-admin/tax-payer/assessment",
          },
          {
            id: 3,
            title: "Invoice to Tax",
            url: "/mla-admin/tax-payer/invoice-to-tax",
          },
        ],
      },
      {
        id: 3,
        title: "Renewals",
        Icon: RenewalsSVG,
        url: "/mla-admin/renewal/renewal-dashboard",
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
      },
      {
        id: 6,
        title: "Insurance",
        Icon: InsuranceSVG,
        url: "/mla-admin/insurance",
      },
      {
        id: 7,
        title: "Proof of Ownership",
        Icon: OwnershipSVG,
        url: "/mla-admin/proof-of-ownership",
      },
      {
        id: 8,
        title: "Collections",
        Icon: CollectionsSVG,
        url: "/mla-admin/collections",
      },
      {
        id: 9,
        title: "Change of Ownership",
        Icon: PenSVG,
        url: "/mla-admin/change-of-ownership",
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
        url: "/store-manager-admin/dashboard",
      },
      {
        id: 2,
        title: "Plate Number Requests",
        Icon: VICSSVG,
        url: "/store-manager-admin/plate-number-request",
      },
      {
        id: 3,
        title: "Assessment",
        Icon: AssessmentSVG,
        url: "/store-manager-admin/assessment",
      },
      {
        id: 4,
        title: "Reports",
        Icon: ReportSVG,
        url: "/store-manager-admin/report",
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
        url: "/store-manager-admin/reports",
      },
      {
        id: 2,
        title: "Change of Ownership",
        Icon: PenSVG,
        url: "/store-manager-admin/change-of-ownership",
      },
    ],
  },
];
