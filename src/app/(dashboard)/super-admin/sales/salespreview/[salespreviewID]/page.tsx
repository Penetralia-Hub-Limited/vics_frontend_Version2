"use client";

import { useRouter, useParams } from "next/navigation";
import { DashboardSVG, SalesSVG } from "@/common/svgs";
import DashboardPath from "@/components/dashboard/dashboard-path";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { InformationCard } from "@/components/general/information-card";
import { AmountDisplay } from "@/components/general/display-amount";
import ResponseModal from "@/components/general/response-modal";
import { Button } from "@/components/ui/button";
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
    totalamount: 4334334,
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
            link: "/super-admin/sales/sales-report",
          },
          {
            label: "Sales Preview",
            Icon: SalesSVG,
            link: "/super-admin/sales/sales-preview",
          },
        ]}
      />

      <div className={"flex flex-col md:flex-row gap-4"}>
        <InformationCard title={"Buyer Information"} data={userData} />
        <InformationCard title={"Vehicle Information"} data={vehicleData} />
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

      <div className="flex flex-row gap-4 ml-auto">
        <Button variant={"outline"}>Back</Button>
        <ResponseModal
          title={"Success"}
          content={<p>Invoice Issued Successfully</p>}
          btnText={"Proceed"}
          trigger={() =>
            router.push(`/super-admin/sales/invoice/${params.salespreviewID}`)
          }
          footerBtnText={"Print Invoice"}
        />
      </div>
    </main>
  );
}
