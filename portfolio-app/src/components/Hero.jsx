import React, { useEffect, useState } from "react";
import { Terminal, Github, Linkedin, Mail, MapPin, ArrowDown } from "lucide-react";
import { CONTACT, LINKS } from "../data/portfolioData.js";

const BOOT_LINES = [
  "$ whoami",
  "chenthurr_c_k — AI & Data Science engineer",
  "$ cat core_skills.txt",
  "Python · FastAPI · React/Next.js · OpenCV · YOLOv8 · PostgreSQL",
  "$ status --location",
  "Coimbatore, Tamil Nadu, India [online]",
];

export default function Hero() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= BOOT_LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 380);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950 px-4 py-20 sm:px-8 lg:py-28"
    >
      {/* glowing gradient blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-emerald-400">
          ~/portfolio/init
        </p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-6xl">
          Chenthurr C K
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          AI &amp; Data Science
          <span className="text-zinc-600"> · </span>
          <span className="text-cyan-400">Web Development</span>
          <span className="text-zinc-600"> · </span>
          <span className="text-indigo-400">Data Engineering</span>
        </p>

        <div className="mt-10 max-w-2xl overflow-hidden rounded-lg border border-zinc-800 bg-black/60 shadow-2xl shadow-emerald-500/5 backdrop-blur">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-3 py-2">
            <Terminal className="h-3.5 w-3.5 text-zinc-500" />
            <span className="font-mono text-xs text-zinc-500">boot.sh</span>
          </div>
          <div className="space-y-1.5 p-4 font-mono text-sm">
            {BOOT_LINES.slice(0, visible).map((line, i) => (
              <p key={i} className={line.startsWith("$") ? "text-emerald-400" : "pl-2 text-zinc-300"}>
                {line}
              </p>
            ))}
            <span className="inline-block h-4 w-2 animate-pulse bg-emerald-400 align-middle" />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={CONTACT.emailHref}
            className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-2 font-mono text-xs text-zinc-300 backdrop-blur transition-colors hover:border-emerald-400/50 hover:text-emerald-400"
          >
            <Mail className="h-3.5 w-3.5" /> {CONTACT.email}
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-2 font-mono text-xs text-zinc-300 backdrop-blur transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
          >
            <Github className="h-3.5 w-3.5" /> github.com/Chenthurr
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/70 px-3 py-2 font-mono text-xs text-zinc-300 backdrop-blur transition-colors hover:border-indigo-400/50 hover:text-indigo-400"
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
          <span className="flex items-center gap-2 rounded-md border border-zinc-800 px-3 py-2 font-mono text-xs text-zinc-500">
            <MapPin className="h-3.5 w-3.5" /> {CONTACT.location}
          </span>
        </div>

        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-14 flex items-center gap-2 font-mono text-xs text-zinc-500 hover:text-emerald-400"
        >
          scroll <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
