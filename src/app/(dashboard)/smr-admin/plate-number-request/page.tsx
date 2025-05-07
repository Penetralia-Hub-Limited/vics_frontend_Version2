"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import {
  DataTableWButton,
  RowAction,
} from "@/components/dashboard/dashboard-table-w-button";
import {
  RecommendPlateNoRequest,
  RecommendPlateNoRequestProp,
  RecommendPlateNoRequestInitialValues,
} from "@/components/dashboard/verification-forms/recommend-and-update";
import {
  RequestStatus,
  InsuranceStatus,
  PlateNumberType,
  Role,
} from "@/common/enum";
import { ModalX } from "@/components/general/modalX";
import {
  selectPlateNumberRequestTableData,
  selectPlateNumberOrderFromID,
} from "@/store/plate-number-orders/plate-number-order-selector";
import { PlateNumberOrderData } from "@/store/plate-number-orders/plate-number-order-types";
import { PlateNumberOrderService } from "@/services/PlateNumberOrdersService";
import { toast } from "sonner";
import { RootState } from "@/store/store";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "mla", title: "MLA" },
  { key: "mla_station", title: "MLA Station" },
  { key: "tracking_id", title: "Tracking ID" },
  { key: "plate_number_type", title: "Plate Number Type" },
  { key: "total_number_requested", title: "No. of Plate Requested" },
  { key: "recommended_number", title: "No. of Plate Recommended" },
  { key: "number_assigned", title: "No. Assigned" },
  { key: "created_at", title: "Date" },
  { key: "recommender", title: "Recommending Officer" },
  { key: "approver", title: "Final Approving Officer" },
  { key: "status", title: "Request Status" },
  { key: "insurance_status", title: "Insurance Status" },
];

interface InputType {
  trackingid: string;
  insuranceStatus: InsuranceStatus | undefined;
  plateNumberType: PlateNumberType | undefined;
  requestStatus: RequestStatus | undefined;
  mla: string;
  zoneoffice: string;
}

const InputValues = {
  trackingid: "",
  plateNumberType: undefined,
  insuranceStatus: undefined,
  requestStatus: undefined,
  mla: "",
  zoneoffice: "",
};

export default function Page() {
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const plateOrderService = new PlateNumberOrderService(dispatch);
  const plateNumbertableData = useSelector(selectPlateNumberRequestTableData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<InputType>(InputValues);
  const [modalInput, setModalIinput] = useState<RecommendPlateNoRequestProp>(
    RecommendPlateNoRequestInitialValues
  );
  const [plateID, setPlateID] = useState<string>("");
  const singlePlateData = useSelector((plateState) =>
    selectPlateNumberOrderFromID(plateState, plateID)
  );
  const mlaUsers = useSelector((state: RootState) => state.user.users);
  const filteredMLAs = mlaUsers
    .filter((user) => user.role === Role.MLA)
    .map((user) => `${user.firstname} ${user.lastname}`);

  const totalPages = Math.ceil(plateNumbertableData.length / itemsPerPage);
  const paginatedData = plateNumbertableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (plateID)
      setModalIinput({
        mlaplaterequest: singlePlateData?.total_number_requested ?? 0,
        plateNumberType: singlePlateData?.type,
        availablePlateNumber: 400,
        plateQty: modalInput.plateQty,
      });
  }, [
    plateID,
    modalInput.plateQty,
    singlePlateData?.total_number_requested,
    singlePlateData?.type,
  ]);

  const handleUpdate = async (id: string, status: "approve" | "disapprove") => {
    const payload = {
      recommended_number:
        status === "approve" ? singlePlateData?.total_number_requested : 0,
    };

    try {
      const res = await plateOrderService.updatePlateNumberOrder(id, payload);

      if (res.status) setOpenModal(false);
    } catch (error) {
      if (error instanceof Error) {
        toast(`Error Recommending Plates. ${error.message}`);
      } else {
        toast("Error Recommending Plates. An unknown error occurred.");
      }
    }
  };

  const handleRecommend = async (id: string) => {
    const payload = {
      recommended_number: modalInput.plateQty,
    };

    try {
      const res = await plateOrderService.updatePlateNumberOrder(id, payload);

      if (res.status) setOpenModal(false);
    } catch (error) {
      if (error instanceof Error) {
        toast(`Error Recommending Plates. ${error.message}`);
      } else {
        toast("Error Recommending Plates. An unknown error occurred.");
      }
    }
  };

  const getRowActions = (row: unknown): RowAction[] => {
    const tableRow = row as PlateNumberOrderData & { sid: number };
    return [
      {
        title: "Approve",
        action: () => handleUpdate(tableRow?.id, "approve"),
        color: "text-success-500",
      },
      {
        title: "Recommend & Approve",
        action: () => {
          setOpenModal(true);
          setPlateID(tableRow?.id);
        },
      },
      {
        title: "Disapprove",
        action: () => handleUpdate(tableRow?.id, "disapprove"),
        color: "text-danger",
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
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Plate Number Request",
            Icon: VICSSVG,
            link: "/super-admin/plate-number-request",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputWithLabel
            items={{
              id: "trackingid",
              label: "Tracking ID",
              placeholder: "Tracking ID",
              type: "text",
              htmlfor: "trackingid",
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

        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 items-end"}>
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

          <DashboardCompSelect
            title={"Request Status"}
            placeholder={"-- Select status --"}
            items={[...Object.values(RequestStatus)]}
            selected={inputValues.requestStatus}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                requestStatus: selected as RequestStatus | undefined,
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

      <ModalX
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={
          <RecommendPlateNoRequest
            input={modalInput}
            setInput={setModalIinput}
          />
        }
        title={"Recommend and Update Plate Number Request"}
        footerBtn={
          <Button
            onClick={() => plateID && handleRecommend(plateID)}
            className="w-fit m-auto"
          >
            Recommend and Update
          </Button>
        }
      />
    </main>
  );
}
