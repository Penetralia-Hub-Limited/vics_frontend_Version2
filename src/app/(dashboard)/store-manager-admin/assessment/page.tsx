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
          },
          {
            label: "Plate Number Request",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
          },
          {
            label: "Assessment",
            Icon: <SpaceDashboardIcon sx={{ fontSize: 15 }} />,
          },
        ]}
      />
    </main>
  );
}
