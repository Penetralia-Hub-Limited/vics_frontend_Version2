"use client";

import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import { inputSalesPropsStep4 } from "../sales-constants";

interface INewPlateSalesStep4 {
  inputValues: inputSalesPropsStep4;
  setInputValues: Dispatch<SetStateAction<inputSalesPropsStep4>>;
}

export const NewPlateSalesStep4: FC<INewPlateSalesStep4> = ({
  inputValues,
  setInputValues,
}) => {
  return (
    <div className={"w-full"}>
      <InputWithLabel
        items={{
          id: "insurance",
          label: "Include Insurance",
          placeholder: "Enter Insurance ID",
          type: "text",
          htmlfor: "insurance",
        }}
        value={inputValues.insurance_number || ""}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            insurance_number: e.target.value,
          }))
        }
      />
    </div>
  );
};
