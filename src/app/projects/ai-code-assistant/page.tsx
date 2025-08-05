"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Github, ExternalLink, Bot, Sparkles, Loader2, Wand2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { handleAnalyzeCode } from "@/app/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  code: z.string().min(20, "Please enter at least 20 characters of code."),
  language: z.string().min(1, "Please select a language."),
});

export default function AiCodeAssistantPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const project = {
    title: "AI-Powered Code Assistant",
    description: "A VS Code extension that provides intelligent code suggestions, bug detection, and documentation generation using fine-tuned models. It integrates seamlessly into the developer workflow, boosting productivity and code quality.",
    stack: ["TypeScript", "Genkit", "Fine-tuning", "VS Code API", "Next.js"],
    repoUrl: "#",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      language: "javascript",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysis(null);
    const response = await handleAnalyzeCode(values);

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: response.error,
      });
    } else if (response.analysis) {
      setAnalysis(response.analysis);
      toast({
        title: "Success!",
        description: "Your code has been analyzed.",
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
                    <Bot /> AI Code Analyzer
                  </CardTitle>
                  <CardDescription>
                    Paste a code snippet below, select the language, and the AI will provide suggestions, detect bugs, and generate documentation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                       <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="javascript">JavaScript</SelectItem>
                                <SelectItem value="python">Python</SelectItem>
                                <SelectItem value="typescript">TypeScript</SelectItem>
                                <SelectItem value="html">HTML</SelectItem>
                                <SelectItem value="css">CSS</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code Snippet</FormLabel>
                            <FormControl>
                              <Textarea placeholder="function helloWorld() { console.log('Hello, World!'); }" {...field} className="min-h-[200px] font-code text-sm"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Analyze Code
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {(isLoading || analysis) && (
                 <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                      <Sparkles /> Analysis Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="min-h-[200px] relative">
                     {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                            <div className="text-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                                <p className="text-muted-foreground">Analyzing your code...</p>
                            </div>
                        </div>
                    )}
                    {analysis && (
                        <pre className="whitespace-pre-wrap font-code text-sm bg-secondary/30 p-4 rounded-md">{analysis}</pre>
                    )}
                  </CardContent>
                </Card>
              )}

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
