import React from "react";
import { SKILL_CATEGORIES } from "../data/portfolioData.js";

export default function Skills() {
  return (
    <section id="skills" className="border-b border-black/10 bg-[#1f2430] px-5 py-20 text-[#f7f2e8] md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl"><p className="text-sm font-medium uppercase tracking-[0.2em] text-[#f3c36b]">03 / Toolkit</p><h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">Tools I reach for.</h2><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">{SKILL_CATEGORIES.map((cat) => <div key={cat.label} className="bg-[#252b38] p-7"><p className="text-xs uppercase tracking-widest text-white/45">{cat.label}</p><div className="mt-5 flex flex-wrap gap-2">{cat.items.map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-white/75">{item}</span>)}</div></div>)}</div></div>
    </section>
  );
}
