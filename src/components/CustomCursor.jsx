import { useEffect, useRef, useState } from 'react';

// Cursor theme tuned to match the portrait & site palette:
// sky-cyan accent core, cool-gray ring, midnight-blue outline for depth.
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const haloRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);
    if (mq.matches) return;

    document.body.classList.add('custom-cursor-active');

    const onMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e) => {
      const tag = e.target.tagName.toLowerCase();
      const isLink = tag === 'a' || tag === 'button' || e.target.closest('a') || e.target.closest('button');
      const isCard = e.target.closest('[data-cursor="card"]');
      const isInput = tag === 'input' || tag === 'textarea' || e.target.closest('input') || e.target.closest('textarea');

      if (isInput) {
        setCursorVariant('input');
      } else if (isLink) {
        setCursorVariant('link');
      } else if (isCard) {
        setCursorVariant('card');
      } else {
        setCursorVariant('default');
      }
    };

    let rafId;
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15;

      const { x, y } = posRef.current;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  const sizes = {
    default: { dot: 9, ring: 32, halo: 48 },
    link: { dot: 11, ring: 46, halo: 64 },
    button: { dot: 11, ring: 46, halo: 64 },
    card: { dot: 10, ring: 40, halo: 58 },
    input: { dot: 2, ring: 16, halo: 24 },
  };
  const size = sizes[cursorVariant] || sizes.default;
  const isActive = cursorVariant === 'link' || cursorVariant === 'card';

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    >
      {/* Outer ring — Cool Gray, glows Sky Cyan on interactive targets */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: -size.ring / 2,
          left: -size.ring / 2,
          width: size.ring,
          height: size.ring,
          borderRadius: '50%',
          border: `2px solid ${isActive ? 'rgba(56, 189, 248, 0.85)' : 'rgba(226, 232, 240, 0.5)'}`,
          boxShadow: isActive ? '0 0 16px rgba(56, 189, 248, 0.45)' : 'none',
          transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s, border-color 0.2s, box-shadow 0.2s',
          opacity: cursorVariant === 'input' ? 0.3 : 1,
        }}
      />
      {/* Middle halo — soft Sky Cyan glow, echoes the portrait's spray-paint accents */}
      <div
        ref={haloRef}
        style={{
          position: 'absolute',
          top: -size.halo / 2,
          left: -size.halo / 2,
          width: size.halo,
          height: size.halo,
          borderRadius: '50%',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
          opacity: cursorVariant === 'input' ? 0.2 : 0.6,
        }}
      />
      {/* Center dot — Sky Cyan accent */}
      <div
        style={{
          position: 'absolute',
          top: -size.dot / 2,
          left: -size.dot / 2,
          width: size.dot,
          height: size.dot,
          borderRadius: '50%',
          backgroundColor: '#38BDF8',
          boxShadow: '0 0 8px rgba(56, 189, 248, 0.8)',
          transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
          opacity: cursorVariant === 'input' ? 0.5 : 1,
        }}
      />
    </div>
  );
}
