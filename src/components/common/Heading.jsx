import React from 'react';

export default function Heading({ children, sub }) {
  return (
    <div className="mb-10 sm:mb-14">
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">{children}</h2>
      <div className="line h-px w-24 sm:w-40 mt-4"></div>
      {sub && <p className="text-mute mt-4 max-w-xl">{sub}</p>}
    </div>
  );
}
