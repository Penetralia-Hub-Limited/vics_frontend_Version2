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
import DashboardTable from "@/components/dashboard/dashboard-table";
import { ResponseModalX } from "@/components/general/response-modalx";

const tableColumns = [
  { key: "id", title: "S/N" },
  { key: "platenumber", title: "Plate Number" },
  { key: "platetype", title: "Plate Type" },
  { key: "account", title: "Amount" },
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
  const [openModal, setOpenModal] = useState<boolean>(false);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
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

      <ResponseModalX
        title={"Plate Number Verified Successfully"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={<></>}
        status={"success"}
        footerBtnText={"Continue"}
        footerTrigger={() =>
          router.push("/mla-admin/renewal/renew-plate-number")
        }
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <InputWithLabel
            items={{
              id: "phonenumber",
              label: "Phone Number",
              placeholder: "phone number",
              type: "text",
              htmlfor: "phonenumber",
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
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable headers={tableColumns} data={paginatedData} />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
