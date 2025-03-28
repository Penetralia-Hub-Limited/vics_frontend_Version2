"use client";

import { useState } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "../../dashboard-component-select";
import DatePicker from "../../dashboard-datepicker";

export const AddVehicleStep1 = () => {
  const [dob, setDOB] = useState<Date | undefined>();

  return (
    <div className={"flex flex-col gap-6 w-full"}>
      <InputWithLabel
        items={{
          id: "fullname",
          label: "Full Name",
          placeholder: "Full Name",
          type: "text",
          htmlfor: "fullname",
        }}
      />

      <div className={"flex flex-col md:flex-row gap-2"}>
        <InputWithLabel
          items={{
            id: "email",
            label: "Email",
            placeholder: "Email",
            type: "email",
            htmlfor: "email",
          }}
        />

        <InputWithLabel
          items={{
            id: "phonenumber",
            label: "Phone Number",
            placeholder: "Phone Number",
            type: "text",
            htmlfor: "phonenumber",
          }}
        />
      </div>

      <InputWithLabel
        items={{
          id: "address",
          label: "Address",
          placeholder: "Address",
          type: "text",
          htmlfor: "address",
        }}
      />

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
          title={"Nationality"}
          placeholder={"-- Select Nationality --"}
          items={["Nigeria", "Camerron"]}
        />

        <DatePicker date={dob} setDate={setDOB} title={"Date of Birth"} />
      </div>
    </div>
  );
};
