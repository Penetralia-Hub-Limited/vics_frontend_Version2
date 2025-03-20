import { FC } from "react";
import ArrowIcon from "@/assets/icons/arrow_icon.svg";
import Image from "next/image";
import Link from "next/link";

interface IGetStartedButton {
  link: string;
}

const GetStartedButton: FC<IGetStartedButton> = ({ link }) => {
  return (
    <Link
      className={
        "flex flex-row items-center gap-2 justify-center pb-2 mt-6 max-w-full w-fit border-b border-primary-500 group"
      }
      href={link}
    >
      <p
        className={
          "capitalize text-primary-500 group-hover:text-primary-500/50"
        }
      >
        Get started here
      </p>
      <Image src={ArrowIcon} alt={"arrow icon"} className={"w-5 h-5"} />
    </Link>
  );
};

export default GetStartedButton;
