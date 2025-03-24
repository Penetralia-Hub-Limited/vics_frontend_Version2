import DashboardCompLayout from "@/components/dashboard/dashboard-layout";

export default function MLAAdminDashboardLayout({
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
