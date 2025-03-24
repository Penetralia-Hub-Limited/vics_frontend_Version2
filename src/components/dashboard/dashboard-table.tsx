import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface IDashboardTable {
  header: {
    title: string;
  }[];
  data: {
    lga: string;
    range: string;
    endcode: string;
    type: string;
    createdby: string;
    Date: Date;
    initialQty: number;
    currentQty: number;
  }[];
}

const DashboardTable: FC<IDashboardTable> = ({ header, data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {header.map((header, index) => (
            <TableHead
              key={index}
              className={"text-center font-semibold text-xs w-[100px]"}
            >
              {header.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className={"text-xs text-center"}>{index + 1}</TableCell>
            <TableCell className={"text-xs text-center"}>
              {invoice.lga}
            </TableCell>
            <TableCell className={"text-xs text-center "}>
              {invoice.range}
            </TableCell>
            <TableCell className={"text-xs text-center "}>
              {invoice.endcode}
            </TableCell>
            <TableCell className={"text-xs text-center "}>
              {invoice.type}
            </TableCell>
            <TableCell className={"text-xs text-center "}>
              {invoice.createdby}
            </TableCell>
            <TableCell className={"flex flex-col gap-1 text-xs text-center "}>
              <p>{format(invoice.Date, "LLL. d yyyy")}</p>
              <p>{format(invoice.Date, "hh:mm:ss a")}</p>
            </TableCell>
            <TableCell className={"text-xs text-center"}>
              {invoice.initialQty.toString()}
            </TableCell>
            <TableCell className={"text-xs text-center"}>
              {invoice.currentQty.toString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardTable;
