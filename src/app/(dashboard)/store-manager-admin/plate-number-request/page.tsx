"use client";

import _ from "lodash";
import { useState, useEffect } from "react";
import { isWithinInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import { useSelector } from "react-redux";
import { PlateNumberType, InsuranceStatus, Role } from "@/common/enum";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import {
  RowAction,
  TableData,
} from "@/components/dashboard/dashboard-table-w-button";
import { selectPlateNumberRequestTableData } from "@/store/plate-number-orders/plate-number-order-selector";
import { RootState } from "@/store/store";

const tableHeaders = [
  { key: "sid", title: "S/N" },
  { key: "mla", title: "MLA" },
  // { key: "mlaStations", title: "MLA Stations" },
  { key: "tracking_id", title: "Tracking ID" },
  { key: "plate_number_type", title: "Plate Number Type" },
  { key: "total_number_requested", title: "No. of Plate Requested" },
  { key: "recommended_number", title: "No. of Plate Recommended" },
  { key: "number_assigned", title: "No. Assigned" },
  { key: "created_at", title: "Date Sold" },
  { key: "recommender", title: "Recommending Officer" },
  { key: "approver", title: "Final Approving Officer" },
  { key: "status", title: "Request Status" },
  { key: "insurance_status", title: "Insurance Status" },
];

type inputValuesProp = {
  trackingid: string;
  zoneoffice: string;
  mla: string;
  plateNumberType: PlateNumberType | undefined;
  insuranceStatus: InsuranceStatus | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

const inputInitialValues = {
  trackingid: "",
  zoneoffice: "",
  mla: "",
  plateNumberType: undefined,
  insuranceStatus: undefined,
  startDate: undefined,
  endDate: undefined,
};

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const mlaUsers = useSelector((state: RootState) => state.user.users);
  const filteredMLAs = mlaUsers
    .filter((user) => user.role === Role.MLA)
    .map((user) => `${user.firstname} ${user.lastname}`);
  const plateNumbertableData = useSelector(selectPlateNumberRequestTableData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValues, setInputValues] =
    useState<inputValuesProp>(inputInitialValues);
  const [plateNumberData, setPlateNumberData] = useState(plateNumbertableData);

  const {
    trackingid,
    zoneoffice,
    mla,
    plateNumberType,
    insuranceStatus,
    startDate,
    endDate,
  } = inputValues;
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      _.isEmpty(_.trim(trackingid)) &&
      _.isEmpty(_.trim(insuranceStatus)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(_.trim(zoneoffice)) &&
      _.isEmpty(_.trim(mla)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPlateNumberData(plateNumbertableData);
      return;
    }

    const filteredData = _.filter(plateNumbertableData, (plateData) => {
      let matches = false;

      if (!_.isEmpty(_.trim(trackingid))) {
        matches =
          matches ||
          _.toLower(plateData?.tracking_id || "") === _.toLower(trackingid);
      }

      if (!_.isEmpty(_.trim(insuranceStatus))) {
        matches =
          matches ||
          _.toLower(plateData?.insurance_status || "") ===
            _.toLower(insuranceStatus);
      }

      if (!_.isEmpty(_.trim(plateNumberType))) {
        matches =
          matches ||
          _.toLower(plateData?.plate_number_type || "") ===
            _.toLower(plateNumberType);
      }

      if (startDate && endDate) {
        matches =
          matches ||
          isWithinInterval(new Date(plateData?.created_at), {
            start: new Date(startDate),
            end: new Date(endDate),
          });
      }

      return matches;
    });

    setPlateNumberData(filteredData);
  };

  useEffect(() => {
    if (
      _.isEmpty(_.trim(trackingid)) &&
      _.isEmpty(_.trim(insuranceStatus)) &&
      _.isEmpty(_.trim(plateNumberType)) &&
      _.isEmpty(_.trim(zoneoffice)) &&
      _.isEmpty(_.trim(mla)) &&
      _.isEmpty(startDate) &&
      _.isEmpty(endDate)
    ) {
      setPlateNumberData(plateNumbertableData);
    }
  }, [
    plateNumbertableData,
    trackingid,
    startDate,
    insuranceStatus,
    plateNumberType,
    zoneoffice,
    mla,
    endDate,
  ]);

  const totalPages = Math.ceil(plateNumberData.length / itemsPerPage);
  const paginatedData = plateNumberData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as TableData;

    return [
      {
        title: "View Details",
        action: () =>
          router.push(
            `/store-manager-admin/plate-number-request/assign-plate-number?${tableRow}`
          ),
      },
    ];
  };

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Plate Number Request",
            Icon: VICSSVG,
            link: "/store-manager-admin/plate-number-request",
          },
        ]}
      />

      <form action="" onSubmit={handleSearch}>
        <CardContainer className={"flex flex-col gap-5"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <InputWithLabel
              items={{
                id: "trackingId",
                label: "Tracking ID",
                placeholder: "Enter Tracking ID",
                type: "text",
                htmlfor: "trackingId",
              }}
              value={inputValues.trackingid}
              onChange={(e) =>
                setInputValues((prev) => ({
                  ...prev,
                  trackingid: e.target.value,
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

            <DashboardCompSelect
              title={"MLA"}
              placeholder={"-- Select MLA --"}
              items={filteredMLAs}
              selected={inputValues.mla}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  mla: selected ? String(selected) : "",
                }))
              }
            />
          </div>

          <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 items-end"}>
            <DashboardCompSelect
              title={"Plate Number Type"}
              placeholder={"-- Select Type --"}
              items={[...Object.values(PlateNumberType)]}
              selected={inputValues.plateNumberType}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  plateNumberType: (selected as PlateNumberType) ?? undefined,
                }))
              }
            />

            <DashboardCompSelect
              title={"Insurance Status"}
              placeholder={"-- Select status --"}
              items={[...Object.values(InsuranceStatus)]}
              selected={inputValues.insuranceStatus}
              onSelect={(selected) =>
                setInputValues((prev) => ({
                  ...prev,
                  insuranceStatus: selected as InsuranceStatus | undefined,
                }))
              }
            />
          </div>

          <div
            className={
              "grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-4 items-end"
            }
          >
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

            <Button>Search Store</Button>
          </div>
        </CardContainer>
      </form>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
        >
          <DataTableWButton
            headers={tableHeaders}
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
