import React, { useState, useMemo } from "react";
import { Briefcase, Award } from "lucide-react";
import { SectionHeading } from "./Primitives.jsx";
import { SKILL_CATEGORIES, PROJECTS } from "../data/portfolioData.js";

const ACHIEVEMENT_BADGES = [
  { title: "World Computer Hacker League" },
  { title: "Pathway AI Hackathon — IIT Ropar" },
];

export default function Skills() {
  const [selected, setSelected] = useState([]);

  function toggle(tag) {
    setSelected((s) => (s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]));
  }

  const filtered = useMemo(() => {
    if (selected.length === 0) return PROJECTS;
    return PROJECTS.filter((p) => p.tags.some((t) => selected.includes(t)));
  }, [selected]);

  return (
    <section id="skills" className="relative border-b border-zinc-800 bg-black px-4 py-20 sm:px-8">
      {/* subtle grid backdrop for a high-contrast, technical feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #34d399 1px, transparent 1px), linear-gradient(to bottom, #34d399 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading eyebrow="~/stack" title="Technical matrix" eyebrowClass="text-emerald-400" />

        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <p className="mb-2.5 font-mono text-xs uppercase tracking-wider text-zinc-500">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const active = selected.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggle(item)}
                      className={`rounded border px-2.5 py-1 font-mono text-xs transition-colors ${
                        active
                          ? "border-emerald-400 bg-emerald-400/10 text-emerald-300 shadow-[0_0_12px_-2px_rgba(52,211,153,0.5)]"
                          : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              filtered_projects{selected.length > 0 ? ` (${filtered.length})` : ""}
            </p>
            {selected.length > 0 && (
              <button onClick={() => setSelected([])} className="font-mono text-xs text-zinc-500 hover:text-emerald-400">
                clear filters
              </button>
            )}
          </div>
          <div className="space-y-2">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-800 bg-zinc-950 px-4 py-3"
              >
                <div>
                  <p className="font-mono text-sm text-zinc-100">{p.name}</p>
                  <p className="text-xs text-zinc-500">{p.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        selected.includes(t) ? "bg-emerald-400/15 text-emerald-300" : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="font-mono text-xs text-zinc-600">no matching projects</p>}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-950 px-3 py-2">
            <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono text-xs text-zinc-300">CazBrain — Data Science Internship</span>
          </div>
          {ACHIEVEMENT_BADGES.map((a) => (
            <div key={a.title} className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-950 px-3 py-2">
              <Award className="h-3.5 w-3.5 text-indigo-400" />
              <span className="font-mono text-xs text-zinc-300">{a.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
