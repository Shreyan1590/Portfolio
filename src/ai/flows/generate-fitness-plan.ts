'use server';

/**
 * @fileOverview AI flow for generating a personalized fitness plan.
 *
 * - generateFitnessPlan - A function that generates the plan.
 * - GenerateFitnessPlanInput - The input type for the generateFitnessPlan function.
 * - GenerateFitnessPlanOutput - The return type for the generateFitnessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFitnessPlanInputSchema = z.object({
  goal: z.string().describe('The user\'s primary fitness goal (e.g., weight loss, muscle gain).'),
  level: z.string().describe('The user\'s current fitness level (e.g., beginner, intermediate, advanced).'),
  duration: z.number().describe('The desired workout duration in minutes.'),
});
export type GenerateFitnessPlanInput = z.infer<typeof GenerateFitnessPlanInputSchema>;

const GenerateFitnessPlanOutputSchema = z.object({
  plan: z.string().describe('The generated personalized fitness plan, including a workout routine and meal suggestions, formatted in markdown.'),
});
export type GenerateFitnessPlanOutput = z.infer<typeof GenerateFitnessPlanOutputSchema>;

export async function generateFitnessPlan(
  input: GenerateFitnessPlanInput
): Promise<GenerateFitnessPlanOutput> {
  return generateFitnessPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFitnessPlanPrompt',
  input: {schema: GenerateFitnessPlanInputSchema},
  output: {schema: GenerateFitnessPlanOutputSchema},
  prompt: `You are an expert fitness coach and nutritionist.

  Based on the user's details, create a personalized one-day fitness plan. The plan should include:
  1.  **Workout Plan:** A detailed workout routine for a {{{duration}}}-minute session, appropriate for a user with a '{{{level}}}' fitness level and a goal of '{{{goal}}}'. Include exercises, sets, reps, and rest periods.
  2.  **Meal Suggestions:** Provide simple and healthy meal suggestions for breakfast, lunch, and dinner that align with their fitness goal.

  Format the entire output in clean, readable markdown.

  **User Details:**
  - Fitness Goal: {{{goal}}}
  - Fitness Level: {{{level}}}
  - Desired Workout Duration: {{{duration}}} minutes
  `,
});

const generateFitnessPlanFlow = ai.defineFlow(
  {
    name: 'generateFitnessPlanFlow',
    inputSchema: GenerateFitnessPlanInputSchema,
    outputSchema: GenerateFitnessPlanOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      model: 'googleai/gemini-1.5-flash-latest',
      prompt: prompt.prompt,
      input,
      output: {
        schema: prompt.output.schema,
      },
    });
    return output!;
  }
);
