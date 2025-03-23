import HeroSection from "./hero-section";
import Footer from "../navigation/footer";
import LPNavBar from "../navigation/nav-bar";
import WhiteLogo from "@/assets/logo/icon_white.svg";
import LandingRegistration from "./registration-steps";
import { hotline, supportMail } from "@/common/constant";
import LandingContactBar from "../navigation/contact-bar";

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
