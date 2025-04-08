import { FC } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface IStepDetails {
  activeStep: number;
  steps: {
    title: string;
    description: string;
  }[];
}

const StepsDetails: FC<IStepDetails> = ({ activeStep, steps }) => {
  return (
    <div className={"flex flex-col gap-5"}>
      {steps.map((step, index) => (
        <div className={"flex flex-row gap-5"} key={index}>
          <div
            className={cn(
              "flex items-center justify-center border border-neutral-500 rounded-full w-12 h-12 p-2",
              `${activeStep === index + 1 && "bg-success-100"}`,
              `${activeStep > index + 1 && "bg-success-500"}`
            )}
          >
            {activeStep > index + 1 ? (
              <Check className={"text-white"} />
            ) : (
              <p
                className={
                  "flex items-center justify-center font-bold text-lg w-12 h-12"
                }
              >
                {index + 1}
              </p>
            )}
          </div>
          <div className={"flex flex-col gap-1"}>
            <p className={"font-semibold text-sm"}>{step.title}</p>
            <p className={"font-light text-xs"}>{step.description}</p>
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default StepsDetails;
