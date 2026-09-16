import { useData } from '../components/DataContext';
import SectionHeading from '../components/SectionHeading';

export default function Skills() {
  const { skills } = useData();
  const groups = [...new Set(skills.map((skill) => skill.category))];
  return <div className="page"><div className="container-wide"><SectionHeading index={3} eyebrow="CREW ABILITIES" title="SKILLS" description="The tools and technologies used to turn data, models and code into working systems." /><div className="grid md:grid-cols-2 gap-5">{groups.map((group, i) => <section key={group} className="paper-card p-6 sm:p-7"><div className="flex justify-between items-center border-b border-[var(--border)] pb-4"><h2 className="font-black text-xl">{group}</h2><span className="font-mono text-[10px] text-[var(--primary)]">ABILITY {String(i+1).padStart(2,'0')}</span></div><div className="mt-5 flex flex-wrap gap-2">{skills.filter((s) => s.category === group).map((skill) => <span className="tag hover:border-[var(--primary)] hover:text-[var(--text)] transition-colors" key={skill.id}>{skill.name}</span>)}</div></section>)}</div></div></div>;
}
