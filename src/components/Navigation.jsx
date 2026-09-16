import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { to: '/', label: 'HOME' }, { to: '/about', label: 'ABOUT' }, { to: '/projects', label: 'VOYAGE' },
  { to: '/skills', label: 'SKILLS' }, { to: '/experience', label: 'EXPERIENCE' },
  { to: '/achievements', label: 'ACHIEVEMENTS' }, { to: '/certifications', label: 'CERTS' },
  { to: '/resume', label: 'RESUME' }, { to: '/contact', label: 'CONTACT' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); const location = useLocation();
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 28); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => setMobileOpen(false), [location.pathname]);
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? 'glass shadow-sm' : 'bg-transparent'}`} aria-label="Primary navigation">
    <div className="container-wide px-4 sm:px-6 py-3.5 flex items-center justify-between gap-5">
      <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Chenthurr C K home"><span className="w-9 h-9 grid place-items-center rounded-full border-2 border-[var(--primary)] text-[var(--accent)] font-black">C</span><span className="hidden sm:block font-black tracking-tight text-sm">CHENTHURR.CK</span></Link>
      <div className="hidden xl:flex items-center gap-5">{navLinks.map((link) => <Link key={link.to} to={link.to} className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}>{link.label}</Link>)}<a href="https://github.com/Chenthurr" target="_blank" rel="noopener noreferrer" className="nav-link">GITHUB ↗</a><ThemeToggle /></div>
      <div className="flex xl:hidden items-center gap-2"><ThemeToggle /><button type="button" className="w-10 h-10 grid place-items-center border border-[var(--border)]" onClick={() => setMobileOpen((v) => !v)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}><span className="text-xl leading-none" aria-hidden="true">{mobileOpen ? '×' : '☰'}</span></button></div>
    </div>
    {mobileOpen && <div className="xl:hidden glass border-t border-[var(--border)]"><div className="container-wide px-5 py-5 grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-3 max-h-[72vh] overflow-y-auto">{navLinks.map((link) => <Link key={link.to} to={link.to} className={`nav-link text-xs py-2 ${location.pathname === link.to ? 'active' : ''}`}>{link.label}</Link>)}<a href="https://github.com/Chenthurr" target="_blank" rel="noopener noreferrer" className="nav-link text-xs py-2">GITHUB ↗</a></div></div>}
  </nav>;
}
