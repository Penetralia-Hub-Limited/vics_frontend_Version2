import { FC, Dispatch, SetStateAction } from "react";
import { IDTaxPayerMeans } from "@/common/enum";
import InputWithLabel from "@/components/auth/input-comp";
import DashboardCompSelect from "../dashboard-component-select";

export const IUserIDInitialValues = {
  nin: "",
  phoneNumber: "",
};

export interface UserIDProps {
  nin: string;
  phoneNumber: string;
}

interface IUserIdentification {
  selected: IDTaxPayerMeans;
  onSelect: Dispatch<SetStateAction<IDTaxPayerMeans>>;
  input: UserIDProps;
  setInput: Dispatch<SetStateAction<UserIDProps>>;
}

export const UserIdentificationModal: FC<IUserIdentification> = ({
  selected,
  onSelect,
  input,
  setInput,
}) => {
  return (
    <div className={"p-4 flex flex-col gap-4"}>
      <DashboardCompSelect
        title={"Select Means of Identifying Tax Payer"}
        placeholder={"-- Select --"}
        items={[...Object.values(IDTaxPayerMeans)]}
        selected={selected}
        onSelect={(value) => onSelect(value as IDTaxPayerMeans)}
      />

      {selected === IDTaxPayerMeans.NIN ? (
        <InputWithLabel
          items={{
            id: "nin",
            label: "Enter Identification Number",
            placeholder: "Enter Number",
            type: "text",
            htmlfor: "nin",
          }}
          value={input.nin}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              nin: e.target.value,
            }))
          }
        />
      ) : (
        <InputWithLabel
          items={{
            id: "phoneNumber",
            label: "Enter Phone Number",
            placeholder: "Enter Number",
            type: "text",
            htmlfor: "phoneNumber",
          }}
          value={input.phoneNumber}
          onChange={(e) =>
            setInput((prev) => ({
              ...prev,
              phoneNumber: e.target.value,
            }))
          }
        />
      )}
    </div>
  );
};
