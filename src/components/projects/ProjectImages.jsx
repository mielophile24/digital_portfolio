import React, { useState, useEffect, useRef } from 'react';
import { DEFAULT_IMAGES } from '../../data/projects';
import Lightbox from './Lightbox';

export default function ProjectImages({ k, images, label, className }) {
  const [imgs] = useState(() => {
    if (images && images.length) return images.slice(0, 3);
    try {
      const j = localStorage.getItem('imgs:' + k);
      if (j) {
        const a = JSON.parse(j);
        if (Array.isArray(a) && a.length) return a.slice(0, 3);
      }
      const o = localStorage.getItem('img:' + k);
      if (o) return [o];
    } catch (e) {}
    const d = DEFAULT_IMAGES[k];
    return d ? [].concat(d).slice(0, 3) : [];
  });
  const [i, setI] = useState(0);
  const touch = useRef(null);
  const [paused, setPaused] = useState(false);
  const [lb, setLb] = useState(null);

  useEffect(() => {
    if (imgs.length < 2 || paused || lb !== null) return;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((v) => (Math.min(v, imgs.length - 1) + 1) % imgs.length), 4000);
    return () => clearInterval(t);
  }, [imgs.length, paused, lb, i]);

  const cur = Math.max(0, Math.min(i, imgs.length - 1));
  const go = (d) => setI((cur + d + imgs.length) % imgs.length);

  const nav = 'absolute top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-ink/70 backdrop-blur text-sand flex items-center justify-center hover:bg-oak hover:text-ink transition-colors';
  const chev = (d) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );

  return (
    <div
      className={`relative overflow-hidden ${className || ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touch.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touch.current === null || imgs.length < 2) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      {imgs.length ? (
        imgs.map((src, x) => (
          <img
            key={x}
            src={src}
            alt={`${label} ${x + 1} of ${imgs.length}`}
            aria-hidden={x !== cur}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${x === cur ? 'opacity-100' : 'opacity-0'}`}
          />
        ))
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-mute">
          {label}
        </div>
      )}
      {imgs.length > 0 && (
        <button aria-label="Enlarge image" aria-haspopup="dialog" className="absolute inset-0 cursor-zoom-in" onClick={() => setLb(cur)} />
      )}
      {lb !== null && <Lightbox imgs={imgs} start={lb} label={label} onClose={() => setLb(null)} />}
      {imgs.length > 1 && (
        <>
          <button aria-label="Previous image" className={`${nav} left-2`} onClick={() => go(-1)}>
            {chev('M15 5l-7 7 7 7')}
          </button>
          <button aria-label="Next image" className={`${nav} right-2`} onClick={() => go(1)}>
            {chev('M9 5l7 7-7 7')}
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {imgs.map((_, x) => (
              <button
                key={x}
                aria-label={`Show image ${x + 1}`}
                onClick={() => setI(x)}
                className={`h-1.5 rounded-full transition-all ${x === cur ? 'w-5 bg-oak' : 'w-1.5 bg-sand/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
