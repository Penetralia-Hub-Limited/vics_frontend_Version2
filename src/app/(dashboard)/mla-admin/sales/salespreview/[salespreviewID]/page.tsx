"use client";

import { useRouter, useParams } from "next/navigation";
import { DashboardSVG, SalesSVG } from "@/common/svgs";
import { Button } from "@/components/ui/button";
import ResponseModal from "@/components/general/response-modal";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { InformationCardX } from "@/components/general/information-card";
import { AmountDisplay } from "@/components/general/display-amount";
import { cn } from "@/lib/utils";
import { selectFoundVehicleDatafromUserID } from "@/store/vehicle/vehicle-selector";
import { selectUserByID } from "@/store/user/user-selector";
import { useSelector } from "react-redux";
import { formattedAmount, parseCurrency } from "@/common/helpers";

const tableHeaders = [
  { key: "id", title: "S/N" },
  { key: "paymentdescription", title: "Payment Description" },
  { key: "qty", title: "Quantity" },
  { key: "unitprice", title: "Unit Price" },
  { key: "totalamount", title: "Total Amount" },
];

const vehicleHeaders = [
  { key: "sid", title: "S/N" },
  { key: "chasis_number", title: "Chasis No." },
  { key: "engine_number", title: "Engine No." },
  { key: "make", title: "Vehicle Make" },
  { key: "category", title: "Vehicle Category" },
  { key: "type", title: "Plate Type" },
  { key: "number", title: "Plate Number" },
  { key: "color", title: "Color" },
];

const tableData = [
  {
    id: 1,
    paymentdescription:
      "ROADWORTHINESS/COMPUTERIZED VEHICLE-PRIVATE CAR ABOVE 2000CC",
    qty: 1,
    unitprice: formattedAmount(3750),
    totalamount: formattedAmount(3750),
  },
  {
    id: 2,
    paymentdescription:
      "PLATE NUMBER VEHICLE - Private Vehicle Between 2.1 - 3.0",
    qty: 1,
    unitprice: formattedAmount(18750),
    totalamount: formattedAmount(18750),
  },
  {
    id: 4,
    paymentdescription: "Motor Vehicle Operation Card Fee",
    qty: 1,
    unitprice: formattedAmount(1000),
    totalamount: formattedAmount(1 * 1000),
  },
  {
    id: 5,
    paymentdescription: "VEHICLE LICENSE-PRIVATE VEHICLE BETWEEN 2.1 - 3.0",
    qty: 1,
    unitprice: formattedAmount(2500),
    totalamount: formattedAmount(2500),
  },
  {
    id: 6,
    paymentdescription: "INSURANCE PRIVATE",
    qty: 1,
    unitprice: formattedAmount(15500),
    totalamount: formattedAmount(15500),
  },
];

export default function Page() {
  const router = useRouter();
  const params = useParams<{ salespreviewID: string }>();
  const userInfo = useSelector((state) =>
    selectUserByID(state, params.salespreviewID)
  )[0];
  const vehicleInfo = useSelector((state) =>
    selectFoundVehicleDatafromUserID(state, params.salespreviewID)
  );

  if (!userInfo) {
    return (
      <p className="h-screen flex items-center justify-center text-center text-primary-500">
        Data not found.
      </p>
    );
  }

  const getTotal = tableData.reduce(
    (acc, table) => acc + parseCurrency(table.totalamount),
    0
  );

  const userData = [
    {
      label: "Full Name",
      value: userInfo.firstname
        ? `${userInfo?.firstname} ${userInfo?.lastname}`
        : "Not Available",
    },
    {
      label: "Email",
      value: userInfo?.email ?? "Not Available",
    },
    {
      label: "Phone Number",
      value: userInfo?.phone ?? "Not Available",
    },
    {
      label: "Address",
      value: userInfo.address ?? "Not Available",
    },
  ];

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
            link: "/mla-admin/sales/sales-dashboard",
          },
          {
            label: "Sales Preview",
            Icon: SalesSVG,
            link: `/mla-admin/sales/${params.salespreviewID}`,
          },
        ]}
      />

      <div className={"flex flex-col gap-4"}>
        <InformationCardX title={"Buyer Information"} data={userData} />
        {/* <InformationCardX title={"Vehicle Information"} data={vehicleData} /> */}
      </div>

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <p className={"text-sm pt-2 px-5 font-bold"}>Vehicle Information</p>
        <div
          className={"border-t-1 border-primary-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable headers={vehicleHeaders} data={vehicleInfo} />
        </div>
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
          <AmountDisplay amount={getTotal} />
        </div>
      </div>

      <div className={cn("flex flex-row gap-5 mx-auto")}>
        <Button variant={"outline"}>Previous</Button>
        <ResponseModal
          title={"Invoice Issued Successfully"}
          content={<></>}
          btnText={"Proceed to Sales"}
          footerBtnText={"Print Invoice"}
          trigger={() =>
            router.push(`/mla-admin/sales/invoice/${params.salespreviewID}`)
          }
        />
      </div>
    </main>
  );
}
