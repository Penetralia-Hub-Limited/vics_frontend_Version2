import LPNavBar from "./nav-bar";
import LandingContactBar from "./contact-bar";
import LandingFooter from "./footer";

const LandingPage = () => {
  return (
    <main className={"flex flex-col"}>
      <>
        <LandingContactBar
          contacts={["+234 901 234 5678,", "+234 801 234 5678"]}
          emails={["support@kw-ivas.gov.ng,", "helpdesk@kw-ivas.gov.ng"]}
        />
        <LPNavBar />
      </>

      <div className={""}></div>

      <LandingFooter />
    </main>
  );
};

export default LandingPage;
