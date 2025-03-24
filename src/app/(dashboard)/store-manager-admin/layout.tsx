import DashboardCompLayout from "@/components/dashboard/dashboard-layout";
// import storeManagersideBarItems

export default function StoreManagerAdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardCompLayout sidebarItems={[]}>
      <main>{children}</main>
    </DashboardCompLayout>
  );
}
