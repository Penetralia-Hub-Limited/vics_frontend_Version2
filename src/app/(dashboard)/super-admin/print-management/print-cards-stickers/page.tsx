"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PrintSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { CardStatus, SelectCardStatus, SelectCardType } from "@/common/enum";
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "platenumber", title: "Plate Number" },
  { key: "cardowner", title: "Card Owner" },
  { key: "cardtype", title: "Card Type" },
  { key: "zonaloffice", title: "Zonal Office" },
  { key: "createdby", title: "Created By" },
  { key: "activationdate", title: "Activation Date" },
  { key: "expirydate", title: "Expiry Date" },
  { key: "cardstatus", title: "Card Status" },
];

const tableData = [
  {
    id: 1,
    platenumber: "JK",
    cardowner: "Private (Direct)",
    cardtype: "Akanbi S.",
    zonaloffice: "Lagos",
    createdby: "Mr Moe",
    activationdate: new Date(),
    expirydate: new Date(),
    cardstatus: CardStatus.PENDING,
  },
  {
    id: 2,
    platenumber: "JK",
    cardowner: "Private (Direct)",
    cardtype: "Akanbi S.",
    zonaloffice: "Lagos",
    createdby: "Mr Moe",
    activationdate: new Date(),
    expirydate: new Date(),
    cardstatus: CardStatus.PENDING,
  },
  {
    id: 3,
    platenumber: "JK",
    cardowner: "Private (Direct)",
    cardtype: "Akanbi S.",
    zonaloffice: "Lagos",
    createdby: "Mr Moe",
    activationdate: new Date(),
    expirydate: new Date(),
    cardstatus: CardStatus.PENDING,
  },
];

export default function Page() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [inputValues, setInputValues] = useState<{
    plateNumber: string;
    zonalOffice: string;
    cardType: string;
    cardStatus: string;
  }>({
    plateNumber: "",
    zonalOffice: "",
    cardType: "",
    cardStatus: "",
  });

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  interface TableRow {
    id: number;
    platenumber: string;
    cardowner: string;
    cardtype: string;
    zonaloffice: string;
    createdby: string;
    activationdate: Date;
    expirydate: Date;
    cardstatus: CardStatus;
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
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/super-admin/dashboard",
          },
          {
            label: "Print Management",
            Icon: PrintSVG,
            link: "/super-admin/print-management/print-cards-&-stickers",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 items-end"}>
          <DashboardCompSelect
            title={"Zonal Office"}
            placeholder={"-- Select Office --"}
            items={["abia", "lagos"]}
            selected={inputValues.zonalOffice}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                zonalOffice: selected ? String(selected) : "",
              }))
            }
          />
          <DashboardCompSelect
            title={"Card Status"}
            placeholder={"-- Select Status --"}
            items={[...Object.values(SelectCardStatus)]}
            selected={inputValues.cardStatus}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                cardStatus: selected ? String(selected) : "",
              }))
            }
          />

          <DashboardCompSelect
            title={"Card Type"}
            placeholder={"-- Select Type --"}
            items={[...Object.values(SelectCardType)]}
            selected={inputValues.cardType}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                cardType: selected ? String(selected) : "",
              }))
            }
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"}>
          <InputWithLabel
            items={{
              id: "plateNumber",
              label: "Plate Number",
              placeholder: "Plate Number",
              type: "text",
              htmlfor: "plateNumber",
            }}
            value={inputValues.plateNumber}
            onChange={(e) =>
              setInputValues((prev) => ({
                ...prev,
                plateNumber: e.target.value,
              }))
            }
          />
          <DatePicker
            date={startDate}
            setDate={setStartDate}
            title="Start Date"
          />
          <DatePicker date={endDate} setDate={setEndDate} title="End Date" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 items-end">
          <Button variant={"outline"}>Bulk Download</Button>
          <Button variant={"default"}>Print Item</Button>
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
