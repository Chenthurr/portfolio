import { useData } from '../components/DataContext';

export default function Resume() {
  const { resumeDataUrl, settings } = useData();
  const driveUrl = settings?.resumeDriveUrl;
  // If an admin has uploaded a PDF directly (Admin > Resume), it's embedded inline
  // and fully downloadable. Otherwise we fall back to the Google Drive link.
  const hasEmbeddedResume = Boolean(resumeDataUrl);
  const resumeSrc = resumeDataUrl || driveUrl;

  return (
    <div className="pt-24 pb-20 bg-navy min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <span className="font-mono text-xs text-mustard tracking-widest">RESUME</span>
          <h1 className="text-4xl md:text-5xl font-bold text-cream mt-2">CURRICULUM VITAE</h1>
        </div>

        <div className="bg-navy-light border border-cream/10 p-8 text-center">
          <p className="text-cream/70 mb-6">
            View or download my current resume.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={resumeSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-navy text-cream font-semibold text-sm tracking-wide hover:bg-mustard hover:text-navy transition-colors"
            >
              VIEW RESUME
            </a>
            <a
              href={resumeSrc}
              {...(hasEmbeddedResume ? { download: 'Chenthurr_CK_Resume.pdf' } : { target: '_blank', rel: 'noopener noreferrer' })}
              className="px-6 py-3 border-2 border-cream text-cream font-semibold text-sm tracking-wide hover:bg-cream hover:text-navy transition-colors"
            >
              DOWNLOAD RESUME
            </a>
          </div>
          {!hasEmbeddedResume && (
            <p className="text-xs text-cream/40 mt-4 font-mono">
              Opens the resume in Google Drive. Sign in as admin to upload a PDF for an inline preview instead.
            </p>
          )}
        </div>

        {hasEmbeddedResume ? (
          <div className="mt-8 bg-navy-light border border-cream/10 p-4 h-[800px]">
            <iframe
              src={resumeSrc}
              title="Resume"
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        ) : (
          <div className="mt-8 bg-navy-light border border-cream/10 p-4 h-[800px]">
            <iframe
              src={`https://drive.google.com/embeddedfolderview?id=${(driveUrl || '').match(/folders\/([^?/]+)/)?.[1] || ''}#list`}
              title="Resume (Google Drive)"
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
