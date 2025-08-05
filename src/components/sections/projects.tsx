import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projectsData = [
  {
    title: "QuantumLeap E-commerce",
    description: "A full-featured e-commerce platform built with a modern stack, focusing on performance and user experience.",
    image: "https://placehold.co/600x400.png",
    stack: ["Next.js", "React", "Stripe", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "#",
    repoUrl: "#",
    aiHint: "online store"
  },
  {
    title: "CodeGenius AI",
    description: "An AI-powered tool that generates code snippets from natural language descriptions, boosting developer productivity.",
    image: "https://placehold.co/600x400.png",
    stack: ["React", "OpenAI API", "Node.js", "Express"],
    liveUrl: "#",
    repoUrl: "#",
    aiHint: "abstract code"
  },
  {
    title: "DataViz Dashboard",
    description: "An interactive dashboard for visualizing complex datasets, with dynamic charts and filtering capabilities.",
    image: "https://placehold.co/600x400.png",
    stack: ["React", "D3.js", "Python", "Flask"],
    liveUrl: "#",
    repoUrl: "#",
    aiHint: "data dashboard"
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <Card key={project.title} className="flex flex-col overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={project.aiHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-secondary/50 text-accent">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
