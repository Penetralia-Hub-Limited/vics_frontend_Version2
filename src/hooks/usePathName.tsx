"use client";

import { usePathname } from "next/navigation";

const fallbackNames: Record<string, string> = {
  mla: "MLA Dashboard",
  smr: "SMR Dashboard",
  storeAdmin: "Store Admin Dashboard",
  superAdmin: "Super Admin Dashboard",
};

const pathMappings: Record<string, Record<string, string>> = {
  storeAdmin: {
    dashboard: "Store Dashboard",
    platenumberrequest: "Plate Number Request",
    assignplatenumber: "Plate Number Request",
    stockmanagement: "Stock Management",
    report: "Store Report Dashboard",
    reports: "Vehicle Report Dashboard",
    changeofownership: "Change of Ownership",
  },
  mla: {
    dashboard: "MLA Dashboard",
    platenumberrequest: "Plate Number Request",
    invoice: "MLA Invoice",
    invoicerenewal: "MLA Invoice Renewal",
    reports: "Report Dashboard",
    taxpayerdashboard: "Tax Payer Dashboard",
    renewaldashboard: "Renewal Dashboard",
    sales: "MLA Sales Dashboard",
    salespreview: "MLA Sales Dashboard",
    salesdashboard: "MLA Sales Dashboard",
    drafts: "MLA Sales Dashboard",
  },
  smr: {
    dashboard: "SMR Dashboard",
    platenumberrequest: "Plate Number Request",
    servicesalesreport: "Service Sales Report",
    assessment: "Assessment Dashboard",
    report: "SMR Report Dashboard",
    changeofownership: "Change of Ownership",
  },
  superAdmin: {
    dashboard: "Super Admin Dashboard",
    users: "Manage Users",
    manageuserroles: "Admin User Dashboard",
    manageusers: "Admin User Dashboard",
    reports: "System Reports",
    settings: "Admin Settings",
    taxpayerinformation: "Tax Payer Information",
    taxpayer: "Tax Payer Dashboard",
    vehicle: "Vehicle Dashboard",
    vehiclepreview: "Vehicle Dashboard",
    addnewvehicle: "Vehicle Dashboard",
    platenumberrequest: "Plate Number Request",
    platenumbersales: "Plate Number Sales",
    viewrequest: "Plate Number Request",
    stockmanagement: "Stock Management",
    mlastockreport: "MLA Stock Report",
    manageservices: "Configuration Dashboard",
    manageworkflow: "Configuration Dashboard",
    vehiclemakemodel: "Configuration Dashboard",
    salesassessment: "Assessment Dashboard",
    renewalassessment: "Assessment Dashboard",
    taxpayerrequest: "Change Request",
    vehiclechangerequest: "Change Request",
    renewal: "Renewal Dashboard",
    printcardsstickers: "Print Management",
    printdocument: "Print Management",
    vioapproval: "Payment Report",
    audittrial: "Audit Trial",
    salesreport: "Sales Dashboard",
    salespreview: "Super Admin Sales Dashboard",
  },
};

const useGetPathName = (identifier: string) => {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];

  let lastSegment = segments[segments.length - 1] || "";
  const isDynamic = /^[0-9a-fA-F]+$/.test(lastSegment);

  if (isDynamic && segments.length > 1) {
    lastSegment = segments[segments.length - 2];
  }

  const normalizedSegment = lastSegment.replace(/-/g, "");

  const getPathName = () => {
    const mapped = pathMappings[identifier]?.[normalizedSegment];
    return mapped || fallbackNames[identifier] || "";
  };

  return { getPathName };
};

export default useGetPathName;
