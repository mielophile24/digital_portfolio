import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export default function Lightbox({ imgs, start, label, onClose }) {
  const [n, setN] = useState(start);
  const touch = useRef(null);
  const go = (d) => setN((v) => (v + d + imgs.length) % imgs.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && imgs.length > 1) go(1);
      else if (e.key === 'ArrowLeft' && imgs.length > 1) go(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [imgs.length]);

  const circ = 'h-10 w-10 rounded-full bg-ink/70 border border-white/20 text-sand flex items-center justify-center hover:bg-oak hover:text-ink transition-colors';
  const ic = (d) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
  const stop = (f) => (e) => {
    e.stopPropagation();
    f();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center px-3 sm:px-20"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      onClick={onClose}
      onTouchStart={(e) => {
        e.stopPropagation();
        touch.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        if (touch.current === null || imgs.length < 2) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <button
        autoFocus
        aria-label="Close preview"
        className={`${circ} absolute right-3 sm:right-6`}
        style={{ top: 'calc(0.75rem + env(safe-area-inset-top, 0px))' }}
        onClick={stop(onClose)}
      >
        {ic('M6 6l12 12M18 6L6 18')}
      </button>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="w-full max-w-5xl flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imgs[n]}
          alt={`${label} ${n + 1} of ${imgs.length}`}
          className="max-h-[76svh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
        />
      </div>
      {imgs.length > 1 && (
        <>
          <button
            aria-label="Previous image"
            className={`${circ} absolute left-2 sm:left-6 top-1/2 -translate-y-1/2`}
            onClick={stop(() => go(-1))}
          >
            {ic('M15 5l-7 7 7 7')}
          </button>
          <button
            aria-label="Next image"
            className={`${circ} absolute right-2 sm:right-6 top-1/2 -translate-y-1/2`}
            onClick={stop(() => go(1))}
          >
            {ic('M9 5l7 7-7 7')}
          </button>
          <p className="mt-4 text-sm text-sand/80" onClick={(e) => e.stopPropagation()}>
            {n + 1} / {imgs.length}
          </p>
        </>
      )}
    </div>,
    document.body
  );
}
