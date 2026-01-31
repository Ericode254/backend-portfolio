"use client";

import { useState } from "react";
import StickyNote from "./components/StickyNote";
import ProjectCard from "./components/ProjectCard";
import ThemeToggle from "./components/ThemeToggle";
import SystemDiagram from "./components/SystemDiagram";
import ManilaFolder from "./components/ManilaFolder";
import CaseStudyModal from "./components/CaseStudyModal";

/**
 * Type definition for the supported architecture diagram types.
 * @typedef {("cache" | "microservices" | "cli" | "logs" | "auth" | "pydown" | "default")} DiagramType
 */
type DiagramType =
  | "cache"
  | "microservices"
  | "cli"
  | "logs"
  | "auth"
  | "pydown"
  | "default";

/**
 * Interface representing a Sticky Note's data structure.
 * Explicitly allows all supported colors to prevent type inference issues.
 */
interface NoteData {
  id: string;
  color: "yellow" | "blue" | "pink" | "green";
  rotation: string;
  title?: string;
  content: React.ReactNode;
}

/**
 * The main Home component for the Portfolio.
 *
 * This component orchestrates the entire landing page, managing state for:
 * - Selected Sticky Notes (Hero & Contact)
 * - Architecture Diagrams (Project Cards)
 * - The "Manila Folder" Document Viewer (Resume/Case Studies)
 *
 * It uses a grid layout to simulate a developer's chaotic but organized desk.
 */
