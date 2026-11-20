import React, { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/projects/Projects';
import GithubContributions from './components/GithubContributions';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import ResumeModal from './components/common/ResumeModal';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleOpenResume = () => setResumeOpen(true);
  const handleCloseResume = () => setResumeOpen(false);

  return (
    <>
      <Nav onOpenResume={handleOpenResume} />
      <main>
        <Hero onOpenResume={handleOpenResume} />
        <Marquee />
        <About />
        <Experience onOpenResume={handleOpenResume} />
        <Projects />
        <GithubContributions />
        <Skills />
        <Education />
        <Contact />
      </main>

      <ResumeModal isOpen={resumeOpen} onClose={handleCloseResume} src="/resume.pdf" />
    </>
  );
}
