import { FC, Dispatch, SetStateAction } from "react";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import { PlateNumberType, PlateNumberSubType } from "@/common/enum";
import InputWithLabel from "@/components/auth/input-comp";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const CreatePlateRequestInitialValues = {
  state: "",
  plate_number_type: undefined,
  plate_number_sub_type: undefined,
  total_number_requested: 0,
};

export type CreatePlateRequestProps = {
  state: string;
  plate_number_type: PlateNumberType | undefined;
  plate_number_sub_type: PlateNumberSubType | undefined;
  total_number_requested: number;
};

interface ICreateNewStock {
  input: CreatePlateRequestProps;
  setInput: Dispatch<SetStateAction<CreatePlateRequestProps>>;
}

export const CreateNewPlatRequest: FC<ICreateNewStock> = ({
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
            state: String(selected),
          }))
        }
      />

      <DashboardCompSelect
        title={"Plate Number Type"}
        placeholder={"-- Select Type --"}
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
        <div className={"flex flex-col w-full gap-6"}>
          <p className="font-semibold mx-auto">
            Enter plate Number Type Information
          </p>

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

            <InputWithLabel
              min={0}
              items={{
                id: "noofplates",
                label: "Number of Plates",
                placeholder: "Enter Number of Plates",
                type: "number",
                htmlfor: "noofplates",
              }}
              value={input.total_number_requested}
              onChange={(e) => {
                e.preventDefault();
                setInput((prev) => ({
                  ...prev,
                  total_number_requested: parseInt(e.target.value) || 0,
                }));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
