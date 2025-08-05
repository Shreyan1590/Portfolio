import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center bg-grid-primary/10">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Shreyan S.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          A passionate Software Engineer crafting elegant and efficient solutions for the web.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="#projects">
              View My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
