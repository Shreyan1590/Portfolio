
"use client";

import { useState, useEffect } from "react";
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

interface MealOptions {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

interface PlanData {
  workout: WorkoutExercise[];
  cardio: string[];
  meals: MealOptions;
}

interface GeneratedPlan {
  workout: WorkoutExercise[];
  cardio?: string;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
}

// Fisher-Yates shuffle algorithm
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  const newArray = [...array];

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
}


const planDatabase: Record<string, Record<string, PlanData>> = {
  "weight-loss": {
    beginner: {
      workout: [
        { name: "Bodyweight Squats", sets: "3", reps: "15", rest: "60s" },
        { name: "Push-ups (on knees)", sets: "3", reps: "10", rest: "60s" },
        { name: "Plank", sets: "3", reps: "30s hold", rest: "60s" },
        { name: "Jumping Jacks", sets: "3", reps: "30s", rest: "60s" },
        { name: "Glute Bridges", sets: "3", reps: "15", rest: "45s" },
        { name: "Lunges", sets: "3", reps: "10/leg", rest: "60s" },
        { name: "Bird-Dog", sets: "3", reps: "12/side", rest: "45s" },
      ],
      cardio: ["20 minutes of brisk walking", "15 minutes on a stationary bike", "20 minutes of light jogging"],
      meals: {
        breakfast: ["Oatmeal with berries and a sprinkle of nuts.", "Greek yogurt with fruit.", "Two scrambled eggs with spinach."],
        lunch: ["Grilled chicken salad with mixed greens and a light vinaigrette.", "Quinoa bowl with black beans and corn.", "Turkey and avocado on whole wheat bread."],
        dinner: ["Baked salmon with steamed vegetables and quinoa.", "Lean ground turkey stir-fry with brown rice.", "Black bean soup with a side salad."],
      },
    },
    intermediate: {
      workout: [
        { name: "Goblet Squats", sets: "3", reps: "12", rest: "60s" },
        { name: "Dumbbell Bench Press", sets: "3", reps: "12", rest: "60s" },
        { name: "Russian Twists", sets: "3", reps: "20 (total)", rest: "60s" },
        { name: "Burpees", sets: "3", reps: "10", rest: "90s" },
        { name: "Dumbbell Rows", sets: "3", reps: "12/arm", rest: "60s" },
        { name: "Overhead Press", sets: "3", reps: "10", rest: "60s" },
        { name: "Hanging Knee Raises", sets: "3", reps: "15", rest: "60s" },
      ],
      cardio: ["30 minutes on the elliptical", "25 minutes of interval running", "20 minutes on the rowing machine"],
       meals: {
        breakfast: ["Scrambled eggs with spinach and whole-wheat toast.", "Protein smoothie with almond milk, spinach, and banana.", "Cottage cheese with pineapple chunks."],
        lunch: ["Lean turkey wrap with avocado and vegetables.", "Large salad with grilled shrimp, chickpeas, and feta cheese.", "Chicken and vegetable skewers with a side of couscous."],
        dinner: ["Stir-fried tofu with brown rice and a variety of colorful peppers.", "Grilled tilapia with roasted asparagus and sweet potato wedges.", "Lean beef and vegetable soup."],
      },
    },
     advanced: {
      workout: [
        { name: "Barbell Squats", sets: "4", reps: "8", rest: "90s" },
        { name: "Pull-ups", sets: "4", reps: "To failure", rest: "90s" },
        { name: "Kettlebell Swings", sets: "4", reps: "15", rest: "60s" },
        { name: "Box Jumps", sets: "3", reps: "10", rest: "90s" },
        { name: "Deadlifts", sets: "4", reps: "6", rest: "120s" },
        { name: "Incline Dumbbell Press", sets: "4", reps: "10", rest: "75s" },
        { name: "Toes-to-Bar", sets: "3", reps: "12", rest: "60s" },
      ],
      cardio: ["20 minutes of High-Intensity Interval Training (HIIT) on a treadmill.", "45-minute spin class", "30 minutes on the StairMaster"],
      meals: {
        breakfast: ["Greek yogurt with granola and a scoop of protein powder.", "Omelette with four egg whites, bell peppers, onions, and lean ham.", "Protein pancakes with a handful of berries."],
        lunch: ["Quinoa bowl with black beans, corn, grilled steak, and salsa.", "Large sushi roll with brown rice and plenty of fish.", "Bison burger (no bun) with a large side salad."],
        dinner: ["Cod fillet with roasted asparagus and sweet potato.", "Chicken breast stuffed with feta and spinach, with a side of wild rice.", "Lean pork chops with a roasted vegetable medley."],
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
        { name: "Tricep Dips (on bench)", sets: "3", reps: "10", rest: "45s" },
        { name: "Leg Press", sets: "3", reps: "12", rest: "60s" },
        { name: "Lat Pulldowns", sets: "3", reps: "12", rest: "60s" },
      ],
      cardio: [],
       meals: {
        breakfast: ["Protein shake with banana and oats.", "Scrambled eggs (3) with whole wheat toast.", "Greek yogurt with a scoop of protein powder and honey."],
        lunch: ["Chicken breast with brown rice and broccoli.", "Tuna salad sandwich on whole wheat bread.", "Ground turkey with sweet potatoes and green beans."],
        dinner: ["Ground beef with pasta and a side salad.", "Salmon fillet with quinoa and asparagus.", "Steak with a baked potato."],
      },
    },
    intermediate: {
      workout: [
        { name: "Barbell Bench Press", sets: "4", reps: "8-10", rest: "90s" },
        { name: "Bent-Over Rows", sets: "4", reps: "8-10", rest: "90s" },
        { name: "Overhead Press", sets: "3", reps: "10", rest: "60s" },
        { name: "Lat Pulldowns", sets: "3", reps: "12", rest: "60s" },
        { name: "Barbell Squats", sets: "4", reps: "8", rest: "90s" },
        { name: "Romanian Deadlifts", sets: "3", reps: "10", rest: "75s" },
        { name: "Skull Crushers", sets: "3", reps: "12", rest: "60s" },
      ],
      cardio: [],
       meals: {
        breakfast: ["Three-egg omelette with cheese and vegetables.", "Oatmeal with protein powder, nuts, and seeds.", "Breakfast burritos with eggs, sausage, and black beans."],
        lunch: ["Large portion of chili with beans and lean ground turkey.", "Chicken thighs with white rice and roasted carrots.", "Beef and broccoli stir-fry."],
        dinner: ["Pork chops with roasted potatoes and green beans.", "Shepherd's pie with a sweet potato topping.", "A large serving of lasagna."],
      },
    },
     advanced: {
      workout: [
        { name: "Barbell Back Squats", sets: "5", reps: "5", rest: "2-3min" },
        { name: "Deadlifts", sets: "3", reps: "5", rest: "2-3min" },
        { name: "Incline Dumbbell Press", sets: "4", reps: "8", rest: "90s" },
        { name: "Leg Press", sets: "4", reps: "12", rest: "90s" },
        { name: "Weighted Pull-ups", sets: "4", reps: "6-8", rest: "90s" },
        { name: "Dumbbell Shoulder Press", sets: "4", reps: "10", rest: "75s" },
        { name: "Barbell Curls", sets: "4", reps: "8", rest: "60s" },
      ],
      cardio: [],
       meals: {
        breakfast: ["Protein pancakes with maple syrup.", "Six scrambled eggs with a side of bacon or sausage.", "A large bowl of oatmeal with double protein and nuts."],
        lunch: ["Salmon fillet with a large portion of white rice and avocado.", "A footlong sub sandwich with double meat.", "A large burrito bowl with extra rice, beans, and meat."],
        dinner: ["Steak with a loaded baked potato and a side of creamed spinach.", "A whole roasted chicken with potatoes and vegetables.", "Beef stroganoff with egg noodles."],
      },
    }
  }
};


