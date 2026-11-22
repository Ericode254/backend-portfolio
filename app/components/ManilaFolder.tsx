import React from "react";

interface ManilaFolderProps {
  onClick?: () => void;
  title?: string;
  subtitle?: string;
  className?: string;
  rotation?: string;
}

/** CSS-only manila folder used as the entry point to the resume viewer. */
export default function ManilaFolder({
  onClick,
  title = "RESUME",
  subtitle = "Click to open",
  className = "",
  rotation = "rotate-1",
}: ManilaFolderProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative block w-full max-w-75 h-55 cursor-pointer group transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 rounded-lg text-left ${rotation} ${className}`}
      aria-label={`Open ${title.toLowerCase()}`}
    >
      <div className="absolute top-0 left-0 w-[40%] h-8 bg-[#d8c68a] rounded-t-lg border-t border-l border-r border-[#bba760]" />
      <div className="absolute top-8 left-0 w-full h-[calc(100%-2rem)] bg-[#d8c68a] rounded-b-lg rounded-tr-lg shadow-sm border border-[#bba760]" />

      {/* Paper peeking out */}
      <div className="absolute top-6 left-4 right-4 h-45 bg-white shadow-sm -rotate-1 transition-transform duration-300 group-hover:-translate-y-4 border border-zinc-200">
        <div className="p-4 space-y-3 opacity-20 select-none overflow-hidden h-full" aria-hidden="true">
          <div className="h-4 bg-black/50 w-3/4 rounded" />
          <div className="h-2 bg-black/30 w-full rounded" />
          <div className="h-2 bg-black/30 w-full rounded" />
          <div className="h-2 bg-black/30 w-5/6 rounded" />
        </div>
      </div>

      <div className="absolute top-10 left-0 w-full h-[calc(100%-2.5rem)] bg-[#f3e5ab] rounded-b-lg shadow-lg border border-[#d8c68a] flex flex-col items-center justify-center">
        <div className="bg-white/90 px-6 py-3 shadow-sm -rotate-1 border border-black/5">
          <span className="font-mono text-lg font-bold text-red-800 tracking-widest uppercase">{title}</span>
        </div>
        <span className="mt-4 text-xs font-sans text-[#6b5c3e] uppercase tracking-wider">{subtitle}</span>
      </div>
    </button>
  );
}
