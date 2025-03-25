import { FC } from "react";
import ModalComp from "./pop-over";
import { Button } from "../ui/button";

interface ISuccessModal {
  button: React.ReactElement;
  successText: string;
}

const SuccessModal: FC<ISuccessModal> = ({ button, successText }) => {
  return (
    <ModalComp button={button}>
      <div className={"flex flex-col gap-4"}>
        <h1 className={"font-semibold"}>Success</h1>
        <p>{successText}</p>
        <Button>Done</Button>
      </div>
    </ModalComp>
  );
};

export default SuccessModal;
