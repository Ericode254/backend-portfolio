import React from "react";

/**
 * Supported Diagram Types.
 * Each type maps to a specific SVG rendering configuration.
 */
type DiagramType = "cache" | "microservices" | "cli" | "logs" | "auth" | "pydown" | "default";

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

interface BoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sub?: string;
}

/**
 * Helper component to draw a box node in the diagram.
 */
const Box = ({ x, y, width, height, label, sub }: BoxProps) => (
  <g filter={`url(#${FILTER_ID})`} className="text-foreground">
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      rx="2"
    />
    <text x={x + width / 2} y={y + height / 2 - 5} textAnchor="middle" className="text-xs font-bold fill-current font-mono">
      {label}
    </text>
    {sub && (
      <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" className="text-[10px] fill-current opacity-70 font-sans">
        {sub}
      </text>
    )}
  </g>
);

/**
 * Helper component to draw a connecting arrow.
 */
const Arrow = ({ d }: { d: string }) => (
  <path
    d={d}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    markerEnd="url(#arrowhead)"
    filter={`url(#${FILTER_ID})`}
    className="text-foreground/50"
  />
);

interface DatabaseProps {
  x: number;
  y: number;
  label: string;
}

/**
 * Helper component to draw a database cylinder.
 */
const Database = ({ x, y, label }: DatabaseProps) => (
  <g filter={`url(#${FILTER_ID})`} className="text-foreground">
    <path
      d={`M${x},${y + 10} v30 c0,5 30,5 30,0 v-30 M${x},${y + 10} c0,-5 30,-5 30,0 c0,5 -30,5 -30,0`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <text x={x + 15} y={y + 60} textAnchor="middle" className="text-xs font-bold fill-current font-mono">
      {label}
    </text>
  </g>
);

/**
 * SystemDiagram Component.
 * 
 * Renders "Hand-Drawn" style architecture diagrams using inline SVGs and a custom turbulence filter.
 * This component visualizes technical concepts like caching, microservices, and sync logic
 * in a way that fits the "Sticky Note / Napkin Sketch" aesthetic of the portfolio.
 */
export default function SystemDiagram({ type, className = "" }: SystemDiagramProps) {
  // Diagram implementations
  const renderDiagram = () => {
    switch (type) {
      case "cache":
        return (
          <>
            <text x="50%" y="20" textAnchor="middle" className="font-handwriting text-xl fill-current">Read-Through Cache Pattern</text>
            
            {/* Client */}
            <Box x={50} y={100} width={80} height={50} label="Client" />
            
            {/* Load Balancer */}
            <Box x={180} y={100} width={40} height={150} label="LB" />
            
            {/* API Servers */}
            <Box x={270} y={60} width={80} height={40} label="API 1" />
            <Box x={270} y={125} width={80} height={40} label="API 2" />
            <Box x={270} y={190} width={80} height={40} label="API 3" />
            
            {/* Cache Layer */}
            <Box x={400} y={60} width={60} height={170} label="Redis" sub="Cluster" />
            
            {/* DB Layer */}
            <Database x={520} y={110} label="Postgres" />

            {/* Connections */}
            <Arrow d="M130,125 L180,125" />
            
            {/* LB to APIs */}
            <Arrow d="M220,120 L270,80" />
            <Arrow d="M220,130 L270,145" />
            <Arrow d="M220,140 L270,210" />
            
            {/* APIs to Cache */}
            <Arrow d="M350,80 L400,100" />
            <Arrow d="M350,145 L400,145" />
            <Arrow d="M350,210 L400,190" />
            
            {/* Cache to DB (Miss) */}
            <Arrow d="M460,145 L520,135" />
          </>
        );
      
      case "microservices":
        return (
          <>
             <text x="50%" y="20" textAnchor="middle" className="font-handwriting text-xl fill-current">Event-Driven Architecture</text>
             
             <Box x={20} y={100} width={70} height={40} label="Order" sub="Service" />
             <Box x={140} y={80} width={80} height={80} label="RabbitMQ" sub="Exchange" />
             
             <Box x={280} y={40} width={80} height={40} label="Inventory" sub="Service" />
             <Box x={280} y={100} width={80} height={40} label="Payment" sub="Service" />
             <Box x={280} y={160} width={80} height={40} label="Notif." sub="Service" />
             
             <Database x={400} y={30} label="Inv DB" />
             <Database x={400} y={150} label="User DB" />
             
             {/* Flows */}
             <Arrow d="M90,120 L140,120" /> {/* Order -> MQ */}
             
             <Arrow d="M220,100 L280,60" /> {/* MQ -> Inv */}
             <Arrow d="M220,120 L280,120" /> {/* MQ -> Pay */}
             <Arrow d="M220,140 L280,180" /> {/* MQ -> Notif */}
             
             <Arrow d="M360,60 L400,50" />
          </>
        );
        
       case "cli":
        return (
           <>
            <text x="50%" y="20" textAnchor="middle" className="font-handwriting text-xl fill-current">Local-First Sync Architecture</text>
            
            <Box x={50} y={100} width={80} height={50} label="TUI" sub="Interface" />
            <Box x={200} y={80} width={100} height={90} label="Core Logic" sub="Rust" />
            <Database x={380} y={60} label="SQLite" />
            <Box x={380} y={150} width={60} height={40} label="Git" sub="Process" />
            <Box x={500} y={140} width={60} height={60} label="Remote" sub="Repo" />
            
            <Arrow d="M130,125 L200,125" />
            <Arrow d="M300,100 L380,80" />
            <Arrow d="M300,150 L380,170" />
            <Arrow d="M440,170 L500,170" />
           </>
        );

      case "pydown":
        return (
           <>
            <text x="50%" y="20" textAnchor="middle" className="font-handwriting text-xl fill-current">PyDown CLI Architecture</text>
            
            {/* Nodes */}
            <Box x={10} y={100} width={60} height={50} label="User" sub="Terminal" />
            <Box x={100} y={90} width={80} height={70} label="PyDown" sub="Orchestrator" />
            <Box x={100} y={20} width={80} height={40} label="FZF" sub="Interactive UI" />
            <Box x={240} y={90} width={80} height={70} label="YT-DLP" sub="Core Engine" />
            <Box x={400} y={20} width={80} height={50} label="YouTube" sub="CDN / API" />
            
            {/* Decision Diamond */}
            <g transform="translate(400, 105)">
                <polygon points="0,20 20,0 40,20 20,40" fill="none" stroke="currentColor" strokeWidth="2" filter={`url(#${FILTER_ID})`} />
                <text x="20" y="24" textAnchor="middle" className="text-[8px] font-bold fill-current font-mono">Mode</text>
            </g>

            {/* Outputs */}
            <Box x={500} y={80} width={70} height={40} label="MPV/VLC" sub="Player" />
            <Database x={510} y={160} label="Disk" />

            {/* --- Connections & Labels --- */}

            {/* User Input */}
            <Arrow d="M70,125 L100,125" />
            
            {/* FZF Loop */}
            <Arrow d="M140,90 L140,60" />
            <Arrow d="M140,60 L140,90" />
            <text x="145" y="80" className="text-[9px] font-mono fill-current opacity-60">Selection</text>

            {/* PyDown -> Engine */}
            <Arrow d="M180,125 L240,125" />
            <text x="210" y="120" textAnchor="middle" className="text-[9px] font-mono fill-current opacity-60">Exec Params</text>

            {/* Engine <-> YouTube (Bidirectional) */}
            <Arrow d="M280,90 L320,50 L400,50" /> {/* Req */}
            <text x="340" y="45" textAnchor="middle" className="text-[9px] font-mono fill-current opacity-60">Request</text>
            
            <Arrow d="M440,70 L440,100 L320,100" /> {/* Resp */}
            <text x="380" y="95" textAnchor="middle" className="text-[9px] font-mono fill-current opacity-60">Stream Data</text>

            {/* Engine -> Decision */}
            <Arrow d="M320,125 L400,125" />
            
            {/* Branch: Stream */}
            <Arrow d="M420,105 L460,100 L500,100" />
            <text x="460" y="95" textAnchor="middle" className="text-[9px] font-mono fill-current opacity-60">Pipe (Stdout)</text>

            {/* Branch: Download */}
            <Arrow d="M420,145 L460,170 L510,170" />
            <text x="450" y="165" textAnchor="middle" className="text-[9px] font-mono fill-current opacity-60">Write File</text>
            <text x="450" y="175" textAnchor="middle" className="text-[8px] font-sans fill-current opacity-50">(Fmt + Subs)</text>
           </>
        );

      case "logs":
        return (
          <>
            <text x="50%" y="20" textAnchor="middle" className="font-handwriting text-xl fill-current">Async Log Ingestion Flow</text>
            
            <Box x={20} y={100} width={70} height={50} label="Apps" sub="Log Sources" />
            <Box x={130} y={80} width={100} height={90} label="Kafka" sub="Message Bus" />
            <Box x={270} y={80} width={100} height={90} label="Elixir" sub="Ingestor" />
            <Database x={420} y={90} label="Elastic" />
            <Box x={530} y={100} width={60} height={50} label="Search" sub="API" />

            <Arrow d="M90,125 L130,125" />
            <Arrow d="M230,125 L270,125" />
            <Arrow d="M370,125 L420,125" />
            <Arrow d="M480,125 L530,125" />
          </>
        );

      case "auth":
        return (
          <>
            <text x="50%" y="20" textAnchor="middle" className="font-handwriting text-xl fill-current">Identity & Auth Flow</text>
            
            <Box x={30} y={100} width={70} height={50} label="User" sub="Client" />
            <Box x={150} y={80} width={120} height={100} label="Go Auth" sub="Service" />
            <Database x={330} y={60} label="Redis" />
            <Box x={450} y={100} width={100} height={60} label="OAuth" sub="Github/Google" />

            <Arrow d="M100,125 L150,125" />
            <Arrow d="M270,100 L330,85" />
            <Arrow d="M270,140 L450,140" />
            <text x="360" y="145" textAnchor="middle" className="text-[9px] font-mono fill-current opacity-60">Redirect/Callback</text>
          </>
        );

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