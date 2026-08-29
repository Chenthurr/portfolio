import React, { useEffect, useState } from "react";
import { Terminal, Menu, X } from "lucide-react";

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
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function goTo(id) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
        <button
          onClick={() => goTo("home")}
          className="flex items-center gap-2 font-mono text-sm text-zinc-200 hover:text-emerald-400"
        >
          <Terminal className="h-4 w-4 text-emerald-400" />
          chenthurr.dev
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                active === s.id
                  ? "bg-zinc-900 text-emerald-400"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="text-zinc-400 hover:text-zinc-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-zinc-800 px-4 py-2 md:hidden">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => goTo(s.id)}
              className={`block w-full rounded px-3 py-2 text-left font-mono text-xs ${
                active === s.id ? "text-emerald-400" : "text-zinc-400"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
