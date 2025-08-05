
"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { SkillsSection } from "@/components/sections/skills";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { CoverLetterSection } from "@/components/sections/cover-letter";
import { ServicesSection } from "@/components/sections/services";
import { TechPhilosophySection } from "@/components/sections/tech-philosophy";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { OpenSourceSection } from "@/components/sections/open-source";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { BlogSection } from "@/components/sections/blog";
import { useEffect } from "react";


export default function Home() {
    useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fade-in-up");
              entry.target.classList.remove("opacity-0");
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll("section").forEach((section) => {
        section.classList.add("opacity-0");
        observer.observe(section);
      });

      return () => observer.disconnect();
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="relative z-10 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AboutSection />
          </div>
          <ServicesSection />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
          </div>
          <CaseStudiesSection />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <OpenSourceSection />
            <TechPhilosophySection />
          </div>
          <TestimonialsSection />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <BlogSection />
            <CoverLetterSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
