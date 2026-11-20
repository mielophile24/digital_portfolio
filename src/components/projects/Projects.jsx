import React, { useState, useEffect, useRef } from 'react';
import Section from '../common/Section';
import Heading from '../common/Heading';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../../data/projects';

const chev = (d) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const touchStart = useRef(null);

  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth >= 1024) setVisible(3);
      else if (window.innerWidth >= 640) setVisible(2);
      else setVisible(1);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, PROJECTS.length - visible);
  const safeIndex = Math.min(index, maxIndex);

  const go = (d) => {
    setIndex((prev) => Math.max(0, Math.min(prev + d, maxIndex)));
  };

  const getTranslateStyle = () => {
    if (visible === 3) {
      return `calc(-1 * ${safeIndex} * ((100% + 1.5rem) / 3))`;
    }
    if (visible === 2) {
      return `calc(-1 * ${safeIndex} * ((100% + 1.5rem) / 2))`;
    }
    return `calc(-1 * ${safeIndex} * (100% + 1.5rem))`;
  };

  const arrow = 'h-10 w-10 rounded-full border border-white/20 hover:border-oak hover:text-oak transition-all flex items-center justify-center';

  return (
    <Section id="projects">
      <div className="flex items-end justify-between gap-4">
        <Heading>Projects</Heading>
        <div className="flex items-center gap-3 mb-14">
          <button
            className={`${arrow} ${safeIndex === 0 ? 'opacity-30 cursor-not-allowed hover:border-white/20 hover:text-sand' : ''}`}
            disabled={safeIndex === 0}
            aria-label="Previous projects"
            onClick={() => go(-1)}
          >
            {chev('M15 5l-7 7 7 7')}
          </button>
          <button
            className={`${arrow} ${safeIndex === maxIndex ? 'opacity-30 cursor-not-allowed hover:border-white/20 hover:text-sand' : ''}`}
            disabled={safeIndex === maxIndex}
            aria-label="Next projects"
            onClick={() => go(1)}
          >
            {chev('M9 5l7 7-7 7')}
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden pt-3 pb-4"
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;
          const diff = e.changedTouches[0].clientX - touchStart.current;
          touchStart.current = null;
          if (Math.abs(diff) > 40) {
            go(diff < 0 ? 1 : -1);
          }
        }}
      >
        <div
          className="flex gap-6 transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateX(${getTranslateStyle()})` }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Slide indicator dots moved below the project cards */}
      {maxIndex > 0 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === safeIndex ? 'w-7 bg-oak shadow-sm shadow-oak/25' : 'w-2 bg-sand/30 hover:bg-sand/60'
              }`}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
