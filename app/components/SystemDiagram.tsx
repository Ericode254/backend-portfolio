import React from "react";

/**
 * Supported Diagram Types.
 * Each type maps to a specific SVG rendering configuration.
 */
type DiagramType = "default";

/**
 * Props for the SystemDiagram component.
 */
interface SystemDiagramProps {
  /** The type of system architecture to visualize. */
  type: DiagramType;
  /** Additional CSS classes for the container. */
  className?: string;
}

const FILTER_ID = "rough-paper";

/**
 * Defines the SVG Filter that creates the "wobbly" hand-drawn effect.
 * Uses feTurbulence and feDisplacementMap.
 */
const RoughFilter = () => (
  <defs>
    <filter id={FILTER_ID} x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
    </filter>
    <marker
      id="arrowhead"
      markerWidth="10"
      markerHeight="7"
      refX="9"
      refY="3.5"
      orient="auto"
    >
      <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
    </marker>
  </defs>
);

export default function SystemDiagram({ type, className = "" }: SystemDiagramProps) {
  // Diagram implementations
  const renderDiagram = () => {
    switch (type) {
      default:
        return (
          <text x="50%" y="50%" textAnchor="middle" className="font-mono text-sm fill-current opacity-50">
            [System Diagram Not Available]
          </text>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 600 250"
      className={`w-full h-auto ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <RoughFilter />
      {renderDiagram()}
    </svg>
  );
}
