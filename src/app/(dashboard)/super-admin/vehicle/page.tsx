"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VehicleSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import Modal from "@/components/general/modal";
import { IDTaxPayerMeans } from "@/common/enum";
import { VehicleModalElements } from "@/components/dashboard/vehicle/vehicle-modal-element";
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";
import SuccessModal from "@/components/general/success-response";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "platenumber", title: "Number of Plates" },
  { key: "type", title: "Plate Type" },
  { key: "category", title: "Category" },
  { key: "chasisNo", title: "Chasis Number" },
  { key: "engineNo", title: "Engine Number" },
  { key: "vehiclemake", title: "Vehicle Make" },
  { key: "model", title: "Model" },
  { key: "year", title: "Year" },
];

const tableData = [
  {
    id: 1,
    platenumber: "ASKJA3",
    type: "Private (Direct)",
    category: "Vehicle Between 2.0 - 3.0",
    chasisNo: "JKJJJLWE232423",
    engineNo: "JK",
    vehiclemake: "JK343323",
    model: "JK343323",
    year: "2025",
  },
  {
    id: 2,
    platenumber: "ASKJA3",
    type: "Private (Direct)",
    category: "Vehicle Between 2.0 - 3.0",
    chasisNo: "JKJJJLWE232423",
    engineNo: "JK",
    vehiclemake: "JK343323",
    model: "JK343323",
    year: "2025",
  },
  {
    id: 3,
    platenumber: "ASKJA3",
    type: "Private (Direct)",
    category: "Vehicle Between 2.0 - 3.0",
    chasisNo: "JKJJJLWE232423",
    engineNo: "JK67235273",
    vehiclemake: "JK343323",
    model: "JK343323",
    year: "2025",
  },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [identificationMeans, setIdentificationMeans] =
    useState<IDTaxPayerMeans>(IDTaxPayerMeans.NIN);
  const [identificationInput, setIdentificationInput] = useState<{
    nin: string;
    phoneNumber: string;
  }>({
    nin: "",
    phoneNumber: "",
  });

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
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

  const validateModal = () => {
    return (
      <SuccessModal
        title={`${identificationMeans} Verified Successfully`}
        content={
          <div className={"flex flex-col gap-4 py-3"}>
            <div className={"grid grid-cols-[1fr_2fr]"}>
              <p>Name:</p>
              <p className={"font-semibold justify-self-end"}>Akan E</p>
            </div>
            <div className={"grid grid-cols-[1fr_2fr]"}>
              <p>Phone Number:</p>
              <p className={"font-semibold justify-self-end"}>
                {identificationInput.phoneNumber}
              </p>
            </div>
            <div className={"grid grid-cols-[1fr_2fr]"}>
              <p>Address:</p>
              <p className={"font-semibold justify-self-end"}>
                Omru Oran Ojo, Ibadan 2343423
              </p>
            </div>
          </div>
        }
        footerBtnText={"Continue"}
        btnText={"Validate Tax Payer"}
        trigger={() => {
          {
            router.push("/super-admin/vehicle/add-new-vehicle");
          }
        }}
      />
    );
  };

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
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
          footerBtn={validateModal()}
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
          />

          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title={"Start Date"}
          />
          <DatePicker date={endDate} setDate={setEndDate} title={"End Date"} />

          <Button>Search</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div className={"border-t-1 border-neutral-300 rounded-lg"}>
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
