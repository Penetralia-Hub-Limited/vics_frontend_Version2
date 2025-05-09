"use client";

import { useState, useEffect } from "react";
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
import CardContainer from "@/components/general/card-container";
import InputWithLabel from "@/components/auth/input-comp";
import MultiDocumentUploader from "@/components/general/multiple-document-uploader";

interface newUserProps {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
}

const initialNewUserValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
};

export default function Page() {
  const params = useParams<{ plateId: string }>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const vehicleInfo = useSelector((state) =>
    selectVehicleInfoFromPlateID(state, params.plateId)
  );
  const [user, setUser] = useState<newUserProps>(initialNewUserValues);
  const userInfo = useSelector((state) =>
    selectValidTaxPayer(state, {
      phoneNumber: phoneNumber,
    })
  );

  useEffect(() => {
    if (userInfo) {
      setUser({
        firstname: userInfo?.firstname,
        lastname: userInfo?.lastname,
        email: userInfo?.email,
        phone: userInfo?.phone,
        address: userInfo?.address,
      });
    }
  }, [userInfo]);

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
              label: `${step === 0 ? "Current Owners Details" : "New Owners Details"} `,
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

      {step === 0 && (
        <div className={"flex flex-col md:flex-row gap-4"}>
          <InformationCard title={"Buyer Information"} data={buyerInfo} />
          <InformationCard title={"Vehicle Information"} data={vehicleData} />
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <CardContainer className={"flex flex-col gap-4 my-3"}>
            <div className="flex flex-col gap-4">
              <p className={"font-bold text-sm py-4"}>New Owner Information</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InputWithLabel
                  items={{
                    id: "firstname",
                    label: "First Name",
                    placeholder: "Enter First Name",
                    type: "text",
                    htmlfor: "firstname",
                  }}
                  value={user.firstname}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      firstname: e.target.value,
                    }))
                  }
                />
                <InputWithLabel
                  items={{
                    id: "lastname",
                    label: "Last Name",
                    placeholder: "Enter Last Name",
                    type: "text",
                    htmlfor: "lastname",
                  }}
                  value={user.lastname}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      lastname: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <InputWithLabel
                  items={{
                    id: "email",
                    label: "Email",
                    placeholder: "Enter Email",
                    type: "email",
                    htmlfor: "email",
                  }}
                  value={user.email}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <InputWithLabel
                  items={{
                    id: "phone",
                    label: "Phone Number",
                    placeholder: "Enter Phone Number",
                    type: "text",
                    htmlfor: "phone",
                  }}
                  value={user.phone}
                  onChange={(e) =>
                    setUser((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>
              <InputWithLabel
                items={{
                  id: "address",
                  label: "Address",
                  placeholder: "Enter Address",
                  type: "text",
                  htmlfor: "address",
                }}
                value={user.address}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            </div>
          </CardContainer>

          <CardContainer>
            <div className="flex flex-col gap-4">
              <p className={"font-bold text-sm py-4"}>Upload Documents</p>
              <MultiDocumentUploader />
            </div>
          </CardContainer>

          <div className={"flex flex-row justify-between"}>
            <Button onClick={() => setStep(0)} variant={"outline"}>
              Back
            </Button>
            <Button variant={"default"}>Proceed</Button>
          </div>
        </div>
      )}

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
        footerTrigger={() => setStep((prev) => prev + 1)}
      />
    </main>
  );
}
