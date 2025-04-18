import { FC, ReactNode, ReactElement } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Dialog from "@mui/material/Dialog";

interface IResponseModalX {
  title: string;
  open: boolean;
  onClose: () => void;
  content: ReactNode;
  status: "success" | "failed";
  footerBtn?: ReactElement;
}

export const ResponseModalX: FC<IResponseModalX> = ({
  title,
  open,
  onClose,
  content,
  status,
  footerBtn,
}) => {
  return (
    <Dialog fullWidth={true} maxWidth={"sm"} onClose={onClose} open={open}>
      <div className={"flex flex-col gap-4 items-center justify-center py-4"}>
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
        {footerBtn}
      </div>
    </Dialog>
  );
};
