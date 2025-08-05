import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function GenerativeArtStudioPage() {
  const project = {
    title: "Generative Art Studio",
    description: "A creative platform where users can generate unique visual art from text prompts. It utilizes advanced diffusion models and provides tools for artists to refine and mint their creations as NFTs.",
    image: "https://placehold.co/1200x600.png",
    stack: ["Next.js", "Genkit", "Google Cloud", "Stripe", "Solidity"],
    liveUrl: "/projects/generative-art-studio",
    repoUrl: "#",
    aiHint: "generative art gallery"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a] py-12 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Button variant="link" asChild className="mb-4">
              <Link href="/#projects">← Back to Projects</Link>
            </Button>
            <CardTitle className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {project.title}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Live Demo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 w-full rounded-lg overflow-hidden group shadow-2xl shadow-primary/20 mb-8">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={project.aiHint}
              />
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
              
              <div className="mb-8">
                <h3 className="text-2xl font-headline font-semibold text-primary mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-base px-4 py-2">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                 <Button variant="ghost" size="lg" asChild>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </a>
                </Button>
                <Button size="lg" disabled>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  You are viewing the demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
