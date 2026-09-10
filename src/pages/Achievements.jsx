import { useEffect, useRef } from 'react';
import { useData } from '../components/DataContext';

export default function Achievements() {
  const { achievements } = useData();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up');
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="pt-24 pb-20 bg-navy min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal opacity-0 mb-16">
          <span className="font-mono text-xs text-mustard tracking-widest">05 / SIGNALS OF IMPACT</span>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mt-2">ACHIEVEMENTS</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => (
            <div
              key={ach.id}
              className="reveal opacity-0 bg-navy-light border border-cream/10 p-6 hover:border-mustard transition-colors"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-10 h-10 bg-navy border border-cream/10 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-cream mb-1">{ach.title}</h3>
              <p className="text-mustard font-semibold text-sm mb-2">{ach.detail}</p>
              <p className="text-xs text-cream/60">{ach.organizer}</p>
              {ach.focus && <p className="text-xs text-cream/50 mt-1">Focus: {ach.focus}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
