import LPNavBar from "../navigation/nav-bar";
import HeroSection from "./hero-section";
import LandingContactBar from "../navigation/contact-bar";
import LandingRegistration from "./registration-steps";
import { hotline, supportMail } from "@/common/constant";
import WhiteLogo from "@/assets/logo/icon_white.svg";

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
    </main>
  );
};

export default LandingPage;
