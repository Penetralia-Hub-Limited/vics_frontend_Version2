"use client";

import { FC, ReactNode } from "react";
import ModalComp from "./pop-over";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

interface IResponseModal {
  title: string;
  content: ReactNode;
  btnText: string;
  footerBtnText: string;
  trigger: () => void;
  status?: "failed" | "success";
  autoClickAfterMs?: number;
}

const ResponseModal: FC<IResponseModal> = ({
  title,
  content,
  btnText,
  trigger,
  footerBtnText,
  status,
  autoClickAfterMs,
}) => {
  return (
    <ModalComp autoClickAfterMs={autoClickAfterMs} btnText={btnText}>
      <div className={"flex flex-col gap-4 items-center justify-center"}>
        <DotLottieReact
          aria-hidden="true"
          style={{ width: 200, height: 100 }}
          src={
            status === "failed"
              ? "https://lottie.host/5c209c9c-259d-4371-9ace-f3b3b490613b/YM6WHVU3rT.lottie"
              : "https://lottie.host/fe46d010-b474-49a8-aa26-ce393f8b3a88/nh99Y4MbDq.lottie"
          }
          loop
          autoplay
        />
        <p className={"text-lg text-center font-bold"}>{title}</p>
        <div>{content}</div>
        <AlertDialogAction onClick={trigger}>{footerBtnText}</AlertDialogAction>
      </div>
    </ModalComp>
  );
};

export default ResponseModal;
