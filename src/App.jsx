import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Projects from './components/projects/Projects';
import GithubContributions from './components/GithubContributions';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <GithubContributions />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
