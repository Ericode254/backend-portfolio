import React from "react";

/**
 * Props for the ManilaFolder component.
 */
interface ManilaFolderProps {
  /** Optional click handler to open the folder/document viewer. */
  onClick?: () => void;
  /** 
   * The label displayed on the folder's front tab.
   * @default "CASE STUDIES"
   */
  title?: string;
  /** Additional CSS classes for the container. */
  className?: string;
  /** 
   * Tailwind rotation class to simulate a natural desk placement.
   * @default "rotate-1"
   */
  rotation?: string;
}

/**
 * ManilaFolder Component.
 * 
 * Renders a realistic CSS-only Manila Folder.
 * Used as the entry point for the "Resume & Docs" section.
 * 
 * Visual features:
 * - Tabbed folder shape using absolute positioning.
 * - Layered "papers" peeking out from the folder.
 * - "Confidential" stamps and styling.
 * - 3D hover effect (opening slightly).
 */
export default function ManilaFolder({
  onClick,
  title = "CASE STUDIES",
  className = "",
  rotation = "rotate-1",
}: ManilaFolderProps) {
  return (
    <div
      onClick={onClick}
      className={`relative w-full max-w-[300px] h-[220px] cursor-pointer group transition-all duration-300 hover:scale-105 ${rotation} ${className}`}
      role="button"
      aria-label={`Open ${title}`}
    >
      {/* Back Tab (Top Left) - Simulates the rear folder flap */}
      <div className="absolute top-0 left-0 w-[40%] h-8 bg-[#d8c68a] rounded-t-lg border-t border-l border-r border-[#bba760]" />

      {/* Back Body - The main container behind the papers */}
      <div className="absolute top-8 left-0 w-full h-[calc(100%-2rem)] bg-[#d8c68a] rounded-b-lg rounded-tr-lg shadow-sm border border-[#bba760]" />

      {/* Papers Peeking Out - Visual detail to suggest content */}
      <div className="absolute top-6 left-4 right-4 h-[180px] bg-white shadow-sm transform -rotate-1 transition-transform duration-300 group-hover:-translate-y-4 border border-zinc-200">
        <div className="p-4 space-y-3 opacity-20 select-none overflow-hidden h-full">
           <div className="h-4 bg-black/50 w-3/4 rounded"></div>
           <div className="h-2 bg-black/30 w-full rounded"></div>
           <div className="h-2 bg-black/30 w-full rounded"></div>
           <div className="h-2 bg-black/30 w-5/6 rounded"></div>
        </div>
      </div>

      {/* Front Cover - The main clickable area with title */}
      <div className="absolute top-10 left-0 w-full h-[calc(100%-2.5rem)] bg-[#f3e5ab] rounded-b-lg shadow-lg border-t border-white/40 border-l border-r border-b border-[#d8c68a] flex flex-col items-center justify-center transition-transform origin-bottom duration-300 group-hover:rotate-x-6">
        
        {/* Folder Label */}
        <div className="bg-white/90 px-6 py-3 shadow-sm transform -rotate-1 border border-black/5">
            <span className="font-mono text-lg font-bold text-red-800 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-800 animate-pulse"></span>
                {title}
            </span>
        </div>
        
        {/* Confidential Stamps */}
        <div className="mt-4 flex gap-2">
             <span className="text-[10px] font-sans text-[#8a7a5a] uppercase tracking-wider opacity-60">CONFIDENTIAL</span>
             <span className="text-[10px] font-sans text-[#8a7a5a] uppercase tracking-wider opacity-60">•</span>
             <span className="text-[10px] font-sans text-[#8a7a5a] uppercase tracking-wider opacity-60">DO NOT DISTRIBUTE</span>
        </div>
      </div>
    </div>
  );
}
