"use client";

import { useState } from "react";
import { Code, User, Briefcase, Bot, Mail, Award, GraduationCap, Star, BookOpen, GitFork, Lightbulb, Rocket, Trophy, Rss, Menu, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About", icon: User },
  { href: "#skills", label: "Skills", icon: Code },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: Bot },
  { href: "#case-studies", label: "Case Studies", icon: BookOpen },
  { href: "#certifications", label: "Certs", icon: Award },
  { href: "#education", label: "Education", icon: GraduationCap },
  { href: "#research", label: "Research", icon: FileText },
  { href: "#achievements", label: "Awards", icon: Trophy },
  { href: "#open-source", label: "OSS", icon: GitFork },
  { href: "#testimonials", label: "Testimonials", icon: Star },
  { href: "#blog", label: "Blog", icon: Rss },
  { href: "#tech-philosophy", label: "Philosophy", icon: Lightbulb },
  { href: "#services", label: "Services", icon: Rocket },
  { href: "#ai-tool", label: "AI Tools", icon: Bot },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Header() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

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
        <div className="hidden md:flex flex-1 items-center justify-end">
          <nav className="hidden md:flex gap-4 lg:gap-6 overflow-x-auto">
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
         <div className="flex md:hidden flex-1 items-center justify-end">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
                <SheetHeader className="flex flex-row justify-between items-center">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                     <a href="#" className="flex items-center space-x-2">
                        <Bot className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline text-lg">
                        Shreyan.AI
                        </span>
                    </a>
                    <SheetClose asChild>
                       <Button variant="ghost" size="icon">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close Menu</span>
                        </Button>
                    </SheetClose>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                        <Link
                            href={link.href}
                            className="flex items-center gap-2 text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                            onClick={() => setIsSheetOpen(false)}
                        >
                            <link.icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                    </SheetClose>
                ))}
                </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
