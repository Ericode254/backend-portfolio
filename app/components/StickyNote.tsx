import React from "react";

interface StickyNoteProps {
  children: React.ReactNode;
  color?: "yellow" | "pink" | "blue" | "green";
  /** Tailwind rotation class, e.g. "-rotate-2". */
  rotation?: string;
  className?: string;
}

const COLORS = {
  yellow: "bg-sticky-yellow",
  pink: "bg-sticky-pink",
  blue: "bg-sticky-blue",
  green: "bg-sticky-green",
};

/**
 * A decorative sticky note. Titles inside should use `font-handwriting`;
 * body text stays in the sans font so it is easy to read.
 */
export default function StickyNote({
  children,
  color = "yellow",
  rotation = "rotate-0",
  className = "",
}: StickyNoteProps) {
  return (
    <div
      className={`relative p-6 text-neutral-900 transition-transform duration-300 motion-safe:hover:rotate-0 ${COLORS[color]} ${rotation} ${className}`}
      style={{ boxShadow: "2px 8px 15px rgba(0,0,0,0.15)" }}
    >
      {/* "Tape" pinning the note */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-white/40 -rotate-1 shadow-sm" aria-hidden="true" />
      {children}
    </div>
  );
}
