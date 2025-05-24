import React from "react";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { addParagraphs } from "./helper";

interface IChatMessage {
  message: string;
  sender?: "user";
}

function ChatMessage({ message, sender }: IChatMessage) {
  return (
    <div>
      <div className={cn("flex flex-row gap-2 items-end")}>
        {sender !== "user" && (
          <div className="rounded-full bg-primary-500 p-1">
            <Bot className={"p-1 text-primary-50"} size={20} />
          </div>
        )}

        <div
          className={cn(
            "bg-primary-50 w-fit max-w-[16rem] rounded-t-lg rounded-r-lg p-2 mb-2",
            sender === "user" &&
              "mt-2 bg-primary-500 rounded-l-lg p-2 mb-2 ml-auto"
          )}
        >
          {addParagraphs(message)
            .split("\n\n")
            .map((para, idx) => (
              <p
                key={idx}
                className={cn(
                  "text-sm text-pretty",
                  sender === "user" && "text-white",
                  "mb-3"
                )}
              >
                {para.trim()}
              </p>
            ))}
        </div>
        {sender === "user" && (
          <div className="rounded-full bg-primary-50 p-1">
            <User className={"p-1 text-primary-500"} size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
