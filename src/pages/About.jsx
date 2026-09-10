import { useData } from '../components/DataContext';
import { useEffect, useRef } from 'react';

export default function About() {
  const { profile, education, portraitDataUrl } = useData();
  const sectionRef = useRef(null);
  const portraitSrc = portraitDataUrl || profile.portrait;

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

  return (
    <div ref={sectionRef} className="pt-24 pb-20 bg-navy min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal opacity-0 mb-16">
          <span className="font-mono text-xs text-mustard tracking-widest">01 / SYSTEM PROFILE</span>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mt-2">ABOUT</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Profile info */}
          <div>
            <div className="reveal opacity-0 grid grid-cols-2 gap-6 mb-10">
              <div className="p-4 border border-cream/10 bg-navy-light">
                <p className="font-mono text-xs text-mustard mb-1">ROLE</p>
                <p className="font-semibold text-cream">{profile.role}</p>
              </div>
              <div className="p-4 border border-cream/10 bg-navy-light">
                <p className="font-mono text-xs text-mustard mb-1">EDUCATION</p>
                <p className="font-semibold text-cream">{profile.education}</p>
              </div>
              <div className="p-4 border border-cream/10 bg-navy-light">
                <p className="font-mono text-xs text-mustard mb-1">CGPA</p>
                <p className="font-semibold text-cream">{profile.cgpa}</p>
              </div>
              <div className="p-4 border border-cream/10 bg-navy-light">
                <p className="font-mono text-xs text-mustard mb-1">LOCATION</p>
                <p className="font-semibold text-cream">{profile.location}</p>
              </div>
            </div>

            <div className="reveal opacity-0 mb-10">
              <p className="font-mono text-xs text-mustard mb-2">FOCUS</p>
              <p className="text-cream font-medium">{profile.focus}</p>
            </div>

            <div className="reveal opacity-0 p-6 border-l-4 border-mustard bg-navy-light">
              <p className="text-cream leading-relaxed">{profile.about}</p>
            </div>

            {/* Engineering DNA */}
            <div className="reveal opacity-0 mt-10">
              <p className="font-mono text-xs text-mustard mb-4">ENGINEERING DNA</p>
              <div className="flex flex-col items-start gap-3">
                {['PYTHON', 'DATA', 'MODELS', 'APIs', 'APPLICATIONS'].map((item, i) => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-navy text-cream font-mono text-sm font-semibold">
                      {item}
                    </div>
                    {i < 4 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-mustard">
                        <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Portrait + Education */}
          <div>
            <div className="reveal opacity-0 mb-10">
              <div className="border-2 border-cream/20 p-2 relative">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-mustard" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-mustard" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-mustard" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-mustard" />
                <div className="w-full aspect-[2/3] overflow-hidden bg-navy-light">
                  <img
                    src={portraitSrc}
                    alt="Illustrated portrait of Chenthurr C K"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
            </div>

            <div className="reveal opacity-0">
              <p className="font-mono text-xs text-mustard mb-4">EDUCATION</p>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="p-4 border border-cream/10 bg-navy-light">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-cream">{edu.degree}</h3>
                      <span className="font-mono text-xs text-mustard">{edu.years}</span>
                    </div>
                    <p className="text-sm text-cream/70">{edu.institution}</p>
                    {edu.affiliation && (
                      <p className="text-xs text-cream/50 mt-1">{edu.affiliation}</p>
                    )}
                    {edu.cgpa && (
                      <p className="text-xs font-mono text-mustard mt-2">CGPA: {edu.cgpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
