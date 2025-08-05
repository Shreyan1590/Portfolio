import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "./contact-form";

export function Footer() {
  return (
    <footer id="contact" className="border-t py-16 md:py-24 fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl md:text-4xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Get In Touch
                </CardTitle>
                <CardDescription className="max-w-xl mx-auto">
                Have a project in mind, a question, or just want to connect? Drop me a message below and I'll get back to you as soon as possible.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ContactForm />
            </CardContent>
            </Card>
        </div>

        <div className="text-center mt-12">
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Alternatively, you can reach me through my social channels. Let's build something amazing together.
            </p>
            <div className="flex justify-center items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild className="transition-transform hover:scale-110">
                <a href="https://github.com/Shreyan1590" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
                </a>
            </Button>
            <Button variant="outline" size="icon" asChild className="transition-transform hover:scale-110">
                <a href="https://www.linkedin.com/in/shreyan-s2596/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
                </a>
            </Button>
            <Button variant="outline" size="icon" asChild className="transition-transform hover:scale-110">
                <a href="mailto:shreyanofficial25@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
                </a>
            </Button>
            <Button variant="outline" size="icon" asChild className="transition-transform hover:scale-110">
                <a href="tel:+919894837250" aria-label="Phone">
                <Phone className="h-5 w-5" />
                </a>
            </Button>
            </div>
            <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shreyan S. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
