
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import React, { useState, useEffect } from 'react';

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -z-10 h-[40rem] w-[40rem] animate-gradient-spin rounded-full bg-[conic-gradient(from_0deg,hsl(var(--primary)),hsl(var(--accent))_50%,hsl(var(--primary))_100%)] opacity-20 blur-3xl" />
      </div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary"
        >
          Shreyan S.
        </h1>
        <p 
          className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground"
        >
          Innovative Full-Stack Engineer specializing in scalable web applications and AI-driven solutions. I transform complex problems into elegant, high-performance digital experiences.
        </p>
        <div 
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105">
            <a href="#projects">
              Explore My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="transition-transform hover:scale-105">
            <a href="/resume.pdf" download>
              Download CV
              <Download className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
