"use client";

import { useState } from "react";
import { Code, User, Briefcase, Bot, Mail, Menu, X, FileText, Blocks, Handshake, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About", icon: User },
  { href: "#services", label: "Services", icon: Blocks },
  { href: "#skills", label: "Skills", icon: Code },
  { href: "#experience", label: "Experience", icon: Briefcase },
  { href: "#projects", label: "Projects", icon: Bot },
  { href: "#testimonials", label: "Testimonials", icon: Heart },
  { href: "#blog", label: "Blog", icon: MessageSquare },
  { href: "#ai-tool", label: "AI Tools", icon: FileText },
  { href: "#contact", label: "Contact", icon: Mail },
];

const CustomLogo = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-primary"
    >
      <path d="M10 4C5.02944 4 1 8.02944 1 13C1 17.9706 5.02944 22 10 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 20C18.9706 20 23 15.9706 23 11C23 6.02944 18.9706 2 14 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export function Header() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a href="#" className="mr-6 flex items-center space-x-2">
            <CustomLogo />
            <span className="font-bold font-headline text-lg sm:inline-block">
              Shreyan's Portfolio
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
                        <CustomLogo />
                        <span className="font-bold font-headline text-lg">
                        Shreyan's Portfolio
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