function generateRandomPlan(sourcePlan: PlanData): GeneratedPlan {
  const workout = shuffle(sourcePlan.workout).slice(0, 4 + Math.floor(Math.random() * 2)); // 4 or 5 exercises
  const cardio = sourcePlan.cardio.length > 0 ? shuffle(sourcePlan.cardio)[0] : undefined;

  const breakfast = shuffle(sourcePlan.meals.breakfast)[0];
  const lunch = shuffle(sourcePlan.meals.lunch)[0];
  const dinner = shuffle(sourcePlan.meals.dinner)[0];

  return {
    workout,
    cardio,
    meals: {
      breakfast,
      lunch,
      dinner,
    },
  };
}


function PlanDisplay({ rawText }: { rawText: string; }) {
  const animatedText = useTypewriter(rawText, 10);

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none font-body">
      <div dangerouslySetInnerHTML={{ __html: animatedText }} />
    </div>
  );
}


export default function AiFitnessCoachPage() {
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
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
  
  function generatePlanText(planData: GeneratedPlan, values: FormValues): string {
    const goalTitle = values.goal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    let text = `

<div class="grid grid-cols-3 gap-4 mb-6 text-center">
  <div class="bg-primary/10 p-3 rounded-lg"><div class="font-bold text-primary">${goalTitle}</div><div class="text-xs text-muted-foreground">Goal</div></div>
  <div class="bg-primary/10 p-3 rounded-lg"><div class="font-bold text-primary">${values.level.charAt(0).toUpperCase() + values.level.slice(1)}</div><div class="text-xs text-muted-foreground">Level</div></div>
  <div class="bg-primary/10 p-3 rounded-lg"><div class="font-bold text-primary">${values.duration} mins</div><div class="text-xs text-muted-foreground">Duration</div></div>
</div>

<h4 class="text-lg font-headline font-semibold text-accent mb-3 flex items-center gap-2">💪 Workout Plan</h4>
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

<h4 class="text-lg font-headline font-semibold text-accent mt-6 mb-3 flex items-center gap-2">🥗 Meal Suggestions</h4>
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

    const sourcePlan = planDatabase[values.goal]?.[values.level];

    if (!sourcePlan) {
      toast({
        variant: "destructive",
        title: "Plan Not Found",
        description: "A plan for the selected options is not available. Please try another combination.",
      });
      setIsLoading(false);
      return;
    }
    
    const newPlan = generateRandomPlan(sourcePlan);
    setPlan(newPlan);
    setRawPlanText(generatePlanText(newPlan, values));
    
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
