"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import { DashboardSVG, DraftSVG, SalesSVG } from "@/common/svgs";
import InputWithLabel from "@/components/auth/input-comp";
import ProgressTable from "@/components/dashboard/dashboard-progress-table";
import { payments } from "@/components/dashboard/dashboard-progress-table";

export default function Page() {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchDrafts, setSearchDraft] = useState<string>("");

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const paginatedData = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={"flex flex-col gap-8 md:gap-12"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: DashboardSVG,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Sales Dashboard",
            Icon: SalesSVG,
            link: "/mla-amin/sales",
          },
          {
            label: "Vehicle Dashboard",
            Icon: DraftSVG,
            link: "/mla-amin/sales/drafts",
          },
        ]}
      />

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4 items-end">
          <InputWithLabel
            items={{
              id: "searchDraft",
              label: "Search in Drafts",
              placeholder: "Enter Name/ Keyword",
              type: "text",
              htmlfor: "searchDraft",
            }}
            value={searchDrafts}
            onChange={(e) => setSearchDraft(e.target.value)}
          />

          <Button>Search</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div className={"border-t-1 border-neutral-300 rounded-lg"}>
          <ProgressTable
            data={paginatedData}
            trigger={() => router.push("/mla-admin/sales/new-sales")}
          />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </main>
  );
}
