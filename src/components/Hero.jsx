import React from 'react';
import ImageSlot from './common/ImageSlot';
import profileImg from '../assets/profile.jpg';

export default function Hero({ onOpenResume }) {
  return (
    <section id="top" className="px-5 sm:px-8 pt-28 sm:pt-32 pb-16 sm:pb-24 min-h-[92svh] flex items-center">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-center">
        <div className="text-center lg:text-left">
          <p className="hero-in text-oak font-medium mb-5">Information Technology · STI College Legazpi</p>
          <h1 className="hero-in font-display font-extrabold tracking-tight leading-[0.95] text-4xl min-[400px]:text-5xl sm:text-7xl xl:text-[5.5rem]">
            <span className="grad-text">Amiel M.<br />Mirafuentes</span>
          </h1>
          <div className="hero-in">
            <p className="mt-7 text-mute text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Building web systems that keep information organized, from the database to the screen. Currently open to entry-level roles.
            </p>
            <div className="mt-9 flex flex-wrap justify-center lg:justify-start gap-3">
              <a href="#projects" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#f0b46e] to-oak text-ink font-semibold hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(240,180,110,.6)] transition-all">
                View projects
              </a>
              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="px-6 py-3 rounded-full border border-oak/60 text-oak hover:bg-oak hover:text-ink transition-all font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>Resume</span>
                </button>
              )}
              <a href="#contact" className="px-6 py-3 rounded-full border border-white/20 hover:border-oak hover:text-oak transition-colors">
                Get in touch
              </a>
            </div>
          </div>
        </div>
        <div className="hero-in relative mx-auto lg:mr-0 lg:ml-auto w-full max-w-[13.5rem] sm:max-w-[16rem] lg:max-w-[19rem] xl:max-w-[22rem]">
          <ImageSlot
            k="photo"
            src={profileImg}
            label="Amiel M. Mirafuentes"
            className="wood sheen floaty rounded-t-[999px] rounded-b-2xl aspect-[3/4] shadow-[0_30px_80px_-20px_rgba(217,153,90,.45)]"
          >
            <span className="font-display font-extrabold text-7xl sm:text-8xl text-ink/90 tracking-tighter">AM</span>
          </ImageSlot>
          <div className="absolute -inset-3 rounded-t-[999px] rounded-b-3xl border border-oak/40 -z-10"></div>
          <div className="glow absolute -inset-6 sm:-inset-12 -z-20 rounded-full bg-[radial-gradient(circle,rgba(232,140,60,.32),transparent_65%)]"></div>
        </div>
      </div>
    </section>
  );
}
