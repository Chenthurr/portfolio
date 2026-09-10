import { useEffect, useRef } from 'react';
import { useData } from '../components/DataContext';

export default function Certifications() {
  const { certifications } = useData();
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
          <span className="font-mono text-xs text-mustard tracking-widest">CERTIFICATIONS</span>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mt-2">CREDENTIALS</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className="reveal opacity-0 flex items-center justify-between p-5 bg-navy-light border border-cream/10 hover:border-mustard transition-colors"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div>
                <h3 className="font-semibold text-cream">{cert.title}</h3>
                <p className="text-sm text-cream/60">{cert.issuer}</p>
              </div>
              <span className="font-mono text-xs text-mustard">{cert.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
