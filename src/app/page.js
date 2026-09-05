'use client';

import { MotionConfig } from 'framer-motion';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Projects from './components/ProjectsEditorial';
import Navbar from './components/Navbar';
import { ThemeProvider } from './components/ThemeProvider';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';

export default function Home() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <AboutMe />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </ThemeProvider>
  );
}
