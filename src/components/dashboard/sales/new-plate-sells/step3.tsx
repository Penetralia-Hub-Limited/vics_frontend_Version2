"use client";

import { FC, Dispatch, SetStateAction } from "react";
import { PlateNumberType } from "@/common/enum";
import { useSelector } from "react-redux";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { selectPlateNumberArr } from "@/store/plateNumber/plate-number-selector";
import { inputSalesPropsStep3 } from "../sales-constants";

interface INewPlateSalesStep3 {
  inputValues: inputSalesPropsStep3;
  setInputValues: Dispatch<SetStateAction<inputSalesPropsStep3>>;
}

export const NewPlateSalesStep3: FC<INewPlateSalesStep3> = ({
  inputValues,
  setInputValues,
}) => {
  const plates = useSelector(selectPlateNumberArr);
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

      <DashboardCompSelect
        title={"Plate Number"}
        placeholder={"-- Select Number --"}
        items={plates}
        selected={inputValues.number}
        onSelect={(selected) =>
          setInputValues((prev) => ({
            ...prev,
            number: (selected as string) ?? "",
          }))
        }
      />
    </div>
  );
};
