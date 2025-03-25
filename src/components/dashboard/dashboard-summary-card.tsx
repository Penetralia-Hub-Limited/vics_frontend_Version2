"use client";

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
}

const SummaryCard: FC<ISummaryCard> = ({
  title,
  amount,
  isCurrency,
  selectedRange,
  setSelectedRange,
}) => {
  return (
    <div className="w-full flex flex-col gap-4 border border-neutral-200 rounded-lg p-5">
      <div className="flex flex-row justify-between items-center">
        <div className="w-fit border border-neutral-200 rounded-lg p-2">
          <BarChartIcon />
        </div>
        <div>
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
            {isCurrency ? formattedAmount(amount) : amount}
          </p>
        </div>

        <div>
          <Button className="text-white">View</Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
