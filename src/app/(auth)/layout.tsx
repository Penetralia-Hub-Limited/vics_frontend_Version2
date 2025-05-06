"use client";

import { StoreProvider } from "../store-provider";
import { hotline, supportMail } from "@/common/constant";
import WhiteLogo from "../../../public/assets/logo/icon_white.svg";
import BG from "../../../public/assets/images/kwara_img.webp";
import Footer from "@/components/landing-page/navigation/footer";
import LPNavBar from "@/components/landing-page/navigation/nav-bar";
import LandingContactBar from "@/components/landing-page/navigation/contact-bar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full">
      <StoreProvider>
        <nav>
          <LandingContactBar contacts={hotline} emails={supportMail} />
          <LPNavBar />
        </nav>

        <div
          className={
            "relative py-18 bg-cover bg-center flex w-full items-center justify-center"
          }
          style={{ backgroundImage: `url(${BG.src})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50 top-0 h-full"></div>
          <div className="relative z-10 w-full h-full">{children}</div>
        </div>

        <Footer
          icon={WhiteLogo}
          hotline={hotline}
          support={supportMail}
          state={"Kwara state"}
        />
      </StoreProvider>
    </main>
  );
}
