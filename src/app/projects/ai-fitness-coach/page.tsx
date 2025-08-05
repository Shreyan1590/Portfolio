"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Bot, Dumbbell, Loader2, Sparkles, Flame, Apple, Fish } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectPageHeader } from "@/components/projects/project-page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTypewriter } from "@/hooks/use-typewriter";

const formSchema = z.object({
  goal: z.string().min(1, "Please select a fitness goal."),
  level: z.string().min(1, "Please select your fitness level."),
  duration: z.coerce.number().min(15, "Duration must be at least 15 minutes.").max(120, "Duration cannot exceed 120 minutes."),
});

type FormValues = z.infer<typeof formSchema>;

interface WorkoutExercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
}

interface Plan {
  workout: WorkoutExercise[];
  cardio?: string;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
}

const hardcodedPlans: Record<string, Record<string, Plan>> = {
  "weight-loss": {
    beginner: {
      workout: [
        { name: "Bodyweight Squats", sets: "3", reps: "15", rest: "60s" },
        { name: "Push-ups (on knees)", sets: "3", reps: "10", rest: "60s" },
        { name: "Plank", sets: "3", reps: "30s hold", rest: "60s" },
        { name: "Jumping Jacks", sets: "3", reps: "30s", rest: "60s" },
      ],
      cardio: "20 minutes of brisk walking",
      meals: {
        breakfast: "Oatmeal with berries and a sprinkle of nuts.",
        lunch: "Grilled chicken salad with mixed greens and a light vinaigrette.",
        dinner: "Baked salmon with steamed vegetables and quinoa.",
      },
    },
    intermediate: {
      workout: [
        { name: "Goblet Squats", sets: "3", reps: "12", rest: "60s" },
        { name: "Dumbbell Bench Press", sets: "3", reps: "12", rest: "60s" },
        { name: "Russian Twists", sets: "3", reps: "20 (total)", rest: "60s" },
        { name: "Burpees", sets: "3", reps: "10", rest: "90s" },
      ],
      cardio: "30 minutes on the elliptical",
       meals: {
        breakfast: "Scrambled eggs with spinach and whole-wheat toast.",
        lunch: "Lean turkey wrap with avocado and vegetables.",
        dinner: "Stir-fried tofu with brown rice and a variety of colorful peppers.",
      },
    },
     advanced: {
      workout: [
        { name: "Barbell Squats", sets: "4", reps: "8", rest: "90s" },
        { name: "Pull-ups", sets: "4", reps: "To failure", rest: "90s" },
        { name: "Kettlebell Swings", sets: "4", reps: "15", rest: "60s" },
        { name: "Box Jumps", sets: "3", reps: "10", rest: "90s" },
      ],
      cardio: "20 minutes of High-Intensity Interval Training (HIIT) on a treadmill.",
      meals: {
        breakfast: "Greek yogurt with granola and a scoop of protein powder.",
        lunch: "Quinoa bowl with black beans, corn, grilled steak, and salsa.",
        dinner: "Cod fillet with roasted asparagus and sweet potato.",
      },
    }
  },
   "muscle-gain": {
    beginner: {
      workout: [
        { name: "Dumbbell Squats", sets: "3", reps: "10", rest: "60s" },
        { name: "Dumbbell Bench Press", sets: "3", reps: "10", rest: "60s" },
        { name: "Dumbbell Rows", sets: "3", reps: "10/arm", rest: "60s" },
        { name: "Bicep Curls", sets: "3", reps: "12", rest: "45s" },
      ],
       meals: {
        breakfast: "Protein shake with banana and oats.",
        lunch: "Chicken breast with brown rice and broccoli.",
        dinner: "Ground beef with pasta and a side salad.",
      },
    },
    intermediate: {
      workout: [
        { name: "Barbell Bench Press", sets: "4", reps: "8-10", rest: "90s" },
        { name: "Bent-Over Rows", sets: "4", reps: "8-10", rest: "90s" },
        { name: "Overhead Press", sets: "3", reps: "10", rest: "60s" },
        { name: "Lat Pulldowns", sets: "3", reps: "12", rest: "60s" },
      ],
       meals: {
        breakfast: "Three-egg omelette with cheese and vegetables.",
        lunch: "Large portion of chili with beans and lean ground turkey.",
        dinner: "Pork chops with roasted potatoes and green beans.",
      },
    },
     advanced: {
      workout: [
        { name: "Barbell Back Squats", sets: "5", reps: "5", rest: "2-3min" },
        { name: "Deadlifts", sets: "3", reps: "5", rest: "2-3min" },
        { name: "Incline Dumbbell Press", sets: "4", reps: "8", rest: "90s" },
        { name: "Leg Press", sets: "4", reps: "12", rest: "90s" },
      ],
       meals: {
        breakfast: "Protein pancakes with maple syrup.",
        lunch: "Salmon fillet with a large portion of white rice and avocado.",
        dinner: "Steak with a loaded baked potato and a side of creamed spinach.",
      },
    }
  }
};


