import React from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { TIMELINE } from "../data/portfolioData.js";

export default function About() {
  return (
    <section id="about" className="border-b border-black/10 px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div><p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d97745]">01 / About</p><h2 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">A curious builder with a data-first mindset.</h2></div>
        <div>
          <p className="max-w-3xl text-lg leading-8 text-[#59616f]">Final-year B.Tech student in Artificial Intelligence & Data Science with hands-on experience across machine learning, data analysis, and full-stack development. I enjoy turning complex ideas into simple, useful products.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {TIMELINE.map((item, i) => <div key={i} className="border-t border-black/15 pt-4"><div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8a8f99]">{item.kind === "education" ? <GraduationCap className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}{item.period}</div><h3 className="mt-3 font-semibold text-[#1f2430]">{item.title}</h3><p className="mt-1 text-sm text-[#d97745]">{item.org}</p><p className="mt-2 text-sm leading-6 text-[#59616f]">{item.detail}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
