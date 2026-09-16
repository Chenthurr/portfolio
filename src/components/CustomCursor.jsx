import { useEffect, useRef, useState } from 'react';
import { StrawHat } from './OnePieceArt';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const pointer = window.matchMedia('(pointer: fine)');
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(pointer.matches && motion.matches);
    update();
    pointer.addEventListener?.('change', update);
    motion.addEventListener?.('change', update);
    if (!pointer.matches || !motion.matches) {
      return () => {
        pointer.removeEventListener?.('change', update);
        motion.removeEventListener?.('change', update);
      };
    }

    document.body.classList.add('custom-cursor-active');
    const onMove = (e) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    };
    const onOver = (e) => setActive(Boolean(e.target.closest('a,button,[data-cursor="card"]')));
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      pointer.removeEventListener?.('change', update);
      motion.removeEventListener?.('change', update);
    };
  }, []);

  if (!enabled) return null;
  return (
    <div ref={cursorRef} className={`custom-hat-cursor ${active ? 'is-active' : ''}`} aria-hidden="true">
      <StrawHat className="custom-hat-cursor-art" />
      <span className="custom-hat-cursor-dot" />
    </div>
  );
}
