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

  console.log("Identifier:", identifier, "Last Segment:", lastSegment);

  // Define different mappings for each identifier
  const pathMappings: Record<string, Record<string, string>> = {
    storeAdmin: {
      dashboard: "Store Dashboard",
      transactions: "Store Transactions",
      inventoryFinancing: "Store Inventory Financing",
      support: "Store Support",
      products: "Store Products", // Example dynamic route
    },
    mla: {
      dashboard: "MLA Dashboard",
      platenumberrequest: "Plate Number Request",
      invoice: "MLA Invoice",
      invoicerenewal: "MLA Invoice Renewal",
      sales: "Sales Dashboard",
    },
    smr: {
      dashboard: "SMR Home",
      security: "SMR Security",
      transactions: "SMR Transactions",
      financing: "SMR Financing",
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
      preview: "Vehicle Dashboard",
      platenumberrequest: "Plate Number Request",
      stockmanagement: "Stock Management",
      manageservices: "Configuration Dashboard",
      manageworkflow: "Configuration Dashboard",
      vehiclemakemodel: "Configuration Dashboard",
      salesassessment: "Assessment Dashboard",
      renewalassessment: "Assessment Dashboard",
      changerequest: "Change Request",
    },
  };

  // Get the display name based on identifier & lastSegment
  const getPathName = () =>
    pathMappings[identifier]?.[lastSegment] || "Dashboard";

  return { getPathName };
};

export default useGetPathName;
