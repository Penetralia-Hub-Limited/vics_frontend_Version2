import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/general/pagination";
import { tableInvoices, tableHeaders } from "@/common/constant";
import CardContainer from "@/components/general/card-container";
import DashboardTable from "@/components/dashboard/dashboard-table";
import DashboardCompSelect from "@/components/dashboard/dashboard-component-select";
import DashboardPath from "@/components/dashboard/dashboard-path";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

export default function Page() {
  return (
    <main className={"flex flex-col gap-8 md:gap-12 py-4"}>
      <div className={""}>
        <DashboardPath
          pathdata={[
            {
              label: "Dashboard",
              Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Manage Stock",
              Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
              link: "/store-manager-admin/dashboard",
            },
            {
              label: "Stock Information",
              Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
              link: "/store-manager-admin/stock-information",
            },
          ]}
        />
      </div>

      <CardContainer className={"flex flex-col gap-5"}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className={"flex flex-col gap-3"}>
            <p className={"font-semibold"}>placeholder</p>
            <Input placeholder="placeholder" />
          </div>
          <DashboardCompSelect
            title={"Type"}
            placeholder={"-- Select Type --"}
            items={["private", "commercial"]}
          />

          <Button>Search Store</Button>
        </div>
      </CardContainer>

      <div
        className={"flex flex-col gap-3 border-1 border-neutral-300 rounded-lg"}
      >
        <div
          className={"border-t-1 border-neutral-300 rounded-lg overflow-hidden"}
        >
          <DashboardTable headers={tableHeaders} data={tableInvoices} />
        </div>
        <div className={"p-5 ml-auto"}>
          <Pagination />
        </div>
      </div>
    </main>
  );
}
