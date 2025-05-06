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
import { useSelector } from "react-redux";

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
    totalamount: 4334,
  },
];

export default function Page() {
  const router = useRouter();
  const params = useParams<{ salespreviewID: string }>();
  const vehicleInfo = useSelector((state) =>
    selectFoundVehicleDatafromUserID(state, params.salespreviewID)
  )[0];

  if (!vehicleInfo) {
    return (
      <p className="h-screen flex items-center justify-center text-center text-primary-500">
        Data not found.
      </p>
    );
  }

  const getTotal = tableData.reduce(
    (acc, table) => acc + table?.totalamount,
    0
  );

  const userData = [
    {
      label: "Full Name",
      value: vehicleInfo?.owner_name ?? "Not Available",
    },
    {
      label: "Email",
      value: vehicleInfo?.owner?.email ?? "Not Available",
    },
    {
      label: "Phone Number",
      value: vehicleInfo?.owner?.phone ?? "Not Available",
    },
    {
      label: "Address",
      value: vehicleInfo.owner?.address ?? "Not Available",
    },
  ];
  const vehicleData = [
    { label: "Chasis Number", value: vehicleInfo.chasis_number ?? "N/A" },
    { label: "Engine Number", value: vehicleInfo.engine_number ?? "N/A" },
    { label: "Vehicle Make", value: vehicleInfo.make ?? "N/A" },
    { label: "Vehicle Model", value: vehicleInfo.model ?? "N/A" },
    { label: "Vehicle Category", value: vehicleInfo.category ?? "N/A" },
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
        <InformationCardX title={"Vehicle Information"} data={vehicleData} />
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
