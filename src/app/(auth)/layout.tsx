import LPNavBar from "@/components/landingpage/navigation/nav-bar";
import Footer from "@/components/landingpage/navigation/footer";
import { hotline, supportMail } from "@/common/constant";
import LandingContactBar from "@/components/landingpage/navigation/contact-bar";
import WhiteLogo from "@/assets/logo/icon_white.svg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <nav>
        <LandingContactBar contacts={hotline} emails={supportMail} />
        <LPNavBar />
      </nav>

      <main className="h-96">{children}</main>

      <Footer
        icon={WhiteLogo}
        hotline={hotline}
        support={supportMail}
        state={"Kwara state"}
      />
    </main>
  );
}
