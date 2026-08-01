import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Github, Linkedin, Mail, MapPin, Terminal, CheckCircle2, Circle,
  Activity, Shield, ShieldAlert, Eye, EyeOff, Cpu, Award, GraduationCap,
  Briefcase, ChevronRight, Play, Pause, GitBranch, Radio, Lock,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip,
} from "recharts";

/* ---------------------------------------------------------------------- */
/*  Shared data                                                            */
/* ---------------------------------------------------------------------- */

const PROJECTS = [
  {
    id: "ava",
    name: "AI Venture Analyst",
    tagline: "Full-stack VC analysis platform",
    year: "2026",
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "OpenAI API", "Docker", "GitHub Actions"],
  },
  {
    id: "cv",
    name: "CV Queue Management",
    tagline: "Real-time queue detection pipeline",
    year: "2026",
    tags: ["Python", "OpenCV", "YOLOv8", "FastAPI", "JavaScript"],
  },
  {
    id: "hefin",
    name: "HEFIN",
    tagline: "Decentralized AI finance & healthcare",
    year: "2025",
    tags: ["ICP", "Motoko", "React.js", "AI/ML"],
  },
];

const SKILL_CATEGORIES = [
  { label: "Languages", items: ["Python", "Java", "SQL"] },
  { label: "Web & Backend", items: ["React.js", "Next.js", "FastAPI", "MongoDB", "PostgreSQL", "Git/GitHub"] },
  { label: "AI / CV / ML", items: ["Scikit-learn", "TensorFlow", "OpenCV", "YOLOv8", "Pandas", "NumPy"] },
  { label: "Data & Cloud", items: ["Power BI", "Matplotlib", "Docker", "GitHub Actions", "AWS"] },
];

const TIMELINE = [
  {
    kind: "education",
    title: "B.Tech, Artificial Intelligence & Data Science",
    org: "V.S.B College of Engineering Technical Campus",
    period: "2023 — 2027",
    detail: "CGPA 8.23 · Anna University",
  },
  {
    kind: "work",
    title: "Core Python Trainee",
    org: "VEI Technologies",
    period: "Jun 2026",
    detail: "Python fundamentals, OOP, file & exception handling",
  },
  {
    kind: "work",
    title: "Data Science Intern",
    org: "CazBrain",
    period: "Jun 2025 — Jul 2025",
    detail: "Loan approval prediction model, SQL extraction, ML pipelines",
  },
  {
    kind: "education",
    title: "Higher Secondary Certificate",
    org: "Bharani Park Matric Higher Secondary School",
    period: "2021 — 2023",
    detail: "65%",
  },
];

const ACHIEVEMENTS = [
  { title: "World Computer Hacker League", org: "ICP & DFINITY Foundation", detail: "Qualified — Regional Round" },
  { title: "Pathway AI Hackathon", org: "IIT Ropar", detail: "Finalist — Smart Urban Management with LLMs & IoT" },
];

/* ---------------------------------------------------------------------- */
/*  IDE shell chrome                                                       */
/* ---------------------------------------------------------------------- */

function useUptime() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

const TABS = ["hero.tsx", "projects/", "stack.json", "timeline.log"];

