"use client";

import { useCallback, useState } from "react";
import StickyNote from "./components/StickyNote";
import ProjectCard from "./components/ProjectCard";
import ThemeToggle from "./components/ThemeToggle";
import ManilaFolder from "./components/ManilaFolder";
import CaseStudyModal from "./components/CaseStudyModal";
import Modal, { CloseButton } from "./components/Modal";
import { PROJECTS, type Project } from "./data/projects";
import { EXPERIENCE, PROFILE, RESUME_PDF } from "./data/resume";

const STATS = [
  { value: "200+", label: "users on Ardena, the car rental marketplace I run as CTO" },
  { value: "40+", label: "students trading on Vendas, my campus marketplace app" },
  { value: "30+", label: "ISP subscribers billed through my MikroTik + M-Pesa system" },
  { value: "3", label: "payment providers integrated in production: M-Pesa Daraja, Paystack and PayHero" },
];

const SERVICES = [
  {
    title: "Payment integrations",
    body: "M-Pesa Daraja (STK Push), Paystack and PayHero, with signed webhooks, reconciliation and fallbacks so you don't lose or double-count money.",
  },
  {
    title: "APIs & backends",
    body: "Python (FastAPI), Go or Node.js/TypeScript (Express, NestJS) on PostgreSQL and Redis, with auth, background workers, tests and documentation.",
  },
  {
    title: "ISP & hotspot billing",
    body: "PPPoE and pay-as-you-go Wi-Fi on MikroTik with FreeRADIUS, plus a captive portal customers pay through with M-Pesa.",
  },
  {
    title: "Deployment & Linux ops",
    body: "Key-only SSH over a private Headscale/Tailscale network, Docker and Nginx, CI/CD with staging and rollback, and backups. I run three production servers this way.",
  },
];

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-10" id={id}>
      <h2 className="text-3xl md:text-4xl font-bold">{children}</h2>
      <div className="h-px flex-1 bg-foreground/10" />
    </div>
  );
}

