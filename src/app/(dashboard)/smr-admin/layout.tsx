import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/navigation/sidebar/sidebar";
import DashboardNavBar from "@/components/navigation/menubar/dashboard-navbar";
import { SMRAdminSidebar } from "@/common/side-bar";

export default function SMRDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-neutral-100">
        {/* Sidebar */}
        <AppSidebar sidebarData={SMRAdminSidebar} />

        {/* Main Content */}
        <main className="flex flex-col w-full">
          {/* Navbar */}
          <div className="flex items-center h-20 px-4 bg-white shadow-sm">
            <div className="block md:hidden">
              <SidebarTrigger />
            </div>
            <DashboardNavBar pageTitle="SMR Dashboard" />
          </div>

          {/* Content & Notifications */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_auto] gap-4 px-6 py-4">
            {/* Main Content */}
            <div className="flex flex-col">{children}</div>

            {/* Notifications */}
            <aside className="w-full max-w-xs bg-white shadow-sm p-4 rounded-lg">
              {/* Notification Component Placeholder */}
              <div className="text-lg font-semibold">Notifications</div>
              <div className="mt-4 text-sm text-neutral-600">
                No new notifications
              </div>
            </aside>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
