import { useData } from '../components/DataContext';

export default function Contact() {
  const { profile } = useData();

  return (
    <div className="pt-24 pb-20 bg-navy min-h-screen text-cream">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">HAVE A PROBLEM WORTH SOLVING?</h1>
          <p className="text-xl text-cream/60">Let's build the system behind it.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="px-8 py-4 bg-mustard text-navy font-bold text-sm tracking-wide hover:bg-mustard-dark transition-colors"
          >
            EMAIL ME
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-cream text-cream font-bold text-sm tracking-wide hover:bg-cream hover:text-navy transition-colors"
          >
            GITHUB
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-cream text-cream font-bold text-sm tracking-wide hover:bg-cream hover:text-navy transition-colors"
          >
            LINKEDIN
          </a>
        </div>

        <div className="mt-16 font-mono text-xs text-cream/40">
          <p>{profile.email}</p>
          <p className="mt-2">{profile.location}</p>
        </div>
      </div>
    </div>
  );
}
