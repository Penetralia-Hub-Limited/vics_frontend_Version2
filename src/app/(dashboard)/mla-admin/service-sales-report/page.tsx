"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import { DashboardSVG, ReportSVG } from "@/common/svgs";
import { formattedAmount } from "@/common/helpers";
import { RegistrationType } from "@/common/enum";
import { useSelector } from "react-redux";
import {
  selectServiceTypeName,
  selectServices,
} from "@/store/service-type/service-selector";
import { useMultiFileDownloader } from "@/hooks/userFileDownloader";

const plateNoReportHeader = [
  { title: "S/N", key: "sid" },
  { title: "Transaction Ref", key: "revenue_code" },
  { title: "MLA", key: "created_by" },
  // { title: "Station", key: "station" },
  { title: "Buyer", key: "" },
  { title: "Service Type", key: "vehicle_category" },
  { title: "Registration Type", key: "reg_type" },
  { title: "Transaction Date", key: "updated_at" },
  { title: "Amount", key: "service_price" },
];

const inputInitialValues = {
  serviceType: "",
  regType: "",
  startDate: undefined,
  endDate: undefined,
};

interface initialValuesProps {
  serviceType: string;
  regType: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export default function Page() {
  const printRef = useRef<HTMLDivElement>(null);
  const { downloadMultiple } = useMultiFileDownloader();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const serviceTypes = useSelector(selectServices);
  const serviceTypesNames = useSelector(selectServiceTypeName);
  const [inputValues, setInputValues] =
    useState<initialValuesProps>(inputInitialValues);

  // finding the total amount
  const totalAmount = serviceTypes.reduce((acc, sum) => acc + sum.price, 0);

  const totalPages = Math.ceil(serviceTypes.length / itemsPerPage);
  const paginatedData = serviceTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // creating service data to be downloaded in XLSX
  const xlsxData = serviceTypes.map((service) => {
    return {
      "S/N": service?.sid,
      "Transaction Ref": service?.revenue_code,
      MLA: service?.created_by,
      "Service Type": service?.vehicle_category,
      "Registration Type": service?.reg_type,
      "Transaction Date": new Date(service?.updated_at),
      Amount: service?.price,
    };
  });

  const handleDownloadAll = (type: "pdf" | "xlsx") => {
    switch (type) {
      case "pdf":
        return downloadMultiple([
          {
            ref: printRef as React.RefObject<HTMLDivElement>,
            filename: "invoice.pdf",
            type: "pdf",
          },
        ]);
      case "xlsx":
        return downloadMultiple([
          {
            data: xlsxData,
            filename: "payments.xlsx",
            type: "xlsx",
            sheetName: "Payments",
          },
        ]);
    }
  };

  return (
    <main className="flex flex-col gap-8 md:gap-12 py-4">
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/mla-admin/dashboard",
          },
          {
            label: "Service Sales Reports",
            Icon: ReportSVG,
            link: "/mla-admin/report",
          },
        ]}
      />

      {/* Search and Filter Section */}
      <CardContainer className={"flex flex-col gap-5"}>
        <form action="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <DashboardCompSelect
              title={"Service Type"}
              placeholder={"-- Select Service --"}
              items={serviceTypesNames}
              selected={inputValues.serviceType}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  serviceType: selected as string,
                }))
              }
            />

            <DashboardCompSelect
              title={"Registration Type"}
              placeholder={"-- Select Type --"}
              items={[...Object.values(RegistrationType)]}
              selected={inputValues.regType}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  regType: (selected as string) ?? "",
                }))
              }
            />
          </div>

          <div
            className={"grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 items-end"}
          >
            <DatePicker
              date={inputValues.startDate}
              setDate={(date) =>
                setInputValues((prev) => ({
                  ...prev,
                  startDate: date as Date | undefined,
                }))
              }
              title={"Start Date"}
            />

            <DatePicker
              date={inputValues.endDate}
              setDate={(date) =>
                setInputValues((prev) => ({
                  ...prev,
                  endDate: date as Date | undefined,
                }))
              }
              title={"End Date"}
            />

            <Button type="submit">Search</Button>
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button onClick={() => handleDownloadAll("pdf")} variant={"outline"}>
            PDF
          </Button>
          <Button onClick={() => handleDownloadAll("xlsx")} variant={"outline"}>
            XLSX
          </Button>
        </div>
      </CardContainer>

      {/* Table Section */}
      <div className="flex flex-col gap-3 border border-primary-300 rounded-lg">
        <div className={"flex flex-row justify-between p-3"}>
          <p className={"text-sm"}>
            Total Plate Number Sales:{" "}
            <span className={"font-semibold"}>{serviceTypes.length}</span>
          </p>
          <p className={"text-sm"}>
            Total Amount Sold:{" "}
            <span className={"font-semibold"}>
              {formattedAmount(isNaN(totalAmount) ? 0 : totalAmount)}
            </span>
          </p>
        </div>
        <div>
          <DashboardTable headers={plateNoReportHeader} data={paginatedData} />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
