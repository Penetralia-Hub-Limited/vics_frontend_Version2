"use client";

import React, { FC, SetStateAction, Dispatch } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import Loading from "@/components/general/spinner";
import { Button } from "../ui/button";

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
          <SelectGroup>
            <SelectLabel>Select</SelectLabel>
            {items.length === 0 ? (
              <Loading screen={"default"} size={20} />
            ) : (
              items.map((item, index) => (
                <SelectItem className={"capitalize"} key={index} value={item}>
                  {item}
                </SelectItem>
              ))
            )}
          </SelectGroup>
          <Button
            className="hover:bg-danger/20 text-danger w-full px-2"
            variant="secondary"
            size="sm"
            onMouseDown={(e) => {
              e.stopPropagation();
              onSelect("");
            }}
          >
            Clear
          </Button>
        </SelectContent>
      </Select>
    </div>
  );
};

export default React.memo(DashboardCompSelect);
