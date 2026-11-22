"use client";

import React from "react";
import Modal, { CloseButton } from "./Modal";
import { EXPERIENCE, PROFILE, RESUME_PDF, SKILLS, SUMMARY } from "../data/resume";

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Resume viewer styled as a typed document pulled from the manila folder. */
export default function CaseStudyModal({ isOpen, onClose }: CaseStudyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} label="Resume" className="max-w-3xl">
      <div className="bg-paper text-zinc-900 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-zinc-300">
        <div className="relative px-8 py-6 border-b border-zinc-200">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-1 text-zinc-800">{PROFILE.name}</h2>
          <p className="font-mono text-sm text-zinc-600 uppercase tracking-wide">{PROFILE.title}</p>
          <p className="font-mono text-xs text-zinc-500 mt-1">{PROFILE.location}</p>
          <CloseButton onClick={onClose} className="absolute top-4 right-4 text-zinc-500" />
        </div>

        <div className="p-8 overflow-y-auto font-serif leading-relaxed space-y-8">
          <section>
            <h3 className="text-xl font-bold mb-3 border-b-2 border-zinc-800 inline-block font-sans">Summary</h3>
            <p className="text-lg text-zinc-700">{SUMMARY}</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3 border-b-2 border-zinc-800 inline-block font-sans">Experience</h3>
            <div className="space-y-6">
              {EXPERIENCE.map((item) => (
                <div key={item.company} className="border-l-2 border-zinc-300 pl-4">
                  <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                    <h4 className="font-bold text-zinc-800 font-sans">{item.role}</h4>
                    <span className="font-mono text-xs text-zinc-500">{item.duration}</span>
                  </div>
                  <div className="text-sm font-bold text-zinc-600 mb-2 font-mono">{item.company}</div>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-700">
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3 border-b-2 border-zinc-800 inline-block font-sans">Skills</h3>
            <dl className="bg-zinc-50 p-4 border border-zinc-200 rounded font-mono text-sm space-y-2">
              {SKILLS.map((s) => (
                <div key={s.label}>
                  <dt className="inline font-bold">{s.label}: </dt>
                  <dd className="inline text-zinc-700">{s.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="pt-6 border-t border-zinc-200 flex flex-wrap gap-4 justify-between items-end">
            <p className="font-handwriting text-3xl text-blue-800 -rotate-2 select-none">Erick</p>
            <a
              href={RESUME_PDF}
              download
              className="bg-zinc-900 hover:bg-zinc-700 text-white px-6 py-2 rounded-sm font-mono text-sm transition-colors"
            >
              ↓ Download PDF
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}
