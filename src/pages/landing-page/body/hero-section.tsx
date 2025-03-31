import { FC } from "react";
import Image from "next/image";
import HeroImg from "@/assets/landing-page/home_hero.jpg";  // Image import
import NeedHelp from "../components/need-help";

interface IHeroSection {
  state: string;
  icon: string;
  iconsize?: number;
}

const HeroSection: FC<IHeroSection> = ({ state, icon }) => {
  return (
    <div
      className={"relative bg-cover bg-center h-[30rem]"}
      style={{ backgroundImage: `url(${HeroImg})` }}  {/* Fix: Used HeroImg directly */}
    >
      <div
        className={
          "flex flex-col md:flex-row md:gap-0 gap-4 items-center justify-center w-full h-full"
        }
      >
        <Image src={icon} alt={"icon"} className={"w-[12rem] h-[12rem]"} />

        <div
          className={
            "flex flex-col gap-2 text-center px-5 w-full md:w-[60%] lg:w-[43%]"
          }
        >
          <p
            className={
              "text-white text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-black uppercase"
            }
          >
            {state}
          </p>
          <p className={"text-white capitalize text-xl md:text-3xl font-bold"}>
            Vehicle Identification and certification system (VICS)
          </p>
        </div>
      </div>

      <div className={"absolute bottom-5 right-5 w-fit"}>
        <NeedHelp />
      </div>
    </div>
  );
};

export default HeroSection;
