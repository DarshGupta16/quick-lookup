import React from "react";
import Markdown from "react-markdown";
import { Message } from "../types/chat";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.from === "user";

  return (
    <div
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        } items-start gap-2`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-blue-600 text-white" : "bg-zinc-700 text-zinc-300"
          }`}
        >
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>

        <div
          className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-none"
              : "bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700"
          }`}
        >
          {isUser ? (
            <p>{message.text}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <Markdown>{message.text}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
