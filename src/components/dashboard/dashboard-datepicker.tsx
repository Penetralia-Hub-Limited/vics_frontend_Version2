import { FC, Dispatch, SetStateAction } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface IDatePicker {
  title: string;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

const DatePicker: FC<IDatePicker> = ({ title, date, setDate }) => {
  return (
    <div className={"flex flex-col gap-3"}>
      <p className={"text-sm font-semibold"}>{title}</p>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="date"
            className="font-normal border border-primary-500"
          >
            {date ? date.toLocaleDateString() : "mm/dd/yy"}
            <CalendarIcon className="ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border border-primary-500"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
