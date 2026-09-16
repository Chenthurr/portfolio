import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null); const [enabled, setEnabled] = useState(false); const [active, setActive] = useState(false);
  useEffect(() => {
    const pointer = window.matchMedia('(pointer: fine)'); const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(pointer.matches && motion.matches);
    update(); pointer.addEventListener?.('change', update); motion.addEventListener?.('change', update);
    if (!pointer.matches || !motion.matches) return () => { pointer.removeEventListener?.('change', update); motion.removeEventListener?.('change', update); };
    document.body.classList.add('custom-cursor-active');
    const onMove = (e) => { if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`; };
    const onOver = (e) => setActive(Boolean(e.target.closest('a,button,[data-cursor="card"]')));
    window.addEventListener('mousemove', onMove, { passive: true }); window.addEventListener('mouseover', onOver, { passive: true });
    return () => { document.body.classList.remove('custom-cursor-active'); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); pointer.removeEventListener?.('change', update); motion.removeEventListener?.('change', update); };
  }, []);
  if (!enabled) return null;
  return <div ref={cursorRef} className={`fixed left-0 top-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ${active ? 'scale-125' : ''}`} aria-hidden="true"><span className="block w-7 h-7 rounded-full border-2 border-[var(--primary)]/80 bg-[var(--bg)]/10 backdrop-blur-sm" /><span className="absolute left-1/2 top-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]" /></div>;
}