export default function Home() {
  const [diagramProject, setDiagramProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const closeDiagram = useCallback(() => setDiagramProject(null), []);
  const closeResume = useCallback(() => setIsResumeOpen(false), []);

  const featured = PROJECTS.filter((p) => p.featured);
  const more = PROJECTS.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 h-[900px] bg-dot-pattern pointer-events-none" aria-hidden="true" />

      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-background/80 border-b border-foreground/5 px-4 md:px-6 py-3 flex justify-between items-center">
        <a href="#top" className="flex items-center gap-3">
          <span className="bg-zinc-900 text-white p-2 rounded-lg shadow-sm" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight">
            Erick Jillo <span className="text-blue-500">.dev</span>
          </span>
        </a>
        <nav className="flex items-center gap-1 md:gap-4 text-sm">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hidden md:inline px-2 py-1 text-foreground/70 hover:text-foreground">
              {n.label}
            </a>
          ))}
          <a href={RESUME_PDF} download className="px-3 py-1.5 rounded-md bg-foreground text-background font-semibold hover:opacity-90">
            Resume
          </a>
          <ThemeToggle />
        </nav>
      </header>

      <div id="top" className="relative max-w-6xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-16 space-y-28">
        {/* Hero */}
        <section className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <p className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-4">{PROFILE.title}</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              I build backends that move real money.
            </h1>
            <p className="text-lg text-foreground/75 leading-relaxed mb-6 max-w-2xl">
              CTO at <strong className="text-foreground">Ardena</strong>, where I run the FastAPI/PostgreSQL platform
              behind a car rental marketplace with 200+ users. I build backends in Python, Go and Node.js/TypeScript, integrate M-Pesa, Paystack and PayHero,
              and keep the Linux servers running.
            </p>
            <p className="text-sm text-foreground/60 mb-8">
              {PROFILE.location} · {PROFILE.availability}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#work" className="px-5 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700">
                See my work
              </a>
              <a href={RESUME_PDF} download className="px-5 py-3 rounded-md border border-foreground/20 font-semibold hover:bg-foreground/5">
                Download resume
              </a>
              <a href={`mailto:${PROFILE.email}`} className="px-5 py-3 rounded-md border border-foreground/20 font-semibold hover:bg-foreground/5">
                Email me
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10 justify-items-center">
            <StickyNote color="blue" rotation="rotate-1" className="w-full max-w-[320px]">
              <h2 className="font-handwriting text-3xl mb-3">Daily stack</h2>
              <ul className="space-y-1 text-sm">
                <li>Python · FastAPI</li>
                <li>Go · net/http · pgx</li>
                <li>Node.js · TypeScript · Express · NestJS</li>
                <li>Rust</li>
                <li>PostgreSQL · Redis · MySQL</li>
                <li>Docker · Nginx · GitHub Actions</li>
              </ul>
            </StickyNote>
            <div className="hidden lg:flex w-full justify-center">
              <ManilaFolder rotation="-rotate-2" title="Resume" subtitle="Open the file" onClick={() => setIsResumeOpen(true)} />
            </div>
          </div>
        </section>

        {/* Impact */}
        <section aria-label="Impact" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.value} className="bg-card border border-card-border rounded-lg p-5">
              <p className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">{s.value}</p>
              <p className="text-sm text-foreground/70 mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Featured work */}
        <section>
          <SectionHeading id="work">Featured work</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} onShowDiagram={setDiagramProject} />
            ))}
          </div>

          <h3 className="text-2xl font-bold mt-16 mb-6">More projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} onShowDiagram={setDiagramProject} />
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <SectionHeading id="experience">Experience</SectionHeading>
          <ol className="space-y-8">
            {EXPERIENCE.map((job) => (
              <li key={job.company} className="grid md:grid-cols-[220px_1fr] gap-2 md:gap-8">
                <p className="font-mono text-sm text-foreground/60 pt-1">{job.duration}</p>
                <div className="border-l-2 border-blue-500/40 pl-5">
                  <h3 className="text-xl font-bold">{job.role}</h3>
                  <p className="text-foreground/70 mb-1">{job.company}</p>
                  <p className="font-mono text-xs text-foreground/50 mb-3">{job.stack}</p>
                  <ul className="space-y-1.5 text-foreground/80">
                    {job.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="text-blue-500" aria-hidden="true">▸</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="px-5 py-2.5 rounded-md border border-foreground/20 font-semibold hover:bg-foreground/5"
            >
              Read the full resume
            </button>
            <a href={RESUME_PDF} download className="px-5 py-2.5 rounded-md border border-foreground/20 font-semibold hover:bg-foreground/5">
              Download PDF
            </a>
          </div>
        </section>

        {/* Services (for clients) */}
        <section>
          <SectionHeading id="services">What I can build for you</SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <StickyNote
                key={s.title}
                color={(["yellow", "pink", "green", "blue"] as const)[i]}
                rotation={["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"][i]}
              >
                <h3 className="font-handwriting text-2xl mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed">{s.body}</p>
              </StickyNote>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s work together</h2>
            <p className="text-lg text-foreground/75 mb-6">
              Hiring for a backend role, or need payments, an API or ISP billing built? Email me with what you need.
            </p>
            <a href={`mailto:${PROFILE.email}`} className="inline-block px-5 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700">
              {PROFILE.email}
            </a>
          </div>
          <StickyNote color="green" rotation="rotate-2" className="max-w-sm w-full justify-self-center">
            <h3 className="font-handwriting text-3xl mb-4">Find me</h3>
            <ul className="space-y-3 font-mono text-sm">
              <li>
                <span className="inline-block w-20 text-neutral-600">Email</span><a className="underline hover:text-blue-700" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </li>
              <li>
                <span className="inline-block w-20 text-neutral-600">GitHub</span><a className="underline hover:text-blue-700" href={PROFILE.github} target="_blank" rel="noopener noreferrer">github.com/Ericode254</a>
              </li>
              <li>
                <span className="inline-block w-20 text-neutral-600">LinkedIn</span><a className="underline hover:text-blue-700" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/ericode254</a>
              </li>
              <li>
                <span className="inline-block w-20 text-neutral-600">Resume</span><a className="underline hover:text-blue-700" href={RESUME_PDF} download>Resume (PDF)</a>
              </li>
            </ul>
          </StickyNote>
        </section>

        <footer className="text-center text-foreground/40 text-sm font-mono pt-8">
          © {new Date().getFullYear()} Erick Jillo
        </footer>
      </div>

      {/* Architecture diagram viewer */}
      <Modal isOpen={!!diagramProject} onClose={closeDiagram} label={`${diagramProject?.name ?? ""} architecture`} className="max-w-5xl">
        {diagramProject?.diagram && (
          <div className="bg-card border border-card-border p-6 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center gap-4 mb-4 border-b border-foreground/10 pb-4">
              <h3 className="text-xl font-bold">{diagramProject.name}: architecture</h3>
              <div className="flex items-center gap-1">
                <a
                  href={diagramProject.diagram}
                  download
                  className="text-sm px-3 py-1.5 rounded-md hover:bg-foreground/5"
                >
                  ↓ Download
                </a>
                <CloseButton onClick={closeDiagram} />
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-white rounded-lg p-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={diagramProject.diagram} alt={`${diagramProject.name} architecture diagram`} className="max-w-full h-auto" />
            </div>
          </div>
        )}
      </Modal>

      <CaseStudyModal isOpen={isResumeOpen} onClose={closeResume} />
    </main>
  );
}
