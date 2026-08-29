import React from "react";
import { Phone, Mail, Github, Linkedin, Code2, Trophy, FileText } from "lucide-react";
import { SectionHeading } from "./Primitives.jsx";
import { CONTACT, LINKS } from "../data/portfolioData.js";

const CARDS = [
  {
    label: "Phone",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
    icon: Phone,
    external: false,
  },
  {
    label: "Email",
    value: CONTACT.email,
    href: CONTACT.emailHref,
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/Chenthurr",
    href: LINKS.github,
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "in/chenthurr-c-k",
    href: LINKS.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "LeetCode",
    value: "leetcode.com/u/Chenthurr",
    href: LINKS.leetcode,
    icon: Code2,
    external: true,
  },
  {
    label: "HackerRank",
    value: "hackerrank.com/pchenthurr",
    href: LINKS.hackerrank,
    icon: Trophy,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-zinc-950 px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="~/contact" title="Get in touch" eyebrowClass="text-cyan-400" />
        <p className="mb-10 max-w-xl text-sm text-zinc-400">
          Open to internships, collaborations, and full-time roles in AI, data engineering, and
          full-stack development. Reach out directly — every card below is a live link.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map(({ label, value, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:border-cyan-400/50 hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 transition-colors group-hover:border-cyan-400/50 group-hover:text-cyan-400">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  {label}
                </span>
                <span className="block truncate text-sm text-zinc-200">{value}</span>
              </span>
            </a>
          ))}
        </div>

        <a
          href={LINKS.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 p-5 font-mono text-sm text-zinc-300 transition-colors hover:border-emerald-400/60 hover:text-emerald-400"
        >
          <FileText className="h-4 w-4" /> View full resume
        </a>

        <footer className="mt-16 border-t border-zinc-900 pt-6 text-center font-mono text-xs text-zinc-600">
          © {new Date().getFullYear()} Chenthurr C K — built with React, Vite &amp; Tailwind CSS
        </footer>
      </div>
    </section>
  );
}
