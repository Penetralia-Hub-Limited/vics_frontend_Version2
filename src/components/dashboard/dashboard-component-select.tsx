"use client";

import { FC, SetStateAction, Dispatch } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IDashboardCompSelect {
  placeholder: string;
  items: string[];
  title: string;
  selected: string | undefined;
  onSelect: Dispatch<SetStateAction<string | undefined>>;
}

const DashboardCompSelect: FC<IDashboardCompSelect> = ({
  placeholder,
  items,
  title,
  selected,
  onSelect,
}) => {
  return (
    <div className={"flex flex-col gap-3"}>
      <p className={"text-sm font-semibold"}>{title}</p>

      <Select value={selected} onValueChange={onSelect}>
        <SelectTrigger
          className={
            "w-full border-1 border-primary-500 rounded-lg text-neutral-800 capitalize"
          }
        >
          <SelectValue className={"capitalize"} placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, index) => (
            <SelectItem className={"capitalize"} key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardCompSelect;
