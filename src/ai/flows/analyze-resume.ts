'use server';

/**
 * @fileOverview AI flow for analyzing a resume against a job description.
 *
 * - analyzeResume - A function that analyzes the resume.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  resumeInfo: z
    .string()
    .describe('Detailed information from the user\'s resume.'),
  jobDescription: z
    .string()
    .describe('The description of the job the user is applying for.'),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalyzeResumeOutputSchema = z.object({
  analysis: z.object({
    strengths: z.array(z.string()).describe("List of key strengths and alignment with the job description."),
    weaknesses: z.array(z.string()).describe("List of potential weaknesses or areas for improvement."),
    suggestions: z.array(z.string()).describe("Actionable suggestions for improving the resume for this specific job."),
    matchScore: z.number().min(0).max(100).describe("A score from 0-100 indicating the resume's match to the job description."),
  })
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(
  input: AnalyzeResumeInput
): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert career coach and resume writer.

  Analyze the provided resume information against the given job description. Provide a detailed analysis including:
  1.  Strengths: How the resume aligns with the job requirements.
  2.  Weaknesses: Gaps or areas where the resume could be stronger.
  3.  Suggestions: Specific, actionable advice on how to improve the resume for this role.
  4.  Match Score: A percentage score (0-100) of how well the resume matches the job description.

  Resume Information: {{{resumeInfo}}}
  Job Description: {{{jobDescription}}}
  `,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
