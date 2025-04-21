"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, RenewalsSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardTable from "@/components/dashboard/dashboard-table";
import Modal from "@/components/general/modal";
import { VerifyPlateNumber } from "@/components/dashboard/verification-forms/verify-plate-number";
import { ResponseModalX } from "@/components/general/response-modalx";
import {
  selectValidPlateNumber,
  selectPlateNumber,
} from "@/store/plateNumber/plate-number-selector";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "number", title: "Plate Number" },
  { key: "type", title: "Plate Type" },
  { key: "amount", title: "Amount" },
  { key: "buyer", title: "Buyer" },
  { key: "created_at", title: "Date Sold" },
  { key: "number_status", title: "Payment Status" },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const isPlateNumberValid = useSelector((plateNumberReducer) =>
    selectValidPlateNumber(plateNumberReducer, plateNumber)
  );
  const plateRenewalData = useSelector(selectPlateNumber);

  const totalPages = Math.ceil(plateRenewalData.length / itemsPerPage);
  const paginatedData = plateRenewalData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(isPlateNumberValid);

  const handleSubmit = () => {
    if (isPlateNumberValid) {
      setOpenModal(true);
    }
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
              link: "/mla-admin/dashboard",
            },
            {
              label: "Renewal Dashboard",
              Icon: RenewalsSVG,
              link: "/mla-admin/tax-payer",
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
            <Button onClick={handleSubmit} type={"submit"}>
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
