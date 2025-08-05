import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

const projectsData = [
  {
    title: "AI-Powered Code Assistant",
    description: "A VS Code extension that provides intelligent code suggestions, bug detection, and documentation generation using fine-tuned models.",
    image: "https://placehold.co/600x400.png",
    stack: ["TypeScript", "Genkit", "Fine-tuning", "VS Code API"],
    liveUrl: "/projects/ai-code-assistant",
    repoUrl: "#",
    aiHint: "code editor AI"
  },
  {
    title: "QuantumLeap E-commerce",
    description: "A full-featured e-commerce platform built with a modern stack, focusing on performance, scalability, and user experience.",
    image: "https://placehold.co/600x400.png",
    stack: ["Next.js", "GraphQL", "Stripe", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "/projects/quantumleap-ecommerce",
    repoUrl: "#",
    aiHint: "online store shopping"
  },
  {
    title: "Real-time Collaborative Whiteboard",
    description: "A web-based whiteboard application that allows multiple users to draw and brainstorm together in real-time using WebSockets.",
    image: "https://placehold.co/600x400.png",
    stack: ["React", "Node.js", "Socket.IO", "Canvas API"],
    liveUrl: "/projects/collaborative-whiteboard",
    repoUrl: "#",
    aiHint: "collaborative drawing"
  },
  {
    title: "DataViz Dashboard",
    description: "An interactive dashboard for visualizing complex datasets, with dynamic charts and filtering capabilities for business intelligence.",
    image: "https://placehold.co/600x400.png",
    stack: ["React", "D3.js", "Python", "Flask"],
    liveUrl: "/projects/dataviz-dashboard",
    repoUrl: "#",
    aiHint: "charts graphs"
  },
  {
    title: "AI Health & Fitness Coach",
    description: "A personalized health coach app that uses AI to generate custom workout plans and meal recommendations based on user goals and biometrics.",
    image: "https://placehold.co/600x400.png",
    stack: ["Genkit", "React Native", "Firebase", "Computer Vision"],
    liveUrl: "/projects/ai-fitness-coach",
    repoUrl: "#",
    aiHint: "fitness app tracker"
  },
  {
    title: "Generative Art Studio",
    description: "A creative platform where users can generate unique visual art from text prompts, leveraging advanced diffusion models.",
    image: "https://placehold.co/600x400.png",
    stack: ["Next.js", "Genkit", "Google Cloud", "Stripe"],
    liveUrl: "/projects/generative-art-studio",
    repoUrl: "#",
    aiHint: "abstract digital art"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <Card key={project.title} className="flex flex-col overflow-hidden group bg-card/50 border-border/50 backdrop-blur-sm">
            <div className="relative h-48 w-full overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={project.aiHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl text-primary">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 bg-secondary/30 p-4">
              <Button variant="ghost" size="sm" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={project.liveUrl}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
