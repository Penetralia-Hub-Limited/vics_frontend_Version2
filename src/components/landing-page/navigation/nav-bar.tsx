import Image from "next/image";
import NavBarItems from "./nav-bar-items";
import IconGreen from "../../../../public/assets/logo/icon_green.svg";
import NavBarMobile from "./nav-drop-mobile";

const LPNavBar = () => {
  return (
    <nav
      className={
        "flex flex-col justify-center px-4 md:px-12 md:w-[100%] py-6 w-full bg-white"
      }
    >
      <div
        className={
          "flex flex-row gap-10 justify-between items-center w-full max-md:max-w-full"
        }
      >
        <div
          className={
            "flex gap-4 items-center self-stretch my-auto text-sm text-primary-500 md:min-w-60"
          }
        >
          <Image
            fetchPriority="high"
            src={IconGreen}
            alt="Logo"
            className={"object-contain shrink-0 self-stretch my-auto h-full"}
          />
          <div className={"hidden lg:block self-stretch my-auto min-w-60"}>
            <p
              className={
                "text-4xl font-bold uppercase text-primary-600 tracking-widest w-full text-justify"
              }
            >
              Kwara state
            </p>
            <p className={"mt-1"}>
              Vehicle Identification and Certification System
            </p>
          </div>
        </div>

        <div>
          <div className={"hidden md:block min-w-60"}>
            <NavBarItems />
          </div>

          <div className={"block md:hidden"}>
            <NavBarMobile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LPNavBar;
