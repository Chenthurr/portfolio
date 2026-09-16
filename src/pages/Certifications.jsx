import { useData } from '../components/DataContext';
import SectionHeading from '../components/SectionHeading';

export default function Certifications() {
  const { certifications } = useData();
  return <div className="page"><div className="container-wide"><SectionHeading index={6} eyebrow="NAVIGATION SEALS" title="CERTIFICATIONS" description="Learning milestones and credentials retained from the portfolio data." /><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{certifications.map((cert, index) => <article key={cert.id} className="paper-card p-6 min-h-64 flex flex-col"><div className="w-14 h-14 rounded-full border border-[var(--primary)] grid place-items-center font-mono text-xs text-[var(--primary)]">0{index+1}</div><h2 className="mt-6 font-black text-lg leading-6">{cert.title}</h2><div className="mt-auto pt-6 border-t border-[var(--border)]"><p className="text-sm font-bold">{cert.issuer}</p><p className="mt-1 font-mono text-[10px] text-[var(--primary)]">ISSUED / {cert.year}</p></div></article>)}</div></div></div>;
}
