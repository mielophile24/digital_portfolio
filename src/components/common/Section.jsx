import React, { useEffect, useRef } from 'react';

export default function Section({ id, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      el && el.classList.add('on');
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('on');
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} className="px-5 sm:px-8 py-16 sm:py-24">
      <div ref={ref} className="rv max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
