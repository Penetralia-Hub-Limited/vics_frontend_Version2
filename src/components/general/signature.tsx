import { FC } from "react";

interface ISignature {
  name: string;
  role: string;
  signature: string;
}

export const Signature: FC<ISignature> = ({ name, role, signature }) => {
  return (
    <div className={"py-5 flex flex-col gap-4"}>
      <p>{signature}</p>
      <div className={"flex flex-col gap-1"}>
        <p className={"font-bold"}>{name}</p>
        <p className={""}>{role}</p>
      </div>
    </div>
  );
};
