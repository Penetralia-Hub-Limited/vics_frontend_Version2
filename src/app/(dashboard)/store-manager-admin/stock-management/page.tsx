import DashboardTable from "@/components/dashboard/dashboard-table";
import { tableInvoices, tableHeader } from "@/common/constant";
import { Button } from "@/components/ui/button";
import CardContainer from "@/components/general/card-container";

export default function Page() {
  return (
    <main className={"flex flex-col gap-3 py-4"}>
      <div className={"flex flex-row justify-between items-center"}>
        <div>Stock Management</div>
        <Button>Create New Stock</Button>
      </div>

      <CardContainer>
        <div>card</div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-neutral-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable header={tableHeader} data={tableInvoices} />
        </div>
        <div className={"py-5 ml-auto"}>Pagination</div>
      </div>
    </main>
  );
}
