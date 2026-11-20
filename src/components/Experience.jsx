import React from 'react';
import Section from './common/Section';
import Heading from './common/Heading';

export default function Experience({ onOpenResume }) {
  const arrow = (
    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </span>
  );

  return (
    <Section id="experience">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
        <Heading sub="Hands-on industry experience and technical responsibilities.">
          Work & Internship Experience
        </Heading>
        {onOpenResume && (
          <button
            type="button"
            onClick={onOpenResume}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-oak hover:text-sand transition-colors self-start sm:self-auto mb-10 sm:mb-14 cursor-pointer"
          >
            <span>View complete resume</span>
            {arrow}
          </button>
        )}
      </div>

      <div className="lift rounded-2xl bg-coal border border-white/5 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-sand">
                OJT Trainee
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-oak/15 text-oak border border-oak/30">
                Internship
              </span>
            </div>
            <p className="text-oak font-medium text-base mt-1">
              Department of Education – Regional Office V
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs sm:text-sm text-mute font-mono">Feb. – May 2027</span>
            <p className="text-xs text-mute/80 mt-0.5">Regional Office</p>
          </div>
        </div>

        <ul className="space-y-3.5 text-sand/85 text-sm sm:text-base">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-oak mt-2 shrink-0" />
            <span>
              Maintained the office's developed monitoring system by checking its features and fixing reported issues to keep a centralized system working properly.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-oak mt-2 shrink-0" />
            <span>
              Assisted in updating and managing system data to support accurate and organized information across regional databases.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-oak mt-2 shrink-0" />
            <span>
              Performed various technical tasks, including basic troubleshooting and computer-related support, to help with daily office operations.
            </span>
          </li>
        </ul>
      </div>
    </Section>
  );
}
