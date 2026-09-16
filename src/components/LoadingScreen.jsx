import { useEffect, useState } from 'react';
import { Emblem, StrawHat } from './OnePieceArt';

const STORAGE_KEY = 'ck-loading-seen';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(() => {
    try { return sessionStorage.getItem(STORAGE_KEY) !== '1'; } catch { return true; }
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setProgress(100); const t = window.setTimeout(() => setVisible(false), 160); return () => window.clearTimeout(t); }
    const started = performance.now(); let raf; let closeTimer;
    const tick = (now) => {
      const next = Math.min(100, Math.round(((now - started) / 1350) * 100));
      setProgress(next);
      if (next < 100) raf = requestAnimationFrame(tick);
      else { try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {} closeTimer = window.setTimeout(() => setVisible(false), 260); }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(closeTimer); };
  }, [visible]);

  if (!visible) return null;
  return <div className="loading-screen" role="status" aria-live="polite" aria-label="Loading portfolio">
    <div className="loader-atmosphere" /><div className="loader-sea-lines" aria-hidden="true" />
    <div className="loader-visual"><div className="loader-emblem-wrap"><Emblem className="loader-emblem" /></div><StrawHat className="loader-hat-orbit" /></div>
    <div className="loader-copy"><span>SETTING SAIL...</span><small>ENTERING THE GRAND LINE</small></div>
    <div className="loader-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
    <span className="loader-percent" aria-hidden="true">{String(progress).padStart(3, '0')}%</span>
  </div>;
}
