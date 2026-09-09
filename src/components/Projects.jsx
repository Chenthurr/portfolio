import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/portfolioData.js";

export default function Projects() {
  return (
    <section id="projects" className="border-b border-black/10 px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d97745]">02 / Selected work</p><h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Things I’ve built.</h2></div><p className="max-w-md text-sm leading-6 text-[#59616f]">A selection of systems where AI, software, and data come together to solve practical problems.</p></div>
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => <article key={p.id} className={`group rounded-[1.5rem] border border-black/10 bg-[#efe6d6] p-7 transition hover:-translate-y-1 hover:shadow-xl ${i === 0 ? "md:col-span-2" : ""}`}><div className="flex items-start justify-between gap-5"><span className="text-sm text-[#8a8f99]">0{i + 1}</span><ArrowUpRight className="h-5 w-5 text-[#d97745] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div><h3 className="mt-12 font-serif text-3xl font-semibold text-[#1f2430]">{p.name}</h3><p className="mt-2 max-w-xl text-[#59616f]">{p.tagline}</p><div className="mt-7 flex flex-wrap gap-2">{p.tags.map((tag) => <span key={tag} className="rounded-full border border-black/10 bg-[#f7f2e8] px-3 py-1 text-xs text-[#59616f]">{tag}</span>)}</div><p className="mt-7 text-xs uppercase tracking-widest text-[#8a8f99]">{p.year}</p></article>)}
        </div>
      </div>
    </section>
  );
}
