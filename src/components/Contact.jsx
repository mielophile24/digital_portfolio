import React from 'react';
import Section from './common/Section';
import { CONTACT_LINKS } from '../data/portfolioData';

export default function Contact() {
  return (
    <Section id="contact">
      <div className="wood sheen rounded-3xl p-8 sm:p-14 text-ink">
        <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-5xl md:text-6xl leading-tight max-w-2xl">
          Let’s build something together.
        </h2>
        <p className="mt-4 max-w-lg font-medium">Purok 3 Busay, Daraga, Albay, Philippines</p>
        <div className="mt-10 grid sm:grid-cols-2 gap-3">
          {CONTACT_LINKS.map(({ label, value, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : '_self'}
              rel={external ? 'noopener noreferrer' : undefined}
              className="rounded-xl bg-ink text-sand px-5 py-4 hover:bg-coal transition-colors min-w-0"
            >
              <span className="block text-xs text-mute">{label}</span>
              <span className="block mt-0.5 font-medium [overflow-wrap:anywhere]">{value}</span>
            </a>
          ))}
        </div>
      </div>
      <p className="text-center text-mute text-sm mt-12">© 2026 Amiel M. Mirafuentes</p>
    </Section>
  );
}
