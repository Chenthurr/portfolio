import { useData } from '../components/DataContext';
import SectionHeading from '../components/SectionHeading';

export default function Resume() {
  const { settings, resumeDataUrl } = useData();
  const resumeUrl = resumeDataUrl || settings.resumeDriveUrl;
  return <div className="page"><div className="container-wide"><SectionHeading index={7} eyebrow="NAVIGATION CHART" title="RESUME" description="A direct route to the current resume, while preserving the existing stored document link." /><div className="max-w-3xl paper-card p-7 sm:p-10"><div className="flex flex-wrap justify-between gap-6"><div><p className="eyebrow">DOCUMENT / CHENTHURR C K</p><h2 className="text-3xl font-black">CAREER LOG</h2><p className="mt-3 text-[var(--muted)]">AI / ML Engineer</p></div><div className="font-mono text-right text-xs"><p>STATUS</p><p className="text-[var(--primary)] mt-1">READY TO OPEN</p></div></div><div className="mt-10 grid sm:grid-cols-2 gap-3"><a className="btn-primary" href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume ↗</a><a className="btn-ghost" href={resumeUrl} target="_blank" rel="noopener noreferrer" download>Download</a></div><p className="mt-6 text-xs text-[var(--muted)]">The resume destination is read from the site's existing settings/data model.</p></div></div></div>;
}
