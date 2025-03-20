import LPNavBar from "../navigation/nav-bar";
import HeroSection from "./hero-section";
import LandingContactBar from "../navigation/contact-bar";
import LandingRegistration from "./registration-steps";
import { hotline, supportMail } from "@/common/constant";
import WhiteLogo from "@/assets/logo/icon_white.svg";
import Footer from "../navigation/footer";
import KWLogo from "@/assets/logo/KW-logo.svg";

const LandingPage = () => {
  return (
    <main className={"flex flex-col"}>
      <div>
        <LandingContactBar contacts={hotline} emails={supportMail} />
        <LPNavBar />
      </div>

      <div className={""}>
        <HeroSection state={"kwara state"} icon={WhiteLogo} />
        <LandingRegistration />
      </div>

      <Footer
        icon={WhiteLogo}
        hotline={hotline}
        support={supportMail}
        state={"Kwara state"}
      />
    </main>
  );
};

export default LandingPage;
