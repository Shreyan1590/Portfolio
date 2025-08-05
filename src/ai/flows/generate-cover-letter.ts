'use server';

/**
 * @fileOverview AI flow for generating a personalized cover letter based on resume information and a job description.
 *
 * - generateCoverLetter - A function that generates the cover letter.
 * - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
 * - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  resumeInfo: z
    .string()
    .describe('Detailed information from the user\'s resume.'),
  jobDescription: z
    .string()
    .describe('The description of the job the user is applying for.'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z
    .string()
    .describe('The generated personalized cover letter.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(
  input: GenerateCoverLetterInput
): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert resume writer specializing in creating personalized cover letters.

  Based on the provided resume information and job description, generate a compelling cover letter that highlights the user's relevant skills and experience.

  Resume Information: {{{resumeInfo}}}
  Job Description: {{{jobDescription}}}
  `, // Updated prompt
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
