"use client";

export default function CloseButton({ closeFunc }: { closeFunc: () => void }) {
  const handleClose = () => {
    window.electronAPI.closeWindow();
    closeFunc();
  };

  return (
    <div
      className="w-3 h-3 cursor-pointer bg-red-500 rounded-full absolute top-4 right-4"
      onClick={handleClose}
    ></div>
  );
}
