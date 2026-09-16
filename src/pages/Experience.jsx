import { useData } from '../components/DataContext';
import SectionHeading from '../components/SectionHeading';

export default function Experience() {
  const { experience } = useData();
  return <div className="page"><div className="container-wide"><SectionHeading index={4} eyebrow="SHIP LOG" title="EXPERIENCE" description="Professional chapters recorded by role, organization, dates and engineering outcomes." /><div className="relative ml-3 sm:ml-6 border-l-2 border-[var(--border)] pl-7 sm:pl-10 space-y-8">{experience.map((item, index) => <article key={item.id} className="paper-card p-6 sm:p-8 relative"><span className="absolute -left-[43px] sm:-left-[53px] top-8 w-5 h-5 rounded-full border-4 border-[var(--bg)] bg-[var(--primary)]" /><div className="flex flex-wrap justify-between gap-3 font-mono text-[10px]"><span className="text-[var(--primary)]">PORT {String(index+1).padStart(2,'0')}</span><span>{item.dates}</span></div><h2 className="mt-4 text-2xl font-black">{item.role}</h2><p className="mt-1 font-mono text-xs text-[var(--primary)]">{item.company}</p><ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-[var(--muted)]">{item.achievements.map((achievement) => <li key={achievement} className="border-l border-[var(--accent)] pl-3 py-1">{achievement}</li>)}</ul></article>)}</div></div></div>;
}
