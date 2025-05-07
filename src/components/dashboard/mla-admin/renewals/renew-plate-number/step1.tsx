import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DatePicker from "@/components/dashboard/dashboard-datepicker";
import { inputRenewPlateNumberPropsStep1 } from "./renew-plate-constant";

interface IRenewPlateNumberStep1 {
  inputValues: inputRenewPlateNumberPropsStep1;
  setInputValues: Dispatch<SetStateAction<inputRenewPlateNumberPropsStep1>>;
}

export const RenewPlateNumberStep1: FC<IRenewPlateNumberStep1> = ({
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
            id: "phone",
            label: "Phone Number",
            placeholder: "Phone Number",
            type: "text",
            htmlfor: "phone",
          }}
          value={inputValues.phone}
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              phone: e.target.value,
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
