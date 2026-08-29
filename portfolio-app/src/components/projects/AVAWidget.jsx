import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Play, Pause } from "lucide-react";

const AVA_STEPS = [
  { label: "Ingesting pitch deck & financials" },
  { label: "Chunking & grounding via RAG" },
  { label: "Computing 5 valuation models" },
  { label: "Generating SWOT & investment score" },
  { label: "Running automated test suite" },
];

export default function AVAWidget() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setStep((s) => (s + 1) % (AVA_STEPS.length + 1));
    }, 1500);
    return () => clearInterval(id);
  }, [running]);

  const done = step >= AVA_STEPS.length;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-400">ava_pipeline.py</span>
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex items-center gap-1.5 rounded border border-white/10 px-2 py-1 font-mono text-xs text-zinc-400 hover:text-emerald-400"
        >
          {running ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {running ? "pause" : "run"}
        </button>
      </div>
      <div className="p-4">
        <p className="mb-4 text-sm font-semibold text-zinc-100">AI Venture Analyst</p>
        <div className="space-y-3">
          {AVA_STEPS.map((s, i) => {
            const state = i < step ? "done" : i === step && !done ? "active" : "pending";
            return (
              <div key={s.label} className="flex items-center gap-3">
                {state === "done" && <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400" />}
                {state === "active" && (
                  <div className="h-4 w-4 flex-shrink-0 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                )}
                {state === "pending" && <Circle className="h-4 w-4 flex-shrink-0 text-zinc-700" />}
                <span
                  className={`font-mono text-xs ${
                    state === "pending" ? "text-zinc-600" : state === "active" ? "text-cyan-400" : "text-zinc-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {["DCF", "VC Method", "Berkus", "Scorecard"].map((m) => (
            <div
              key={m}
              className={`rounded border px-2 py-2 text-center font-mono text-[11px] transition-colors ${
                step > 1
                  ? "border-indigo-400/40 bg-indigo-400/10 text-indigo-300"
                  : "border-white/10 text-zinc-600"
              }`}
            >
              {m}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs">
          <span className="text-zinc-500">tests/test_grounding.py</span>
          <span className={done ? "text-emerald-400" : "text-zinc-600"}>
            {done ? "25/25 passed" : "pending..."}
          </span>
        </div>
      </div>
    </div>
  );
}
