import { useData } from '../components/DataContext';
import SectionHeading from '../components/SectionHeading';

export default function About() {
  const { profile, education, portraitDataUrl } = useData();
  const portraitSrc = portraitDataUrl || profile.portrait;
  const facts = [
    ['IDENTITY', profile.name], ['MISSION', profile.headline], ['SPECIALIZATION', profile.focus],
    ['EDUCATION', profile.education], ['CURRENT STATUS', 'FINAL-YEAR STUDENT'], ['LOCATION', profile.location],
  ];
  return <div className="page"><div className="container-wide">
    <SectionHeading index={1} eyebrow="THE CAPTAIN'S LOG" title="ABOUT" description="A practical record of the engineer, the education behind the work, and the systems-first mindset." />
    <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 items-start">
      <div className="paper-card p-3 rotate-[-1deg]"><img src={portraitSrc} alt="Portrait of Chenthurr C K" className="w-full aspect-[4/5] object-cover object-top" /></div>
      <div>
        <div className="grid sm:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">{facts.map(([label,value]) => <div key={label} className="bg-[var(--surface)] p-5 min-h-28"><p className="eyebrow">{label}</p><p className="font-bold leading-6">{value}</p></div>)}</div>
        <div className="mt-8 paper-card p-6 border-l-4 border-l-[var(--primary)]"><p className="font-mono text-xs text-[var(--primary)] mb-3">LOG ENTRY / ENGINEERING DNA</p><p className="text-[var(--muted)] leading-8">{profile.about}</p></div>
      </div>
    </div>
    <div className="mt-16"><p className="eyebrow">EDUCATION / NAVIGATION CHART</p><div className="grid md:grid-cols-2 gap-5">{education.map((edu) => <article key={edu.id} className="paper-card p-6"><div className="flex justify-between gap-4"><span className="font-mono text-xs text-[var(--primary)]">{edu.years}</span>{edu.cgpa && <strong className="font-mono text-xs text-[var(--primary)]">{edu.cgpa}</strong>}</div><h2 className="mt-5 text-xl font-black">{edu.degree}</h2><p className="mt-3 text-sm text-[var(--muted)]">{edu.institution}</p>{edu.affiliation && <p className="mt-2 text-xs text-[var(--muted)]">{edu.affiliation}</p>}</article>)}</div></div>
  </div></div>;
}
