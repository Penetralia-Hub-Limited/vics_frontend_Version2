"use client";

import { cn } from "@/lib/utils";
import Chatform from "../chatbot/chatform";
import {
  useEffect,
  useState,
  useRef,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { Bot, X, ChevronDown } from "lucide-react";
import ChatMessage from "../chatbot/chat-message";
import { GeminiGenerateContent } from "../chatbot/helper";
import { Button } from "@/components/ui/button";

interface IVICSChatBot {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
}

export const VICSChatBot: FC<IVICSChatBot> = ({ status, setStatus }) => {
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const [chatHistory, setChatHistory] = useState<
    { role?: "user"; content: string }[]
  >([]);

  const generateBotResponse = async (
    history: { role?: "user" | "model"; content: string }[]
  ) => {
    const updateHistory = (text: string) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.content !== "Thinking..."),
        { content: text },
      ]);
    };

    const historyData = history.map(({ role, content }) => ({
      role: role || "user",
      parts: [{ text: content }],
    }));

    const data = {
      contents: historyData,
    };

    try {
      const response = await GeminiGenerateContent(data.contents);
      if (response) {
        updateHistory(response);
      } else {
        console.error("Response is undefined");
      }
    } catch (error) {
      updateHistory("Could not quite get that");
      throw new Error(
        `${error as unknown as string}, Error generating response`
      );
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={"flex flex-col gap-3 p-4 w-[25rem]"}>
      <div
        className={
          "border border-primary-500 rounded-lg overflow-hidden bg-white"
        }
      >
        {/* Header */}
        <div className="flex flex-row items-center justify-between bg-primary-500 px-4 py-2">
          <div className={cn("flex flex-row items-center gap-2")}>
            <div className={"bg-white p-1 rounded-full"}>
              <Bot className={"text-primary-500"} />
            </div>
            <p className={"text-white font-bold uppercase"}>VICS ChatBot</p>
          </div>
          <Button
            onClick={() => setStatus(false)}
            className={
              "group cursor-pointer hover:bg-primary-700 transition-all duration-150 ease-in-out p-1 rounded-full"
            }
          >
            <ChevronDown className={"text-white"} />
          </Button>
        </div>

        {/* Chat box */}
        <div
          ref={chatBodyRef}
          className="p-2 min-h-[25rem] max-h-[30rem] overflow-y-auto overflow-x-hidden flex flex-col gap-2 scrollbar-width"
        >
          <div className={"flex flex-row gap-2 items-end"}>
            <div className="rounded-full bg-primary-500 p-1">
              <Bot className={"p-1 text-primary-50"} size={20} />
            </div>
            <div
              className={
                "bg-primary-50 w-[12rem] rounded-t-lg rounded-r-lg p-2 mb-2"
              }
            >
              <p className={"text-sm"}>
                Hey there!👋, welcome to VICS portal. How may I help you?
              </p>
            </div>
          </div>
          {chatHistory.map(({ role, content }, index) => {
            return <ChatMessage key={index} message={content} sender={role} />;
          })}
        </div>

        {/* Form input */}
        <Chatform
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          generateBotResponse={generateBotResponse}
        />
      </div>

      <Button
        onClick={() => setStatus(false)}
        className={cn(
          "p-1 rounded-full ml-auto transition-all ease-in-out duration-150"
        )}
        variant={"default"}
      >
        {status && <X size={30} className={"text-white"} />}
      </Button>
    </div>
  );
};
