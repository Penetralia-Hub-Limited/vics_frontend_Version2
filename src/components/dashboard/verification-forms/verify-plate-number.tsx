import { FC, Dispatch, SetStateAction } from "react";
import InputWithLabel from "@/components/auth/input-comp";

interface IVerifyPlateNumber {
  plateNumber: string;
  setPlateNumber: Dispatch<SetStateAction<string>>;
}

export const VerifyPlateNumber: FC<IVerifyPlateNumber> = ({
  plateNumber,
  setPlateNumber,
}) => {
  return (
    <div className={"p-4"}>
      <InputWithLabel
        items={{
          id: "plateNumber",
          label: "Plate Number",
          placeholder: "Plate Number",
          type: "text",
          htmlfor: "plateNumber",
        }}
        value={plateNumber}
        onChange={(e) => setPlateNumber(e.target.value)}
      />
    </div>
  );
};
