import { useState, useEffect, useRef } from 'react';
import { useData } from '../components/DataContext';

const filters = [
  { key: 'all', label: 'ALL' },
  { key: 'ai-ml', label: 'AI / ML' },
  { key: 'computer-vision', label: 'COMPUTER VISION' },
  { key: 'data', label: 'DATA' },
  { key: 'developer-tools', label: 'DEVELOPER TOOLS' },
  { key: 'full-stack', label: 'FULL STACK' },
];

export default function Projects() {
  const { projects } = useData();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === 'all'
    ? projects.filter((p) => p.published)
    : projects.filter((p) => p.published && p.filter === activeFilter);

  return (
    <div ref={sectionRef} className="pt-24 pb-20 bg-navy min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal opacity-0 mb-12">
          <span className="font-mono text-xs text-mustard tracking-widest">02 / INTELLIGENCE SYSTEMS</span>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mt-2">PROJECTS</h1>
          <p className="text-cream/70 mt-4 max-w-2xl">
            Selected systems engineered from data, models and real-world problems.
          </p>
        </div>

        {/* Filters */}
        <div className="reveal opacity-0 flex flex-wrap gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 text-xs font-semibold tracking-widest transition-all ${
                activeFilter === f.key
                  ? 'bg-navy text-cream'
                  : 'bg-navy-light text-cream border border-cream/20 hover:border-mustard'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              data-cursor="card"
              className={`reveal opacity-0 group bg-navy-light border border-cream/10 hover:border-mustard transition-all duration-300 ${
                project.featured ? 'md:col-span-2' : ''
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`grid ${project.featured ? 'lg:grid-cols-2' : ''} gap-0`}>
                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-2xl font-bold text-mustard">{project.number}</span>
                    <span className="font-mono text-xs text-cream/50">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-cream mb-3 group-hover:text-mustard transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-cream/70 text-sm mb-4">{project.shortDescription}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-navy text-cream text-xs font-mono border border-cream/10">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="p-3 bg-navy border border-cream/10">
                          <p className="font-mono text-xs text-mustard">{m.label}</p>
                          <p className="font-bold text-cream">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 bg-navy text-cream text-xs font-semibold tracking-wide hover:bg-mustard hover:text-navy transition-colors"
                    >
                      EXPLORE SYSTEM
                    </button>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-cream text-cream text-xs font-semibold tracking-wide hover:bg-cream hover:text-navy transition-colors"
                    >
                      VIEW SOURCE ↗
                    </a>
                  </div>
                </div>

                {/* Architecture preview */}
                <div className={`${project.featured ? 'lg:border-l' : 'border-t md:border-t-0 md:border-l'} border-cream/10 bg-navy/30 p-6 md:p-8 flex items-center`}>
                  <div className="w-full">
                    <p className="font-mono text-xs text-mustard mb-4">ARCHITECTURE</p>
                    <div className="flex flex-col gap-2">
                      {project.architecture.map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="px-3 py-1.5 bg-navy text-cream font-mono text-xs">
                            {step}
                          </div>
                          {i < project.architecture.length - 1 && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-mustard flex-shrink-0">
                              <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/80" onClick={() => setSelectedProject(null)} />
          <div className="relative bg-navy-light w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-navy-light border-b border-cream/10 p-4 flex justify-between items-center">
              <span className="font-mono text-xs text-mustard">{selectedProject.number} — SYSTEM DETAIL</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-cream hover:text-mustard"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-cream mb-2">{selectedProject.name}</h2>
              <p className="font-mono text-xs text-mustard mb-6">{selectedProject.category}</p>

              <div className="space-y-8">
                <div>
                  <h3 className="font-mono text-xs text-cream mb-2">01 — PROBLEM</h3>
                  <p className="text-cream/80">{selectedProject.shortDescription}</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs text-cream mb-2">02 — APPROACH</h3>
                  <p className="text-cream/80">{selectedProject.fullDescription}</p>
                </div>
                <div>
                  <h3 className="font-mono text-xs text-cream mb-2">03 — ARCHITECTURE</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.architecture.map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-navy text-cream font-mono text-xs">{step}</span>
                        {i < selectedProject.architecture.length - 1 && <span className="text-mustard">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-mono text-xs text-cream mb-2">04 — TECHNOLOGY</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-navy-light border border-cream/20 text-cream text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-mono text-xs text-cream mb-2">05 — ENGINEERING HIGHLIGHTS</h3>
                  <ul className="list-disc list-inside text-cream/80 text-sm space-y-1">
                    {selectedProject.engineeringHighlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
                {selectedProject.metrics.length > 0 && (
                  <div>
                    <h3 className="font-mono text-xs text-cream mb-2">06 — RESULTS</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedProject.metrics.map((m) => (
                        <div key={m.label} className="p-3 bg-navy-light border border-cream/10">
                          <p className="font-mono text-xs text-mustard">{m.label}</p>
                          <p className="font-bold text-cream">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-mono text-xs text-cream mb-2">07 — SOURCE</h3>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-mustard text-navy font-semibold text-sm hover:bg-mustard-dark transition-colors"
                  >
                    OPEN GITHUB REPOSITORY ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
