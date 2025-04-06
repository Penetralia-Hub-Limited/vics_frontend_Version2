"use client";

import { FC, ReactNode, useRef, useEffect } from "react";
import ModalComp from "./pop-over";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

interface ISuccessModal {
  title: string;
  content: ReactNode;
  btnText: string;
  footerBtnText: string;
  trigger: () => void;
  autoClickAfterMs?: number;
}

const SuccessModal: FC<ISuccessModal> = ({
  title,
  content,
  btnText,
  trigger,
  footerBtnText,
  autoClickAfterMs,
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoClickAfterMs) {
      const timer = setTimeout(() => {
        triggerRef.current?.click(); // ⬅️ Simulate click
      }, autoClickAfterMs);

      return () => clearTimeout(timer);
    }
  }, [autoClickAfterMs]);

  return (
    <ModalComp autoClickAfterMs={autoClickAfterMs} btnText={btnText}>
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
        <p className={"text-lg text-center font-bold"}>{title}</p>
        <div>{content}</div>
        <AlertDialogAction onClick={trigger}>{footerBtnText}</AlertDialogAction>
      </div>
    </ModalComp>
  );
};

export default SuccessModal;
