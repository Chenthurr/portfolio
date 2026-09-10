import { Link } from 'react-router-dom';
import { useData } from '../components/DataContext';
import { useEffect, useRef } from 'react';

export default function Home() {
  const { profile, portraitDataUrl } = useData();
  const heroRef = useRef(null);

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
    const els = heroRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const portraitSrc = portraitDataUrl || profile.portrait;

  return (
    <div ref={heroRef}>
      {/* HERO SECTION */}
      <section className="min-h-screen bg-navy flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Text */}
            <div className="order-2 lg:order-1">
              <div className="reveal opacity-0 mb-4">
                <span className="text-mustard font-mono text-xs tracking-widest">AI / ML ENGINEER</span>
              </div>
              <h1 className="reveal opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
                {profile.headline}
              </h1>
              <p className="reveal opacity-0 text-cream/80 text-lg mb-8 max-w-lg">
                {profile.subheadline}
              </p>
              <div className="reveal opacity-0 flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center px-6 py-3 bg-mustard text-navy font-semibold text-sm tracking-wide hover:bg-mustard-dark transition-colors"
                >
                  EXPLORE MY WORK
                </Link>
                <Link
                  to="/resume"
                  className="inline-flex items-center px-6 py-3 border-2 border-cream text-cream font-semibold text-sm tracking-wide hover:bg-cream hover:text-navy transition-colors"
                >
                  VIEW RESUME
                </Link>
              </div>

              {/* System status panel */}
              <div className="reveal opacity-0 mt-10 p-4 border border-cream/10 bg-white/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-xs text-cream">SYSTEM ONLINE</span>
                </div>
                <div className="font-mono text-xs text-cream/60 space-y-1">
                  <p>AI / DATA / VISION</p>
                  <p>COIMBATORE, IN</p>
                  <p>BUILDING: 2023 → PRESENT</p>
                </div>
              </div>
            </div>

            {/* RIGHT: Portrait */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="reveal opacity-0 relative">
                {/* Technical frame */}
                <div className="relative border-2 border-cream/20 p-2">
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-mustard" />
                  <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-mustard" />
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-mustard" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-mustard" />

                  <div className="w-full max-w-md aspect-[2/3] overflow-hidden bg-navy-light">
                    <img
                      src={portraitSrc}
                      alt="Illustrated portrait of Chenthurr C K"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  {/* Metadata overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-navy/90 text-cream p-3 font-mono text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-mustard">[ PORTRAIT / SUBJECT ]</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-cream/70">
                      <span>STATUS: ONLINE</span>
                      <span>ROLE: AI / ML ENGINEER</span>
                      <span>LOCATION: COIMBATORE, IN</span>
                      <span>FOCUS: AI · DATA · VISION</span>
                    </div>
                  </div>
                </div>

                {/* Floating skill card */}
                <div className="absolute -left-8 top-1/4 bg-navy-light border border-cream/10 p-3 shadow-lg hidden lg:block">
                  <p className="font-mono text-xs text-cream font-bold mb-2">SYSTEM PROFILE</p>
                  <div className="space-y-1 font-mono text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-cream">Python</span>
                      <div className="flex gap-0.5">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-3 ${i < 10 ? 'bg-mustard' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-cream">AI / ML</span>
                      <div className="flex gap-0.5">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-3 ${i < 9 ? 'bg-mustard' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-cream">CV</span>
                      <div className="flex gap-0.5">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-3 ${i < 9 ? 'bg-mustard' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-16 text-cream">Data</span>
                      <div className="flex gap-0.5">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-3 ${i < 8 ? 'bg-mustard' : 'bg-white/10'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHORT ABOUT PREVIEW */}
      <section className="py-20 bg-navy-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-cream mb-6">ABOUT ME</h2>
          <p className="text-cream/80 text-lg leading-relaxed mb-8">
            {profile.about}
          </p>
          <Link
            to="/about"
            className="inline-flex items-center text-mustard font-semibold hover:text-mustard-dark transition-colors"
          >
            READ MORE ABOUT ME →
          </Link>
        </div>
      </section>

      {/* Progress line */}
      <section className="py-12 bg-navy border-t border-navy-light">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-4 font-mono text-xs text-cream">
            <span className="px-3 py-1 border border-cream/20">INPUT</span>
            <span className="text-mustard">→</span>
            <span className="px-3 py-1 border border-cream/20">DATA</span>
            <span className="text-mustard">→</span>
            <span className="px-3 py-1 border border-cream/20">MODEL</span>
            <span className="text-mustard">→</span>
            <span className="px-3 py-1 border border-cream/20">SYSTEM</span>
            <span className="text-mustard">→</span>
            <span className="px-3 py-1 border border-cream/20 bg-mustard text-navy">IMPACT</span>
          </div>
        </div>
      </section>
    </div>
  );
}
