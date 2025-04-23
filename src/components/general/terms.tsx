import { FC } from "react";

interface ITermsAndConditions {
  termsData: { terms: string }[];
}

export const TermsAndConditions: FC<ITermsAndConditions> = ({ termsData }) => {
  return (
    <div className={"flex flex-col gap-3 p-4"}>
      <p className="text-sm font-semibold">Terms and Condition</p>

      <div className={"flex flex-col gap-2 list-decimal"}>
        {termsData.map((item, index) => (
          <div key={index} className={"flex flex-row gap-3"}>
            <p className={"text-sm"}>{index + 1}.</p>
            <p className={"text-sm"} key={index}>
              {item.terms}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
