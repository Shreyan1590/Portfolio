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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectPageHeader } from "@/components/projects/project-page-header";

const formSchema = z.object({
  goal: z.string().min(1, "Please select a fitness goal."),
  level: z.string().min(1, "Please select your fitness level."),
  duration: z.coerce.number().min(15, "Duration must be at least 15 minutes.").max(120, "Duration cannot exceed 120 minutes."),
});

type FormValues = z.infer<typeof formSchema>;

const hardcodedPlans: Record<string, Record<string, { workout: string[], meals: Record<string, string> }>> = {
  "weight-loss": {
    beginner: {
      workout: [
        "Warm-up (5 min): Light cardio (jogging in place)",
        "Circuit 1 (2 rounds):",
        "  - Bodyweight Squats (15 reps)",
        "  - Push-ups (on knees if needed, 10 reps)",
        "  - Plank (30 seconds)",
        "  - Jumping Jacks (30 seconds)",
        "Rest (1 min)",
        "Circuit 2 (2 rounds):",
        "  - Lunges (10 reps per leg)",
        "  - Glute Bridges (15 reps)",
        "Cool-down (5 min): Stretching",
      ],
      meals: {
        breakfast: "Oatmeal with berries and a sprinkle of nuts.",
        lunch: "Grilled chicken salad with mixed greens and a light vinaigrette.",
        dinner: "Baked salmon with steamed vegetables and quinoa.",
      },
    },
    intermediate: {
       workout: [
        "Warm-up (5 min): Jump rope",
        "Circuit 1 (3 rounds):",
        "  - Goblet Squats (12 reps)",
        "  - Standard Push-ups (15 reps)",
        "  - Russian Twists (20 reps per side)",
        "  - Burpees (10 reps)",
        "Rest (1 min)",
        "Circuit 2 (3 rounds):",
        "  - Dumbbell Rows (12 reps per arm)",
        "  - High Knees (45 seconds)",
        "Cool-down (5 min): Full-body stretching",
      ],
      meals: {
        breakfast: "Scrambled eggs with spinach and whole-wheat toast.",
        lunch: "Lean turkey wrap with avocado and vegetables.",
        dinner: "Stir-fried tofu with brown rice and a variety of colorful peppers.",
      },
    },
    advanced: {
      workout: [
        "Warm-up (5 min): Dynamic stretches (leg swings, arm circles)",
        "HIIT (5 rounds):",
        "  - Kettlebell Swings (45 sec work, 15 sec rest)",
        "  - Box Jumps (45 sec work, 15 sec rest)",
        "  - Pull-ups (max reps)",
        "Rest (2 min)",
        "Core Circuit (3 rounds):",
        "  - Hanging Leg Raises (15 reps)",
        "  - Ab Rollouts (12 reps)",
        "Cool-down (10 min): Foam rolling and deep stretching",
      ],
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
        "Warm-up (5 min): Light cardio",
        "Full Body Strength (3 sets):",
        "  - Dumbbell Squats (10 reps)",
        "  - Dumbbell Bench Press (10 reps)",
        "  - Dumbbell Rows (10 reps per arm)",
        "  - Bicep Curls (12 reps)",
        "  - Tricep Dips (on bench, 10 reps)",
        "Cool-down (5 min): Stretching",
      ],
      meals: {
        breakfast: "Protein shake with banana and oats.",
        lunch: "Chicken breast with brown rice and broccoli.",
        dinner: "Ground beef with pasta and a side salad.",
      },
    },
    intermediate: {
      workout: [
        "Warm-up (5 min): Dynamic stretching",
        "Upper Body Focus (3 sets):",
        "  - Barbell Bench Press (8 reps)",
        "  - Bent-Over Rows (8 reps)",
        "  - Overhead Press (10 reps)",
        "  - Pull-ups (to failure)",
        "  - Lateral Raises (12 reps)",
        "Cool-down (5 min): Stretching",
      ],
      meals: {
        breakfast: "Three-egg omelette with cheese and vegetables.",
        lunch: "Large portion of chili with beans and lean ground turkey.",
        dinner: "Pork chops with roasted potatoes and green beans.",
      },
    },
     advanced: {
      workout: [
        "Warm-up (5 min): Mobility work",
        "Leg Day (4 sets):",
        "  - Barbell Back Squats (5 reps, heavy)",
        "  - Romanian Deadlifts (8 reps)",
        "  - Leg Press (10 reps)",
        "  - Calf Raises (15 reps)",
        "  - Hamstring Curls (12 reps)",
        "Cool-down (10 min): Deep stretching",
      ],
      meals: {
        breakfast: "Protein pancakes with maple syrup.",
        lunch: "Salmon fillet with a large portion of white rice and avocado.",
        dinner: "Steak with a loaded baked potato and a side of creamed spinach.",
      },
    }
  },
  "cardio-endurance": {
     beginner: {
      workout: ["Warm-up (5 min): Brisk walking", "Steady-State Cardio (20 min): Cycling or elliptical at a moderate pace", "Cool-down (5 min): Slow walking and stretching"],
      meals: { breakfast: "Whole-grain cereal with milk and fruit.", lunch: "Tuna salad sandwich on whole wheat.", dinner: "Pasta with marinara sauce and a side of greens." }
    },
    intermediate: {
      workout: ["Warm-up (5 min): Jogging", "Interval Training (20 min):", "  - Run (2 min hard, 1 min easy) x 6", "Cool-down (5 min): Stretching"],
      meals: { breakfast: "Bagel with cream cheese and a side of fruit.", lunch: "Chicken and rice soup.", dinner: "Chicken stir-fry with plenty of vegetables." }
    },
    advanced: {
      workout: ["Warm-up (5 min): Light jogging", "Tempo Run (25 min): Run at a challenging but sustainable pace", "Cool-down (10 min): Jog/walk and stretch"],
      meals: { breakfast: "Large bowl of oatmeal with peanut butter.", lunch: "Big plate of spaghetti with meat sauce.", dinner: "Burrito bowl with rice, beans, chicken, and toppings." }
    }
  },
   "flexibility": {
    beginner: {
      workout: ["Warm-up (5 min): Gentle dynamic stretches", "Full-Body Static Stretching (20 min):", "  - Hold each stretch for 30 seconds", "  - Hamstring stretch, quad stretch, calf stretch", "  - Chest stretch, tricep stretch, shoulder stretch", "Cool-down (5 min): Deep breathing"],
      meals: { breakfast: "Smoothie with fruits and spinach.", lunch: "Lentil soup.", dinner: "Vegetable curry with brown rice." }
    },
    intermediate: {
      workout: ["Warm-up (5 min): Cat-cow, spinal twists", "Yoga Flow (25 min): Focus on sun salutations and warrior poses", "Cool-down (5 min): Savasana (corpse pose)"],
      meals: { breakfast: "Avocado toast with a poached egg.", lunch: "Large salad with a variety of colorful vegetables and seeds.", dinner: "Baked fish with a lemon-dill sauce and asparagus." }
    },
    advanced: {
      workout: ["Warm-up (10 min): Mobility drills", "Deep Stretching & PNF (25 min):", "  - Partner-assisted stretches if possible", "  - Focus on splits, backbends, and hip openers", "Cool-down (5 min): Meditation"],
      meals: { breakfast: "Chia seed pudding.", lunch: "Quinoa salad with roasted vegetables and chickpeas.", dinner: "Black bean burgers on a whole-wheat bun." }
    }
  }
};


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
  
  function generateHardcodedPlan({ goal, level, duration }: FormValues): string {
    const selectedPlan = hardcodedPlans[goal]?.[level];

    if (!selectedPlan) {
      return "No plan available for the selected options. Please try another combination.";
    }

    const { workout, meals } = selectedPlan;
    
    return `
### Your Custom Fitness Plan

**Goal:** ${goal.replace('-', ' ')}
**Level:** ${level}
**Duration:** ${duration} minutes

---

#### **Workout Plan**

${workout.join('\n')}

---

#### **Meal Suggestions**

- **Breakfast:** ${meals.breakfast}
- **Lunch:** ${meals.lunch}
- **Dinner:** ${meals.dinner}

*Disclaimer: This is a sample plan. Consult with a professional before starting any new fitness or nutrition program.*
    `;
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPlan(null);
    
    // Simulate a delay to give the feeling of generation
    await new Promise(resolve => setTimeout(resolve, 1000));

    const generatedPlan = generateHardcodedPlan(values);
    setPlan(generatedPlan);
    
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
