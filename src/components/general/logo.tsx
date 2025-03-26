import { FC } from "react";
import Image from "next/image";

interface ILogoComp {
  logo: string;
  state: string;
}

const LogoComponent: FC<ILogoComp> = ({ logo, state }) => {
  return (
    <div className={"flex items-center"}>
      <Image
        src={logo}
        alt="Logo"
        className={"object-contain shrink-0 self-stretch my-auto h-full"}
      />
      <div className={"hidden lg:block self-stretch"}>
        <p
          className={
            "text-lg font-bold uppercase text-primary-600 tracking-widest w-full text-justify"
          }
        >
          {state}
        </p>
        <p className={"text-[7px] text-primary-600 tracking-[0.002rem]"}>
          Vehicle Identification and Certification System
        </p>
      </div>
    </div>
  );
};

export default LogoComponent;
