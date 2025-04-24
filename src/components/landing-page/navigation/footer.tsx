"use client";

import Image from "next/image";
import { getYear } from "date-fns";
import { FC, useState } from "react";
import { IHotline, ISupportMail } from "@/common/types";

interface IFooter {
  state: string;
  icon: string;
  hotline: IHotline[];
  support: ISupportMail[];
}

const Footer: FC<IFooter> = ({ state, hotline, support, icon }) => {
  const [currentDate] = useState<Date>(new Date());
  const currentYear = getYear(currentDate);

  return (
    <div
      className={
        "flex flex-col justify-between bg-primary-500 h-full md:h-72 mb-auto px-4 md:px-12 md:w-[100%] w-full"
      }
    >
      <div
        className={
          "flex flex-row flex-wrap gap-10 md:gap-0 items-start justify-between py-12 w-full"
        }
      >
        <div className={"flex flex-row items-center gap-3"}>
          <Image
            loading="lazy"
            src={icon}
            alt={"icon"}
            className={"w-12 h-12 md:w-18 md:h-18 lg:w-20 lg:h-20"}
          />
          <div className={"flex flex-col gap-1 self-stretch my-auto min-w-60"}>
            <p
              className={
                "text-2xl md:text-3xl lg:text-5xl font-bold uppercase text-white tracking-widest w-full text-justify"
              }
            >
              {state}
            </p>
            <p
              className={
                "capitalize text-xs tracking-wider lg:text-xl text-white font-light"
              }
            >
              Integrated Vehicle Administration System
            </p>
          </div>
        </div>

        <div className={"flex flex-col gap-5"}>
          <p className={"text-white font-bold"}>Hotline:</p>
          <div className={"flex flex-col gap-1 md:gap-3"}>
            {hotline.map(({ id, line }) => (
              <span
                key={id}
                className={"text-white text-sm lg:text-base my-auto"}
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        <div className={"flex flex-col gap-5"}>
          <p className={"text-white font-bold"}>Support & Info:</p>
          <div className={"flex flex-col gap-1 md:gap-3"}>
            {support.map(({ id, mail }) => (
              <span
                key={id}
                className={"text-white text-sm lg:text-base my-auto"}
              >
                {mail}
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer
        className={
          "flex flex-row items-center text-sm justify-center gap-1 border-t-1 border-white p-3"
        }
      >
        <span className={"text-white"}>&copy; All Rights Reserved</span>
        <span className={"text-white"}>-</span>
        <span className={"text-white"}>{currentYear}</span>
      </footer>
    </div>
  );
};

export default Footer;
