import { useData } from '../components/DataContext';
import SectionHeading from '../components/SectionHeading';

export default function Achievements() {
  const { achievements } = useData();
  return <div className="page"><div className="container-wide"><SectionHeading index={5} eyebrow="ACHIEVEMENT WALL" title="ACHIEVEMENTS" description="Milestones from competitions, hackathons and project leadership." /><div className="grid md:grid-cols-2 gap-5">{achievements.map((item, index) => <article key={item.id} className="paper-card p-6 sm:p-7 relative overflow-hidden"><span className="absolute right-5 top-5 font-mono text-[10px] text-[var(--primary)]">SEAL {String(index+1).padStart(2,'0')}</span><p className="eyebrow">VERIFIED MILESTONE</p><h2 className="text-xl sm:text-2xl font-black pr-14">{item.title}</h2><p className="mt-5 text-lg font-bold">{item.detail}</p><p className="mt-2 text-sm text-[var(--muted)]">{item.organizer}</p>{item.focus && <p className="mt-4 pt-4 border-t border-[var(--border)] text-xs font-mono text-[var(--primary)]">FOCUS / {item.focus}</p>}</article>)}</div></div></div>;
}
