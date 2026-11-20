import React, { useState } from 'react';
import CertificateModal from './CertificateModal';

export default function PdfViewer() {
  const [isOpen, setIsOpen] = useState(false);

  const arrow = (
    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
  );
  const label = 'group inline-flex items-center gap-1.5 text-sm font-semibold text-oak hover:text-sand transition-colors cursor-pointer text-left';

  return (
    <div className="mt-auto pt-8 flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={label}
        aria-haspopup="dialog"
      >
        View certificate {arrow}
      </button>

      <CertificateModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        src="/certificate.pdf"
        title="Java Fundamentals"
        subtitle="Award of Course Completion · Oracle Academy"
      />
    </div>
  );
}
