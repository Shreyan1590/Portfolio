import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { ProjectPageHeader } from "@/components/projects/project-page-header";

export default function AboutAiFitnessCoachPage() {
    const project = {
        title: "AI Health & Fitness Coach",
        description: "A personalized health coach app that uses AI to generate custom workout plans and meal recommendations. It leverages computer vision to analyze user form during exercises and provides real-time feedback.",
        stack: ["Genkit", "React Native", "Firebase", "Computer Vision", "TensorFlow.js"],
        repoUrl: "#",
    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
        <ProjectPageHeader title={project.title} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-headline font-bold text-center mb-8">About This Project</h2>
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
                        Live Demo
                    </Button>
                </div>
            </div>
        </main>
    </div>
    );
}
