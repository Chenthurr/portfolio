import React from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { SectionHeading } from "./Primitives.jsx";
import { TIMELINE } from "../data/portfolioData.js";

export default function About() {
  return (
    <section id="about" className="border-b border-zinc-800 bg-zinc-950 px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="~/about" title="Summary & background" />

        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
          Final-year B.Tech student in Artificial Intelligence &amp; Data Science with hands-on
          experience across machine learning, data analysis, and full-stack development.
          Focused on building intelligent systems at the intersection of web technologies and
          data engineering — proven through hackathon finishes at IIT Ropar and ICP/DFINITY,
          alongside internship experience in predictive modeling and data pipelines.
        </p>

        <div className="mt-12 space-y-0">
          {TIMELINE.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
                  {item.kind === "education" ? (
                    <GraduationCap className="h-3.5 w-3.5 text-indigo-400" />
                  ) : (
                    <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
                  )}
                </span>
                {i < TIMELINE.length - 1 && <span className="w-px flex-1 bg-zinc-800" />}
              </div>
              <div className="pb-8">
                <p className="font-mono text-xs text-zinc-500">{item.period}</p>
                <p className="mt-0.5 text-sm font-semibold text-zinc-100">{item.title}</p>
                <p className="text-xs text-zinc-400">{item.org}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
