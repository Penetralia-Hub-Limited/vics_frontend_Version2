import WhiteLogo from "@/assets/logo/icon_white.svg";
import { hotline, supportMail } from "@/common/constant";
import BG from "../../assets/landing-page/login_hero.jpg";
import Footer from "@/components/landing-page/navigation/footer";
import LPNavBar from "@/components/landing-page/navigation/nav-bar";
import LandingContactBar from "@/components/landing-page/navigation/contact-bar";

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

      <div
        className={
          "py-18 h-full bg-cover bg-center flex w-full items-center justify-center grayscale-[0.5]"
        }
        style={{ backgroundImage: `url(${BG.src})` }}
      >
        {children}
      </div>

      <Footer
        icon={WhiteLogo}
        hotline={hotline}
        support={supportMail}
        state={"Kwara state"}
      />
    </main>
  );
}
