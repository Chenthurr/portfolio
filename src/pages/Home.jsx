import { Link } from 'react-router-dom';
import { useData } from '../components/DataContext';

function WantedPoster({ profile, portraitSrc }) {
  return (
    <div className="paper-card p-3 sm:p-4 rotate-[1deg] shadow-2xl">
      <div className="border-2 border-[var(--text)]/15 p-2 relative">
        <div className="absolute top-3 left-3 right-3 flex justify-between font-mono text-[9px] font-bold tracking-[.18em] text-[var(--primary)]"><span>WANTED</span><span>PROFILE 001</span></div>
        <div className="mt-8 aspect-[4/5] overflow-hidden bg-[var(--bg)]">
          <img src={portraitSrc} alt="Portrait of Chenthurr C K" className="w-full h-full object-cover object-top" onError={(e) => { e.currentTarget.style.display='none'; }} />
        </div>
        <div className="pt-4 pb-2 text-center">
          <p className="font-black text-2xl sm:text-3xl tracking-tight">{profile.name}</p>
          <p className="mt-1 font-mono text-[10px] font-bold tracking-[.15em] text-[var(--primary)]">{profile.title}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-3 font-mono text-[9px] leading-4">
          <span><b>LOCATION</b><br />{profile.location}</span><span><b>SPECIALTY</b><br />AI · DATA · VISION</span>
          <span><b>STATUS</b><br />BUILDING</span><span><b>COORD.</b><br />11°N / 78°E</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { profile, projects, portraitDataUrl } = useData();
  const portraitSrc = portraitDataUrl || profile.portrait;
  const featured = projects.filter((p) => p.published && p.featured);
  return (
    <div>
      <section className="min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6">
        <div className="container-wide grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-mono text-[10px] font-bold tracking-[.16em] text-[var(--primary)] mb-6"><span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" /> WANTED // AI / ML ENGINEER</div>
            <p className="eyebrow">CHARTING THE GRAND LINE OF INTELLIGENT SYSTEMS</p>
            <h1 className="text-[clamp(3.4rem,9vw,8rem)] leading-[.82] tracking-[-.07em] font-black max-w-4xl">CHENTHURR<br /><span className="text-[var(--primary)]">C K</span></h1>
            <h2 className="mt-7 text-xl sm:text-2xl font-black tracking-[.12em]">AI / ML ENGINEER</h2>
            <p className="mt-5 max-w-2xl text-[var(--muted)] text-base sm:text-lg leading-8">Building intelligent systems and setting them loose on the Grand Line — across machine learning, computer vision, data engineering, and full-stack AI applications.</p>
            <p className="mt-5 font-mono text-xs text-[var(--ink-soft)]">{profile.headline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="btn-primary">Explore My Voyage →</Link>
              <Link to="/resume" className="btn-ghost">View Resume</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 font-mono text-xs font-bold">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)]">GITHUB ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)]">LINKEDIN ↗</a>
              <a href={`mailto:${profile.email}`} className="hover:text-[var(--primary)]">EMAIL ↗</a>
            </div>
          </div>
          <div className="reveal max-w-[520px] w-full mx-auto lg:ml-auto"><WantedPoster profile={profile} portraitSrc={portraitSrc} /></div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10 border-y border-[var(--border)]">
        <div className="container-wide flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] font-bold tracking-[.14em]">
          {['INPUT','DATA','MODEL','SYSTEM','IMPACT'].map((step, i) => <span key={step} className="flex items-center gap-3"><span className={`px-3 py-2 border border-[var(--border)] ${i === 4 ? 'bg-[var(--accent)] text-[var(--text)]' : 'bg-[var(--surface)]'}`}>{step}</span>{i < 4 && <span className="text-[var(--primary)]">→</span>}</span>)}
        </div>
      </section>

      <section className="page">
        <div className="container-wide">
          <div className="section-heading"><div className="section-index"><span>01</span><i /></div><div><p className="eyebrow">CAPTAIN'S LOG</p><h2 className="text-4xl sm:text-5xl font-black tracking-tight">A DEVELOPER ON THE MOVE.</h2></div></div>
          <div className="grid lg:grid-cols-[1.3fr_.7fr] gap-8 items-start">
            <p className="text-lg leading-8 text-[var(--muted)]">{profile.about}</p>
            <div className="paper-card p-5 font-mono text-xs space-y-3"><p className="text-[var(--primary)]">SYSTEM STATUS</p><p>ROLE ........ {profile.role}</p><p>FOCUS ....... AI · DATA · VISION</p><p>EDUCATION ... {profile.education}</p><p>CGPA ........ {profile.cgpa}</p><p>STATUS ...... BUILDING</p></div>
          </div>
          <Link to="/about" className="inline-flex mt-8 font-mono text-xs font-bold tracking-widest text-[var(--primary)]">READ THE CAPTAIN'S LOG →</Link>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6 mb-8"><div><p className="eyebrow">VOYAGE LOG</p><h2 className="text-3xl sm:text-4xl font-black">SYSTEMS BUILT DURING THE JOURNEY.</h2></div><Link to="/projects" className="hidden sm:block font-mono text-xs font-bold text-[var(--primary)]">VIEW ALL →</Link></div>
          <div className="grid md:grid-cols-2 gap-5">{featured.slice(0,2).map((project) => <Link to="/projects" key={project.id} className="paper-card p-6 group hover:-translate-y-1 transition-transform"><div className="flex justify-between gap-4 font-mono text-[10px] text-[var(--primary)]"><span>LOG {project.number}</span><span>{project.category}</span></div><h3 className="mt-5 text-xl font-black group-hover:text-[var(--primary)] transition-colors">{project.name}</h3><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.shortDescription}</p><div className="mt-5 flex flex-wrap gap-2">{project.technologies.slice(0,5).map((tech) => <span key={tech} className="tag">{tech}</span>)}</div></Link>)}</div>
        </div>
      </section>
    </div>
  );
}
