"use server";

import {
  generateCoverLetter,
  type GenerateCoverLetterInput,
} from "@/ai/flows/generate-cover-letter";
import { 
  generateArt,
  type GenerateArtInput 
} from "@/ai/flows/generate-art";
import {
  analyzeResume,
  type AnalyzeResumeInput,
} from "@/ai/flows/analyze-resume";
import {
  generateSpeech,
  type GenerateSpeechInput,
} from "@/ai/flows/generate-speech";

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

export async function handleAnalyzeResume(input: AnalyzeResumeInput) {
  try {
    const output = await analyzeResume(input);
    if (!output.analysis) {
      return { error: "The resume analysis was empty. Please try again." };
    }
    return { analysis: output.analysis };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to analyze resume: ${errorMessage}. Please try again later.` };
  }
}

export async function handleGenerateSpeech(input: GenerateSpeechInput) {
  try {
    const output = await generateSpeech(input);
    if (!output.audioUrl) {
      return { error: "The generated audio was empty. Please try again." };
    }
    return { audioUrl: output.audioUrl };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to generate speech: ${errorMessage}. Please try again later.` };
  }
}
