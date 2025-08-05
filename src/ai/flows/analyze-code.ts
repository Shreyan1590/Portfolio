'use server';

/**
 * @fileOverview AI flow for analyzing a code snippet.
 *
 * - analyzeCode - A function that analyzes the code.
 * - AnalyzeCodeInput - The input type for the analyzeCode function.
 * - AnalyzeCodeOutput - The return type for the analyzeCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to analyze.'),
  language: z.string().describe('The programming language of the code.'),
});
export type AnalyzeCodeInput = z.infer<typeof AnalyzeCodeInputSchema>;

const AnalyzeCodeOutputSchema = z.object({
  analysis: z
    .string()
    .describe('A detailed analysis of the code, including suggestions for improvement, potential bugs, and documentation.'),
});
export type AnalyzeCodeOutput = z.infer<typeof AnalyzeCodeOutputSchema>;

export async function analyzeCode(
  input: AnalyzeCodeInput
): Promise<AnalyzeCodeOutput> {
  return analyzeCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCodePrompt',
  input: {schema: AnalyzeCodeInputSchema},
  output: {schema: AnalyzeCodeOutputSchema},
  prompt: `You are an expert programmer and code reviewer.

  Analyze the following {{{language}}} code snippet. Provide a detailed analysis covering these points:
  1.  **Code Quality:** Assess readability, maintainability, and adherence to best practices.
  2.  **Bug Detection:** Identify any potential bugs, logical errors, or edge cases that might cause issues.
  3.  **Performance:** Suggest any possible performance optimizations.
  4.  **Documentation:** Generate a clear and concise documentation block for the code.

  Format the output in clean markdown.

  Code Snippet:
  \`\`\`{{{language}}}
  {{{code}}}
  \`\`\`
  `,
});

const analyzeCodeFlow = ai.defineFlow(
  {
    name: 'analyzeCodeFlow',
    inputSchema: AnalyzeCodeInputSchema,
    outputSchema: AnalyzeCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
