import { useEffect, useRef } from 'react';
import { useData } from '../components/DataContext';

export default function Experience() {
  const { experience } = useData();
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
      <div className="max-w-5xl mx-auto px-6">
        <div className="reveal opacity-0 mb-16">
          <span className="font-mono text-xs text-mustard tracking-widest">04 / ENGINEERING EXPERIENCE</span>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mt-2">EXPERIENCE</h1>
        </div>

        <div className="relative border-l-2 border-cream/20 ml-4 md:ml-8 space-y-12">
          {experience.map((exp, idx) => (
            <div key={exp.id} className="reveal opacity-0 relative pl-8 md:pl-12">
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-mustard border-4 border-cream" />

              <div className="bg-navy-light border border-cream/10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-cream">{exp.role}</h3>
                    <p className="text-mustard font-semibold">{exp.company}</p>
                  </div>
                  <span className="font-mono text-xs text-cream/50 mt-2 md:mt-0">{exp.dates}</span>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-cream/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-mustard mt-1.5 flex-shrink-0" />
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
