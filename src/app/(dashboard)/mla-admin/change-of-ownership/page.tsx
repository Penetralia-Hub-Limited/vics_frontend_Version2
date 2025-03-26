"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { Select } from "@/components/ui/select";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { tableInvoices, tableHeaders } from "@/common/constant";
import { useState } from "react";

export default function Page() {
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(tableInvoices.length / itemsPerPage);
  const paginatedData = tableInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        {/* Fixing DashboardPath prop structure */}
        <DashboardPath
          pathdata={[
            {
              Icon: <SpaceDashboardIcon />,
              label: "Dashboard",
              link: "/dashboard",
            },
            {
              Icon: <SpaceDashboardIcon />,
              label: "Change of Ownership",
              link: "/change-of-ownership",
            },
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

      <div
        className={"border-t-1 border-neutral-300 rounded-lg overflow-hidden"}
      >
        <DashboardTable headers={tableHeaders} data={paginatedData} />
      </div>

      <div className="mt-4 flex justify-end">
        <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
      </div>
    </main>
  );
}
