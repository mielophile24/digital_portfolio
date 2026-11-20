import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function ResumeModal({
  isOpen,
  onClose,
  src = '/resume.pdf',
  title = 'Amiel M. Mirafuentes – Resume',
  subtitle = 'BS Information Technology · Fresh Graduate'
}) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6"
      style={{
        paddingTop: 'calc(0.5rem + env(safe-area-inset-top, 0px))',
        paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] max-h-[960px] bg-coal border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-ink/80 backdrop-blur-md">
          <div className="min-w-0 pr-3">
            <h2 id="resume-modal-title" className="font-display text-base sm:text-xl font-bold text-sand truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-mute truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Open in new tab link */}
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-white/15 text-sand hover:bg-white/5 hover:border-oak hover:text-oak transition-colors"
              title="Open Resume in new tab"
            >
              <span className="hidden sm:inline">Open in new tab</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            {/* Download button */}
            <a
              href={src}
              download="Amiel_Mirafuentes_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-oak/15 border border-oak/40 text-oak hover:bg-oak hover:text-ink transition-colors"
              title="Download Resume PDF"
            >
              <span>Download PDF</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="h-9 w-9 rounded-full bg-white/5 hover:bg-oak hover:text-ink text-sand border border-white/15 flex items-center justify-center transition-colors ml-1"
              aria-label="Close resume preview"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content - Embedded PDF Viewer */}
        <div className="flex-1 w-full h-full bg-[#1e1e1e] relative overflow-hidden flex flex-col">
          <object
            data={`${src}#toolbar=1&navpanes=0`}
            type="application/pdf"
            className="w-full flex-1"
            aria-label={`${title} Preview`}
          >
            <iframe
              src={`${src}#toolbar=1`}
              className="w-full h-full border-0"
              title={`${title} Document`}
            >
              <div className="p-8 text-center flex flex-col items-center justify-center h-full text-sand">
                <p className="text-base text-sand/90 mb-4">
                  Your device or browser may not support inline PDF preview.
                </p>
                <div className="flex gap-3">
                  <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-oak text-ink font-semibold rounded-xl hover:opacity-95 transition-opacity"
                  >
                    Open Resume
                  </a>
                  <a
                    href={src}
                    download="Amiel_Mirafuentes_Resume.pdf"
                    className="px-5 py-2.5 border border-white/20 text-sand font-semibold rounded-xl hover:border-oak hover:text-oak transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </iframe>
          </object>
        </div>
      </div>
    </div>,
    document.body
  );
}
