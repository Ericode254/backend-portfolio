import React from "react";
import type { Project, LinkKind } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  onShowDiagram?: (project: Project) => void;
}

const LINK_STYLES: Record<LinkKind, string> = {
  live: "bg-blue-600 text-white hover:bg-blue-700",
  store: "bg-emerald-600 text-white hover:bg-emerald-700",
  source: "border border-foreground/20 hover:bg-foreground/5",
  docs: "border border-foreground/20 hover:bg-foreground/5",
};

const LINK_ICONS: Record<LinkKind, string> = {
  live: "↗",
  store: "↗",
  source: "</>",
  docs: "↗",
};

/** Project card. Featured projects show highlights; compact ones show a single line. */
export default function ProjectCard({ project, onShowDiagram }: ProjectCardProps) {
  const { name, tagline, status, highlights, stack, links, tryIt, privateNote, diagram, featured } = project;

  return (
    <article className="bg-card border border-card-border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
          {status}
        </span>
      </div>

      <h3 className={`${featured ? "text-2xl" : "text-lg"} font-bold text-foreground mb-2`}>{name}</h3>
      <p className="text-foreground/80 text-sm leading-relaxed mb-4">{tagline}</p>

      {highlights.length > 0 && (
        <ul className={`text-sm text-foreground/80 space-y-2 mb-5 ${featured ? "" : "text-foreground/70"}`}>
          {highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-blue-500 shrink-0" aria-hidden="true">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {tryIt && (
        <div className="mb-5 text-sm">
          <p className="font-semibold mb-1">Try it</p>
          <p className="text-foreground/70 mb-2">{tryIt.text}</p>
          {tryIt.code && (
            <pre className="bg-zinc-900 text-zinc-100 text-xs font-mono p-3 rounded overflow-x-auto">
              <code>$ {tryIt.code}</code>
            </pre>
          )}
        </div>
      )}

      <div className="mt-auto space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span key={tech} className="text-xs font-mono bg-black/5 dark:bg-white/10 text-foreground/70 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>

        {privateNote && <p className="text-xs text-foreground/60 italic">{privateNote}</p>}

        {(links.length > 0 || (diagram && onShowDiagram)) && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-card-border">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${LINK_STYLES[l.kind]}`}
              >
                <span aria-hidden="true">{LINK_ICONS[l.kind]}</span>
                {l.label}
              </a>
            ))}
            {diagram && onShowDiagram && (
              <button
                type="button"
                onClick={() => onShowDiagram(project)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md text-orange-700 dark:text-orange-400 hover:bg-orange-500/10 transition-colors"
              >
                <span aria-hidden="true">◇</span> Architecture
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
