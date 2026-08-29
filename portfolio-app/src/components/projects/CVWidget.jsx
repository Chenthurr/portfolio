import React, { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

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

export default function CVWidget() {
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
      const smoothed = rawCounts.current.reduce((a, c) => a + c, 0) / rawCounts.current.length;
      tick.current += 1;
      setHistory((h) => [...h.slice(1), { t: tick.current, count: Math.round(smoothed * 10) / 10 }]);
    }, 500);
    return () => clearInterval(id);
  }, [boxes, running]);

  const liveCount = boxes.filter((b) => insideROI(b.x, b.y)).length;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-400">queue_tracker.py</span>
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex items-center gap-1.5 rounded border border-white/10 px-2 py-1 font-mono text-xs text-zinc-400 hover:text-emerald-400"
        >
          {running ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {running ? "pause" : "run"}
        </button>
      </div>
      <div className="p-4">
        <p className="mb-3 text-sm font-semibold text-zinc-100">CV Queue Management</p>

        <svg viewBox={`0 0 ${CANVAS.w} ${CANVAS.h}`} className="w-full rounded border border-white/10 bg-black/50">
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
    </div>
  );
}
