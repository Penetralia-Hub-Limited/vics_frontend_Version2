"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { DashboardSVG, VehicleSVG } from "@/common/svgs";
import Pagination from "@/components/general/pagination";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { InformationCard } from "@/components/general/information-card";
import { selectVehicleDatafromID } from "@/store/vehicle/vehicle-selector";

const tableHeaders = [
  { key: "sid", title: "S/N" },
  { key: "payment_ref", title: "Payment Reference" },
  { key: "amount", title: "Amount" },
  { key: "payment_status", title: "Payment Status" },
];

export default function Page() {
  const params = useParams<{ vehicleid: string }>();
  const vehicleid = params.vehicleid;

  const vehicleData = useSelector((state) =>
    selectVehicleDatafromID(state, vehicleid)
  );

  const vehicle = vehicleData?.[0];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(vehicleData.length / itemsPerPage);

  const paginatedData = useMemo(
    () =>
      vehicleData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [vehicleData, currentPage]
  );

  if (!vehicle) {
    <p className="h-screen flex items-center justify-center text-center text-danger">
      Vehicle not found.
    </p>;
  }

  const userVehicleData = [
    {
      label: "Full Name",
      value: vehicle.owner_name ?? "Not Available",
    },
    {
      label: "Email",
      value: vehicle.owner?.email ?? "Not Available",
    },
    {
      label: "Phone Number",
      value: vehicle.owner?.phone ?? "Not Available",
    },
    {
      label: "Address",
      value: vehicle.owner?.address ?? "Not Available",
    },
  ];

  const vehicleInfo = [
    { label: "Chasis Number", value: vehicle.chasis_number ?? "N/A" },
    { label: "Engine Number", value: vehicle.engine_number ?? "N/A" },
    { label: "Vehicle Make", value: vehicle.make ?? "N/A" },
    { label: "Vehicle Model", value: vehicle.model ?? "N/A" },
    { label: "Vehicle Category", value: vehicle.category ?? "N/A" },
  ];

  return (
    <main className="flex flex-col gap-8 md:gap-12">
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Vehicle Dashboard",
            Icon: VehicleSVG,
            link: "/super-admin/vehicle",
          },
          {
            label: vehicle.make ?? "Unknown",
            Icon: VehicleSVG,
            link: `/super-admin/vehicle/${vehicleid}`,
          },
        ]}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <InformationCard title="Buyer Information" data={userVehicleData} />
        <InformationCard title="Vehicle Information" data={vehicleInfo} />
      </div>

      <div className="flex flex-col gap-3 border-1 border-primary-300 rounded-lg">
        <div className="border-t-1 border-primary-300 rounded-lg overflow-hidden">
          <DashboardTable headers={tableHeaders} data={paginatedData} />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
