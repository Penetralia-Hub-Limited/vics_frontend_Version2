"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PenSVG } from "@/common/svgs";
import { InformationCard } from "@/components/general/information-card";
import Modal from "@/components/general/modal";
import { Button } from "@/components/ui/button";
import { VerifyPhoneNumber } from "@/components/dashboard/verification-forms/verify-phone-number";
import { selectVehicleInfoFromPlateID } from "@/store/vehicle/vehicle-selector";
import { selectValidTaxPayer } from "@/store/user/user-selector";
import { ResponseModalX } from "@/components/general/response-modalx";

export default function Page() {
  const params = useParams<{ plateId: string }>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const vehicleInfo = useSelector((state) =>
    selectVehicleInfoFromPlateID(state, params.plateId)
  );
  const userInfo = useSelector((state) =>
    selectValidTaxPayer(state, {
      phoneNumber: phoneNumber,
    })
  );

  console.log("openModal ", openModal);

  const buyerInfo = [
    {
      label: "Full Name",
      value: vehicleInfo?.owner_id
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
      value: vehicleInfo?.owner?.address ?? "Not Available",
    },
  ];

  const vehicleData = [
    {
      label: "Chasis Number",
      value: vehicleInfo?.chasis_number ?? "Not Available",
    },
    {
      label: "Engine Number",
      value: vehicleInfo?.engine_number ?? "Not Available",
    },
    { label: "Vehicle Make", value: vehicleInfo?.make ?? "Not Available" },
    { label: "Vehicle Model", value: vehicleInfo?.model ?? "Not Available" },
    {
      label: "Vehicle Category",
      value: vehicleInfo?.category ?? "Not Available",
    },
  ];

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
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
              label: "Change of Ownership",
              Icon: PenSVG,
              link: "/mla-admin/change-of-ownership",
            },
            {
              label: "Current Owners Details",
              Icon: PenSVG,
              link: "/mla-admin/change-of-ownership/current-owners-details",
            },
          ]}
        />

        <Modal
          title={"New Owner Information"}
          content={
            <VerifyPhoneNumber
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          }
          btnText={"Enter New Owner"}
          footerBtn={
            <Button onClick={() => setOpenModal(true)} type="submit">
              Validate Plate Number
            </Button>
          }
        />
      </div>

      <div className={"flex flex-col md:flex-row gap-4"}>
        <InformationCard title={"Buyer Information"} data={buyerInfo} />
        <InformationCard title={"Vehicle Information"} data={vehicleData} />
      </div>

      <ResponseModalX
        title={userInfo ? "User Validated Successfully" : "User does not exist"}
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={
          <>
            {userInfo
              ? "You have successfully validated the user"
              : "Add New User."}
          </>
        }
        status={userInfo ? "success" : "failed"}
        footerBtnText={"Continue"}
        footerTrigger={() => {}}
      />
    </main>
  );
}
