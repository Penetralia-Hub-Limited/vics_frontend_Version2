import DashboardCompLayout from "@/components/dashboard/dashboard-layout";
import { storeManagersideBarItems } from "@/common/navdata";

export default function StoreManagerAdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardCompLayout sidebarItems={storeManagersideBarItems}>
      <main>{children}</main>
    </DashboardCompLayout>
  );
}
