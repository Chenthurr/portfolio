import { useState } from 'react';
import { useData } from '../components/DataContext';
import SectionHeading from '../components/SectionHeading';

const filters = [
  { key: 'all', label: 'ALL' }, { key: 'ai-ml', label: 'AI / ML' }, { key: 'computer-vision', label: 'COMPUTER VISION' },
  { key: 'developer-tools', label: 'DEVELOPER TOOLS' },
];

function Pipeline({ steps }) {
  return <div className="mt-5"><p className="eyebrow">ARCHITECTURE / ROUTE</p><div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2">
    {steps.map((step, i) => <div key={`${step}-${i}`} className="flex items-center gap-2"><span className="tag border-[var(--primary)]/30 text-[var(--text)]">{step}</span>{i < steps.length - 1 && <span className="text-[var(--primary)] sm:rotate-0 rotate-90">→</span>}</div>)}
  </div></div>;
}

function ProjectCard({ project, onOpen }) {
  return <article data-cursor="card" className={`paper-card p-6 sm:p-7 group hover:-translate-y-1 hover:border-[var(--primary)] transition-all ${project.featured ? 'md:col-span-2' : ''}`}>
    <div className="flex flex-wrap justify-between gap-3"><span className="font-mono text-sm font-black text-[var(--primary)]">{project.number} / VOYAGE LOG</span><span className="font-mono text-[10px] text-[var(--muted)]">{project.category}</span></div>
    <h2 className="mt-5 text-2xl font-black tracking-tight group-hover:text-[var(--primary)] transition-colors">{project.name}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">{project.shortDescription}</p>
    <div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
    {project.metrics?.length > 0 && <div className="mt-6 grid sm:grid-cols-3 gap-2">{project.metrics.map((m) => <div className="metric" key={m.label}><p className="metric-label">{m.label}</p><p className="metric-value">{m.value}</p></div>)}</div>}
    <Pipeline steps={project.architecture} />
    <div className="mt-7 flex flex-wrap gap-3"><button onClick={() => onOpen(project)} className="btn-primary">Explore System</button><a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">View Source ↗</a>{project.liveDemoUrl && <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">Live Demo ↗</a>}</div>
  </article>;
}

export default function Projects() {
  const { projects } = useData(); const [activeFilter, setActiveFilter] = useState('all'); const [selected, setSelected] = useState(null);
  const filtered = projects.filter((p) => p.published && (activeFilter === 'all' || p.filter === activeFilter));
  return <div className="page"><div className="container-wide">
    <SectionHeading index={2} eyebrow="VOYAGE LOG" title="PROJECTS" description="Systems built during the journey — with the engineering details kept in plain sight." />
    <div className="flex flex-wrap gap-2 mb-10">{filters.map((filter) => <button key={filter.key} onClick={() => setActiveFilter(filter.key)} className={`px-4 py-2 border text-[10px] font-black tracking-[.14em] transition-colors ${activeFilter === filter.key ? 'bg-[var(--text)] text-[var(--bg)] border-[var(--text)]' : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--text)]'}`}>{filter.label}</button>)}</div>
    <div className="grid md:grid-cols-2 gap-5">{filtered.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}</div>
    {selected && <div className="fixed inset-0 z-[100] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="project-detail-title"><button className="absolute inset-0 bg-black/65 cursor-default" onClick={() => setSelected(null)} aria-label="Close project detail" /><article className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto paper-card p-6 sm:p-9"><div className="flex justify-between items-start gap-4"><div><p className="eyebrow">{selected.number} / SYSTEM DETAIL</p><h2 id="project-detail-title" className="text-2xl sm:text-3xl font-black">{selected.name}</h2></div><button onClick={() => setSelected(null)} className="text-2xl leading-none" aria-label="Close project detail">×</button></div><p className="mt-5 text-[var(--muted)] leading-8">{selected.fullDescription}</p><Pipeline steps={selected.architecture} /><div className="mt-7"><p className="eyebrow">ENGINEERING HIGHLIGHTS</p><ul className="grid sm:grid-cols-2 gap-2 text-sm text-[var(--muted)]">{selected.engineeringHighlights.map((item) => <li key={item} className="border-l-2 border-[var(--accent)] pl-3 py-1">{item}</li>)}</ul></div><div className="mt-7 flex flex-wrap gap-3"><a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Open GitHub Repository ↗</a>{selected.liveDemoUrl && <a href={selected.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">Live Demo ↗</a>}</div></article></div>}
  </div></div>;
}
