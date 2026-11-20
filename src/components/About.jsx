import React from 'react';
import Section from './common/Section';
import Heading from './common/Heading';

export default function About() {
  return (
    <Section id="about">
      <Heading>About</Heading>
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16">
        <p className="text-lg sm:text-xl leading-relaxed text-sand/90">
          I’m a motivated and detail-oriented fresh graduate of Information Technology seeking an entry-level position where I can apply my technical knowledge, develop my skills, gain practical experience, and contribute to the success of the organization.
        </p>
        <dl className="space-y-5 text-sm">
          {[
            ['Degree', 'BS Information Technology'],
            ['School', 'STI College Legazpi'],
            ['Location', 'Daraga, Albay, Philippines']
          ].map(([k, v]) => (
            <div key={k} className="border-l border-oak/40 pl-4">
              <dt className="text-mute">{k}</dt>
              <dd className="mt-0.5 text-sand">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
