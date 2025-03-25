import { FC } from "react";
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
}

const DashboardCompSelect: FC<IDashboardCompSelect> = ({
  placeholder,
  items,
  title,
}) => {
  return (
    <div className={"flex flex-col gap-3"}>
      <p className={"font-semibold"}>{title}</p>

      <Select>
        <SelectTrigger
          className={"w-full border-1 border-neutral-500 rounded-lg"}
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
