import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Progress } from "@/components/ui/progress";
import { PlateNumberOrderData } from "@/store/plate-number-orders/plate-number-order-types";

type PlateNumberProp = PlateNumberOrderData & {
  sid: number;
  date_created: string;
};

interface IProgressTable {
  data: PlateNumberProp[];
  trigger: () => void;
}

const ProgressTable: FC<IProgressTable> = ({ data, trigger }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs w-16 text-center">S/N</TableHead>
          <TableHead className="text-xs text-center">Name</TableHead>
          <TableHead className="text-xs text-center">Date</TableHead>
          <TableHead className="text-xs text-center w-[30%]">
            Payment Status
          </TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((progress) => (
          <TableRow key={progress?.sid}>
            <TableCell className="text-xs text-center">
              {progress?.sid}
            </TableCell>
            <TableCell className="text-xs text-center">
              {progress?.creator?.firstname ?? "-"}{" "}
              {progress?.creator?.lastname ?? "-"}
            </TableCell>
            <TableCell className="text-xs text-center">
              {progress.date_created}
            </TableCell>
            <TableCell>
              <div className="flex flex-row w-full items-center justify-center gap-2">
                <Progress
                  value={progress?.total_steps / progress?.steps_completed}
                  className="w-[60%]"
                />
                <p className={"font-semibold text-xs"}>
                  {progress?.total_steps / progress?.steps_completed / 100}%
                </p>
              </div>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="border border-primary-500 p-1 rounded-md"
                  >
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className={
                      "flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50"
                    }
                    onClick={trigger}
                  >
                    View details
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProgressTable;
