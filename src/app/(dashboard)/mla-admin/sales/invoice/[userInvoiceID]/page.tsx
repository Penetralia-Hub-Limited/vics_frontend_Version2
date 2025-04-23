"use client";

import { Invoice } from "@/components/general/invoice";
import Logo from "@/assets/logo/icon_green.svg";
import { useParams } from "next/navigation";
import { selectFoundVehicleDatafromUserID } from "@/store/vehicle/vehicle-selector";
import { useSelector } from "react-redux";

export default function Page() {
  const params = useParams<{ userInvoiceID: string }>();
  const vehicleInfo = useSelector((state) =>
    selectFoundVehicleDatafromUserID(state, params.userInvoiceID)
  )[0];

  if (!vehicleInfo) {
    return (
      <p className="h-screen flex items-center justify-center text-center text-primary-500">
        Data not found.
      </p>
    );
  }

  const invoiceData = {
    invoiceID: params.userInvoiceID,
  };

  const userData = [
    {
      label: "Full Name",
      value: vehicleInfo?.owner_name ?? "Not Available",
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
      <Invoice
        invoice_link={`/mla-admin/invoice/${invoiceData.invoiceID}`}
        icon={Logo}
        state={"KWARA state"}
        data={invoiceData}
        buyerInfo={userData}
        vehicleInfo={vehicleData}
      />
    </div>
  );
}
