import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "../../dashboard-component-select";
import DatePicker from "../../dashboard-datepicker";
import { inputVehiclePropsStep1 } from "../vehicle-constant";

interface IAddVehicleStep1 {
  inputValues: inputVehiclePropsStep1;
  setInputValues: Dispatch<SetStateAction<inputVehiclePropsStep1>>;
}

export const AddVehicleStep1: FC<IAddVehicleStep1> = ({
  inputValues,
  setInputValues,
}) => {
  return (
    <div className={"flex flex-col gap-6 w-full"}>
      <InputWithLabel
        items={{
          id: "fullname",
          label: "Full Name",
          placeholder: "Full Name",
          type: "text",
          htmlfor: "fullname",
        }}
        value={inputValues.fullName}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            fullName: e.target.value,
          }))
        }
      />

      <div className={"flex flex-col md:flex-row gap-2"}>
        <InputWithLabel
          items={{
            id: "email",
            label: "Email",
            placeholder: "Email",
            type: "email",
            htmlfor: "email",
          }}
          value={inputValues.email}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />

        <InputWithLabel
          items={{
            id: "phonenumber",
            label: "Phone Number",
            placeholder: "Phone Number",
            type: "text",
            htmlfor: "phonenumber",
          }}
          value={inputValues.phoneNumber}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              phoneNumber: e.target.value,
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
        value={inputValues.address}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            address: e.target.value,
          }))
        }
      />

      <div className={"grid grid-cols-1 md:grid-cols-2 gap-2"}>
        <DashboardCompSelect
          title={"Nationality"}
          placeholder={"-- Select Nationality --"}
          items={["Nigeria", "Camerron"]}
          selected={inputValues.nationality}
          onSelect={(selected) =>
            setInputValues((prev) => ({
              ...prev,
              nationality: (selected as string) ?? "",
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
