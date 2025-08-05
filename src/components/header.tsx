"use client";

import { Code, User, Briefcase, Bot, Mail, Award, GraduationCap, Star, BookOpen, GitFork, Lightbulb, Rocket, Trophy, Rss } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Code },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: Bot },
  { href: "#case-studies", label: "Case Studies", icon: BookOpen },
  { href: "#certifications", label: "Certs", icon: Award },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#achievements", label: "Awards", icon: Trophy },
  { href: "#open-source", label: "OSS", icon: GitFork },
  { href: "#testimonials", label: "Testimonials", icon: Star },
  { href: "#blog", label: "Blog", icon: Rss },
  { href: "#tech-philosophy", label: "Philosophy", icon: Lightbulb },
  { href: "#services", label: "Services", icon: Rocket },
  { href: "#ai-tool", label: "AI Tool", icon: Bot },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a href="#" className="mr-6 flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg sm:inline-block">
              Shreyan.AI
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 overflow-x-auto">
          <nav className="flex gap-4 md:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors text-foreground/70 hover:text-primary text-sm font-medium whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
