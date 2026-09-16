const driftMarks = [
  { left: '8%', top: '18%', delay: '0s', duration: '18s', size: 30 },
  { left: '78%', top: '26%', delay: '-6s', duration: '23s', size: 22 },
  { left: '88%', top: '72%', delay: '-11s', duration: '20s', size: 34 },
  { left: '18%', top: '78%', delay: '-4s', duration: '26s', size: 18 },
  { left: '52%', top: '12%', delay: '-15s', duration: '21s', size: 16 },
];

export default function AnimatedBackground() {
  return (
    <div className="voyage-bg" aria-hidden="true">
      <div className="voyage-grid" />
      <div className="voyage-glow voyage-glow-one" />
      <div className="voyage-glow voyage-glow-two" />
      {driftMarks.map((mark, index) => (
        <span
          key={index}
          className="drift-mark"
          style={{ left: mark.left, top: mark.top, animationDelay: mark.delay, animationDuration: mark.duration, width: mark.size, height: mark.size }}
        >
          <span className="drift-hat" />
        </span>
      ))}
    </div>
  );
}
