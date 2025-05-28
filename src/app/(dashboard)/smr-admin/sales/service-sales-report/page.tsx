"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, ReportSVG } from "@/common/svgs";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { formattedAmount } from "@/common/helpers";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  selectServiceTypeName,
  selectServices,
} from "@/store/service-type/service-selector";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Role, RegistrationType } from "@/common/enum";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "revenue_code", title: "Transaction Ref" },
  { key: "mla", title: "MLA" },
  // { key: "station", title: "Station" },
  { key: "created_by", title: "Buyer" },
  { key: "name", title: "Service Type" },
  { key: "reg_type", title: "Registration Type" },
  { key: "date_created", title: "Transaction Date" },
  { key: "service_price", title: "Amount" },
];

const inputInitialValues = {
  serviceType: "",
  regType: "",
  zoneoffice: "",
  mla: "",
  fromDate: undefined,
  toDate: undefined,
};

interface initialValuesProps {
  serviceType: string;
  regType: string;
  zoneoffice: string;
  mla: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
}

export default function Page() {
  const itemsPerPage = 10;
  const serviceTypesNames = useSelector(selectServiceTypeName);
  const mlaUsers = useSelector((state: RootState) => state.user.users);
  const filteredMLAs = mlaUsers
    .filter((user) => user.role === Role.MLA)
    .map((user) => `${user.firstname} ${user.lastname}`);
  const serviceTypes = useSelector(selectServices);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<initialValuesProps>(inputInitialValues);

  const totalAmount = serviceTypes.reduce((sum, item) => sum + item.amount, 0);

  const totalPages = Math.ceil(serviceTypes.length / itemsPerPage);
  const paginatedData = serviceTypes.slice(
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
            link: "/smr-admin/dashboard",
          },
          {
            label: "Service Sales Report",
            Icon: ReportSVG,
            link: "/smr-admin/sales/service-sales-report",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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

          <DashboardCompSelect
            title={"Zone Office"}
            placeholder={"-- Select Type --"}
            items={["ZONE1", "Zone2"]}
            selected={inputValues.zoneoffice}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                zoneoffice: selected ? String(selected) : "",
              }))
            }
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <DashboardCompSelect
            title={"MLA"}
            placeholder={"-- Select MLA --"}
            items={filteredMLAs}
            selected={inputValues.mla}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                mla: (selected as string) ?? "",
              }))
            }
          />

          <DatePicker
            date={inputValues.fromDate}
            setDate={(date) =>
              setInputValues((prev) => ({
                ...prev,
                fromDate: date as Date | undefined,
              }))
            }
            title={"From"}
          />

          <DatePicker
            date={inputValues.toDate}
            setDate={(date) =>
              setInputValues((prev) => ({
                ...prev,
                toDate: date as Date | undefined,
              }))
            }
            title={"To"}
          />

          <Button className={"flex flex-row gap-2"}>
            <p>Download Report</p>
            <ArrowDropDownIcon />
          </Button>
        </div>
      </CardContainer>

      <div className="flex flex-col gap-3 border border-primary-300 rounded-lg">
        <div className={"flex flex-row justify-between p-3"}>
          <p className={"text-sm"}>
            Total Service Sales:{" "}
            <span className={"font-semibold"}>{serviceTypes.length}</span>
          </p>
          <p className={"text-sm"}>
            Total Amount Sold:{" "}
            <span className={"font-semibold"}>
              {formattedAmount(totalAmount)}
            </span>
          </p>
        </div>
        <div>
          <DashboardTable headers={tableColumns} data={paginatedData} />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
