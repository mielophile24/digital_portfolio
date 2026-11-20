import React from 'react';
import Section from './common/Section';
import Heading from './common/Heading';
import { TECH_STACK, SOFT_SKILLS } from '../data/portfolioData';

export default function Skills() {
  return (
    <Section id="skills">
      <Heading sub="The languages, frameworks, and tools I work with.">Tech stack</Heading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {TECH_STACK.map(([g, items]) => (
          <div key={g}>
            <h3 className="font-display font-bold text-lg text-oak mb-4">{g}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full border border-white/15 text-sm hover:border-oak hover:bg-walnut/50 hover:-translate-y-0.5 transition-all">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14">
        <h3 className="font-display font-bold text-lg text-oak mb-4">Soft skills</h3>
        <div className="flex flex-wrap gap-2">
          {SOFT_SKILLS.map((i) => (
            <span key={i} className="px-3.5 py-1.5 rounded-full bg-walnut/40 text-sand text-sm">
              {i}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
