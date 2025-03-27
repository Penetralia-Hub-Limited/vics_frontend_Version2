"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useDemoRouter } from "@/hooks/useDemoRouter";
import { demoTheme } from "@/styles/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Navigation } from "@toolpad/core/AppProvider"; // Ensure correct import
import Logo from "../../assets/logo/icon_green.svg";

interface IDashboardCompLayout {
  children: React.ReactNode;
  sidebarItems: Navigation;
  window?: Window;
  title: string;
}

const LogoComponent = () => {
  return (
    <div className="flex items-center">
      <Image
        src={Logo}
        alt="Logo"
        className="object-contain shrink-0 self-stretch my-auto h-full"
      />
      <div className="hidden lg:block self-stretch">
        <p className="text-lg font-bold uppercase text-primary-600 tracking-widest w-full text-justify">
          Kwara state
        </p>
        <p className="text-[7px] text-primary-600 tracking-[0.002rem]">
          Vehicle Identification and Certification System
        </p>
      </div>
    </div>
  );
};

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
      navigation={sidebarItems} // ✅ `sidebarItems` is being used correctly
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <LogoComponent />,
        title: "",
        homeUrl: "/mla-admin",
      }}
    >
      <DashboardLayout>
        <PageContainer>{children}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardCompLayout;
