"use client";

import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "../dashboard-component-select";
import { PlateNumberType, PlateNumberSubType } from "@/common/enum";
import InputWithLabel from "@/components/auth/input-comp";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const CreateNewStockPropsInitialValues = {
  plate_number_type: undefined,
  plate_number_sub_type: undefined,
  lga: "",
  state: "",
  endCode: "",
  startNumber: "",
  endNoPlate: "",
  total_number_requested: 0,
};

export type CreateNewStockProps = {
  plate_number_type: PlateNumberType | undefined;
  plate_number_sub_type: PlateNumberSubType | undefined;
  lga: string;
  state: string;
  endCode: string;
  startNumber: string;
  endNoPlate: string;
  total_number_requested: number;
};

interface ICreateNewStock {
  input: CreateNewStockProps;
  setInput: Dispatch<SetStateAction<CreateNewStockProps>>;
}

export const CreateNewStock: FC<ICreateNewStock> = ({ input, setInput }) => {
  const states = useSelector((state: RootState) => state.states);
  const filteredState = states.states.map((state) => state.name);

  const { lgas } = useSelector((state: RootState) => state?.lga);
  const filteredLGA = lgas.map((lga) => lga.name);

  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto h-[25rem] scrollbar-width">
      <DashboardCompSelect
        title={"Select State"}
        placeholder={"-- Select State --"}
        items={filteredState}
        selected={input.state}
        onSelect={(selected) =>
          setInput((prev) => ({
            ...prev,
            state: String(selected),
          }))
        }
      />

      <DashboardCompSelect
        title={"Plate Number Type"}
        placeholder={"-- Select Status --"}
        items={[...Object.values(PlateNumberType)]}
        selected={input.plate_number_type}
        onSelect={(selected) =>
          setInput((prev) => ({
            ...prev,
            plate_number_type: selected as PlateNumberType,
          }))
        }
      />

      {input.plate_number_type && (
        <div className="flex flex-col gap-3">
          <div className={"flex item-center justify-center"}>
            <p className="font-semibold">Enter plate Number Type Information</p>
          </div>
          <div className={"grid grid-cols-1 md:grid-cols-2 gap-3"}>
            <DashboardCompSelect
              title={"Select Plate Number Sub. Type"}
              placeholder={"-- Select Type --"}
              items={[...Object.values(PlateNumberSubType)]}
              selected={input.plate_number_sub_type}
              onSelect={(selected) =>
                setInput((prev) => ({
                  ...prev,
                  plate_number_sub_type: selected as PlateNumberSubType,
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
                label: "Start Number Plate From",
                placeholder: "Enter Start Number Plate From",
                type: "number",
                htmlfor: "startNumber",
              }}
              value={input.startNumber}
              onChange={(e) => {
                const newStart = e.target.value;
                const total =
                  (parseInt(input.endNoPlate) || 0) - (parseInt(newStart) || 0);
                setInput((prev) => ({
                  ...prev,
                  startNumber: newStart,
                  total_number_requested: total > 0 ? total : 0,
                }));
              }}
            />

            <InputWithLabel
              min={0}
              items={{
                id: "endNoPlate",
                label: "End Number Plate",
                placeholder: "Enter End plate number",
                type: "number",
                htmlfor: "endNoPlate",
              }}
              value={input.endNoPlate}
              onChange={(e) => {
                const newEnd = e.target.value;
                const total =
                  (parseInt(newEnd) || 0) - (parseInt(input.startNumber) || 0);
                setInput((prev) => ({
                  ...prev,
                  endNoPlate: newEnd,
                  total_number_requested: total > 0 ? total : 0,
                }));
              }}
            />

            <InputWithLabel
              min={0}
              items={{
                id: "total",
                label: "Total",
                placeholder: "Total Calculated Automatically",
                type: "number",
                htmlfor: "total",
              }}
              value={input.total_number_requested}
              disabled
            />
          </div>
        </div>
      )}
    </div>
  );
};
