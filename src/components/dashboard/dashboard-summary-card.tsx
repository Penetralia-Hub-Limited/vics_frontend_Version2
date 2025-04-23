"use client";

import { useRouter } from "next/navigation";
import { FC, Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { BarChartIcon } from "@/common/svgs";
import SelectDateRange from "./notification/dashboard-select";
import { DateRange } from "@/common/enum";
import { formattedAmount } from "@/common/helpers";

interface ISummaryCard {
  title: string;
  amount: number;
  selectedRange: DateRange;
  setSelectedRange: Dispatch<SetStateAction<DateRange>>;
  isCurrency?: boolean;
  route?: string;
}

const SummaryCard: FC<ISummaryCard> = ({
  title,
  route,
  amount,
  isCurrency,
  selectedRange,
  setSelectedRange,
}) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-4 border border-primary-300 rounded-lg p-5">
      <div className="flex flex-row justify-between items-center">
        <div className="w-fit border border-primary-200 rounded-lg p-2">
          <BarChartIcon />
        </div>
        <div className={"ml-auto"}>
          <SelectDateRange
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-sm">{title}</p>
          <p className="text-base md:text-lg font-bold">
            {isCurrency ? formattedAmount(amount) : amount.toLocaleString()}
          </p>
        </div>

        {route ? (
          <div>
            <Button onClick={() => router.push(route)} className="text-white">
              View
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
