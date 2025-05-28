"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { isWithinInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, RenewalsSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { ResponseModalX } from "@/components/general/response-modalx";
import { selectPlateNumber } from "@/store/plateNumber/plate-number-selector";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "number", title: "Plate Number" },
  { key: "type", title: "Plate Type" },
  { key: "amount", title: "Amount" },
  { key: "buyer", title: "Buyer" },
  { key: "created_at", title: "Date Sold" },
  { key: "number_status", title: "Payment Status" },
];

type inputValuesProp = {
  platenumber: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const inputInitialValues = {
  platenumber: "",
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const plateRenewalData = useSelector(selectPlateNumber);
  const [renewalData, setRenewalData] = useState(plateRenewalData);
  const { platenumber, startDate, endDate } = inputValues;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(platenumber)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setRenewalData(plateRenewalData);
      return;
    }

    const filteredData = _.filter(plateRenewalData, (plate) => {
      let matches = false;

      if (!_.isEmpty(_.trim(platenumber))) {
        matches =
          matches || _.toLower(plate?.number || "") === _.toLower(platenumber);
      }

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(
            new Date(plate.created_at ? plate?.created_at : ""),
            {
              start: new Date(startDate),
              end: new Date(endDate),
            }
          );
      }

      return matches;
    });

    setRenewalData(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(platenumber)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setRenewalData(plateRenewalData);
      return;
    }
  }, [plateRenewalData, startDate, endDate, platenumber]);

  const totalPages = Math.ceil(renewalData.length / itemsPerPage);
  const paginatedData = renewalData.slice(
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
          router.push("/super-admin/renewal/renew-plate-number")
        }
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <form
          onSubmit={handleSearch}
          className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}
        >
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
                platenumber: e.target.value,
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

          <Button type="submit">Search</Button>
        </form>
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
