import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import Loading from "@/app/(dashboard)/loading";

interface IForm {
  title: string;
  description: string;
  children: ReactNode;
  onSubmit: () => void;
  isLoading: boolean;
  isSuccess: boolean;
}

const FormLayout: FC<IForm> = ({
  title,
  description,
  children,
  onSubmit,
  isLoading,
  isSuccess,
}) => {
  return (
    <div className="bg-white rounded-lg py-10 px-5 md:px-12 w-[80%] md:w-[50%] border-[15px] border-primary-500">
      <div className="flex flex-col gap-3 w-full items-center justify-center">
        <p className="text-lg font-bold">{title}</p>
        <p>{description}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-5 py-12 w-full"
      >
        {children}

        <Button variant="default" type="submit">
          {isLoading ? (
            <Loading size={20} color={"#fff"} screen={"default"} />
          ) : isSuccess ? (
            "Redirecting..."
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
};

export default FormLayout;
