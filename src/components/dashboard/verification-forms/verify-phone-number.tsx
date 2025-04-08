import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";

interface IVerifyPlateNumber {
  phoneNumber: string;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  label?: string;
}

export const VerifyPhoneNumber: FC<IVerifyPlateNumber> = ({
  phoneNumber,
  setPhoneNumber,
  label,
}) => {
  return (
    <div className={"p-4"}>
      <InputWithLabel
        items={{
          id: "phoneNumber",
          label: label ? label : "Phone Number",
          placeholder: "Enter Phone Number",
          type: "text",
          htmlfor: "phoneNumber",
        }}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>
  );
};
