"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Github, ExternalLink, Bot, Dumbbell, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateFitnessPlan } from "@/app/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  goal: z.string().min(1, "Please select a fitness goal."),
  level: z.string().min(1, "Please select your fitness level."),
  duration: z.coerce.number().min(15, "Duration must be at least 15 minutes.").max(120, "Duration cannot exceed 120 minutes."),
});

export default function AiFitnessCoachPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const project = {
    title: "AI Health & Fitness Coach",
    description: "A personalized health coach app that uses AI to generate custom workout plans and meal recommendations. It leverages computer vision to analyze user form during exercises and provides real-time feedback.",
    stack: ["Genkit", "React Native", "Firebase", "Computer Vision", "TensorFlow.js"],
    repoUrl: "#",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: "weight-loss",
      level: "intermediate",
      duration: 60,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPlan(null);
    const response = await handleGenerateFitnessPlan(values);

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: response.error,
      });
    } else if (response.plan) {
      setPlan(response.plan);
      toast({
        title: "Success!",
        description: "Your personalized fitness plan is ready.",
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
                    <Bot /> AI Fitness Planner
                  </CardTitle>
                  <CardDescription>
                    Tell us your goals and the AI will generate a custom workout and meal plan for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Goal</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                                <SelectItem value="cardio-endurance">Cardio Endurance</SelectItem>
                                <SelectItem value="flexibility">Flexibility</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fitness Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                               <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Workout Duration (min)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="60" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={isLoading} className="w-full md:col-span-3">
                        {isLoading ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Plan...</>
                        ) : (
                          <><Dumbbell className="mr-2 h-4 w-4" /> Generate Plan</>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {(isLoading || plan) && (
                 <Card className="mt-8">
                  <CardHeader><CardTitle className="flex items-center gap-2 font-headline"><Sparkles /> Your Custom Fitness Plan</CardTitle></CardHeader>
                  <CardContent className="min-h-[300px] relative">
                     {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                           <div className="text-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                            <p className="text-muted-foreground">Building your plan...</p>
                          </div>
                        </div>
                    )}
                    {plan && (
                       <pre className="whitespace-pre-wrap font-body text-sm bg-secondary/30 p-4 rounded-md">{plan}</pre>
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
