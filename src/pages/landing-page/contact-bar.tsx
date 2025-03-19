import { FC } from "react";
import Image from "next/image";
import CallIcon from "@/assets/landing-page/call_icon.svg";
import MessageIcon from "@/assets/landing-page/message_icon.svg";

interface IContactBar {
  contacts: string[];
  emails: string[];
}

const LandingContactBar: FC<IContactBar> = ({ contacts, emails }) => {
  return (
    <header className="flex overflow-hidden py-3 w-full text-sm text-white bg-primary-500 px-24 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap justify-end items-center gap-8 items-center w-full max-md:max-w-full">
        <div className="flex gap-2 items-center min-w-60">
          <Image
            src={CallIcon}
            alt={"Phone"}
            className={
              "object-contain shrink-0 self-stretch my-auto w-6 aspect-square text-primary-500"
            }
          />
          <div className={"flex flex-row gap-4"}>
            {contacts.map((contact) => (
              <span className="self-stretch my-auto">{contact}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 items-center self-stretch my-auto whitespace-nowrap min-w-60">
          <Image
            src={MessageIcon}
            alt={"Phone"}
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
          <div className={"flex flex-row gap-4"}>
            {emails.map((email) => (
              <span className="self-stretch my-auto">{email}</span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingContactBar;
