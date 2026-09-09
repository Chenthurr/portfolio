import React from "react";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { CONTACT, LINKS } from "../data/portfolioData.js";

export default function Hero() {
  return (
    <section id="home" className="relative border-b border-black/10 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <div>
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-[#d97745]">AI & Data Science · Developer</p>
          <h1 className="max-w-4xl font-serif text-6xl font-semibold leading-[0.92] tracking-[-0.04em] text-[#1f2430] md:text-8xl">
            Building useful things with <span className="italic text-[#d97745]">data & code.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#59616f] md:text-xl">
            I’m Chenthurr C K, an AI & Data Science engineer focused on intelligent products, modern web experiences, and practical data systems.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 rounded-full bg-[#1f2430] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d97745]">View my work <ArrowUpRight className="h-4 w-4" /></a>
            <a href={CONTACT.emailHref} className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-[#1f2430] hover:border-[#d97745] hover:text-[#d97745]"><Mail className="h-4 w-4" /> Email me</a>
          </div>
          <div className="mt-7 flex gap-4 text-[#59616f]">
            <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:ml-auto">
          <div className="aspect-[4/5] rounded-[2rem] border border-black/10 bg-[#eadfc9] p-5 shadow-[12px_12px_0_#d97745]">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-black/10 bg-[#f7f2e8] p-7">
              <span className="text-sm uppercase tracking-widest text-[#59616f]">Currently</span>
              <div>
                <p className="font-serif text-4xl font-semibold leading-tight">Learning.<br />Building.<br /><span className="text-[#d97745]">Shipping.</span></p>
                <p className="mt-5 text-sm leading-6 text-[#59616f]">Python · React · FastAPI · ML · Computer Vision · Data Engineering</p>
              </div>
              <p className="text-sm text-[#59616f]">Coimbatore, Tamil Nadu, India</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-6xl items-center gap-2 text-sm text-[#8a8f99]"><ArrowDown className="h-4 w-4" /> Scroll to explore</div>
    </section>
  );
}
