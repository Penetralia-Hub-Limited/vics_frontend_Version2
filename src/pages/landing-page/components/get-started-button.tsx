import { FC } from "react";
import Link from "next/link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

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

      <ArrowOutwardIcon
        className={"text-primary-500 group-hover:text-primary-500/50"}
      />
    </Link>
  );
};

export default GetStartedButton;
