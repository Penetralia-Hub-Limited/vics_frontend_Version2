import DashboardCompLayout from "@/components/dashboard/dashboard-layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardCompLayout>
      <main>{children}</main>
    </DashboardCompLayout>
  );
}
