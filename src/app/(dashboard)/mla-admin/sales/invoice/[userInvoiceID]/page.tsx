"use client";

import { Invoice } from "@/components/general/invoice";
import { useParams } from "next/navigation";
import { selectFoundVehicleDatafromUserID } from "@/store/vehicle/vehicle-selector";
import { useSelector } from "react-redux";
import { selectUserByID } from "@/store/user/user-selector";

export default function Page() {
  const params = useParams<{ userInvoiceID: string }>();
  const vehicleInfo = useSelector((state) =>
    selectFoundVehicleDatafromUserID(state, params.userInvoiceID)
  )[0];
  const userInfo = useSelector((state) =>
    selectUserByID(state, params.userInvoiceID)
  )[0];

  if (!userInfo) {
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
      value: userInfo.firstname
        ? `${userInfo?.firstname} ${userInfo?.lastname}`
        : "Not Available",
    },
    {
      label: "Email",
      value: userInfo?.email ?? "Not Available",
    },
    {
      label: "Phone Number",
      value: userInfo.phone ?? "Not Available",
    },
    {
      label: "Address",
      value: userInfo.address ?? "Not Available",
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
        state={"KWARA state"}
        data={invoiceData}
        buyerInfo={userData}
        vehicleInfo={vehicleData}
      />
    </div>
  );
}
