"use client";

import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { PlateNumberType } from "@/common/enum";
import { inputSalesPropsStep3 } from "../sales-constants";

interface INewPlateSalesStep3 {
  inputValues: inputSalesPropsStep3;
  setInputValues: Dispatch<SetStateAction<inputSalesPropsStep3>>;
}

export const NewPlateSalesStep3: FC<INewPlateSalesStep3> = ({
  inputValues,
  setInputValues,
}) => {
  return (
    <div className={"flex flex-col gap-4 md:gap-6 w-full"}>
      <DashboardCompSelect
        title={"Plate Number Type"}
        placeholder={"-- Select Type --"}
        items={[...Object.values(PlateNumberType)]}
        selected={inputValues.type}
        onSelect={(selected) =>
          setInputValues((prev) => ({
            ...prev,
            type: (selected as string) ?? "",
          }))
        }
      />

      <InputWithLabel
        items={{
          id: "plateNumber",
          label: "Plate Number",
          placeholder: "Plate Number",
          type: "text",
          htmlfor: "plateNumber",
        }}
        value={inputValues.plateNumber || ""}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            plateNumber: e.target.value,
          }))
        }
      />
    </div>
  );
};
