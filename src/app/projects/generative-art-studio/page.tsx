"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Bot, Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";
import { handleGenerateArt } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ProjectPageHeader } from "@/components/projects/project-page-header";

const formSchema = z.object({
  prompt: z.string().min(10, "Please enter a prompt with at least 10 characters."),
});

export default function GenerativeArtStudioPage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const project = {
    title: "Generative Art Studio",
    image: "https://placehold.co/1200x600.png",
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
     <ProjectPageHeader title={project.title} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
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
          
          <div className="relative h-96 lg:h-full w-full rounded-lg overflow-hidden group shadow-2xl shadow-primary/20 bg-black/20 flex items-center justify-center border-2 border-primary/20">
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
        </div>
      </main>
    </div>
  );
}
