import { DashboardSVG, SalesSVG } from "@/common/svgs";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { InformationCard } from "@/components/general/information-card";
import { AmountDisplay } from "@/components/general/display-amount";

const salesData = [
  {
    label: "Full Name",
    value: "Bernard David Ikechukwu",
  },
  {
    label: "Email",
    value: "Bernard@DavidIkechukwu.com",
  },
  {
    label: "Phone Number",
    value: "23232323333",
  },
  {
    label: "Address",
    value: "121 Pastoral lane Briks",
  },
];

const tableHeaders = [
  { key: "id", title: "S/N" },
  { key: "paymentdescription", title: "Payment Description" },
  { key: "qty", title: "Quantity" },
  { key: "unitprice", title: "Unit Price" },
  { key: "totalamount", title: "Total Amount" },
];

const tableData = [
  {
    id: 1,
    paymentdescription: "JKLMMNASKH2342423",
    qty: 4,
    unitprice: 4334,
    totalamount: 4334334,
  },
  {
    id: 2,
    paymentdescription: "JKLMMNASKH2342423",
    qty: 4,
    unitprice: 4334,
    totalamount: 4334334,
  },
  {
    id: 3,
    paymentdescription: "JKLMMNASKH2342423",
    qty: 4,
    unitprice: 4334,
    totalamount: 4334334,
  },
];

export default function Page() {
  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/super-admin/dashboard",
          },
          {
            label: "Sales Dashboard",
            Icon: SalesSVG,
            link: "/mla-admin/sales/dashboard",
          },
          {
            label: "Sales Preview",
            Icon: SalesSVG,
            link: "/mla-admin/sales/sales-preview",
          },
        ]}
      />

      <div className={"flex flex-col md:flex-row gap-4"}>
        <InformationCard title={"Buyers Information"} data={salesData} />
        <InformationCard title={"Vehicle's Information"} data={salesData} />
      </div>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable headers={tableHeaders} data={tableData} />
        </div>
        <div className={"w-full border-t-1 border-primary-300"}>
          <AmountDisplay amount={34230} />
        </div>
      </div>
    </main>
  );
}
