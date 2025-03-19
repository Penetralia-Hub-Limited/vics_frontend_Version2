import Image from "next/image";
import { Button } from "@/components/ui/button";
import IconGreen from "../../assets/logo/icon_green.svg";

const LPNavBar = () => {
  return (
    <nav className="flex overflow-hidden flex-col justify-center px-40 py-6 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="flex gap-4 items-center self-stretch my-auto text-sm text-emerald-900 min-w-60">
          <Image
            src={IconGreen}
            alt="Logo"
            className={
              "object-contain shrink-0 self-stretch my-auto h-full aspect-[8/7]"
            }
          />
          <div className={"self-stretch my-auto min-w-60"}>
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

        <div className="flex gap-8 items-center self-stretch my-auto text-base whitespace-nowrap min-w-60">
          <div className="flex gap-4 items-center self-stretch my-auto text-neutral-900">
            <a
              href="#"
              className="gap-2 self-stretch px-2 pt-2 pb-3 my-auto bg-white"
            >
              Home
            </a>
            <a
              href="#"
              className="gap-2 self-stretch px-2 pt-2 pb-3 my-auto bg-white"
            >
              Verification
            </a>
          </div>

          <Button>Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default LPNavBar;
