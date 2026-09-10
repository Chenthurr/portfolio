import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/about', label: 'ABOUT' },
    { to: '/projects', label: 'PROJECTS' },
    { to: '/skills', label: 'SKILLS' },
    { to: '/experience', label: 'EXPERIENCE' },
    { to: '/achievements', label: 'ACHIEVEMENTS' },
    { to: '/resume', label: 'RESUME' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-cream text-lg tracking-tight">
          CHENTHURR.CK
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-semibold tracking-widest transition-colors ${
                location.pathname === link.to ? 'text-mustard' : 'text-cream hover:text-mustard'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/Chenthurr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold tracking-widest text-cream hover:text-mustard transition-colors"
          >
            GITHUB ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy/95 backdrop-blur-md border-t border-navy-light">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-semibold tracking-widest ${
                  location.pathname === link.to ? 'text-mustard' : 'text-cream'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/Chenthurr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold tracking-widest text-cream"
            >
              GITHUB ↗
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
