import { FC } from "react";
import Image from "next/image";

interface ILogo {
  icon: string;
}

const LogoComponent: FC<ILogo> = ({ icon }) => {
  return (
    <div className={"flex flex-row gap-3 items-center"}>
      <Image
        src={icon}
        alt={"Logo"}
        className={"object-contain shrink-0 self-stretch my-auto h-full"}
      />
      <div className={"hidden lg:block self-stretch"}>
        <p
          className={
            "text-lg font-bold uppercase text-primary-600 tracking-widest w-full text-justify"
          }
        >
          Kwara state
        </p>
        <p className={"text-[7px] text-primary-600 tracking-[0.002rem]"}>
          Vehicle Identification and Certification System
        </p>
      </div>
    </div>
  );
};

export default LogoComponent;
