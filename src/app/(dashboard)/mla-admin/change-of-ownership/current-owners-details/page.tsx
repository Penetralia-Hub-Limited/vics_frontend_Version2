"use client";

import { useState } from "react";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, PenSVG } from "@/common/svgs";
import { InformationCard } from "@/components/general/information-card";
import Modal from "@/components/general/modal";
import { Button } from "@/components/ui/button";
import { VerifyPhoneNumber } from "@/components/dashboard/mla-admin/change-of-ownership/verify-phone-number";

const data = [
  {
    label: "Full Name",
    value: "Bernard David Ikechukwu",
  },
  {
    label: "Email",
    value: "Bernard@DavidIkechukwu.com",
  },
  {
    label: "Phone Number",
    value: "23232323333",
  },
  {
    label: "Address",
    value: "121 Pastoral lane Briks",
  },
];

export default function Page() {
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState<string>("");
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
              phoneNumber={verifyPhoneNumber}
              setPhoneNumber={setVerifyPhoneNumber}
            />
          }
          btnText={"Enter New Owner"}
          footerBtn={<Button type="submit">Validate Plate Number</Button>}
        />
      </div>

      <div className={"flex flex-col md:flex-row gap-4"}>
        <InformationCard title={"Buyers Information"} data={data} />
        <InformationCard title={"Vehicle's Information"} data={data} />
      </div>
    </main>
  );
}
