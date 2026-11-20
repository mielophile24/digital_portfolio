import React from 'react';
import Section from './common/Section';
import Heading from './common/Heading';

export default function About() {
  return (
    <Section id="about">
      <Heading>About</Heading>
      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16">
        <div className="space-y-4 text-base sm:text-lg leading-relaxed text-sand/90">
          <p>
            Hello! I am a passionate and dedicated student with a strong interest in web development and database management. I enjoy creating websites and systems that provide useful solutions to real-world problems.
          </p>
          <p>
            Through my academic projects and personal experiences, I continue to improve my technical skills, problem-solving abilities, and creativity. I am always willing to learn new technologies, explore different ideas, and take on challenges that help me grow as a developer.
          </p>
          <p>
            My goal is to build reliable, user-friendly, and meaningful digital solutions while continuously developing my knowledge and preparing for future opportunities in the technology industry.
          </p>
        </div>
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
