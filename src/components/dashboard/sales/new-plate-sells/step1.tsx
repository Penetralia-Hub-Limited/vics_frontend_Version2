"use client";

import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "../../dashboard-component-select";
import DatePicker from "../../dashboard-datepicker";
import { inputSalesPropsStep1 } from "../sales-constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { StatesData } from "@/store/states/states-types";

interface INewPlateSalesStep1 {
  inputValues: inputSalesPropsStep1;
  setInputValues: Dispatch<SetStateAction<inputSalesPropsStep1>>;
}

export const NewPlateSalesStep1: FC<INewPlateSalesStep1> = ({
  inputValues,
  setInputValues,
}) => {
  const states = useSelector((state: RootState) => state.states);
  const filteredState = states.states.map((state: StatesData) => state.name);

  return (
    <div className={"flex flex-col gap-4 md:gap-6 w-full"}>
      <InputWithLabel
        items={{
          id: "fullname",
          label: "Full Name",
          placeholder: "Full Name",
          type: "text",
          htmlfor: "fullname",
        }}
        value={inputValues.fullName || ""}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            fullName: e.target.value,
          }))
        }
      />

      <div className={"flex flex-col md:flex-row gap-4 md:gap-2"}>
        <InputWithLabel
          items={{
            id: "email",
            label: "Email",
            placeholder: "Email",
            type: "email",
            htmlfor: "email",
          }}
          value={inputValues.email || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "phone",
            label: "Phone Number",
            placeholder: "Phone Number",
            type: "text",
            htmlfor: "phone",
          }}
          value={inputValues.phone || ""}
          onChange={(e) =>
            setInputValues((prev) => ({
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
          placeholder: "Address",
          type: "text",
          htmlfor: "address",
        }}
        value={inputValues.address || ""}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            address: e.target.value,
          }))
        }
      />

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2"}>
        <DashboardCompSelect
          title={"State"}
          placeholder={"-- Select State --"}
          items={filteredState}
          selected={inputValues.state || ""}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              state: (selected as string) ?? "",
            }))
          }
        />

        <DatePicker
          date={inputValues.date}
          setDate={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              date: selected as Date,
            }))
          }
          title={"Date of Birth"}
        />
      </div>
    </div>
  );
};
