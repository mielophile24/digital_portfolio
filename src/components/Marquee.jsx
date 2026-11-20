import React from 'react';
import { TECH_STACK } from '../data/portfolioData';

export default function Marquee() {
  const items = TECH_STACK.flatMap((g) => g[1]);
  const row = [...items, ...items];

  return (
    <div className="border-y border-white/10 bg-coal py-4 overflow-hidden" aria-hidden="true">
      <div className="marq flex font-display font-bold text-xl sm:text-2xl text-sand/80">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 pr-10 whitespace-nowrap">
            {t}
            <span className="h-2 w-2 rounded-full bg-oak"></span>
          </span>
        ))}
      </div>
    </div>
  );
}
