import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";

export const CreatePlateRequestInitialValues = {
  make: "",
  model: "",
};

export type CreateVehiceMakeAndModelProps = {
  make: string;
  model: string;
};

interface ICreateNewStock {
  input: CreateVehiceMakeAndModelProps;
  setInput: Dispatch<SetStateAction<CreateVehiceMakeAndModelProps>>;
}

export const CreateVehiceMakeAndModel: FC<ICreateNewStock> = ({
  input,
  setInput,
}) => {
  return (
    <div className="flex flex-col gap-5 p-4">
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
