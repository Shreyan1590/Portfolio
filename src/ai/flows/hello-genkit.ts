'use server';

/**
 * @fileOverview A simple Genkit flow that generates a greeting.
 *
 * - helloGenkit - A function that generates a personalized greeting.
 * - HelloGenkitInput - The input type for the helloGenkit function.
 * - HelloGenkitOutput - The return type for the helloGenkit function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const HelloGenkitInputSchema = z.object({
  name: z.string().describe('The name of the person to greet.'),
});
export type HelloGenkitInput = z.infer<typeof HelloGenkitInputSchema>;

const HelloGenkitOutputSchema = z.object({
  greeting: z
    .string()
    .describe('The generated greeting from the AI.'),
});
export type HelloGenkitOutput = z.infer<typeof HelloGenkitOutputSchema>;

export async function helloGenkit(
  input: HelloGenkitInput
): Promise<HelloGenkitOutput> {
  return helloGenkitFlow(input);
}

const helloGenkitFlow = ai.defineFlow(
  {
    name: 'helloGenkitFlow',
    inputSchema: HelloGenkitInputSchema,
    outputSchema: HelloGenkitOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      model: googleAI.model('gemini-1.5-flash-latest'),
      prompt: `You are a friendly AI assistant. Say hello to ${input.name} in a creative and friendly way.`,
      output: {
        schema: HelloGenkitOutputSchema,
      },
    });
    return output!;
  }
);
