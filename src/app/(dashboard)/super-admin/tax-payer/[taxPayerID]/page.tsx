"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, TaxPayerSVG } from "@/common/svgs";
import { TaxPayerInformationCard } from "@/components/dashboard/tax-payer/information-card";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { vehicleColumns, invoiceColumns, invoiceData } from "@/common/constant";
import { selectTaxPayersByID } from "@/store/user/user-selector";
import { selectVehicleMatchedByUser } from "@/store/vehicle/vehicle-selector";
import { selectInvoicesWithUserID } from "@/store/invoice/invoice-selector";

export default function Page() {
  const params = useParams<{ taxPayerID: string }>();
  const { taxPayerID } = params;

  const vehicleInfo = useSelector((vehicleState) =>
    selectVehicleMatchedByUser(vehicleState, taxPayerID)
  );
  const taxPayerInformation = useSelector((taxpayerState) =>
    selectTaxPayersByID(taxpayerState, taxPayerID)
  );
  const invoiceInfo = useSelector((invoiceState) =>
    selectInvoicesWithUserID(invoiceState, taxPayerID)
  );
  const taxpayer = taxPayerInformation[0];

  console.log(invoiceInfo);

  const taxPayerInfo = {
    fullName: taxpayer?.fullname ?? "Not Available",
    email: taxpayer?.email ?? "Not Available",
    phone: taxpayer?.phone ?? "Not Available",
    address: taxpayer?.address ?? "Not Available",
    profileImage: taxpayer?.image ?? undefined,
  };

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/super-admin/dashboard",
          },
          {
            label: "Tax Payer Dashboard",
            Icon: TaxPayerSVG,
            link: "/super-admin/tax-payer",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <TaxPayerInformationCard taxPayerInfo={taxPayerInfo} />
      </CardContainer>

      {vehicleInfo && (
        <div
          className={
            "flex flex-col gap-3 border-1 border-primary-300 rounded-lg"
          }
        >
          <div className={"border-t-1 border-primary-300 rounded-lg"}>
            <p className={"font-bold p-4"}>Vehicle(s) Information</p>
            <DashboardTable headers={vehicleColumns} data={[]} />
          </div>
        </div>
      )}

      <div
        className={"flex flex-col gap-3 border-1 border-primary-300 rounded-lg"}
      >
        <div className={"border-t-1 border-primary-300 rounded-lg"}>
          <p className={"font-bold p-4"}>Invoice(s) Information</p>
          <DashboardTable headers={invoiceColumns} data={invoiceData} />
        </div>
      </div>
    </main>
  );
}
