import { useState, useEffect, useRef } from 'react';
import { useData } from '../components/DataContext';

const skillCategories = ['LANGUAGES', 'WEB DEVELOPMENT', 'AI / DATA ENGINEERING', 'VISUALIZATION'];

export default function Skills() {
  const { skills } = useData();
  const [hoveredSkill, setHoveredSkill] = useState(null);
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

  const connections = {
    'Python': ['DATA', 'MODEL', 'API', 'APPLICATION'],
    'Pandas': ['DATA'],
    'NumPy': ['DATA', 'MODEL'],
    'Scikit-learn': ['MODEL'],
    'TensorFlow': ['MODEL'],
    'OpenCV': ['MODEL', 'APPLICATION'],
    'YOLOv8': ['MODEL', 'APPLICATION'],
    'React.js': ['APPLICATION'],
    'FastAPI': ['API'],
    'HTML': ['APPLICATION'],
    'MongoDB': ['DATA'],
    'SQL': ['DATA'],
    'Power BI': ['VISUALIZATION'],
    'Matplotlib': ['VISUALIZATION'],
    'Java': ['API', 'APPLICATION'],
    'Git': ['APPLICATION'],
    'GitHub': ['APPLICATION'],
  };

  const hubs = ['DATA', 'MODEL', 'API', 'APPLICATION', 'VISUALIZATION'];

  return (
    <div ref={sectionRef} className="pt-24 pb-20 bg-navy min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal opacity-0 mb-16">
          <span className="font-mono text-xs text-mustard tracking-widest">03 / ENGINEERING STACK</span>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mt-2">SKILLS</h1>
        </div>

        {/* Constellation visualization */}
        <div className="reveal opacity-0 mb-16">
          <div className="relative bg-navy p-8 md:p-12 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {hubs.map((hub) => (
                <div
                  key={hub}
                  className={`px-4 py-3 text-center font-mono text-xs font-bold transition-all ${
                    hoveredSkill && connections[hoveredSkill]?.includes(hub)
                      ? 'bg-mustard text-navy'
                      : 'bg-navy-light text-cream border border-cream/20'
                  }`}
                >
                  {hub}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`px-3 py-2 text-xs font-mono transition-all ${
                    hoveredSkill === skill.name
                      ? 'bg-mustard text-navy'
                      : hoveredSkill && connections[hoveredSkill]?.includes(skill.name)
                      ? 'bg-cream/20 text-cream'
                      : 'bg-white/10 text-cream/70 hover:bg-white/20'
                  }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
            {hoveredSkill && (
              <div className="mt-4 p-3 bg-cream/10 border border-cream/20">
                <p className="font-mono text-xs text-mustard">
                  {hoveredSkill} → {connections[hoveredSkill]?.join(' / ') || 'UTILITY'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Categorized list */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, idx) => (
            <div key={cat} className="reveal opacity-0" style={{ animationDelay: `${idx * 100}ms` }}>
              <h3 className="font-mono text-xs text-mustard mb-4 tracking-widest">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.filter((s) => s.category === cat).map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-2 bg-navy-light border border-cream/10 text-cream text-sm font-medium hover:border-mustard hover:text-mustard transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
