"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, TaxPayerSVG } from "@/common/svgs";
import { TaxPayerInformationCard } from "@/components/dashboard/tax-payer/information-card";
import DashboardTable from "@/components/dashboard/dashboard-table";
import {
  vehicleColumns,
  invoiceColumns,
  invoiceData,
  vehicleData,
} from "@/common/constant";

const taxPayerInfo = {
  fullName: "Akanbi Sarah Olupelumi",
  email: "akanbisaraholu@example.com",
  phone: "09012345678",
  address: "Omu-Aran-Oja Oba, Ilorin 240243",
  profileImage:
    "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
};

export default function Page() {
  const itemsPerPage = 10;
  const [currentVehiclePage, setCurrentVehiclePage] = useState<number>(1);
  const [currentInvoicePage, setCurrentInvoicePage] = useState<number>(1);

  const totalVehiclePages = Math.ceil(vehicleData?.length / itemsPerPage);
  const totalInvoicePages = Math.ceil(invoiceData?.length / itemsPerPage);

  const paginatedVehicleData = vehicleData.slice(
    (currentVehiclePage - 1) * itemsPerPage,
    currentVehiclePage * itemsPerPage
  );
  const paginatedInvoiceData = invoiceData.slice(
    (currentInvoicePage - 1) * itemsPerPage,
    currentInvoicePage * itemsPerPage
  );

  return (
    <main className={"flex flex-col gap-8 md:gap-12 overflow-hidden"}>
      <div
        className={
          "flex flex-col gap-5 md:flex-row justify-between items-center"
        }
      >
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: DashboardSVG,
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Tax Payer Dashboard",
              Icon: TaxPayerSVG,
              link: "/store-manager-admin/tax-payer",
            },
          ]}
        />

        <Button>Create New Tax Payer</Button>
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <TaxPayerInformationCard taxPayerInfo={taxPayerInfo} />
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div className={"border-t-1 border-neutral-300 rounded-lg"}>
          <p className={"font-bold p-4"}>Vehicle(s) Information</p>
          <DashboardTable
            headers={vehicleColumns}
            data={paginatedVehicleData}
          />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination
            totalPages={totalVehiclePages}
            setCurrentPage={setCurrentVehiclePage}
          />
        </div>
      </div>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div className={"border-t-1 border-neutral-300 rounded-lg"}>
          <p className={"font-bold p-4"}>Invoice(s) Information</p>
          <DashboardTable
            headers={invoiceColumns}
            data={paginatedInvoiceData}
          />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination
            totalPages={totalInvoicePages}
            setCurrentPage={setCurrentInvoicePage}
          />
        </div>
      </div>
    </main>
  );
}
