"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { RequestStatus, PlateNumberType, IssuanceStatus } from "@/common/enum";
import Modal from "@/components/general/modal";
import {
  CreatePlateRequestInitialValues,
  CreatePlateRequestProps,
  CreateNewPlatRequest,
} from "@/components/dashboard/verification-forms/Create-Plate-Request";
import { selectPlateNumberRequestTableData } from "@/store/plate-number-orders/plate-number-order-selector";
import { PlateNumberOrderService } from "@/services/PlateNumberOrdersService";
import { generateTrackingId } from "@/common/helpers";
import { selectStateIDFromStateName } from "@/store/states/state-selector";
import { toast } from "sonner";
import { ResponseModalX } from "@/components/general/response-modalx";

const tableColumns = [
  { key: "sid", title: "S/N" },
  { key: "tracking_id", title: "Tracking ID" },
  { key: "plate_number_type", title: "Plate Number Type" },
  { key: "total_number_requested", title: "No. of Plate Requested" },
  { key: "recommended_number", title: "No. of Plate Recommended" },
  { key: "number_assigned", title: "No. Assigned" },
  { key: "created_at", title: "Date" },
  { key: "recommender", title: "Recommending Officer" },
  { key: "approver", title: "First Approval Officer" },
  { key: "status", title: "Request Status Officer" },
  { key: "assignment_status", title: "Issuance Status" },
];

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const plateNumbertableData = useSelector(selectPlateNumberRequestTableData);
  const plateOrderService = new PlateNumberOrderService(dispatch);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<{
    trackingid: string;
    issuanceStatus: IssuanceStatus | undefined;
    plateNumberType: PlateNumberType | undefined;
    requestStatus: RequestStatus | undefined;
  }>({
    trackingid: "",
    issuanceStatus: undefined,
    plateNumberType: undefined,
    requestStatus: undefined,
  });
  const [modalInput, setModalInput] = useState<CreatePlateRequestProps>(
    CreatePlateRequestInitialValues
  );
  const state_id = useSelector((state) =>
    selectStateIDFromStateName(state, modalInput?.state)
  );

  const totalPages = Math.ceil(plateNumbertableData.length / itemsPerPage);
  const paginatedData = plateNumbertableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowActions = (row: unknown): RowAction[] => {
    console.log(row);
    return [
      {
        title: "View",
        action: () =>
          router.push("/mla-admin/plate-number-request/view-request"),
      },
    ];
  };

  const handleSubmit = async () => {
    try {
      const res = await plateOrderService.createPlateNumberOrder({
        tracking_id: generateTrackingId(),
        status: RequestStatus.PENDING,
        issuance_status: IssuanceStatus.UNASSIGNED,
        state_id: state_id,
        ...modalInput,
      });

      if (res.status) {
        console.log("Creating plate ", res);
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Failed:", error);
      toast(error as unknown as string);
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
              label: "Plate Number Request",
              Icon: VICSSVG,
              link: "/mla-admin/plate-number-request",
            },
          ]}
        />

        <Modal
          title={"Create New Plate Number Request"}
          content={
            <CreateNewPlatRequest input={modalInput} setInput={setModalInput} />
          }
          btnText={"Create New Request"}
          footerBtn={
            <Button onClick={handleSubmit} type="submit">
              Submit
            </Button>
          }
        />
      </div>

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
            title={"Issuance Status"}
            placeholder={"-- Select status --"}
            items={[...Object.values(IssuanceStatus)]}
            selected={inputValues.issuanceStatus}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                issuanceStatus: (selected as IssuanceStatus) ?? undefined,
              }))
            }
          />
        </div>

        <div className={"grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end"}>
          <DashboardCompSelect
            title={"Request Status"}
            placeholder={"-- Select status --"}
            items={[...Object.values(RequestStatus)]}
            selected={inputValues.requestStatus}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                requestStatus: (selected as RequestStatus) ?? undefined,
              }))
            }
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

      <ResponseModalX
        title={"Request Created Successfully"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={<>You have successfully created a new request</>}
        status={"success"}
        footerBtnText={"Done"}
        footerTrigger={
          () => {}
          // router.push("/mla-admin/plate-number-request/view-request")
        }
      />
    </main>
  );
}
