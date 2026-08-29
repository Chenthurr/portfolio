import React, { useState } from "react";
import { Lock, Eye, ShieldAlert, Shield, ChevronRight } from "lucide-react";

const NODES = [
  { id: "user", label: "User wallet" },
  { id: "canister", label: "ICP canister (Motoko)" },
  { id: "fraud", label: "Fraud detection" },
  { id: "vault", label: "Health data vault" },
];

export default function HefinWidget() {
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

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-400">hefin.mo</span>
        <button
          onClick={() => setPrivacy((p) => !p)}
          className="flex items-center gap-1.5 rounded border border-white/10 px-2 py-1 font-mono text-xs text-zinc-400 hover:text-indigo-400"
        >
          {privacy ? <Lock className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {privacy ? "private" : "visible"}
        </button>
      </div>
      <div className="p-4">
        <p className="mb-3 text-sm font-semibold text-zinc-100">HEFIN</p>

        <div className="flex flex-col gap-2">
          {NODES.map((n, i) => (
            <div key={n.id} className="flex items-center gap-2">
              <div
                className={`flex-1 rounded border px-3 py-2 font-mono text-xs transition-colors ${
                  n.id === "fraud" && risk === "flagged"
                    ? "border-red-400/50 bg-red-400/10 text-red-300"
                    : n.id === "fraud" && risk === "clear"
                    ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                    : n.id === "vault" && privacy
                    ? "border-white/10 text-zinc-600 blur-[2px]"
                    : "border-white/10 text-zinc-300"
                }`}
              >
                {n.label}
              </div>
              {i < NODES.length - 1 && <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-zinc-700" />}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={runScan}
            disabled={scanning}
            className="flex items-center gap-1.5 rounded border border-white/10 px-3 py-1.5 font-mono text-xs text-zinc-300 hover:border-cyan-400/50 hover:text-cyan-400 disabled:opacity-50"
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
    </div>
  );
}
