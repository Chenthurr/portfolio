import { useEffect, useState } from 'react';

const KEY = 'ck-theme';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? stored === 'dark' : window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    try { localStorage.setItem(KEY, dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setDark((value) => !value)}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Luffy style — light' : 'Wano style — dark'}
    >
      <span className="theme-toggle-icon" aria-hidden="true">{dark ? '☀' : '◐'}</span>
      <span className="hidden sm:inline">{dark ? 'WANO' : 'LUFFY'}</span>
    </button>
  );
}
