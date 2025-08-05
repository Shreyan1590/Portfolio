"use server";

import {
  generateCoverLetter,
  type GenerateCoverLetterInput,
} from "@/ai/flows/generate-cover-letter";
import { 
  generateArt,
  type GenerateArtInput 
} from "@/ai/flows/generate-art";

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

export async function handleGenerateArt(input: GenerateArtInput) {
  try {
    const output = await generateArt(input);
    if (!output.imageUrl) {
      return { error: "The generated image was empty. Please try again." };
    }
    return { imageUrl: output.imageUrl };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to generate art: ${errorMessage}. Please try again later.` };
  }
}
