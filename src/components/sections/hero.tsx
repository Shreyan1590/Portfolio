"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import React from 'react';

const StarryBackground = () => {
    const starCount = 100;
    
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
             <style jsx>{`
                .star {
                    position: absolute;
                    background-color: hsl(var(--primary) / 0.7);
                    border-radius: 50%;
                    animation: move linear infinite;
                }
                .star.star-1 { width: 1px; height: 1px; }
                .star.star-2 { width: 2px; height: 2px; }
                .star.star-3 { width: 3px; height: 3px; }

                @keyframes move {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(-100px); opacity: 0; }
                }
            `}</style>
             {Array.from({ length: starCount }).map((_, i) => {
                const size = Math.ceil(Math.random() * 3);
                const style = {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 8}s`,
                    animationDuration: `${4 + Math.random() * 6}s`,
                };
                return <div key={i} className={`star star-${size}`} style={style}></div>;
            })}
        </div>
    );
};

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-background via-[#05020b] to-[#1a020d]">
      <StarryBackground />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
          Shreyan S.
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Innovative Full-Stack Engineer specializing in scalable web applications and AI-driven solutions. I transform complex problems into elegant, high-performance digital experiences.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
            <a href="#projects">
              Explore My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
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
