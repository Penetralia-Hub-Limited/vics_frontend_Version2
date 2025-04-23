import { FC } from "react";
import Image from "next/image";
import CallIcon from "@/assets/icons/call_icon.svg";
import { ISupportMail, IHotline } from "@/common/types";
import MessageIcon from "@/assets/icons/message_icon.svg";

interface IContactBar {
  contacts: IHotline[];
  emails: ISupportMail[];
}

const LandingContactBar: FC<IContactBar> = ({ contacts, emails }) => {
  return (
    <header
      className={
        "py-3 w-full bg-primary-500 lg:px-24 max-md:px-5 max-md:max-w-full"
      }
    >
      <div
        className={
          "flex flex-wrap justify-end items-center gap-4 md:gap-8 w-full max-md:max-w-full"
        }
      >
        <div className={"flex gap-2 items-center"}>
          <Image
            src={CallIcon}
            alt={"Phone"}
            className={
              "object-contain shrink-0 self-stretch my-auto w-6 aspect-square text-primary-500"
            }
          />
          <div className={"flex flex-row flex-wrap gap-1 md:gap-3"}>
            {contacts.map(({ id, line }) => (
              <span key={id} className={"text-white text-sm my-auto"}>
                {line + (id - emails.length !== 0 ? "," : "")}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 items-center my-auto">
          <Image
            src={MessageIcon}
            alt={"Phone"}
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <div className={"flex flex-row flex-wrap md:gap-3"}>
            {emails.map(({ id, mail }) => (
              <span
                key={id}
                className={"text-sm text-white self-stretch my-auto"}
              >
                {mail + (id - emails.length !== 0 ? "," : "")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingContactBar;
