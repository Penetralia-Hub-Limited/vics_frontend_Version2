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

export type Payment = {
  id: number;
  name: string;
  date: string;
  time: string;
  status: number;
};

export const payments: Payment[] = [
  {
    id: 1,
    name: "Akanbi Sarah Olupelumi",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 75,
  },
  {
    id: 2,
    name: "Sheik Akanji Toluwalese",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 50,
  },
  {
    id: 3,
    name: "Lola Sabo Mohammed",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 25,
  },
  {
    id: 4,
    name: "Abdullah Al-Ikory Kunle",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 75,
  },
  {
    id: 5,
    name: "Sheik Akanji Toluwalese",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 50,
  },
  {
    id: 6,
    name: "Lola Sabo Mohammed",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 25,
  },
  {
    id: 7,
    name: "Akanbi Sarah Olupelumi",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 75,
  },
  {
    id: 8,
    name: "Sheik Akanji Toluwalese",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 50,
  },
  {
    id: 9,
    name: "Lola Sabo Mohammed",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 25,
  },
  {
    id: 10,
    name: "Abdullah Al-Ikory Kunle",
    date: "Mar 4, 2025",
    time: "09:32:44 AM",
    status: 75,
  },
];

interface IProgressTable {
  data: Payment[];
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
          <TableHead className="text-xs text-center">Payment Status</TableHead>
          <TableHead className="w-10"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((progress) => (
          <TableRow key={progress.id}>
            <TableCell className="text-xs text-center">{progress.id}</TableCell>
            <TableCell className="text-xs text-center font-medium">
              {progress.name}
            </TableCell>
            <TableCell className="text-xs text-center">
              {progress.date} | {progress.time}
            </TableCell>
            <TableCell>
              <div className="flex flex-row w-full items-center gap-2">
                <Progress value={progress.status} className="w-[60%]" />
                <p className={"font-semibold text-xs"}>{progress.status}%</p>
              </div>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="border border-neutral-300 p-2 rounded-md"
                  >
                    <EllipsisVertical className="h-5 w-5" />
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
