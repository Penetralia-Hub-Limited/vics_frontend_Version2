import { FC } from "react";
import CardContainer from "@/components/general/card-container";

type DataProp = {
  label: string;
  value: string | number;
};

interface InformationCardProps {
  title: string;
  data: DataProp[];
}

export const InformationCard: FC<InformationCardProps> = ({ title, data }) => {
  return (
    <CardContainer className={"flex flex-col gap-6"}>
      <p className={"font-bold"}>{title}</p>

      <div className={"flex flex-col gap-6 divide-y-1 divide-neutral-500"}>
        {data.map((data, index) => (
          <div key={index} className={"text-sm flex flex-col gap-2 pb-3"}>
            <p className={"text-xs text-neutral-700 mb-1"}>{data.label}</p>
            <p className="text-sm">{data.value}</p>
          </div>
        ))}
      </div>

      <div></div>
    </CardContainer>
  );
};

export const InformationCardX: FC<InformationCardProps> = ({ title, data }) => {
  const groupedRows: DataProp[][] = [];
  for (let i = 0; i < data.length; i += 2) {
    groupedRows.push(data.slice(i, i + 2));
  }

  return (
    <div className="">
      <h2 className="font-semibold text-base mb-4">{title}</h2>

      <div className="flex flex-col divide-y divide-neutral-500">
        {groupedRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-1 md:grid-cols-2 gap-y-6 py-3"
          >
            {row.map((item, itemIndex) => (
              <div key={itemIndex}>
                <p className="text-sm text-neutral-700 mb-1">{item.label}</p>
                <p className="text-base">{item.value || "—"}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
