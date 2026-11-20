import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data/portfolioData';

export default function Nav({ onOpenResume }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 20);
    f();
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <header className={`top transition-colors ${solid || open ? 'bg-ink/90 backdrop-blur border-b border-white/5' : ''}`}>
      <div className="max-w-6xl mx-auto h-16 px-5 sm:px-8 flex items-center justify-between">
        <a href="#top" className="font-display font-extrabold text-lg tracking-tight">
          Amiel<span className="text-oak">.</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 text-sm text-mute">
            {NAV_LINKS.map((n) => (
              <a key={n} href={'#' + n.toLowerCase()} className="hover:text-sand transition-colors">
                {n}
              </a>
            ))}
          </nav>
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="px-3.5 py-1.5 rounded-full border border-oak/60 text-xs font-semibold text-oak hover:bg-oak hover:text-ink transition-colors cursor-pointer"
            >
              Resume
            </button>
          )}
        </div>
        <button className="md:hidden p-2 -mr-2" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="md:hidden px-5 pb-5 flex flex-col max-h-[calc(100svh-4rem)] overflow-y-auto">
          {NAV_LINKS.map((n) => (
            <a key={n} href={'#' + n.toLowerCase()} onClick={() => setOpen(false)} className="py-3 text-lg font-display border-t border-white/5">
              {n}
            </a>
          ))}
          {onOpenResume && (
            <button
              onClick={() => {
                setOpen(false);
                onOpenResume();
              }}
              className="py-3 text-lg font-display text-oak border-t border-white/5 text-left cursor-pointer flex items-center justify-between"
            >
              <span>View Resume</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
