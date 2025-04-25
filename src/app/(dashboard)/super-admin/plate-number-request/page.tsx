"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, VICSSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import Modal from "@/components/general/modal";
import { useSelector, useDispatch } from "react-redux";
import { DataTableWButton } from "@/components/dashboard/dashboard-table-w-button";
import { RowAction } from "@/components/dashboard/dashboard-table-w-button";
import { InsuranceStatus, RequestStatus, PlateNumberType } from "@/common/enum";
import { selectPlateNumberRequestTableData } from "@/store/plate-number-orders/plate-number-order-selector";
import {
  CreatePlateRequestInitialValues,
  CreatePlateRequestProps,
  CreateNewPlatRequest,
} from "@/components/dashboard/verification-forms/Create-Plate-Request";
import { PlateNumberOrderService } from "@/services/PlateNumberOrdersService";
import { selectStateIDFromStateName } from "@/store/states/state-selector";
import { generateTrackingId } from "@/common/helpers";
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
  { key: "approver", title: "Final Approving Officer" },
  { key: "status", title: "Request Status" },
  { key: "insurance_status", title: "Insurance Status" },
];

const inputInitialValues = {
  trackingid: "",
  insuranceStatus: "",
  plateNumberType: "",
  requestStatus: "",
};

export default function Page() {
  const dispatch = useDispatch();
  const plateOrderService = new PlateNumberOrderService(dispatch);
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState(inputInitialValues);
  const [modalInput, setModalInput] = useState<CreatePlateRequestProps>(
    CreatePlateRequestInitialValues
  );
  const state_id = useSelector((state) =>
    selectStateIDFromStateName(state, modalInput?.state)
  );
  const plateNumbertableData = useSelector(selectPlateNumberRequestTableData);

  const totalPages = Math.ceil(plateNumbertableData.length / itemsPerPage);
  const paginatedData = plateNumbertableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRowActions = (row: unknown): RowAction[] => {
    return [
      {
        title: "View",
        action: () =>
          router.push(`/super-admin/plate-number-request/view-request`),
      },
    ];
  };

  const handleSubmit = async () => {
    try {
      const res = await plateOrderService.createPlateNumberOrder({
        tracking_id: generateTrackingId(),
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
    <main className="flex flex-col gap-8 md:gap-12 overflow-hidden">
      <div className="flex flex-col gap-5 md:flex-row justify-between items-center">
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: DashboardSVG,
              link: "/super-admin/dashboard",
            },
            {
              label: "Plate Number Request",
              Icon: VICSSVG,
              link: "/super-admin/plate-number-request",
            },
          ]}
        />

        <ResponseModalX
          title={"Request Created Successfully"}
          open={openModal}
          onClose={() => setOpenModal(false)}
          content={<>You have successfully created a new request</>}
          status={"success"}
          footerBtnText={"Done"}
          footerTrigger={() =>
            router.push("/mla-admin/plate-number-request/view-request")
          }
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

      <CardContainer className="flex flex-col gap-5">
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
                plateNumberType: selected ? String(selected) : "",
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
                insuranceStatus: selected ? String(selected) : "",
              }))
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-end">
          <DashboardCompSelect
            title={"Request Status"}
            placeholder={"-- Select status --"}
            items={[...Object.values(RequestStatus)]}
            selected={inputValues.requestStatus}
            onSelect={(selected) =>
              setInputValues((prev) => ({
                ...prev,
                requestStatus: selected ? String(selected) : "",
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

      <div className="flex flex-col gap-3 border-1 border-primary-300 rounded-lg">
        <div className="border-t-1 border-primary-300 rounded-lg overflow-hidden scrollbar-width">
          <DataTableWButton
            headers={tableColumns}
            data={paginatedData}
            rowActions={getRowActions}
          />
        </div>
        <div className="p-5 ml-auto">
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
