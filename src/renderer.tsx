import "./styles/output.css";
import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Input from "./components/Input";

import { Message } from "./types/chat";
import Markdown from "react-markdown";

import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const App = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [responseLoading, setResponseLoading] = useState(false);

  const submitPrompt = async () => {
    if (!prompt.trim()) return;

    const splitPrompt = prompt.split(" ");
    if (splitPrompt[0] === "change" && splitPrompt[1] === "model") {
      window.electronAPI.changeModel(splitPrompt[2]);
      setPrompt("");
      alert("Model changed to " + splitPrompt[2]);
      return;
    }

    setResponseLoading(true);
    setMessages((prev) => [...prev, { from: "user", text: prompt }]);

    const aiPrompt = prompt;
    setPrompt("");

    const fetchResponse = async () => {
      const conversationHistory = messages
        .map((message) => `from: ${message.from} text: ${message.text}\n`)
        .toString();
      const response = await ai.models.generateContent({
        model: await window.electronAPI.fetchCurrentModel(),
        contents: `Conversation history: ${conversationHistory} \n\n prompt: ${aiPrompt} \n Do not mention the conversation history in the response.`,
      });
      setMessages((prev) => [
        ...prev,
        { from: "assistant", text: response.text },
      ]);

      console.log(conversationHistory);
    };

    fetchResponse();
    setResponseLoading(false);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center text-center p-9">
      <div className="w-full h-full p-3 border-4 border-gray-300 rounded-xl flex flex-col items-start justify-start text-center">
        <div className="overflow-y-auto w-full h-full flex flex-col-reverse">
          {[...messages].reverse().map((message, index) => (
            <div className="flex flex-col mt-3 gap-y-1 text-left" key={index}>
              <p className="text-lg font-bold">{message.from}</p>
              <Markdown>{message.text}</Markdown>
            </div>
          ))}
        </div>
        <Input
          disabled={responseLoading}
          text={prompt}
          setText={setPrompt}
          onInput={submitPrompt}
        />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
