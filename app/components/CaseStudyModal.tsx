import React from "react";
import { DOCUMENT_DATA } from "../data/resume";

/**
 * Props for the CaseStudyModal component.
 */
interface CaseStudyModalProps {
  /** Controls whether the modal is visible. */
  isOpen: boolean;
  /** Handler to close the modal. */
  onClose: () => void;
}

interface SectionBase {
  type: string;
  title: string;
}

interface TextSection extends SectionBase {
  type: "text";
  content: string;
}

interface ListSection extends SectionBase {
  type: "list";
  items: string[];
}

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  details: string;
}

interface ExperienceSection extends SectionBase {
  type: "experience";
  items: ExperienceItem[];
}

interface CodeSection extends SectionBase {
  type: "code";
  content: string;
}

type Section = TextSection | ListSection | ExperienceSection | CodeSection;

/**
 * CaseStudyModal (Document Viewer).
 * 
 * A full-screen modal that renders content in the style of a "Confidential Report" or "Personnel File".
 * It is data-driven, pulling content from `app/data/resume.ts`.
 * 
 * Supported Section Types:
 * - `text`: Simple paragraphs.
 * - `list`: Bulleted lists.
 * - `experience`: Structured job history.
 * - `code`: Code blocks with syntax highlighting style.
 */
export default function CaseStudyModal({ isOpen, onClose }: CaseStudyModalProps) {
  if (!isOpen) return null;

  const { header, sections, downloadUrl } = DOCUMENT_DATA;

  /**
   * Helper to render different section types based on the data schema.
   */
  const renderSection = (section: Section, index: number) => {
    switch (section.type) {
      case "text":
        return (
          <section key={index} className="mb-8">
            <h3 className="text-xl font-bold mb-3 border-b-2 border-zinc-800 inline-block font-sans">
              {section.title}
            </h3>
            <p className="text-lg text-zinc-700 leading-relaxed">
              {section.content}
            </p>
          </section>
        );
      case "list":
        return (
          <section key={index} className="mb-8">
            <h3 className="text-xl font-bold mb-3 border-b-2 border-zinc-800 inline-block font-sans">
              {section.title}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700 bg-zinc-50 p-4 border border-zinc-200 rounded font-mono text-sm">
              {section.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        );
      case "experience":
        return (
          <section key={index} className="mb-8">
            <h3 className="text-xl font-bold mb-3 border-b-2 border-zinc-800 inline-block font-sans">
              {section.title}
            </h3>
            <div className="space-y-6">
              {section.items.map((item: ExperienceItem, i: number) => (
                <div key={i} className="border-l-2 border-zinc-300 pl-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-zinc-800">{item.role}</h4>
                    <span className="font-mono text-xs text-zinc-500">{item.duration}</span>
                  </div>
                  <div className="text-sm font-bold text-zinc-600 mb-2 font-mono uppercase tracking-wide">
                    {item.company}
                  </div>
                  <p className="text-zinc-700">{item.details}</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "code":
        return (
          <section key={index} className="mb-8">
             <h3 className="text-xl font-bold mb-3 border-b-2 border-zinc-800 inline-block font-sans">
              {section.title}
            </h3>
             <div className="bg-zinc-900 text-zinc-100 p-4 rounded text-sm font-mono overflow-x-auto shadow-inner border border-zinc-700">
               <pre>{section.content}</pre>
             </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* The Document */}
      <div className="relative z-10 w-full max-w-3xl bg-[#fdfbf7] text-zinc-900 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-zinc-300">
        
        {/* Paper Header (Typewriter style) */}
        <div className="px-8 py-6 border-b border-zinc-200 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
          <div className="flex justify-between items-start mb-4 opacity-50 font-mono text-xs uppercase tracking-widest">
            <span>ID: #{header.id}</span>
            <span>Date: {header.date}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2 text-zinc-800">
            {header.title}
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <p className="font-mono text-sm text-zinc-600 uppercase tracking-wide">
                {header.subtitle}
            </p>
            <span className="hidden md:inline text-zinc-300">|</span>
             <p className="font-mono text-sm text-red-700 font-bold uppercase tracking-wide">
                {header.classification}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto font-serif leading-relaxed bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
          
          {(sections as Section[]).map((section, index) => renderSection(section, index))}
          
          {/* Footer / Signature */}
          <div className="mt-12 pt-8 border-t border-zinc-200 flex justify-between items-end">
             <div>
                <p className="font-handwriting text-3xl text-blue-800 -rotate-2 select-none">
                    {header.title.split(' ')[0]}
                </p>
                <p className="text-xs font-mono uppercase text-zinc-400 mt-2">Authorized Signature</p>
             </div>
             
             <a 
                href={downloadUrl}
                download
                className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-2 rounded-sm font-mono text-sm transition-colors flex items-center gap-2 group"
             >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PDF
             </a>
          </div>

        </div>
      </div>
    </div>
  );
}