export default function Home() {
  // State for the currently expanded sticky note (Hero or Contact)
  const [selectedNote, setSelectedNote] = useState<NoteData | null>(null);

  // State for the active system architecture diagram modal
  const [selectedProjectDiagram, setSelectedProjectDiagram] = useState<{
    title: string;
    type: DiagramType;
    imageSrc?: string;
  } | null>(null);

  // State for the Case Study / Resume document viewer
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  /**
   * Handles downloading the architecture diagram.
   * If an image source is provided, it downloads the file.
   * Otherwise, it serializes the inline SVG and downloads it.
   */
  const handleDownloadDiagram = () => {
    if (!selectedProjectDiagram) return;

    const title = selectedProjectDiagram.title.toLowerCase().replace(/\s+/g, "-");
    
    if (selectedProjectDiagram.imageSrc) {
      const link = document.createElement("a");
      link.href = selectedProjectDiagram.imageSrc;
      link.download = `${title}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const modalElement = document.getElementById("architecture-diagram-container");
      const svgElement = modalElement?.querySelector("svg");
      
      if (svgElement) {
        const clonedSvg = svgElement.cloneNode(true) as SVGElement;
        clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        
        const svgData = new XMLSerializer().serializeToString(clonedSvg);
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `${title}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
      }
    }
  };

  /**
   * Data for the Hero Section Sticky Notes.
   * Each note contains its visual properties (color, rotation) and content.
   */
  const NOTES_DATA: NoteData[] = [
    {
      id: "intro",
      color: "yellow",
      rotation: "-rotate-2",
      title: "Hi, I'm Erick!",
      content: (
        <div className="space-y-4">
          <p className="text-xl font-bold">Backend Software Engineer</p>
          <p>
            I build the invisible engines that power the web. Specialized in
            distributed systems, high-concurrency APIs, and robust data
            architecture and linux system administration.
          </p>
          <div className="mt-4 text-sm text-neutral-600 font-mono">
            Location: The Cloud ☁️
          </div>
        </div>
      ),
    },
    {
      id: "stack",
      color: "blue",
      rotation: "rotate-1",
      title: "Tech Stack",
      content: (
        <ul className="space-y-2 text-lg">
          <li>🚀 Go (Golang)</li>
          <li>🐍 Python</li>
          <li>⚡ Node.js / TypeScript / Javascript</li>
          <li>🐘 PostgreSQL / NeonDB / ConvexDB / SQLite / MySQL & Redis</li>
          <li>🐳 Docker </li>
        </ul>
      ),
    },
    {
      id: "goals",
      color: "pink",
      rotation: "-rotate-3",
      title: "Current Focus",
      content: (
        <div className="space-y-2">
          <p>Working on an ecommerce api.</p>
          <p className="line-through opacity-50">Completing a course for Go</p>
          <p>Creating a text editor using the C language.</p>
        </div>
      ),
    },
  ];

  /**
   * Data for the Contact Section Sticky Note.
   * This is separated to allow it to be rendered in the footer but opened in the same modal.
   */
  const CONTACT_NOTE: NoteData = {
    id: "contact",
    color: "green",
    rotation: "rotate-2",
    title: "Communication Channels",
    content: (
      <div className="space-y-6">
        <p className="text-xl leading-relaxed">
          I am currently open to discussing new opportunities, complex backend
          challenges, or just geeking out over linux or the command line.
        </p>
        <div className="space-y-4 font-mono text-lg border-t border-black/10 pt-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📧</span>
            <a
              href="mailto:jilloerick6@gmail.com"
              className="hover:underline hover:text-blue-600 transition-colors"
              target="_blank"
            >
              jilloerick6@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐙</span>
            <a
              href="https://github.com/Ericode254"
              className="hover:underline hover:text-blue-600 transition-colors"
              target="_blank"
            >
              github.com/Ericode254
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">💼</span>
            <a
              href="https://www.linkedin.com/in/ericode254/"
              className="hover:underline hover:text-blue-600 transition-colors"
              target="_blank"
            >
              linkedin.com/in/ericode254
            </a>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-x-hidden bg-dot-pattern">
      {/* 
        Header Section
        Contains the Logo/Brand and the Theme Toggle.
      */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/80 border-b border-foreground/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Custom Terminal Icon */}
          <div className="bg-zinc-900 text-white p-2 rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-sans">
            Erick Jillo <span className="text-blue-500">.dev</span>
          </h1>
        </div>
        <ThemeToggle />
      </header>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32">
        {/* 
          Hero Section 
          Renders the grid of sticky notes and the manila folder.
        */}
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-5xl mx-auto">
            {NOTES_DATA.map((note) => (
              <div key={note.id} className="flex justify-center">
                <StickyNote
                  color={note.color}
                  rotation={note.rotation}
                  className="w-full max-w-[320px] cursor-pointer hover:shadow-xl"
                  onClick={() => setSelectedNote(note)}
                >
                  {note.title && (
                    <h2 className="text-3xl font-bold mb-4">{note.title}</h2>
                  )}
                  {note.content}
                </StickyNote>
              </div>
            ))}

            {/* The Manila Folder (Resume/Case Studies) */}
            <div className="flex justify-center items-center">
              <ManilaFolder
                title="RESUME & DOCS"
                rotation="rotate-2"
                onClick={() => setIsCaseStudyOpen(true)}
              />
            </div>
          </div>
        </section>

        {/* 
          Projects Section 
          Displays selected works in a grid of cards.
        */}
        <section className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bold font-sans">Selected Works</h2>
            <div className="h-px flex-1 bg-foreground/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              name="PyDown"
              description="A simple CLI application created using python that enable users to access youtube from the terminal and play youtube videos directly from the terminal or choose to download any youtube video in any quality with or without subtitle"
              techStack={["Python", "FZF", "mpv or vlc"]}
              link="https://github.com/Ericode254/PyDown.git"
              onShowArchitecture={() =>
                setSelectedProjectDiagram({
                  title: "PyDown Architecture",
                  type: "pydown",
                  imageSrc: "/diagrams/pydown.png"
                })
              }
            />
            <ProjectCard
              name="Terminal Controlled Blog"
              description="A blog platform that renders markdown files, i use the terminal to create the posts with a .md extension and then i use a bash script and https from the convex database to push everything directly to the production database and then it beautifully renders on the blog website."
              techStack={["React.js", "ConvexDB", "Bash"]}
              link="https://terminalandcoffee.netlify.app/"
              onShowArchitecture={() =>
                setSelectedProjectDiagram({
                  title: "Terminal Controlled Blog Architecture",
                  type: "cli",
                  imageSrc: "/diagrams/terminalandcoffee.png"
                })
              }
            />
            <ProjectCard
              name="Study Planner"
              description="An AI powered flask application that enables students to create personalized study plans based on their courses, goals, and available time. They can also share these study plans with the public."
              techStack={["Python", "AI", "SQLite"]}
              link="https://github.com/Ericode254/StudyPlanner.git"
              // onShowArchitecture={() =>
              //   setSelectedProjectDiagram({
              //     title: "Study Planner Architecture",
              //     type: "microservices",
              //   })
              // }
            />
            <ProjectCard
              name="Code Constellation"
              description="This is a vscode extension that is inspired by Obsidian that graphically visualizes your whole project in the form of nodes"
              techStack={["HTML", "CSS", "Typescript"]}
              link="https://github.com/Ericode254/CodeConstellation.git"
              // onShowArchitecture={() =>
              //   setSelectedProjectDiagram({
              //     title: "Log Aggregator Architecture",
              //     type: "logs",
              //   })
              // }
            />
            <ProjectCard
              name="Auth Service"
              description="Centralized authentication service supporting OAuth2, OIDC, and custom JWT flows."
              techStack={["Go", "Gin", "Redis", "Docker"]}
              link="#"
              onShowArchitecture={() =>
                setSelectedProjectDiagram({
                  title: "Auth Service Architecture",
                  type: "auth",
                })
              }
            />
          </div>
        </section>

        {/* 
          Contact Section
          Interactive footer sticky note that opens the contact modal.
        */}
        <section className="flex flex-col items-center justify-center pb-20">
          <StickyNote
            color={CONTACT_NOTE.color}
            rotation={CONTACT_NOTE.rotation}
            className="max-w-md text-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedNote(CONTACT_NOTE)}
          >
            <h2 className="text-3xl font-bold mb-6">Let&apos;s Connect!</h2>
            <div className="space-y-3 text-xl">
              <p className="mb-4">Click here to open communication channels.</p>
              <div className="flex justify-center gap-4 text-3xl opacity-80">
                <span>📧</span>
                <span>🐙</span>
                <span>💼</span>
              </div>
            </div>
          </StickyNote>

          <footer className="mt-24 text-foreground/40 text-sm font-mono">
            © {new Date().getFullYear()} Erick Jillo. All rights reserved.
          </footer>
        </section>
      </div>

      {/* 
        Modal Overlay for Sticky Notes
        Handles the "Zoomed In" view for both Hero notes and the Contact note.
      */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setSelectedNote(null)}
          />
          <div className="relative z-10 max-w-lg w-full">
            <StickyNote
              color={selectedNote.color}
              rotation="rotate-0"
              className="!p-10 shadow-2xl scale-100 cursor-default"
            >
              <button
                onClick={() => setSelectedNote(null)}
                className="absolute top-2 right-2 p-2 hover:bg-black/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              {selectedNote.title && (
                <h2 className="text-4xl font-bold mb-6">
                  {selectedNote.title}
                </h2>
              )}
              <div className="text-xl leading-relaxed">
                {selectedNote.content}
              </div>
            </StickyNote>
          </div>
        </div>
      )}

      {/* 
        Modal for Architecture Diagrams 
        Displays the hand-drawn system designs.
      */}
      {selectedProjectDiagram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setSelectedProjectDiagram(null)}
          />
          <div className="relative z-10 max-w-4xl w-full bg-card border border-card-border p-8 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 border-b border-foreground/10 pb-4">
              <h3 className="text-2xl font-bold font-sans flex items-center gap-2">
                <span className="text-orange-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </span>
                {selectedProjectDiagram.title}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadDiagram}
                  className="p-2 hover:bg-foreground/5 rounded-full transition-colors group relative"
                  title="Download Diagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedProjectDiagram(null)}
                  className="p-2 hover:bg-foreground/5 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div 
              id="architecture-diagram-container"
              className="flex-1 overflow-auto bg-background/50 rounded-lg p-4 border border-dashed border-foreground/20 flex items-center justify-center"
            >
              {selectedProjectDiagram.imageSrc ? (
                <img 
                  src={selectedProjectDiagram.imageSrc} 
                  alt={selectedProjectDiagram.title} 
                  className="max-w-full h-auto object-contain"
                />
              ) : (
                <SystemDiagram type={selectedProjectDiagram.type} />
              )}
            </div>

            <p className="mt-4 text-center text-sm text-foreground/50 font-mono">
              * Diagram rendered from Excalidraw design asset.
            </p>
          </div>
        </div>
      )}

      {/* 
        Case Study Modal
        The "Confidential Document" viewer for the Resume and Case Studies.
      */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />
    </main>
  );
}
