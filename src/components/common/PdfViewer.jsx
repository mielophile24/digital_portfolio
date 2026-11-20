import React from 'react';

export default function PdfViewer() {
  const arrow = (
    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
  );
  const label = 'group inline-flex items-center gap-1.5 text-sm font-semibold text-oak hover:text-sand transition-colors';

  return (
    <div className="mt-auto pt-8 flex flex-col items-end gap-3">
      <a href="/certificate.pdf" target="_blank" rel="noopener noreferrer" className={label}>
        View certificate {arrow}
      </a>
    </div>
  );
}
