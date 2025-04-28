"use client";

import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
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
      <InputWithLabel
        items={{
          id: "plateNumberType",
          label: "Plate Number Type",
          placeholder: "Plate Number Type",
          type: "text",
          htmlfor: "plateNumberType",
        }}
        value={inputValues.plateNumberType || ""}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            plateNumberType: e.target.value,
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
      {/* <DashboardCompSelect
        title={"Plate Number Type"}
        placeholder={"-- Select Plate Type --"}
        items={[...Object.values(PlateNumberType)]}
        selected={inputValues.plateNumberType}
        onSelect={(selected) =>
          setInputValues((prev) => ({
            ...prev,
            plateNumberType: (selected as PlateNumberType) ?? undefined,
          }))
        }
      /> */}
    </div>
  );
};
