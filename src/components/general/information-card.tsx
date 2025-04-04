import { FC } from "react";
import CardContainer from "@/components/general/card-container";

interface InformationCardProps {
  title: string;
  data: {
    label: string;
    value: string;
  }[];
}

export const InformationCard: FC<InformationCardProps> = ({ title, data }) => {
  return (
    <CardContainer className={"flex flex-col gap-6"}>
      <p className={"font-bold"}>{title}</p>

      <div className={"flex flex-col gap-4 divide-y-1 divide-neutral-500"}>
        {data.map((data, index) => (
          <div key={index} className={"text-sm flex flex-col gap-2 pb-3"}>
            <p className={"text-sm text-neutral-700"}>{data.label}</p>
            <p>{data.value}</p>
          </div>
        ))}
      </div>

      <div></div>
    </CardContainer>
  );
};
