import React from "react";

export function Eyebrow({ children, className = "" }) {
  return (
    <p className={`font-mono text-xs uppercase tracking-widest ${className}`}>
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, eyebrowClass = "text-emerald-400", titleClass = "text-zinc-50" }) {
  return (
    <div className="mb-10">
      <Eyebrow className={eyebrowClass}>{eyebrow}</Eyebrow>
      <h2 className={`mt-2 text-2xl font-bold tracking-tight sm:text-3xl ${titleClass}`}>
        {title}
      </h2>
    </div>
  );
}

export function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-zinc-800 bg-zinc-900/60 ${className}`}>
      {children}
    </div>
  );
}

export function PanelHeader({ file, right }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
      <span className="flex items-center gap-2 font-mono text-xs text-zinc-500">
        <span className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </span>
        {file}
      </span>
      {right}
    </div>
  );
}
