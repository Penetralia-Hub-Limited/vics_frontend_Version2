"use client";
// OLD LAYOUT DESIGN
import { FC, useState, useEffect } from "react";
import LogoComponent from "../general/logo";
import { useDemoRouter } from "@/hooks/useDemoRouter";
import { demoTheme } from "@/styles/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Logo from "../../assets/logo/icon_green.svg";
import { Navigation } from "@toolpad/core/AppProvider";

interface IDashboardCompLayout {
  children: React.ReactNode;
  sidebarItems: Navigation;
  window?: Window;
  title?: string;
}

const DashboardCompLayout: FC<IDashboardCompLayout> = ({
  children,
  window,
  sidebarItems,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useDemoRouter("/dashboard");
  if (!mounted) return null;
  const demoWindow = typeof window !== "undefined" ? window : undefined;

  return (
    <AppProvider
      navigation={sidebarItems}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <LogoComponent logo={Logo} state={"Kwara state"} />,
        title: "",
        homeUrl: "/",
      }}
    >
      <DashboardLayout>
        <PageContainer>{children}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardCompLayout;