function ShellHeader({ activeTab, setActiveTab }) {
  return (
    <div className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-900">
        <span className="h-3 w-3 rounded-full bg-zinc-700" />
        <span className="h-3 w-3 rounded-full bg-zinc-700" />
        <span className="h-3 w-3 rounded-full bg-zinc-700" />
        <span className="ml-3 text-xs font-mono text-zinc-500">
          chenthurr-c-k — portfolio — zsh
        </span>
      </div>
      <div className="flex overflow-x-auto">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-xs font-mono border-r border-zinc-900 whitespace-nowrap transition-colors ${
              activeTab === i
                ? "bg-zinc-900 text-emerald-400 border-t-2 border-t-emerald-400"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatusBar() {
  const uptime = useUptime();
  return (
    <div className="sticky bottom-0 z-40 flex items-center justify-between border-t border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs font-mono">
      <div className="flex items-center gap-4 text-zinc-400">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <Radio className="h-3 w-3 animate-pulse" /> connected
        </span>
        <span className="hidden sm:inline">branch: main</span>
        <span className="hidden md:inline">node: v20.x</span>
      </div>
      <div className="flex items-center gap-4 text-zinc-500">
        <span>uptime {uptime}</span>
        <span className="text-cyan-400">UTF-8</span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Hero                                                                   */
/* ---------------------------------------------------------------------- */

const BOOT_LINES = [
  "$ who am i",
  "chenthurr_c_k — AI & Data Science engineer",
   "$ status --location",
  "Coimbatore, Tamil Nadu, India]",
  "$ core_skills.txt",
  "Python · FastAPI · React/Next.js · OpenCV · YOLOv8 · PostgreSQL",
 
];

function Hero() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= BOOT_LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 380);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <section className="border-b border-zinc-800 px-4 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-emerald-400">
          ~/portfolio/init
        </p>
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-50 sm:text-5xl">
          Chenthurr C K
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-400">
          AI &amp; Data Science
          <span className="text-zinc-600"> · </span>
          <span className="text-cyan-400">Web Development</span>
          <span className="text-zinc-600"> · </span>
          <span className="text-indigo-400">Data Engineering</span>
        </p>

        <div className="mt-10 max-w-2xl overflow-hidden rounded-lg border border-zinc-800 bg-black">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-3 py-2">
            <Terminal className="h-3.5 w-3.5 text-zinc-500" />
            <span className="font-mono text-xs text-zinc-500">boot.sh</span>
          </div>
          <div className="space-y-1.5 p-4 font-mono text-sm">
            {BOOT_LINES.slice(0, visible).map((line, i) => (
              <p
                key={i}
                className={
                  line.startsWith("$")
                    ? "text-emerald-400"
                    : "pl-2 text-zinc-300"
                }
              >
                {line}
              </p>
            ))}
            <span className="inline-block h-4 w-2 animate-pulse bg-emerald-400 align-middle" />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="mailto:pchenthurr@gmail.com"
            className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-emerald-400/50 hover:text-emerald-400"
          >
            <Mail className="h-3.5 w-3.5" /> pchenthurr@gmail.com
          </a>
          <a
            href="https://github.com/Chenthurr"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-400"
          >
            <Github className="h-3.5 w-3.5" /> github.com/Chenthurr
          </a>
          <a
            href="https://linkedin.com/in/chenthurr-c-k-901ab0289"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-300 transition-colors hover:border-indigo-400/50 hover:text-indigo-400"
          >
            <Linkedin className="h-3.5 w-3.5" /> linkedin
          </a>
          <span className="flex items-center gap-2 rounded-md border border-zinc-800 px-3 py-2 font-mono text-xs text-zinc-500">
            <MapPin className="h-3.5 w-3.5" /> Coimbatore, TN, India
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Section wrapper                                                        */
/* ---------------------------------------------------------------------- */

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-zinc-800 bg-zinc-900/60 ${className}`}>
      {children}
    </div>
  );
}

function PanelHeader({ file, right }) {
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

/* ---------------------------------------------------------------------- */
/*  Widget 1 — AI Venture Analyst pipeline simulator                       */
/* ---------------------------------------------------------------------- */

const AVA_STEPS = [
  { label: "Ingesting pitch deck & financials", icon: "upload" },
  { label: "Chunking & grounding via RAG", icon: "rag" },
  { label: "Computing 5 valuation models", icon: "calc" },
  { label: "Generating SWOT & investment score", icon: "swot" },
  { label: "Running automated test suite", icon: "test" },
];

function AVAWidget() {
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
    <Panel>
      <PanelHeader
        file="ava_pipeline.py"
        right={
          <button
            onClick={() => setRunning((r) => !r)}
            className="flex items-center gap-1.5 rounded border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-400 hover:text-emerald-400"
          >
            {running ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {running ? "pause" : "run"}
          </button>
        }
      />
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
                  ? "border-indigo-400/40 bg-indigo-400/5 text-indigo-300"
                  : "border-zinc-800 text-zinc-600"
              }`}
            >
              {m}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded border border-zinc-800 bg-black px-3 py-2 font-mono text-xs">
          <span className="text-zinc-500">tests/test_grounding.py</span>
          <span className={done ? "text-emerald-400" : "text-zinc-600"}>
            {done ? "25/25 passed" : "pending..."}
          </span>
        </div>
      </div>
    </Panel>
  );
}

/* ---------------------------------------------------------------------- */
/*  Widget 2 — CV queue management ROI simulator                           */
/* ---------------------------------------------------------------------- */

const ROI = { x: 70, y: 20, w: 220, h: 150 };
const CANVAS = { w: 360, h: 190 };

function makeBoxes(n) {
  return Array.from({ length: n }).map((_, i) => ({
    id: i,
    x: 20 + Math.random() * (CANVAS.w - 40),
    y: 10 + Math.random() * (CANVAS.h - 30),
    vx: (Math.random() - 0.5) * 2.2,
    vy: (Math.random() - 0.5) * 2.2,
  }));
}

function insideROI(cx, cy) {
  return cx > ROI.x && cx < ROI.x + ROI.w && cy > ROI.y && cy < ROI.y + ROI.h;
}

function CVWidget() {
  const [boxes, setBoxes] = useState(() => makeBoxes(5));
  const [running, setRunning] = useState(true);
  const [history, setHistory] = useState(() => Array.from({ length: 12 }).map((_, i) => ({ t: i, count: 0 })));
  const rawCounts = useRef([]);
  const tick = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setBoxes((prev) =>
        prev.map((b) => {
          let { x, y, vx, vy } = b;
          x += vx;
          y += vy;
          if (x < 10 || x > CANVAS.w - 10) vx *= -1;
          if (y < 10 || y > CANVAS.h - 10) vy *= -1;
          return { ...b, x, y, vx, vy };
        })
      );
    }, 60);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const count = boxes.filter((b) => insideROI(b.x, b.y)).length;
      rawCounts.current = [...rawCounts.current.slice(-4), count];
      const smoothed =
        rawCounts.current.reduce((a, c) => a + c, 0) / rawCounts.current.length;
      tick.current += 1;
      setHistory((h) => [...h.slice(1), { t: tick.current, count: Math.round(smoothed * 10) / 10 }]);
    }, 500);
    return () => clearInterval(id);
  }, [boxes, running]);

  const liveCount = boxes.filter((b) => insideROI(b.x, b.y)).length;

  return (
    <Panel>
      <PanelHeader
        file="queue_tracker.py"
        right={
          <button
            onClick={() => setRunning((r) => !r)}
            className="flex items-center gap-1.5 rounded border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-400 hover:text-emerald-400"
          >
            {running ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {running ? "pause" : "run"}
          </button>
        }
      />
      <div className="p-4">
        <p className="mb-3 text-sm font-semibold text-zinc-100">CV Queue Management</p>

        <svg
          viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`}
          className="w-full rounded border border-zinc-800 bg-black"
        >
          <rect
            x={ROI.x} y={ROI.y} width={ROI.w} height={ROI.h}
            fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6"
          />
          <text x={ROI.x} y={ROI.y - 6} fill="#34d399" fontSize="9" fontFamily="monospace">
            ROI
          </text>
          {boxes.map((b) => {
            const inside = insideROI(b.x, b.y);
            return (
              <g key={b.id}>
                <rect
                  x={b.x - 12} y={b.y - 12} width="24" height="24" rx="2"
                  fill="none"
                  stroke={inside ? "#22d3ee" : "#52525b"}
                  strokeWidth="1.5"
                />
                <circle cx={b.x} cy={b.y} r="2" fill={inside ? "#22d3ee" : "#52525b"} />
              </g>
            );
          })}
        </svg>

        <div className="mt-3 flex items-center justify-between font-mono text-xs">
          <span className="text-zinc-500">people_in_roi</span>
          <span className="text-cyan-400">{liveCount}</span>
        </div>

        <div className="mt-3 h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
              <XAxis dataKey="t" hide />
              <YAxis hide domain={[0, 5]} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid #3f3f46", fontSize: 11, fontFamily: "monospace" }}
                labelFormatter={() => "smoothed count"}
              />
              <Line type="monotone" dataKey="count" stroke="#34d399" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-1 text-center font-mono text-[10px] text-zinc-600">
          moving-average smoothed queue count
        </p>
      </div>
    </Panel>
  );
}

/* ---------------------------------------------------------------------- */
/*  Widget 3 — HEFIN canister flow                                         */
/* ---------------------------------------------------------------------- */

function HefinWidget() {
  const [privacy, setPrivacy] = useState(true);
  const [risk, setRisk] = useState(null);
  const [scanning, setScanning] = useState(false);

  function runScan() {
    setScanning(true);
    setRisk(null);
    setTimeout(() => {
      setRisk(Math.random() > 0.7 ? "flagged" : "clear");
      setScanning(false);
    }, 1100);
  }

  const nodes = [
    { id: "user", label: "User wallet" },
    { id: "canister", label: "ICP canister (Motoko)" },
    { id: "fraud", label: "Fraud detection" },
    { id: "vault", label: "Health data vault" },
  ];

  return (
    <Panel>
      <PanelHeader
        file="hefin.mo"
        right={
          <button
            onClick={() => setPrivacy((p) => !p)}
            className="flex items-center gap-1.5 rounded border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-400 hover:text-indigo-400"
          >
            {privacy ? <Lock className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {privacy ? "private" : "visible"}
          </button>
        }
      />
      <div className="p-4">
        <p className="mb-3 text-sm font-semibold text-zinc-100">HEFIN</p>

        <div className="flex flex-col gap-2">
          {nodes.map((n, i) => (
            <div key={n.id} className="flex items-center gap-2">
              <div
                className={`flex-1 rounded border px-3 py-2 font-mono text-xs transition-colors ${
                  n.id === "fraud" && risk === "flagged"
                    ? "border-red-400/50 bg-red-400/10 text-red-300"
                    : n.id === "fraud" && risk === "clear"
                    ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                    : n.id === "vault" && privacy
                    ? "border-zinc-800 text-zinc-600 blur-[2px]"
                    : "border-zinc-800 text-zinc-300"
                }`}
              >
                {n.label}
              </div>
              {i < nodes.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-zinc-700" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={runScan}
            disabled={scanning}
            className="flex items-center gap-1.5 rounded border border-zinc-700 px-3 py-1.5 font-mono text-xs text-zinc-300 hover:border-cyan-400/50 hover:text-cyan-400 disabled:opacity-50"
          >
            {scanning ? (
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            ) : (
              <ShieldAlert className="h-3.5 w-3.5" />
            )}
            run fraud scan
          </button>
          {risk && (
            <span className={`font-mono text-xs ${risk === "flagged" ? "text-red-400" : "text-emerald-400"}`}>
              risk_score: {risk === "flagged" ? "0.83 — flagged" : "0.11 — clear"}
            </span>
          )}
        </div>

        <p className="mt-3 flex items-center gap-1.5 font-mono text-[10px] text-zinc-600">
          <Shield className="h-3 w-3" />
          on-chain smart contract logic · user-controlled data sovereignty
        </p>
      </div>
    </Panel>
  );
}

/* ---------------------------------------------------------------------- */
/*  Projects section                                                       */
/* ---------------------------------------------------------------------- */

function ProjectsSection() {
  return (
    <section className="border-b border-zinc-800 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="~/projects" title="Live system visualizers" />
        <p className="mb-10 max-w-2xl text-sm text-zinc-400">
          Each panel below is a running simulation of the project's core engineering logic —
          not a screenshot.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <AVAWidget />
          <CVWidget />
          <div className="lg:col-span-2">
            <div className="mx-auto max-w-2xl">
              <HefinWidget />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Stack matrix + filterable projects                                     */
/* ---------------------------------------------------------------------- */

function StackSection() {
  const [selected, setSelected] = useState([]);

  function toggle(tag) {
    setSelected((s) => (s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]));
  }

  const filtered = useMemo(() => {
    if (selected.length === 0) return PROJECTS;
    return PROJECTS.filter((p) => p.tags.some((t) => selected.includes(t)));
  }, [selected]);

  return (
    <section className="border-b border-zinc-800 px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="~/stack" title="Technical matrix" />

        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <p className="mb-2.5 font-mono text-xs uppercase tracking-wider text-zinc-500">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const active = selected.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggle(item)}
                      className={`rounded border px-2.5 py-1 font-mono text-xs transition-colors ${
                        active
                          ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                          : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              filtered_projects{selected.length > 0 ? ` (${filtered.length})` : ""}
            </p>
            {selected.length > 0 && (
              <button
                onClick={() => setSelected([])}
                className="font-mono text-xs text-zinc-500 hover:text-cyan-400"
              >
                clear filters
              </button>
            )}
          </div>
          <div className="space-y-2">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-800 bg-zinc-900/40 px-4 py-3"
              >
                <div>
                  <p className="font-mono text-sm text-zinc-100">{p.name}</p>
                  <p className="text-xs text-zinc-500">{p.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                        selected.includes(t)
                          ? "bg-emerald-400/15 text-emerald-300"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="font-mono text-xs text-zinc-600">no matching projects</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900/40 px-3 py-2">
            <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-mono text-xs text-zinc-300">CazBrain — Data Science Internship</span>
          </div>
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="flex items-center gap-2 rounded border border-zinc-800 bg-zinc-900/40 px-3 py-2">
              <Award className="h-3.5 w-3.5 text-indigo-400" />
              <span className="font-mono text-xs text-zinc-300">{a.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Timeline                                                                */
/* ---------------------------------------------------------------------- */

function TimelineSection() {
  return (
    <section className="px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="~/timeline" title="Experience & education" />
        <div className="space-y-0">
          {TIMELINE.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
                  {item.kind === "education" ? (
                    <GraduationCap className="h-3.5 w-3.5 text-indigo-400" />
                  ) : (
                    <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
                  )}
                </span>
                {i < TIMELINE.length - 1 && <span className="w-px flex-1 bg-zinc-800" />}
              </div>
              <div className="pb-8">
                <p className="font-mono text-xs text-zinc-500">{item.period}</p>
                <p className="mt-0.5 text-sm font-semibold text-zinc-100">{item.title}</p>
                <p className="text-xs text-zinc-400">{item.org}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/*  Root                                                                    */
/* ---------------------------------------------------------------------- */

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState(0);
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function handleTabClick(i) {
    setActiveTab(i);
    refs[i].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-200">
      <ShellHeader activeTab={activeTab} setActiveTab={handleTabClick} />
      <div ref={refs[0]}><Hero /></div>
      <div ref={refs[1]}><ProjectsSection /></div>
      <div ref={refs[2]}><StackSection /></div>
      <div ref={refs[3]}><TimelineSection /></div>
      <StatusBar />
    </div>
  );
}
