import { Send, Loader2 } from "lucide-react";

export default function Input({
  text,
  setText,
  onInput,
  disabled = false,
}: {
  text: string;
  setText: (text: string) => void;
  onInput: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        className="w-full h-12 pl-4 pr-12 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-lg"
        placeholder="Ask something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !disabled) {
            onInput();
          }
        }}
        disabled={disabled}
      />
      <button
        className={`absolute right-1.5 top-1.5 h-9 w-9 rounded-full flex items-center justify-center transition-all ${
          text.trim() && !disabled
            ? "bg-blue-600 text-white hover:bg-blue-500 shadow-md cursor-pointer"
            : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
        }`}
        onClick={onInput}
        disabled={disabled || !text.trim()}
      >
        {!disabled ? (
          <Send size={16} />
        ) : (
          <Loader2 size={16} className="animate-spin" />
        )}
      </button>
    </div>
  );
}
