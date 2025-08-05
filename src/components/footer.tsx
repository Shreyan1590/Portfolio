import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer id="contact" className="border-t py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-4">
          Get In Touch
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out. Let's build something amazing together.
        </p>
        <div className="flex justify-center items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com/Shreyan1590" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://www.linkedin.com/in/shreyan-s2596/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="mailto:shreyanofficial25@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="tel:+919894837250" aria-label="Phone">
              <Phone className="h-5 w-5" />
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Shreyan S. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
