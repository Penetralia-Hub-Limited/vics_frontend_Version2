"use client";

import { usePathname } from "next/navigation";

const useGetPathName = (identifier: string) => {
  const pathName = usePathname();
  const segments = pathName?.split("/").filter(Boolean) || [];

  // Extract the last meaningful segment (excluding dynamic IDs)
  let lastSegmentRaw =
    segments.length > 1 ? segments[segments.length - 1] : "dashboard";

  // Check if the last segment is likely dynamic (e.g., an ID)
  const isDynamic = /^[0-9a-fA-F]+$/.test(lastSegmentRaw); // Check if it's a number or hex ID
  if (isDynamic && segments.length > 1) {
    lastSegmentRaw = segments[segments.length - 2]; // Use the parent segment instead
  }

  // Normalize segment
  const normalizeSegment = (segment: string) => segment.split("-").join(""); // Remove dashes
  const lastSegment = normalizeSegment(lastSegmentRaw);

  // Define different mappings for each identifier
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
      sales: "Sales Dashboard",
      salespreview: "MLA Sales Dashboard",
    },
    smr: {
      dashboard: "SMR Dashboard",
      platenumberrequest: "Plate Number Request",
      servicesalesreport: "Service Sales Report",
      assessment: "Assessment Dashboard",
      report: "SMR Report dashboard",
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
      viewrequest: "Plate Number Request",
      stockmanagement: "Stock Management",
      manageservices: "Configuration Dashboard",
      manageworkflow: "Configuration Dashboard",
      vehiclemakemodel: "Configuration Dashboard",
      salesassessment: "Assessment Dashboard",
      renewalassessment: "Assessment Dashboard",
      taxpayerrequest: "Change Request",
      vehiclechangerequest: "Change Request",
      renewal: "Renewal dashboard",
      printcardsstickers: "Print Management",
      printdocument: "Print Management",
      vioapproval: "Payment Report",
      audittrial: "Audit trial",
      salesreport: "Sales Dashboard",
      salespreview: "Super admin sales dashboard",
    },
  };

  // Get the display name based on identifier & lastSegment
  const getPathName = () =>
    pathMappings[identifier]?.[lastSegment] || "Dashboard";

  return { getPathName };
};

export default useGetPathName;
