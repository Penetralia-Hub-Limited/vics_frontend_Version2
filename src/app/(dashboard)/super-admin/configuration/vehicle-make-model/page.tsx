"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ConfigurationSVG } from "@/common/svgs";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import InputWithLabel from "@/components/auth/input-comp";
import CardContainer from "@/components/general/card-container";
import Modal from "@/components/general/modal";
import {
  CreateVehiceMakeAndModel,
  CreatePlateRequestInitialValues,
  CreateVehiceMakeAndModelProps,
} from "@/components/dashboard/verification-forms/create-vehicle-make";
import { useSelector } from "react-redux";
import { selectVehicles } from "@/store/vehicle/vehicle-selector";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "make", title: "Vehicle Make" },
  { key: "model", title: "Vehicle Model" },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [vehicleMake, setVehicleMake] = useState<string>("");
  const [modalInput, setModalInput] = useState<CreateVehiceMakeAndModelProps>(
    CreatePlateRequestInitialValues
  );
  const vehiclesData = useSelector(selectVehicles);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleMake(e.target.value);
  };

  const totalPages = Math.ceil(vehiclesData.length / itemsPerPage);
  const paginatedData = vehiclesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  interface TableRow {
    id: number;
    endCode: string;
    type: string;
    createdBy: string;
    date: Date;
    initialQuantity: number;
    currentQuantity: number;
    assigned: number;
    sold: number;
  }

  interface RowAction {
    title: string;
    action: () => void;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "View",
        action: () => console.log("Viewing details for:", tableRow),
      },
    ];
  };

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
      <div
        className={
          "flex flex-col gap-5 md:flex-row justify-between items-center"
        }
      >
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: DashboardSVG,
              link: "/super-admin/dashboard",
            },
            {
              label: "Vehicle Make & Model",
              Icon: ConfigurationSVG,
              link: "/super-admin/configuration/vehicle-make-model",
            },
          ]}
        />

        <Modal
          title={"Create A New Vehicle Make and Model"}
          content={
            <CreateVehiceMakeAndModel
              input={modalInput}
              setInput={setModalInput}
            />
          }
          btnText={"Add new Vehicle Make"}
          footerBtn={<Button type="submit">Validate Plate Number</Button>}
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div
          className={
            "grid grid-cols-1 md:grid-cols-[2.1fr_0.9fr] gap-4 mt-4 items-end"
          }
        >
          <InputWithLabel
            items={{
              id: "vehiclemake",
              label: "Enter Vehicle Make",
              placeholder: "Enter Vehicle Make",
              type: "text",
              htmlfor: "vehiclemake",
            }}
            value={vehicleMake}
            onChange={handleChange}
          />

          <Button>Search</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
        >
          <DataTableWButton
            headers={tableColumns}
            data={paginatedData}
            rowActions={getRowActions}
          />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
