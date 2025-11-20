import "./styles/output.css";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import Input from "./components/Input";
import MessageBubble from "./components/MessageBubble";
import CloseButton from "./components/CloseButton";
import { Message } from "./types/chat";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const App = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [responseLoading, setResponseLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    <div className="h-screen w-full flex flex-col bg-zinc-900 text-zinc-100 overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Header / Drag Region */}
      <div className="h-12 w-full flex items-center justify-between px-4 bg-zinc-900/50 backdrop-blur-sm z-50 drag-region border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/50"></div>
          <div className="text-sm font-medium text-zinc-400">Quick Lookup</div>
        </div>
        <CloseButton closeFunc={() => setMessages([])} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        <div className="max-w-2xl mx-auto flex flex-col gap-2">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500 opacity-50 select-none">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4 shadow-xl rotate-3">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-2xl font-bold mb-2 text-zinc-300">
                How can I help?
              </p>
              <p className="text-sm">Ask me anything...</p>
            </div>
          )}
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {responseLoading && (
            <div className="flex justify-start w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 text-zinc-500 text-sm ml-2 bg-zinc-800/50 px-3 py-2 rounded-full">
                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800">
        <Input
          disabled={responseLoading}
          text={prompt}
          setText={setPrompt}
          onInput={submitPrompt}
        />
        <div className="text-center mt-3">
          <p className="text-[10px] text-zinc-600 font-medium">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
