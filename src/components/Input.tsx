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
    <div className="flex items-center justify-center text-center gap-x-1 w-full">
      <input
        type="text"
        className="w-full h-11 rounded-lg px-2 py-1 border-4 border-gray-300"
        placeholder="Ask something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onInput();
          }
        }}
        disabled={disabled}
      />
      <button
        className="w-11 h-11 rounded-lg p-2 border-4 border-gray-300 hover:bg-gray-100 cursor-pointer transition-all flex items-center justify-center text-center"
        onClick={onInput}
        disabled={disabled}
      >
        {!disabled ? <Send /> : <Loader2 className="animate-spin" />}
      </button>
    </div>
  );
}
