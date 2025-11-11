'use client';

import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { ReactLenis, useLenis } from 'lenis/react';

export default function Home() { 
  const lenis = useLenis((lenis) => {
    // called every scroll
    console.log(lenis);
  });

  return (
    <>
      <ReactLenis root />
      <div suppressHydrationWarning>
        <HeroSection />
        <AboutSection />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <ContactSection />
      </div>
    </>
  );
};
