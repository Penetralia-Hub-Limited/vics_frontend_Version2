import { FC } from "react";
import ModalComp from "./pop-over";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

interface ISuccessModal {
  button: React.ReactElement;
  successText: string;
  btnText: string;
  trigger: () => void;
}

const SuccessModal: FC<ISuccessModal> = ({
  button,
  successText,
  btnText,
  trigger,
}) => {
  return (
    <ModalComp button={button}>
      <div className={"flex flex-col gap-4 items-center justify-center"}>
        <DotLottieReact
          aria-hidden="true"
          style={{ width: 200, height: 100 }}
          src={
            "https://lottie.host/fe46d010-b474-49a8-aa26-ce393f8b3a88/nh99Y4MbDq.lottie"
          }
          loop
          autoplay
        />
        <p className={"text-lg font-bold"}>Success</p>
        <p>{successText}</p>
        <AlertDialogAction onClick={trigger}>{btnText}</AlertDialogAction>
      </div>
    </ModalComp>
  );
};

export default SuccessModal;
