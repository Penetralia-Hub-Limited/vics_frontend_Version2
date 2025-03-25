import DashboardPath from "@/components/dashboard/dashboard-path";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

export default function Page() {
  return (
    <main className={"h-96"}>
      <DashboardPath
        pathdata={[
          {
            label: "Dashboard",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
            link: "/store-manager-admin/dashboard",
          },
          {
            label: "Store Report Dashboard",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
            link: "/store-manager-admin/report",
          },
        ]}
      />
    </main>
  );
}
