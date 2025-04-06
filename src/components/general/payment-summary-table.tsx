import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { PaymentStatus } from "@/common/enum";
import { formattedAmount } from "@/common/helpers";

export interface PaymentItem {
  description: string;
  status: PaymentStatus;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  reference: string;
}

interface PaymentTableProps {
  data: PaymentItem[];
}

const PaymentTable = ({ data }: PaymentTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={"text-xs w-[60px]"}>S/N</TableHead>
          <TableHead className={"text-xs mx-auto"}>
            Payment Description
          </TableHead>
          <TableHead className={"text-xs"}>Status</TableHead>
          <TableHead className={"text-xs"}>Quantity</TableHead>
          <TableHead className={"text-xs"}>Unit Price</TableHead>
          <TableHead className={"text-xs"}>Total Amount</TableHead>
          <TableHead className={"text-xs"}>Payment Reference</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="text-sm">{index + 1}</TableCell>
            <TableCell className="text-sm mx-auto text-wrap">
              {item.description}
            </TableCell>
            <TableCell
              className={cn(
                "text-sm",
                item.status === PaymentStatus.PAID
                  ? "text-primary-500 font-medium"
                  : "text-danger font-semibold"
              )}
            >
              {item.status}
            </TableCell>
            <TableCell className="text-sm">{item.quantity}</TableCell>
            <TableCell className="text-sm">
              {formattedAmount(item.unitPrice)}
            </TableCell>
            <TableCell className="text-sm">
              {formattedAmount(item.totalAmount)}
            </TableCell>
            <TableCell className="text-sm font-semibold">
              {item.reference}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentTable;
