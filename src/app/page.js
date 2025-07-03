'use client'

import { useState } from 'react'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Projects from './components/Projects'
import Navbar from './components/Navbar'
import { ThemeProvider } from './components/ThemeProvider'

export default function Home() {
  return (
    <ThemeProvider>
      <Navbar />
      <Hero />
      <AboutMe />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}