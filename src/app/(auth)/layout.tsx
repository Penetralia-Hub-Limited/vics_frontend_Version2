import LPNavBar from "@/pages/landing-page/navigation/nav-bar";
import Footer from "@/pages/landing-page/navigation/footer";
import { hotline, supportMail } from "@/common/constant";
import LandingContactBar from "@/pages/landing-page/navigation/contact-bar";
import WhiteLogo from "@/assets/logo/icon_white.svg";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
