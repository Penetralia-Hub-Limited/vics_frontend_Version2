import Image from "next/image";
import GetStartedButton from "../components/get-started-button";
import CarImage from "@/assets/landing-page/cars.svg";
import RegistrationStep from "./registration-steps-item";
import ProfileIcon from "@/assets/icons/profile_icon.svg";
import RegisterIcon from "@/assets/icons/registration_icon.svg";
import UpdateProfileIcon from "@/assets/icons/update_icon.svg";
import CertificateIcon from "@/assets/icons/certificate_icon.svg";

const LandingRegistration = () => {
  const steps = [
    {
      icon: ProfileIcon,
      title: "Sign Up",
      description: "Register an account on the Kwara - IVAS portal to begin",
    },
    {
      icon: UpdateProfileIcon,
      title: "Update Your Profile",
      description:
        "Updating your profile is essential for transaction accountability",
    },
    {
      icon: RegisterIcon,
      title: "Register VIN",
      description:
        "Add the Vehicle Identification Number (VIN) of your car to the system",
    },
    {
      icon: CertificateIcon,
      title: "Get Your Certificates",
      description:
        "Receive your KW-IVAS certificates after payment and drive boldly.",
    },
  ];

  return (
    <section className={"relative"}>
      <div
        className={
          "my-20 max-md:mt-10 px-4 md:px-12 md:w-[78%] self-stretch max-md:max-w-full"
        }
      >
        <div
          className={
            "flex flex-col items-start w-full font-bold text-center max-md:max-w-full"
          }
        >
          <div
            className={
              "flex-1 shrink gap-2 self-stretch px-8 py-2 max-w-fit bg-primary-500 rounded-full basis-0 max-md:px-5"
            }
          >
            <p className={"text-sm md:text-base text-white"}>
              How to Register Your Vehicle
            </p>
          </div>
          <p
            className={
              "mt-8 text-xl md:text-3xl lg:text-4xl text-black max-md:max-w-full capitalize"
            }
          >
            Follow These Easy Steps
          </p>
        </div>

        <div className={"flex flex-col gap-3 mt-12"}>
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-8 w-full max-md:max-w-full">
            {steps.map((steps, index) => (
              <RegistrationStep key={index} {...steps} />
            ))}
          </div>

          <div className={"pl-12 lg:pl-15"}>
            <GetStartedButton link="/signup" />
          </div>
        </div>
      </div>

      <div
        className={
          "hidden md:block absolute top-[90%] md:top-[35%] lg:top-[28%] xl:top-[20%] right-0"
        }
      >
        <Image
          src={CarImage}
          alt={"car icon"}
          className={
            "md:w-[55%] lg:w-[70%] xl:w-[80%] object-contain object-center ml-auto"
          }
        />
      </div>
    </section>
  );
};

export default LandingRegistration;
