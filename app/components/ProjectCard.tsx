import React from 'react';

/**
 * Props for the ProjectCard component.
 */
interface ProjectCardProps {
    /** The display name of the project. */
    name: string;
    /** A brief description of the project's purpose and architecture. */
    description: string;
    /** List of technologies used (e.g., ["Go", "Redis"]). */
    techStack: string[];
    /** URL to the source code or live demo. */
    link?: string;
    /** 
     * Optional callback to trigger the Architecture Diagram view. 
     * If provided, a specific button for this action will be rendered.
     */
    onShowArchitecture?: () => void;
}

/**
 * ProjectCard Component.
 * 
 * Displays a single project in a clean "Index Card" style.
 * It emphasizes technical details (tech stack) over visuals.
 * 
 * Features:
 * - Clean typography using Geist Sans.
 * - Tech stack badges.
 * - Optional link to source code.
 * - Optional button to view system architecture diagrams.
 */
export default function ProjectCard({ name, description, techStack, link, onShowArchitecture }: ProjectCardProps) {
    return (
        <div className="bg-card border border-card-border p-6 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full flex flex-col group">
            {/* Header: Title and ID Badge */}
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-sans">{name}</h3>
                <span className="text-2xl text-zinc-400 opacity-50">#</span>
            </div>

            {/* Description Body */}
            <p className="text-foreground/80 text-sm mb-6 flex-1 font-sans leading-relaxed">
                {description}
            </p>

            {/* Footer: Tech Stack and Actions */}
            <div className="mt-auto space-y-4">
                <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                        <span key={tech} className="text-xs font-mono bg-black/5 dark:bg-white/10 text-foreground/70 px-2 py-1 rounded">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-card-border/50">
                    {/* Render Architecture Button if handler is provided */}
                    {onShowArchitecture && (
                         <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onShowArchitecture();
                            }}
                            className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                            title="View System Design"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                            System Architecture
                        </button>
                    )}

                    {link && (
                        <a
                            href={link}
                            className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline gap-1 ml-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Source
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
