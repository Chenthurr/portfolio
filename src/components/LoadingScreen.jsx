import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ck-loading-seen';

function Emblem() {
  return (
    <div className="loader-emblem" aria-hidden="true">
      <svg viewBox="0 0 120 120" role="presentation">
        <circle cx="60" cy="60" r="49" className="loader-ring" />
        <path d="M28 49c8-8 18-12 32-12s24 4 32 12M34 66c8 7 17 11 26 11s18-4 26-11" className="loader-hat" />
        <path d="M23 55c12 7 27 10 37 10s25-3 37-10" className="loader-band" />
        <circle cx="60" cy="60" r="4" className="loader-core" />
      </svg>
    </div>
  );
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(() => {
    try { return sessionStorage.getItem(STORAGE_KEY) !== '1'; } catch { return true; }
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(100);
      const t = window.setTimeout(() => setVisible(false), 180);
      return () => window.clearTimeout(t);
    }
    const started = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - started;
      const next = Math.min(100, Math.round((elapsed / 1250) * 100));
      setProgress(next);
      if (next < 100) raf = requestAnimationFrame(tick);
      else {
        try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
        window.setTimeout(() => setVisible(false), 220);
      }
    };
    raf = requestAnimationFrame(tick);
    const fallback = window.setTimeout(() => setVisible(false), 1900);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(fallback); };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="loader-atmosphere" />
      <Emblem />
      <div className="loader-copy">
        <span>SETTING SAIL...</span>
        <small>ENTERING THE GRAND LINE</small>
      </div>
      <div className="loader-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <span className="loader-percent" aria-hidden="true">{String(progress).padStart(3, '0')}%</span>
    </div>
  );
}
