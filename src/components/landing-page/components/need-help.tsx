"use client";

import { FC } from "react";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Button } from "@/components/ui/button";

interface INeedHelp {
  triggerChatBot: () => void;
}

const NeedHelp: FC<INeedHelp> = ({ triggerChatBot }) => {
  return (
    <Button
      variant={"ghost"}
      onClick={() => triggerChatBot()}
      className={
        "flex flex-row gap-2 items-center bg-primary-600 py-1 rounded-full px-1 cursor-pointer transition-all duration-200 ease-in-out"
      }
    >
      <p className={"px-2 text-sm text-white"}>Need help?</p>
      <div
        className={
          "flex items-center justify-center bg-primary-300 w-9 h-9 rounded-full"
        }
      >
        <ChatBubbleIcon fontSize={"small"} sx={{ color: "white" }} />
      </div>
    </Button>
  );
};
export default NeedHelp;
