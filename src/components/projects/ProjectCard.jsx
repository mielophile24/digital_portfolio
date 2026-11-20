import React from 'react';
import ProjectImages from './ProjectImages';

const chev = (d) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function ProjectCard({ project, index }) {
  return (
    <article className="shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] lift flex flex-col rounded-2xl bg-coal border border-white/5 overflow-hidden">
      <div className="wood h-1.5"></div>
      <ProjectImages
        k={'project' + index}
        images={project.images}
        label="Project screenshot"
        className="aspect-video bg-ink border-b border-white/5"
      />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-mute">
          <span className="text-oak font-medium">{project.kind}</span>
          {project.role && <span>{project.role}</span>}
          {project.date && <span>{project.date}</span>}
        </div>
        <h3 className="font-display text-xl font-bold mt-3 leading-snug">{project.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-sand/85">{project.about}</p>
        <div className="mt-auto pt-6 flex justify-end">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-oak hover:text-sand transition-colors"
            >
              Visit website <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{chev('M7 17L17 7M9 7h8v8')}</span>
            </a>
          ) : (
            <span aria-disabled="true" className="inline-flex items-center gap-1.5 text-sm text-mute cursor-not-allowed">
              Link coming soon {chev('M7 17L17 7M9 7h8v8')}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
