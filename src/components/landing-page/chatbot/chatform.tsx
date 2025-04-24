import React, { useRef, SetStateAction, Dispatch } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatProp {
  role?: "user";
  content: string;
}

interface IChatForm {
  chatHistory: ChatProp[];
  setChatHistory: Dispatch<SetStateAction<ChatProp[]>>;
  generateBotResponse: (history: { role?: "user"; content: string }[]) => void;
}

function Chatform({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}: IChatForm) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMsg = inputRef.current?.value.trim();
    if (!userMsg) return;

    setChatHistory((history) => [
      ...history,
      { role: "user", content: userMsg },
    ]);
    e.currentTarget.reset(); // reset the input to empty

    setTimeout(() => {
      setChatHistory((history) => [...history, { content: "Thinking..." }]);
      generateBotResponse([...chatHistory, { role: "user", content: userMsg }]);
    }, 800);
  };

  return (
    <div className={"mb-auto p-2 pb-4"}>
      <form
        onSubmit={handleSubmit}
        className={"flex flex-row gap-2 items-center"}
      >
        <Input
          multiple
          ref={inputRef}
          required
          type={"text"}
          placeholder={"Type your message here..."}
          className={"focus-visible:outline-none rounded-lg p-2 text-sm"}
        />
        <Button
          type={"submit"}
          className={"rounded-lg bg-primary-500 p-2 cursor-pointer"}
        >
          <Send className={"text-white"} size={20} />
        </Button>
      </form>
    </div>
  );
}

export default Chatform;
