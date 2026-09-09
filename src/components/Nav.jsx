import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => document.getElementById(id) && observer.observe(document.getElementById(id)));
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f2e8]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <button onClick={() => goTo("home")} className="font-serif text-lg font-semibold tracking-tight text-[#1f2430]">
          Chenthurr<span className="text-[#d97745]">.</span>
        </button>
        <div className="hidden items-center gap-6 md:flex">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => goTo(s.id)} className={`text-sm transition ${active === s.id ? "font-semibold text-[#d97745]" : "text-[#59616f] hover:text-[#1f2430]"}`}>
              {s.label}
            </button>
          ))}
        </div>
        <a href="#contact" onClick={(e) => { e.preventDefault(); goTo("contact"); }} className="hidden items-center gap-1 rounded-full border border-[#1f2430] px-4 py-2 text-sm font-medium md:flex">
          Let’s talk <ArrowUpRight className="h-4 w-4" />
        </a>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-black/10 px-5 pb-4 md:hidden">
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => goTo(s.id)} className="block w-full py-2 text-left text-sm text-[#59616f]">{s.label}</button>
          ))}
        </div>
      )}
    </header>
  );
}
