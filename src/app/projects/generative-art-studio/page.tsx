"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Github, ExternalLink, Bot, Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { handleGenerateArt } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  prompt: z.string().min(10, "Please enter a prompt with at least 10 characters."),
});

export default function GenerativeArtStudioPage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const project = {
    title: "Generative Art Studio",
    description: "A creative platform where users can generate unique visual art from text prompts. It utilizes advanced diffusion models and provides tools for artists to refine and mint their creations as NFTs.",
    image: "https://placehold.co/1200x600.png",
    stack: ["Next.js", "Genkit", "Google Cloud", "Stripe", "Solidity"],
    liveUrl: "/projects/generative-art-studio",
    repoUrl: "#",
    aiHint: "generative art gallery"
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedImage(null);
    const response = await handleGenerateArt(values);

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: response.error,
      });
    } else if (response.imageUrl) {
      setGeneratedImage(response.imageUrl);
      toast({
        title: "Success!",
        description: "Your artwork has been generated.",
      });
    }
    setIsLoading(false);
  }

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
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Bot /> AI Art Generator
                  </CardTitle>
                  <CardDescription>
                    Enter a text prompt below and let the AI create a unique image for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="e.g., 'A vibrant synthwave cityscape at sunset'" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Image
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <div className="relative h-96 w-full rounded-lg overflow-hidden group shadow-2xl shadow-primary/20 mb-8 bg-black/20 flex items-center justify-center">
                {isLoading && (
                   <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Generating your masterpiece...</p>
                  </div>
                )}
                {!isLoading && !generatedImage && (
                   <Image
                      src={project.image}
                      alt="Placeholder for generated art"
                      layout="fill"
                      objectFit="cover"
                      className="transition-opacity"
                      data-ai-hint={project.aiHint}
                    />
                )}
                {generatedImage && (
                  <Image
                    src={generatedImage}
                    alt="Generated AI Art"
                    layout="fill"
                    objectFit="contain"
                    className="transition-opacity duration-500"
                  />
                )}
              </div>

              <div className="max-w-3xl mx-auto mt-12">
                <h3 className="text-3xl font-headline font-bold text-center mb-8">About This Project</h3>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
