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
import ResponseModal from "@/components/general/response-modal";
import { useSelector } from "react-redux";
import { selectVehicles } from "@/store/vehicle/vehicle-selector";
import { VehicleData } from "@/store/vehicle/vehicle-type";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "platenumber", title: "Plate Number" },
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
  const [inputValues, setInputValues] = useState<{
    platenumber: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    platenumber: "",
    startDate: undefined,
    endDate: undefined,
  });

  const [identificationMeans, setIdentificationMeans] =
    useState<IDTaxPayerMeans>(IDTaxPayerMeans.NIN);
  const [identificationInput, setIdentificationInput] = useState<{
    nin: string;
    phoneNumber: string;
  }>({
    nin: "",
    phoneNumber: "",
  });
  const vehiclesData = useSelector(selectVehicles);

  const filterVehiclesData = (
    data: Array<VehicleData>,
    query: {
      plate_number?: string;
      start_date?: Date | null;
      end_date?: Date | null;
    }
  ): Array<VehicleData> => {
    return data.filter((item) => {
      const createdAt = new Date(item.created_at);

      const matchesPlate =
        !query.plate_number ||
        item.plate_number?.number
          ?.toLowerCase()
          .includes(query.plate_number.toLowerCase());

      const matchesStartDate =
        !query.start_date || createdAt >= new Date(query.start_date);

      const matchesEndDate =
        !query.end_date || createdAt <= new Date(query.end_date);

      return matchesPlate && matchesStartDate && matchesEndDate;
    });
  };

  const filteredData = filterVehiclesData(vehiclesData, {
    plate_number: inputValues.platenumber,
    start_date: inputValues.startDate ?? null,
    end_date: inputValues.endDate ?? null,
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
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
      <ResponseModal
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
            value={inputValues.platenumber}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                platenumber: e.target.value ?? "",
              }))
            }
          />

          <DatePicker
            title={"Start Date"}
            date={inputValues.startDate}
            setDate={(date) =>
              setInputValues((prev) => ({
                ...prev,
                startDate: date as Date | undefined,
              }))
            }
          />
          <DatePicker
            title={"End Date"}
            date={inputValues.endDate}
            setDate={(date) =>
              setInputValues((prev) => ({
                ...prev,
                endDate: date as Date | undefined,
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
    </main>
  );
}
