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
            label: "Plate Number Request",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
            link: "/store-manager-admin/plate-number-request",
          },
          {
            label: "Assessment",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
            link: "/store-manager-admin/assessment",
          },
        ]}
      />
    </main>
  );
}
