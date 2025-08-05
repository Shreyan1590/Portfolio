import { ProjectPageHeader } from "@/components/projects/project-page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool } from "lucide-react";
import Image from "next/image";

export default function CollaborativeWhiteboardPage() {
  const project = {
    title: "Real-time Collaborative Whiteboard",
    image: "https://placehold.co/1200x800.png",
    aiHint: "digital whiteboard collaboration"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
     <ProjectPageHeader title={project.title} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <PenTool /> Whiteboard Demo
            </CardTitle>
            <CardDescription>
              This is a visual demo of the collaborative whiteboard. In a real application, multiple users could draw on this canvas simultaneously.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="relative h-[60vh] w-full rounded-lg overflow-hidden group shadow-2xl shadow-primary/20 mb-8 border-2 border-primary/20 bg-white">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-500 p-4"
                data-ai-hint={project.aiHint}
              />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
