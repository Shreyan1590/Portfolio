"use client";

import { Button } from "@/components/ui/button";
import { Home, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProjectPageHeaderProps {
  title: string;
}

export function ProjectPageHeader({ title }: ProjectPageHeaderProps) {
  const pathname = usePathname();
  const basePath = pathname.split('/').slice(0, 3).join('/');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-auto flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span className="font-bold sm:inline-block">
              Back to Home
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
           <h1 className="text-xl font-headline font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {title}
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-2">
             <Button variant={pathname === basePath ? "secondary" : "ghost"} size="sm" asChild>
                <Link href={basePath}>
                    Live Demo
                </Link>
             </Button>
             <Button variant={pathname.endsWith("/about") ? "secondary" : "ghost"} size="sm" asChild>
                <Link href={`${basePath}/about`}>
                    <Info className="mr-2 h-4 w-4" />
                    About
                </Link>
             </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
