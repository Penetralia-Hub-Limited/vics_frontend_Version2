import { FC } from "react";
import Image from "next/image";

interface IRegistrationStep {
  icon: string;
  title: string;
  description: string;
}

const RegistrationStep: FC<IRegistrationStep> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className={"flex flex- items-start gap-2 lg:gap-5 w-full"}>
      <Image src={icon} alt={`icon`} width={50} height={50} />
      <div className={"flex flex-col gap-2"}>
        <p className={"font-bold text-base md:text-xl lg:text-2xl"}>{title}</p>
        <p className={"text-sm lg-text-sm xl:text-base font-light"}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default RegistrationStep;
