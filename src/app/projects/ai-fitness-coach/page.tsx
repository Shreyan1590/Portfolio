"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Bot, Dumbbell, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleGenerateFitnessPlan } from "@/app/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectPageHeader } from "@/components/projects/project-page-header";

const formSchema = z.object({
  goal: z.string().min(1, "Please select a fitness goal."),
  level: z.string().min(1, "Please select your fitness level."),
  duration: z.coerce.number().min(15, "Duration must be at least 15 minutes.").max(120, "Duration cannot exceed 120 minutes."),
});

export default function AiFitnessCoachPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
      <ProjectPageHeader title="AI Health & Fitness Coach" />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="mb-8 bg-card/50 border-border/50 backdrop-blur-sm">
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
            <Card className="mt-8 bg-card/50 border-border/50 backdrop-blur-sm">
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
      </main>
    </div>
  );
}
