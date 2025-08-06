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
import {
  analyzeCode,
  type AnalyzeCodeInput,
} from "@/ai/flows/analyze-code";
import {
  generateProductDescription,
  type GenerateProductDescriptionInput,
} from "@/ai/flows/generate-product-description";
import {
  generateFitnessPlan,
  type GenerateFitnessPlanInput,
} from "@/ai/flows/generate-fitness-plan";
import {
  portfolioChat,
  type PortfolioChatInput,
} from "@/ai/flows/portfolio-chatbot";
import {
  helloGenkit,
  type HelloGenkitInput,
} from "@/ai/flows/hello-genkit";


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

export async function handleAnalyzeCode(input: AnalyzeCodeInput) {
    try {
        const output = await analyzeCode(input);
        if (!output.analysis) {
            return { error: "The code analysis was empty. Please try again." };
        }
        return { analysis: output.analysis };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { error: `Failed to analyze code: ${errorMessage}. Please try again later.` };
    }
}

export async function handleGenerateProductDescription(input: GenerateProductDescriptionInput) {
    try {
        const output = await generateProductDescription(input);
        if (!output.description) {
            return { error: "The generated description was empty. Please try again." };
        }
        return { description: output.description };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { error: `Failed to generate description: ${errorMessage}. Please try again later.` };
    }
}

export async function handleGenerateFitnessPlan(input: GenerateFitnessPlanInput) {
    try {
        const output = await generateFitnessPlan(input);
        if (!output.plan) {
            return { error: "The generated plan was empty. Please try again." };
        }
        return { plan: output.plan };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { error: `Failed to generate fitness plan: ${errorMessage}. Please try again later.` };
    }
}

export async function handlePortfolioChat(input: PortfolioChatInput) {
    try {
        const output = await portfolioChat(input);
        if (!output.response) {
            return { error: "The chatbot did not return a response. Please try again." };
        }
        return { response: output.response };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { error: `Failed to get a response from the chatbot: ${errorMessage}. Please try again later.` };
    }
}

export async function handleHelloGenkit(input: HelloGenkitInput) {
    try {
        const output = await helloGenkit(input);
        if (!output.greeting) {
            return { error: "The AI did not return a greeting. Please try again." };
        }
        return { greeting: output.greeting };
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return { error: `Failed to get a greeting from the AI: ${errorMessage}. Please try again later.` };
    }
}
