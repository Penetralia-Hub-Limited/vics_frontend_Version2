import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import { storeManagerSidebarItems } from "@/common/side-bar";

export default function StoreManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar sidebarData={storeManagerSidebarItems} />
      <main className={"flex flex-col w-full"}>
        <div className={"flex flex items-center h-20"}>
          <div className={"block md:hidden"}>
            <SidebarTrigger />
          </div>
          <DashboardNavBar pageTitle={""} />
        </div>
        <div className={"px-4 py-8 bg-neutral-100/30"}>{children}</div>
      </main>
    </SidebarProvider>
  );
}
