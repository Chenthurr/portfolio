import React from "react";
import { Award } from "lucide-react";
import { ACHIEVEMENTS } from "../data/portfolioData.js";

export default function Achievements() {
  return (
    <section id="achievements" className="border-b border-black/10 px-5 py-20 md:px-8 md:py-24"><div className="mx-auto max-w-6xl"><p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d97745]">04 / Milestones</p><h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">A few proud moments.</h2><div className="mt-12 grid gap-5 md:grid-cols-2">{ACHIEVEMENTS.map((item) => <article key={item.id} className="rounded-[1.5rem] border border-black/10 bg-white/45 p-7"><div className="flex items-center justify-between"><Award className="h-6 w-6 text-[#d97745]" /><span className="text-xs uppercase tracking-widest text-[#8a8f99]">{item.date}</span></div><h3 className="mt-8 font-serif text-2xl font-semibold">{item.title}</h3><p className="mt-1 text-sm text-[#d97745]">{item.role} · {item.org}</p><p className="mt-4 text-sm leading-7 text-[#59616f]">{item.description}</p></article>)}</div></div></section>
  );
}
