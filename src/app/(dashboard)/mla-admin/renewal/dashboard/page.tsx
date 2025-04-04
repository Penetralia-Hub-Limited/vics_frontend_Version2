"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, RenewalsSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { PaymentStatus } from "@/common/enum";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import Modal from "@/components/general/modal";
import { VerifyPlateNumber } from "@/components/dashboard/mla-admin/renewals/verify-plate-number";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "platenumber", title: "Plate Number" },
  { key: "platetype", title: "Plate Type" },
  { key: "account", title: "Account" },
  { key: "buyer", title: "Buyer" },
  { key: "date", title: "Date Sold" },
  { key: "paymentstatus", title: "Payment Status" },
];

const tableData = [
  {
    id: 1,
    platenumber: "ASDSDLKE",
    platetype: "Private(Direct)",
    account: 902222222,
    buyer: "Askaair Dokk",
    date: new Date(),
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 2,
    platenumber: "ASDSDLKE",
    platetype: "Private(Direct)",
    account: 902222222,
    buyer: "Askaair Dokk",
    date: new Date(),
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 3,
    platenumber: "ASDSDLKE",
    platetype: "Private(Direct)",
    account: 902222222,
    buyer: "Askaair Dokk",
    date: new Date(),
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 4,
    platenumber: "ASDSDLKE",
    platetype: "Private(Direct)",
    account: 902222222,
    buyer: "Askaair Dokk",
    date: new Date(),
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 5,
    platenumber: "ASDSDLKE",
    platetype: "Private(Direct)",
    account: 902222222,
    buyer: "Askaair Dokk",
    date: new Date(),
    paymentstatus: PaymentStatus.NOTPAID,
  },
  {
    id: 6,
    platenumber: "ASDSDLKE",
    platetype: "Private(Direct)",
    account: 902222222,
    buyer: "Askaair Dokk",
    date: new Date(),
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 7,
    platenumber: "ASDSDLKE",
    platetype: "Private(Direct)",
    account: 902222222,
    buyer: "Askaair Dokk",
    date: new Date(),
    paymentstatus: PaymentStatus.PAID,
  },
  {
    id: 8,
    platenumber: "ASDSDLKE",
    platetype: "Private(Direct)",
    account: 902222222,
    buyer: "Askaair Dokk",
    date: new Date(),
    paymentstatus: PaymentStatus.NOTPAID,
  },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [plateNumber, setPlateNumber] = useState<string>("");

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  type TableData = {
    id: number;
    firstname: string;
    lastname: string;
    phonenumber: string;
    email: string;
    date: Date;
  };

  interface RowAction {
    title: string;
    action: () => void;
  }

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableData;
    return [
      {
        title: "Preview",
        action: () =>
          router.push("/super-admin/tax-payer/tax-payer-information"),
      },
      {
        title: "Edit",
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
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Renewal Dashboard",
              Icon: RenewalsSVG,
              link: "/store-manager-admin/tax-payer",
            },
          ]}
        />

        <Modal
          title={"New Plate Sales"}
          content={
            <VerifyPlateNumber
              plateNumber={plateNumber}
              setPlateNumber={setPlateNumber}
            />
          }
          btnText={"Renew Plate Number"}
          footerBtn={
            <Button
              onClick={() =>
                router.push("/mla-admin/renewal/renew-plate-number")
              }
              type={"submit"}
            >
              Verify Plate Number
            </Button>
          }
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <InputWithLabel
            items={{
              id: "plateNumber",
              label: "Plate Number",
              placeholder: "Plate number",
              type: "text",
              htmlfor: "plateNumber",
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
        <div
          className={"border-t-1 border-neutral-300 rounded-lg overflow-hidden"}
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
