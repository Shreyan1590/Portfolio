"use server";

import {
  generateCoverLetter,
  type GenerateCoverLetterInput,
} from "@/ai/flows/generate-cover-letter";

export async function handleGenerateCoverLetter(input: GenerateCoverLetterInput) {
  try {
    const output = await generateCoverLetter(input);
    if (!output.coverLetter) {
      return { error: "The generated cover letter was empty. Please try again." };
    }
    return { coverLetter: output.coverLetter };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to generate cover letter: ${errorMessage}. Please try again later.` };
  }
}
