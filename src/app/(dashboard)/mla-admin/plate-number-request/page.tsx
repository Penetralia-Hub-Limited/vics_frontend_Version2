"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { Select } from "@/components/ui/select"; // FIXED IMPORT
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DashboardTable from "@/components/dashboard/dashboard-table";

const tableHeader = [
  { title: "S/N" },
  { title: "Tracking ID" },
  { title: "Plate Number Type" },
  { title: "No. of Plate Requested" },
  { title: "No. of Plate Recommended" },
  { title: "No. Assigned" },
  { title: "Date" },
  { title: "Recommending Officer" },
];

const tableData = [
  {
    lga: "Kwara State",
    range: "FNR-202503044323",
    endcode: "Private (Direct)",
    type: "Vehicle",
    createdby: "Akanbi S.",
    Date: new Date("2025-03-04T09:32:44"),
    initialQty: 12,
    currentQty: 0,
  },
  {
    lga: "Kwara State",
    range: "FNR-202503044324",
    endcode: "Commercial",
    type: "Vehicle",
    createdby: "Sheik A.",
    Date: new Date("2025-03-04T09:32:44"),
    initialQty: 5,
    currentQty: 0,
  },
];

export default function Page() {
  return (
    <main className="flex flex-col gap-8 md:gap-12 py-4">
      {/* Page Breadcrumb Navigation */}
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
          },
          {
            label: "Plate Number Request",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
          },
        ]}
      />

      {/* Search and Filter Section */}
      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Input placeholder="Tracking ID" />
          <Select>
            <option value="" disabled selected>
              Plate Number Type
            </option>
            <option value="Private">Private</option>
            <option value="Commercial">Commercial</option>
            <option value="Motorcycle">Motorcycle</option>
          </Select>
          <Select>
            <option value="" disabled selected>
              Insurance Status
            </option>
            <option value="Valid">Valid</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
          </Select>
          <Select>
            <option value="" disabled selected>
              Request Status
            </option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </Select>
          <Input type="date" placeholder="Start Date" />
          <Input type="date" placeholder="End Date" />
        </div>
        <div className="flex justify-end mt-4">
          <Button>Search</Button>
        </div>
      </CardContainer>

      {/* Table Section */}
      <div className="flex flex-col gap-3 border border-neutral-300 rounded-lg">
        <div className="border-t border-neutral-300 rounded-lg overflow-hidden">
          <DashboardTable header={tableHeader} data={tableData} />
        </div>
        <div className="p-5 ml-auto">
          <Pagination />
        </div>
      </div>
    </main>
  );
}
