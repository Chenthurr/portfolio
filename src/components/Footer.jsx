import { Link } from 'react-router-dom';

export default function Footer({ settings }) {
  return (
    <footer className="bg-navy text-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="font-bold text-lg">CHENTHURR C K</h3>
            <p className="text-sm text-cream/60 mt-1">AI / ML · DATA · COMPUTER VISION · SOFTWARE</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="https://github.com/Chenthurr" target="_blank" rel="noopener noreferrer" className="hover:text-mustard transition-colors">
              GitHub ↗
            </a>
            <a href="https://linkedin.com/in/chenthurr-c-k-901ab0289/" target="_blank" rel="noopener noreferrer" className="hover:text-mustard transition-colors">
              LinkedIn ↗
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-cream/10 text-xs text-cream/40">
          {settings?.footerText || '© 2026 CHENTHURR C K'}
        </div>
      </div>
    </footer>
  );
}
