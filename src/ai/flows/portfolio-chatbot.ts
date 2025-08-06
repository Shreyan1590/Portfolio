'use server';

/**
 * @fileOverview An AI chatbot flow that can answer questions about Shreyan's portfolio.
 *
 * - portfolioChat - A function that handles the chat interaction.
 * - PortfolioChatInput - The input type for the portfolioChat function.
 * - PortfolioChatOutput - The return type for the portfolioChat function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

// --- Static Portfolio Context ---
// This data is extracted from the components to give the AI context about the portfolio.
const portfolioContext = `
Shreyan is an 18-year-old B.Tech student at Saveetha Institute of Medical And Technical Sciences with over 2 years of experience in Web Development.

**About Shreyan:**
I am an 18-year-old B.Tech student specializing in problem-solving and user-friendly design. With 2+ years in web development, I've built scalable applications for startups and enterprises, combining technical excellence with user-centered design.

**Services Offered:**
- **AI Feature Integration:** Build and integrate AI features using Genkit and LangChain.
- **Full-Stack Web Development:** End-to-end development of scalable, high-performance web applications.
- **Technical Consulting & Architecture:** Expert guidance on tech stacks and application architecture.

**Technical Skills:**
- **Frontend:** React/Next.js (95%), TypeScript (90%), Tailwind CSS (95%), Redux (80%).
- **Backend:** Node.js/Express (90%), Python (Django, Flask) (88%), GraphQL (82%), RESTful APIs (95%).
- **Databases:** PostgreSQL (85%), MongoDB (90%), Redis (75%), Firebase (80%).
- **AI/ML:** Genkit/Firebase GenAI (85%), OpenAI API (90%), LangChain (78%).
- **DevOps:** Docker/Kubernetes (85%), Git/GitHub Actions (95%), AWS/Vercel (80%).

**Career Journey & Education:**
- **Project: AI-Based Error Detection System (2025):** An AI-driven industrial monitoring system to detect equipment failures.
- **Publication: Energy Consumption Prediction (2025):** Published in IJER, using Random Forest and KNN to reduce energy waste.
- **Certification: Cyber Security (2025):** Completed a 5+ hour course on LinkedIn Learning.
- **B.Tech in Computer Science:** SIMATS School of Engineering (2024 - Present), CGPA: 8.38/10.
- **Education:** Higher Secondary (2024) and Secondary School (2022) from Sree Narayana Guru Matric Higher Secondary School.

**Featured Projects:**
- **AI Code Assistant:** VS Code extension for intelligent code suggestions.
- **QuantumLeap E-commerce:** A full-featured e-commerce platform.
- **Collaborative Whiteboard:** Real-time whiteboard for multi-user collaboration.
- **DataViz Dashboard:** Interactive dashboard for visualizing complex datasets.
- **AI Fitness Coach:** Personalized health app with custom workout/meal plans.
- **Generative Art Studio:** A platform to generate art from text prompts.

**Tech Philosophy:**
1.  **Pragmatic & Purpose-Driven:** Choose the best technology to solve the problem and deliver value.
2.  **Performance by Default:** Build fast, responsive applications as a core principle.
3.  **Scalability for the Future:** Architect systems for growth and complexity.
`;


const PortfolioChatInputSchema = z.object({
  message: z.string().describe('The user\'s message or question to the chatbot.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
});
export type PortfolioChatInput = z.infer<typeof PortfolioChatInputSchema>;

const PortfolioChatOutputSchema = z.object({
  response: z
    .string()
    .describe('The chatbot\'s response to the user\'s message.'),
});
export type PortfolioChatOutput = z.infer<typeof PortfolioChatOutputSchema>;

export async function portfolioChat(
  input: PortfolioChatInput
): Promise<PortfolioChatOutput> {
  return portfolioChatFlow(input);
}

const portfolioChatFlow = ai.defineFlow(
  {
    name: 'portfolioChatFlow',
    inputSchema: PortfolioChatInputSchema,
    outputSchema: PortfolioChatOutputSchema,
  },
  async input => {
    const {output} = await ai.generate({
      model: googleAI.model('gemini-1.5-flash-latest'),
      history: input.history || [],
      prompt: `You are Shreyan's AI assistant, a friendly and helpful chatbot embedded on his portfolio website. Your goal is to answer questions from visitors about Shreyan, his skills, projects, and experience.

      Use the following context about Shreyan's portfolio to answer the user's question. Be concise, friendly, and professional. If the question is outside the scope of the portfolio, politely decline to answer.

      **Portfolio Context:**
      ${portfolioContext}
      
      **User's Question:**
      ${input.message}
      `,
      output: {
        schema: PortfolioChatOutputSchema,
      },
      config: {
        temperature: 0.5,
      },
    });
    return { response: output!.response };
  }
);
