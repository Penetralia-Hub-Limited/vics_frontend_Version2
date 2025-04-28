"use client";

import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "../dashboard-component-select";
import { PlateNumberType, PlateNumberSubType } from "@/common/enum";
import InputWithLabel from "@/components/auth/input-comp";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const CreateNewStockPropsInitialValues = {
  plateNumberType: undefined,
  plateNumberSubType: undefined,
  lga: "",
  endCode: "",
  startNumber: "",
  endNoPlate: "",
  total: 0,
};

export type CreateNewStockProps = {
  plateNumberType: PlateNumberType | undefined;
  plateNumberSubType: PlateNumberSubType | undefined;
  lga: string;
  endCode: string;
  startNumber: string;
  endNoPlate: string;
  total: number;
};

interface ICreateNewStock {
  input: CreateNewStockProps;
  setInput: Dispatch<SetStateAction<CreateNewStockProps>>;
}

export const CreateNewStock: FC<ICreateNewStock> = ({ input, setInput }) => {
  const { lgas } = useSelector((state: RootState) => state?.lga);
  const filteredLGA = lgas.map((lga) => lga.name);

  return (
    <div className="flex flex-col gap-5 p-4">
      <DashboardCompSelect
        title={"Plate Number Type"}
        placeholder={"-- Select Status --"}
        items={[...Object.values(PlateNumberType)]}
        selected={input.plateNumberType}
        onSelect={(selected) =>
          setInput((prev) => ({
            ...prev,
            plateNumberType: selected as PlateNumberType,
          }))
        }
      />

      <div className={"flex item-center justify-center"}>
        <p className="font-semibold">Enter plate Number Type Information</p>
      </div>

      {input.plateNumberType && (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-3"}>
          <DashboardCompSelect
            title={"Select Plate Number Sub. Type"}
            placeholder={"-- Select Type --"}
            items={[...Object.values(PlateNumberSubType)]}
            selected={input.plateNumberSubType}
            onSelect={(selected) =>
              setInput((prev) => ({
                ...prev,
                plateNumberSubType: selected as PlateNumberSubType,
              }))
            }
          />

          <DashboardCompSelect
            title={"Local Government Area"}
            placeholder={"-- Select LGA --"}
            items={filteredLGA}
            selected={input.lga}
            onSelect={(selected) =>
              setInput((prev) => ({
                ...prev,
                lga: selected as string,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "endCode",
              label: "End Code/Last Letters",
              placeholder: "Enter End Code",
              type: "text",
              htmlfor: "endCode",
            }}
            value={input.endCode}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                endCode: e.target.value as string,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "startNumber",
              label: "Start Number Plate Form",
              placeholder: "Enter Start Number Plate Form",
              type: "text",
              htmlfor: "startNumber",
            }}
            value={input.startNumber}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                startNumber: e.target.value as string,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "endNoPlate",
              label: "End Number Plate",
              placeholder: "Enter End Number Plate",
              type: "text",
              htmlfor: "endNoPlate",
            }}
            value={input.endNoPlate}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                endNoPlate: e.target.value as string,
              }))
            }
          />

          <InputWithLabel
            min={0}
            items={{
              id: "total",
              label: "Total",
              placeholder: "Enter Total",
              type: "number",
              htmlfor: "total",
            }}
            value={input.total}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                total: parseInt(e.target.value) || 0,
              }))
            }
          />
        </div>
      )}
    </div>
  );
};
