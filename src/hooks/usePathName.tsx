import { usePathname } from "next/navigation";

const useGetPathName = (identifier: string) => {
  const pathName = usePathname();
  const segments = pathName?.split("/").filter(Boolean) || [];

  // Extract the last segment and normalize it (remove dashes and join words)
  const lastSegmentRaw =
    segments.length > 1 ? segments[segments.length - 1] : "dashboard";

  const normalizeSegment = (segment: string) => segment.split("-").join(""); // Remove dashes

  const lastSegment = normalizeSegment(lastSegmentRaw);

  console.log("Identifier:", identifier, "Last Segment:", lastSegment);

  // Define different mappings for each identifier
  const pathMappings: Record<string, Record<string, string>> = {
    storeAdmin: {
      dashboard: "Store dashboard",
      transactions: "Store Transactions",
      inventoryFinancing: "Store Inventory Financing",
      support: "Store Support",
    },
    mla: {
      dashboard: "MLA dashboard",
      platenumberrequest: "PLATE NUMBER REQUEST",
      invoice: "MLA invoice",
      invoicerenewal: "MLA invoice renewal",
      sales: "sales dashboard",
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
      reports: "System Reports",
      settings: "Admin Settings",
    },
  };

  // Get the display name based on identifier & lastSegment
  const getPathName = () => pathMappings[identifier]?.[lastSegment] || "Home";

  return { getPathName };
};

export default useGetPathName;
