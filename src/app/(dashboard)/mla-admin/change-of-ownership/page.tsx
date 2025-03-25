"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { Select } from "@/components/ui/select";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { format } from "date-fns";
import { useState } from "react";

export default function Page() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMM. d, yyyy | h:mmaaa");

  // Define table headers to match expected type
  const tableHeaders = [
    { title: "S/N" },
    { title: "Plate Number" },
    { title: "Plates Type" },
    { title: "Amount" },
    { title: "Approval Status" },
    { title: "Buyer" },
    { title: "Date Sold" },
    { title: "Payment Status" },
  ];

  // Adjusting table data structure to match the expected type
  const tableData = [
    {
      sn: 1,
      plateNumber: "ASA101JK",
      platesType: "Private (Direct)",
      amount: "₦ 43,500.00",
      approvalStatus: "Approved",
      buyer: "Akambi S.",
      dateSold: "Mar 4, 2025 | 09:32:44 AM",
      paymentStatus: "Paid",
    },
    {
      sn: 2,
      plateNumber: "MORO102RJ",
      platesType: "Commercial",
      amount: "₦ 43,500.00",
      approvalStatus: "Approved",
      buyer: "Sheik A.",
      dateSold: "Mar 4, 2025 | 09:32:44 AM",
      paymentStatus: "Paid",
    },
    {
      sn: 3,
      plateNumber: "EDU10MK",
      platesType: "Commercial Motorcycle",
      amount: "₦ 43,500.00",
      approvalStatus: "Approved",
      buyer: "Lola S.",
      dateSold: "Mar 4, 2025 | 09:32:44 AM",
      paymentStatus: "Paid",
    },
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Update this dynamically if needed

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        {/* Fixing DashboardPath prop structure */}
        <DashboardPath
          pathdata={[
            { Icon: <SpaceDashboardIcon />, label: "Dashboard", link: "/dashboard" },
            { Icon: <SpaceDashboardIcon />, label: "Change of Ownership", link: "/change-of-ownership" },
          ]}
        />
        <Button className="bg-green-700 text-white">Request New C-of-O</Button>
      </div>

      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input placeholder="Plate Number" />
          <Select>
            <option value="">-- Select Status --</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </Select>
          <Input placeholder="Invoice Number" />
          <div className="flex gap-2">
            <Input type="date" placeholder="From" />
            <Input type="date" placeholder="To" />
          </div>
          <Button className="w-full md:w-auto">Search</Button>
        </div>
      </CardContainer>

      {/* Table Component with Proper Props */}
      <DashboardTable headers={tableHeaders} data={tableData} />

      <div className="mt-4 flex justify-end">
        {/* Fixing Pagination Props */}
        <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>
    </main>
  );
}
