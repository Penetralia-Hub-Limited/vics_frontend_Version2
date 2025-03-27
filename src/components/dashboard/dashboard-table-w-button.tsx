import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowActions?: (row: T) => { label: string; action: () => void }[];
};

export function DataTableWButton<T>({
  columns,
  data,
  rowActions,
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              className="text-center font-semibold text-xs w-[100px]"
              key={String(col.key)}
            >
              {col.label}
            </TableHead>
          ))}
          <TableHead className="text-center text-xs w-[100px]">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((header, colIndex) => (
              <TableCell key={colIndex} className="text-xs text-center">
                {header.key === "date" && row[header.key] instanceof Date ? (
                  <div className={"flex flex-col gap-1"}>
                    <p>
                      {format(row[header.key] as Date, "LLL. d yyyy") ?? "--"}
                    </p>
                    <p className={"font-light"}>
                      {format(row[header.key] as Date, "hh:mm:ss a") ?? ""}
                    </p>
                  </div>
                ) : (
                  (row[header.key]?.toString() ?? "--")
                )}
              </TableCell>
            ))}
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className={"border border-neutral-300 p-2 rounded-md"}
                    variant="ghost"
                    size="icon"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {rowActions &&
                    rowActions(row).map((action, idx) => (
                      <DropdownMenuItem
                        key={idx}
                        onClick={action.action}
                        className={"cursor-pointer hover:bg-neutral-50"}
                      >
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
