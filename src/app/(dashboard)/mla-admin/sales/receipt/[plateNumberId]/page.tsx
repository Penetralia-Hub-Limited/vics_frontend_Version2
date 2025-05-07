"use client";

import { Receipt } from "@/components/general/receipt";

import { useParams } from "next/navigation";
import { selectVehicleInfoFromPlateID } from "@/store/vehicle/vehicle-selector";
import { useSelector } from "react-redux";

export default function Page() {
  const params = useParams<{ plateNumberId: string }>();
  const vehicleInfo = useSelector((state) =>
    selectVehicleInfoFromPlateID(state, params.plateNumberId)
  );

  if (!vehicleInfo) {
    return (
      <p className="h-screen flex items-center justify-center text-center text-primary-500">
        Data not found.
      </p>
    );
  }

  const receiptData = {
    plateNumberId: params.plateNumberId,
  };

  const userData = [
    {
      label: "Full Name",
      value: vehicleInfo
        ? `${vehicleInfo?.owner?.firstname} ${vehicleInfo?.owner?.lastname}`
        : "Not Available",
    },
    {
      label: "Email",
      value: vehicleInfo?.owner?.email ?? "Not Available",
    },
    {
      label: "Phone Number",
      value: vehicleInfo?.owner?.phone ?? "Not Available",
    },
    {
      label: "Address",
      value: vehicleInfo.owner?.address ?? "Not Available",
    },
  ];
  const vehicleData = [
    { label: "Chasis Number", value: vehicleInfo.chasis_number ?? "N/A" },
    { label: "Engine Number", value: vehicleInfo.engine_number ?? "N/A" },
    { label: "Vehicle Make", value: vehicleInfo.make ?? "N/A" },
    { label: "Vehicle Model", value: vehicleInfo.model ?? "N/A" },
    { label: "Vehicle Category", value: vehicleInfo.category ?? "N/A" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <Receipt
        date={vehicleInfo?.created_at}
        state={"KWARA state"}
        data={receiptData}
        qrcode_link={`/mla-admin/invoice/${receiptData.plateNumberId}`}
        userInfo={userData}
        vehicleInfo={vehicleData}
      />
    </div>
  );
}
