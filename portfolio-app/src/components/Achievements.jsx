import React from "react";
import { Award } from "lucide-react";
import { SectionHeading } from "./Primitives.jsx";
import { ACHIEVEMENTS } from "../data/portfolioData.js";

export default function Achievements() {
  return (
    <section id="achievements" className="border-b border-zinc-800 bg-zinc-950 px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="~/achievements" title="Milestones & recognitions" eyebrowClass="text-amber-400" />

        <div className="grid gap-6 sm:grid-cols-2">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl border border-amber-500/10 bg-zinc-900/60 p-5 transition-all hover:border-amber-400/40 hover:shadow-[0_0_30px_-10px_rgba(251,191,36,0.35)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-400">
                  <Award className="h-4 w-4" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400">
                  {item.date}
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-0.5 font-mono text-xs text-zinc-500">
                {item.role} · {item.org}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
