import React from "react";
import { ArrowUpRight, Code2, FileText, Github, Linkedin, Mail, Phone, Trophy } from "lucide-react";
import { CONTACT, LINKS } from "../data/portfolioData.js";

const CARDS = [
  ["Email", CONTACT.email, CONTACT.emailHref, Mail],
  ["Phone", CONTACT.phone, CONTACT.phoneHref, Phone],
  ["GitHub", "github.com/Chenthurr", LINKS.github, Github],
  ["LinkedIn", "in/chenthurr-c-k", LINKS.linkedin, Linkedin],
  ["LeetCode", "leetcode.com/u/Chenthurr", LINKS.leetcode, Code2],
  ["HackerRank", "hackerrank.com/pchenthurr", LINKS.hackerrank, Trophy],
];

export default function Contact() {
  return <section id="contact" className="bg-[#d97745] px-5 py-20 md:px-8 md:py-24"><div className="mx-auto max-w-6xl"><p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">05 / Contact</p><div className="mt-4 grid gap-12 lg:grid-cols-2"><div><h2 className="font-serif text-5xl font-semibold leading-tight text-white md:text-7xl">Let’s make something <span className="italic">useful.</span></h2><p className="mt-6 max-w-lg text-lg leading-8 text-white/75">Open to internships, collaborations, and full-time opportunities across AI, data engineering, and full-stack development.</p><a href={CONTACT.emailHref} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f2430]">Start a conversation <ArrowUpRight className="h-4 w-4" /></a></div><div className="grid gap-3 sm:grid-cols-2">{CARDS.map(([label,value,href,Icon]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur hover:bg-white/15"><Icon className="h-5 w-5" /><p className="mt-7 text-xs uppercase tracking-widest text-white/55">{label}</p><p className="mt-1 truncate text-sm">{value}</p></a>)}</div></div><a href={LINKS.resume} target="_blank" rel="noreferrer" className="mt-14 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4"><FileText className="h-4 w-4" /> View resume</a><footer className="mt-14 border-t border-white/20 pt-5 text-xs text-white/55">© {new Date().getFullYear()} Chenthurr C K · Built with React, Vite & Tailwind CSS</footer></div></section>;
}
