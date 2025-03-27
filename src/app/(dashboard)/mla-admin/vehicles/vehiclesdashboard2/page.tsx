import { useState } from "react";
import DashboardCompLayout from "@/components/dashboard/dashboard-layout";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/Pagination";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SearchFilters from "@/components/ui/SearchFilters";
import { Navigation } from "@toolpad/core/AppProvider";

const vehicleList = [
  { id: 1, plate: "ASA101JK", type: "Private (Direct)", category: "Vehicle between 2.0 - 3.0", chassis: "JKLMN1234567890", engine: "JKLMN1234", make: "Mercedes-Benz", model: "Mercedes E-400" },
  { id: 2, plate: "MORO102RJ", type: "Commercial", category: "Vehicle between 2.0 - 3.0", chassis: "JKLMN1234567890", engine: "JKLMN1234", make: "Mercedes-Benz", model: "Mercedes E-400" },
  { id: 3, plate: "EDU10MK", type: "Commercial Motorcycle", category: "Vehicle between 2.0 - 3.0", chassis: "JKLMN1234567890", engine: "JKLMN1234", make: "Mercedes-Benz", model: "Mercedes E-400" },
];

const SidebarItems: Navigation = [
  { title: "Dashboard", kind: "page", pattern: "/dashboard"},
  { title: "Vehicles", kind: "page", pattern: "/vehicles" }
];

export default function VehiclesDashboard() {
  const [page, setPage] = useState(1);

  return (
    <DashboardCompLayout title="MLA Vehicles Dashboard" sidebarItems={SidebarItems}>
      <div className="flex flex-col gap-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb links={[{ label: "Dashboard", href: "/dashboard" }, { label: "Vehicles Dashboard" }]} />

        {/* Search Filters */}
        <SearchFilters />

        {/* Add New Vehicle Button */}
        <div className="flex justify-end">
        <Button variant="default" className="bg-green-500 hover:bg-green-600 text-white">Add New Vehicle</Button>
        </div>

        {/* Vehicles Table */}
        <Table>
  <thead>
    <tr>
      {["S/N", "Plate Number", "Plates Type", "Category", "Chassis Number", "Engine Number", "Vehicle Make", "Model"].map((header, index) => (
        <th key={index} className="p-2 text-center font-bold">{header}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {vehicleList.map((vehicle, index) => (
      <tr key={vehicle.id} className="border-b">
        <td className="p-2 text-center">{index + 1}</td>
        <td className="p-2 text-center">{vehicle.plate}</td>
        <td className="p-2 text-center">{vehicle.type}</td>
        <td className="p-2 text-center">{vehicle.category}</td>
        <td className="p-2 text-center">{vehicle.chassis}</td>
        <td className="p-2 text-center">{vehicle.engine}</td>
        <td className="p-2 text-center">{vehicle.make}</td>
        <td className="p-2 text-center">{vehicle.model}</td>
      </tr>
    ))}
  </tbody>
</Table>


        {/* Pagination */}
        <Pagination currentPage={page} totalPages={30} onPageChange={setPage} />
      </div>
    </DashboardCompLayout>
  );
}
