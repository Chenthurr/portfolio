import SectionHeading from '../components/SectionHeading';
import { useData } from '../components/DataContext';

export default function Resume() {
  const { settings, resumeDataUrl } = useData();
  const resumeUrl = resumeDataUrl || settings.resumeDriveUrl;

  return <div className="page"><div className="container-wide">
    <SectionHeading index={7} eyebrow="NAVIGATION CHART" title="RESUME" description="A direct route to the current resume, while preserving the existing stored document link." />
    <div className="max-w-3xl paper-card p-7 sm:p-10">
      <div className="flex flex-wrap justify-between gap-6">
        <div><p className="eyebrow">DOCUMENT / CHENTHURR C K</p><h2 className="text-3xl font-black">CAREER LOG</h2><p className="mt-3 text-[var(--muted)]">AI / ML Engineer</p></div>
        <div className="font-mono text-right text-xs"><p>STATUS</p><p className="text-[var(--primary)] mt-1">READY TO OPEN</p></div>
      </div>
      {resumeUrl ? <div className="mt-10 flex flex-wrap gap-3">
        <a className="btn-primary" href={resumeUrl} target="_blank" rel="noopener noreferrer">View Resume ↗</a>
        {resumeDataUrl && <a className="btn-ghost" href={resumeDataUrl} download="Chenthurr-C-K-Resume.pdf">Download PDF</a>}
      </div> : <p className="mt-8 text-sm text-[var(--muted)]">Resume link is not configured yet. Add it through the Admin page.</p>}
      <p className="mt-6 text-xs text-[var(--muted)]">External Drive links open in a new tab; a download button is shown only when a locally stored PDF is available.</p>
    </div>
  </div></div>;
}
