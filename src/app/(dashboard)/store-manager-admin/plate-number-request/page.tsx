import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import { tableInvoices, tableHeader } from "@/common/constant";
import CardContainer from "@/components/general/card-container";
import DashboardPath from "@/components/dashboard/dashboard-path";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DashboardTable from "@/components/dashboard/dashboard-table";

export default function Page() {
  return (
    <main className={"flex flex-col gap-8 md:gap-12 py-4"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
          },
          {
            label: "Plate Number Request",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
          },
        ]}
      />

      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-[2.5fr_auto] gap-4 items-end">
          <div className={"flex flex-col gap-3"}>
            <p className={"font-semibold"}>
              Enter the number of the plate you wish to assign
            </p>
            <Input placeholder="placeholder" />
          </div>
          <Button>Assign Plate Numbers</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-neutral-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable header={tableHeader} data={tableInvoices} />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination />
        </div>
      </div>
    </main>
  );
}
