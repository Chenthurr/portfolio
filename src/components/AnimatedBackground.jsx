const driftMarks = [
  { left: '6%', top: '16%', delay: '0s', duration: '18s', size: 34 }, { left: '79%', top: '24%', delay: '-6s', duration: '23s', size: 25 },
  { left: '89%', top: '72%', delay: '-11s', duration: '20s', size: 38 }, { left: '15%', top: '79%', delay: '-4s', duration: '26s', size: 21 },
  { left: '51%', top: '11%', delay: '-15s', duration: '21s', size: 18 },
];
export default function AnimatedBackground() {
  return <div className="voyage-bg" aria-hidden="true"><div className="voyage-map-lines" /><div className="voyage-grid" /><div className="voyage-glow voyage-glow-one" /><div className="voyage-glow voyage-glow-two" /><div className="voyage-wave voyage-wave-one" /><div className="voyage-wave voyage-wave-two" />{driftMarks.map((mark, index) => <span key={index} className="drift-mark" style={{ left: mark.left, top: mark.top, animationDelay: mark.delay, animationDuration: mark.duration, width: mark.size, height: mark.size }}><span className="drift-hat" /></span>)}</div>;
}