function PlanDisplay({ rawText }: { rawText: string; }) {
  const displayText = useTypewriter(rawText, 10, false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (displayText.length === rawText.length && rawText.length > 0) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }
  }, [displayText, rawText]);

  return (
    <div className="font-body text-sm space-y-6">
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {isFinished ? (
          <div dangerouslySetInnerHTML={{ __html: rawText }} />
        ) : (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}


export default function AiFitnessCoachPage() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [rawPlanText, setRawPlanText] = useState<string>('');
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
  
  function generatePlanText(planData: Plan, values: FormValues): string {
    const goalTitle = values.goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    let text = `
<h3 class="text-xl font-headline font-bold text-primary mb-4 flex items-center gap-2"><span class="text-2xl">📋</span> Your Custom Fitness Plan</h3>
<div class="grid grid-cols-3 gap-4 mb-6 text-center">
  <div class="bg-primary/10 p-3 rounded-lg"><div class="font-bold text-primary">${goalTitle}</div><div class="text-xs text-muted-foreground">Goal</div></div>
  <div class="bg-primary/10 p-3 rounded-lg"><div class="font-bold text-primary">${values.level.charAt(0).toUpperCase() + values.level.slice(1)}</div><div class="text-xs text-muted-foreground">Level</div></div>
  <div class="bg-primary/10 p-3 rounded-lg"><div class="font-bold text-primary">${values.duration} mins</div><div class="text-xs text-muted-foreground">Duration</div></div>
</div>

<h4 class="text-lg font-headline font-semibold text-accent mb-3 flex items-center gap-2"><span class="text-xl">💪</span> Workout Plan</h4>
<table>
  <thead>
    <tr>
      <th>Exercise</th>
      <th>Sets</th>
      <th>Reps</th>
      <th>Rest</th>
    </tr>
  </thead>
  <tbody>
    ${planData.workout.map(ex => `<tr><td>${ex.name}</td><td>${ex.sets}</td><td>${ex.reps}</td><td>${ex.rest}</td></tr>`).join('')}
  </tbody>
</table>
${planData.cardio ? `<p class="mt-4"><strong class="font-semibold text-accent">Cardio:</strong> ${planData.cardio}</p>` : ''}

<h4 class="text-lg font-headline font-semibold text-accent mt-6 mb-3 flex items-center gap-2"><span class="text-xl">🥗</span> Meal Suggestions</h4>
<ul>
  <li><strong class="font-semibold text-primary/90">Breakfast:</strong> ${planData.meals.breakfast}</li>
  <li><strong class="font-semibold text-primary/90">Lunch:</strong> ${planData.meals.lunch}</li>
  <li><strong class="font-semibold text-primary/90">Dinner:</strong> ${planData.meals.dinner}</li>
</ul>
<p class="text-xs text-muted-foreground mt-6 italic">*Disclaimer: This is a sample plan. Consult with a professional before starting any new fitness or nutrition program.</p>
`;
    return text;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPlan(null);
    setRawPlanText('');
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const goalKey = values.goal === 'cardio-endurance' || values.goal === 'flexibility' ? 'weight-loss' : values.goal;
    const selectedPlan = hardcodedPlans[goalKey]?.[values.level];

    if (!selectedPlan) {
      toast({
        variant: "destructive",
        title: "Plan Not Found",
        description: "A plan for the selected options is not available. Please try another combination.",
      });
      setIsLoading(false);
      return;
    }
    
    setPlan(selectedPlan);
    setRawPlanText(generatePlanText(selectedPlan, values));
    
    toast({
      title: "Success!",
      description: "Your personalized fitness plan is ready.",
    });

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a020d] via-background to-[#0d021a]">
      <ProjectPageHeader title="AI Health & Fitness Coach" />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="mb-8 bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot /> Fitness Planner
            </CardTitle>
            <CardDescription>
              Tell us your goals and we will generate a custom workout and meal plan for you.
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

        {(isLoading || rawPlanText) && (
            <Card className="mt-8 bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader><CardTitle className="flex items-center gap-2 font-headline"><Sparkles /> Your Custom Fitness Plan</CardTitle></CardHeader>
            <CardContent className="min-h-[300px] relative">
                {isLoading && !rawPlanText && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                      <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                      <p className="text-muted-foreground">Building your plan...</p>
                    </div>
                  </div>
              )}
              {rawPlanText && (
                  <PlanDisplay rawText={rawPlanText} />
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
