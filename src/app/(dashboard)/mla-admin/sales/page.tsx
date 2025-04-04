import { useState } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import DashboardTable from "@/components/dashboard/dashboard-table";
import Breadcrumb from "@/components/sales/SalesBreadcrumb";
import SearchFilters from "@/components/sales/SalesFilters";
import Pagination from "@/components/ui/Pagination";
import { Button } from "@/components/ui/button";
import { Navigation } from "@toolpad/core/AppProvider";

// Dummy Data (You can replace this with API data)
const salesData = [
  {
    id: 1,
    plateNumber: "ASA101JK",
    platesType: "Private (Direct)",
    amount: "₦ 43,500.00",
    buyer: "Akanbi S.",
    date: new Date("2025-03-04T09:32:44"),
    paymentStatus: "Not Paid",
  },
  {
    id: 2,
    plateNumber: "MORO102RJ",
    platesType: "Commercial",
    amount: "₦ 43,500.00",
    buyer: "Sheik A.",
    date: new Date("2025-03-04T09:32:44"),
    paymentStatus: "Paid",
  },
  {
    id: 3,
    plateNumber: "EDU10MK",
    platesType: "Commercial Motorcycle",
    amount: "₦ 43,500.00",
    buyer: "Lola S.",
    date: new Date("2025-03-04T09:32:44"),
    paymentStatus: "Not Paid",
  },
  {
    id: 4,
    plateNumber: "IFE108IB",
    platesType: "Private (Direct)",
    amount: "₦ 43,500.00",
    buyer: "Akanbi S.",
    date: new Date("2025-03-04T09:32:44"),
    paymentStatus: "Paid",
  },
  {
    id: 5,
    plateNumber: "ASA105JK",
    platesType: "Commercial",
    amount: "₦ 43,500.00",
    buyer: "Sheik A.",
    date: new Date("2025-03-04T09:32:44"),
    paymentStatus: "Not Paid",
  },
  {
    id: 6,
    plateNumber: "ASA106JK",
    platesType: "Commercial",
    amount: "₦ 43,500.00",
    buyer: "Lola S.",
    date: new Date("2025-03-04T09:32:44"),
    paymentStatus: "Paid",
  },
];

// Table Headers
const tableHeaders = [
  { title: "S/N", key: "id" },
  { title: "Plate Number", key: "plateNumber" },
  { title: "Plates Type", key: "platesType" },
  { title: "Amount", key: "amount" },
  { title: "Buyer", key: "buyer" },
  { title: "Date Sold", key: "date" },
  { title: "Payment Status", key: "paymentStatus" },
];

// Sidebar Navigation Items
const sidebarItems: Navigation = [
  { title: "Dashboard", kind: "page", pattern: "/dashboard" },
  { title: "Sales", kind: "page", pattern: "/sales" },
];

export default function SalesDashboard() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  return (
    <DashboardLayout title="MLA Sales Dashboard" sidebarItems={sidebarItems}>
      <div className="flex flex-col gap-6">
        {/* Breadcrumb */}
        <Breadcrumb
          links={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Sales Dashboard" },
          ]}
        />

        {/* Filters */}
        <SearchFilters />

        {/* New Sales Button */}
        <div className="flex justify-end">
          <Button variant="default" className="bg-green-700 hover:bg-green-800">
            New Sales
          </Button>
        </div>

        {/* Table */}
        <DashboardTable
          headers={tableHeaders}
          data={salesData}
          itemsPerPage={itemsPerPage}
        />

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={30}
          onPageChange={setPage}
        />
      </div>
    </DashboardLayout>
  );
}
