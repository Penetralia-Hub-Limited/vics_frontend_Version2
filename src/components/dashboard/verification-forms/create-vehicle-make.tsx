"use client";

import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const CreatePlateRequestInitialValues = {
  make: "",
  model: "",
  state: "",
};

export type CreateVehiceMakeAndModelProps = {
  make: string;
  model: string;
  state: string;
};

interface ICreateNewStock {
  input: CreateVehiceMakeAndModelProps;
  setInput: Dispatch<SetStateAction<CreateVehiceMakeAndModelProps>>;
}

export const CreateVehiceMakeAndModel: FC<ICreateNewStock> = ({
  input,
  setInput,
}) => {
  const states = useSelector((state: RootState) => state.states);
  const filteredState = states.states.map((state) => state.name);

  return (
    <div className="flex flex-col gap-5 p-4">
      <DashboardCompSelect
        title={"Select State"}
        placeholder={"-- Select State --"}
        items={filteredState}
        selected={input.state}
        onSelect={(selected) =>
          setInput((prev) => ({
            ...prev,
            state: selected as string,
          }))
        }
      />

      <InputWithLabel
        items={{
          id: "make",
          label: "Enter Vehicle Make",
          placeholder: "Enter Vehicle Make",
          type: "text",
          htmlfor: "make",
        }}
        value={input.make}
        onChange={(e) => {
          e.preventDefault();
          setInput((prev) => ({
            ...prev,
            make: e.target.value ?? "",
          }));
        }}
      />

      <InputWithLabel
        items={{
          id: "model",
          label: "Enter Vehicle Model",
          placeholder: "Enter Vehicle Model",
          type: "text",
          htmlfor: "model",
        }}
        value={input.model}
        onChange={(e) => {
          e.preventDefault();
          setInput((prev) => ({
            ...prev,
            model: e.target.value ?? "",
          }));
        }}
      />
    </div>
  );
};
