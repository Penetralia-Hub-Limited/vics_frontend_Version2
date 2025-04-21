"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VehicleSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import Modal from "@/components/general/modal";
import { IDTaxPayerMeans } from "@/common/enum";
import { VehicleModalElements } from "@/components/dashboard/vehicle/vehicle-modal-element";
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";
import { useSelector } from "react-redux";
import { selectVehicles } from "@/store/vehicle/vehicle-selector";
import { selectValidUser } from "@/store/vehicle/vehicle-selector";
import { ResponseModalX } from "@/components/general/response-modalx";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "platenumber", title: "Number of Plates" },
  { key: "type", title: "Plate Type" },
  { key: "category", title: "Category" },
  { key: "chasis_number", title: "Chasis Number" },
  { key: "engine_number", title: "Engine Number" },
  { key: "make", title: "Vehicle Make" },
  { key: "model", title: "Model" },
  { key: "year", title: "Year" },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [identificationMeans, setIdentificationMeans] =
    useState<IDTaxPayerMeans>(IDTaxPayerMeans.NIN);
  const [identificationInput, setIdentificationInput] = useState<{
    nin: string;
    phoneNumber: string;
  }>({
    nin: "",
    phoneNumber: "",
  });
  const [input, setInput] = useState<{
    platenumber: string;
    chasisno: string;
    engineno: string;
  }>({
    platenumber: "",
    chasisno: "",
    engineno: "",
  });
  const vehiclesData = useSelector(selectVehicles);

  const doesUserExist = useSelector((vehicle) =>
    selectValidUser(vehicle, {
      phoneNumber: identificationInput.phoneNumber,
      nin: identificationInput.nin,
    })
  );

  const handleSubmit = () => {
    if (doesUserExist !== null) {
      setOpenModal(true);
    }
  };

  const totalPages = Math.ceil(vehiclesData.length / itemsPerPage);
  const paginatedData = vehiclesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  interface TableRow {
    id: number;
    platenumber: string;
    type: string;
    category: string;
    chasisNo: string;
    engineNo: string;
    vehiclemake: string;
    model: string;
    year: string;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableRow;
    return [
      {
        title: "View Details",
        action: () => {
          router.push(`/super-admin/vehicle/vehicle-preview/${tableRow.id}`);
        },
      },
    ];
  };

  return (
    <main className={"flex flex-col gap-8 md:gap-12 min-h-screen"}>
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
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Vehicle Dashboard",
              Icon: VehicleSVG,
              link: "/store-manager-admin/stock-management",
            },
          ]}
        />

        <Modal
          title={"Add New Vehicle"}
          content={
            <VehicleModalElements
              selected={identificationMeans}
              onSelect={setIdentificationMeans}
              input={identificationInput}
              setInput={setIdentificationInput}
            />
          }
          btnText={"Add New Vehicle"}
          footerBtn={
            <Button onClick={handleSubmit} type="submit">
              Validate Tax Payer
            </Button>
          }
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "platenumber",
              label: "Plate Number",
              placeholder: "Plate Number",
              type: "text",
              htmlfor: "platenumber",
            }}
            value={input.platenumber}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                platenumber: e.target.value,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "chasisno",
              label: "Chasis Number",
              placeholder: "Chasis Number",
              type: "text",
              htmlfor: "chasisno",
            }}
            value={input.chasisno}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                chasisno: e.target.value,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "engineno",
              label: "Engine Number",
              placeholder: "Engine Number",
              type: "text",
              htmlfor: "engineno",
            }}
            value={input.engineno}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                engineno: e.target.value,
              }))
            }
          />

          <Button>Search</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div className={"border-t-1 border-primary-300 rounded-lg"}>
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

      <ResponseModalX
        title={"User Verified Successfully"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={
          <div className="flex flex-col gap-4 py-5">
            <div className={"grid grid-cols-[1fr_2fr]"}>
              <p className={"text-sm"}>Name:</p>
              <p className={"text-sm font-semibold justify-self-end"}>
                {doesUserExist?.owner?.firstname}{" "}
                {doesUserExist?.owner?.lastname}
              </p>
            </div>
            <div className={"grid grid-cols-[1fr_2fr]"}>
              <p className={"text-sm"}>Phone Number: </p>
              <p className={"text-sm font-semibold justify-self-end"}>
                {doesUserExist?.owner?.phone}
              </p>
            </div>
            <div className={"grid grid-cols-[1fr_2fr]"}>
              <p className={"text-sm"}>Address:</p>
              <p className={"text-sm font-semibold justify-self-end ml-auto"}>
                {doesUserExist?.owner?.address}
              </p>
            </div>
          </div>
        }
        status={"success"}
        footerBtnText={"Continue"}
        footerTrigger={() => router.push("/mla-admin/vehicles/new-vehicle")}
      />
    </main>
  );
}
