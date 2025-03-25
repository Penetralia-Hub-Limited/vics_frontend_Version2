"use client";

import { FC } from "react";
import { Button } from "../ui/button";
import { BarChartIcon } from "@/common/svgs";
import SelectDateRange from "./notification/dashboard-select";

const formattedAmount = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

interface ISummaryCard {
  title: string;
  amount: number;
  currency?: boolean;
  period?: string;
}

const SummaryCard: FC<ISummaryCard> = ({ title, amount, currency }) => {
  return (
    <div className="w-full flex flex-col gap-4 border border-neutral-200 rounded-lg p-5">
      <div className="flex flex-row justify-between items-center">
        <div className="w-fit border border-neutral-200 rounded-lg p-2">
          <BarChartIcon />
        </div>
        <div>
          <SelectDateRange />
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <div>
          <p className="text-sm">{title}</p>
          <p className="text-base md:text-lg font-bold">
            {currency ? formattedAmount(amount) : amount}
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
