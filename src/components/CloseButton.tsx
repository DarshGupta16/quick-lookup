"use client";
import { X } from "lucide-react";

export default function CloseButton({ closeFunc }: { closeFunc: () => void }) {
  const handleClose = () => {
    window.electronAPI.closeWindow();
    closeFunc();
  };

  return (
    <button
      className="absolute top-1 mt-[2px] right-4 p-2 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors cursor-pointer z-50"
      onClick={handleClose}
    >
      <X size={20} />
    </button>
  );
}
