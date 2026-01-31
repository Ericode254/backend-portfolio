import React from 'react';

/**
 * Props for the StickyNote component.
 */
interface StickyNoteProps {
    /** The content to be rendered inside the sticky note. */
    children: React.ReactNode;
    
    /** 
     * The background color of the sticky note. 
     * Corresponds to predefined Tailwind CSS classes.
     * @default 'yellow'
     */
    color?: 'yellow' | 'pink' | 'blue' | 'green';
    
    /** 
     * Tailwind class for rotation (e.g., 'rotate-2', '-rotate-1'). 
     * Used to give the chaotic "desk" feel.
     * @default 'rotate-0'
     */
    rotation?: string;
    
    /** Additional CSS classes for custom styling. */
    className?: string;
    
    /** Optional click handler. If provided, the note behaves as a button. */
    onClick?: () => void;
    
    /** Optional HTML ID for anchor links or testing. */
    id?: string;
}

/**
 * StickyNote Component.
 * 
 * Renders a container resembling a physical sticky note (Post-it).
 * Features:
 * - Handwriting font style.
 * - Realistic drop shadow.
 * - "Tape" visual effect at the top.
 * - Interactive hover states if actionable.
 */
export default function StickyNote({
    children,
    color = 'yellow',
    rotation = 'rotate-0',
    className = '',
    onClick,
    id,
}: StickyNoteProps) {
    // Map abstract color names to specific Tailwind classes for background and text
    const colorMap = {
        yellow: 'bg-sticky-yellow text-neutral-900',
        pink: 'bg-sticky-pink text-neutral-900',
        blue: 'bg-sticky-blue text-neutral-900',
        green: 'bg-sticky-green text-neutral-900',
    };

    return (
        <div
            id={id}
            onClick={onClick}
            className={`
        relative p-6 transition-all duration-300 hover:scale-105 hover:z-20
        ${colorMap[color]}
        ${rotation}
        ${className}
        font-handwriting text-lg leading-snug
      `}
            style={{
                // Custom drop shadow for depth
                boxShadow: '2px 8px 15px rgba(0,0,0,0.15)',
            }}
        >
            {/* Visual "Tape" element to pin the note to the board */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-[1px] -rotate-1 shadow-sm opacity-80" />

            {children}
        </div>
    );
}
