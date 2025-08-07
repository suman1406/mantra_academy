// This file contains the Genkit flow for answering frequently asked questions using an AI Chatbot.
// It provides pre-authored answers based on semantic similarity to user queries.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FaqInputSchema = z.object({
  query: z.string().describe('The user query about the website, courses, or spiritual concepts.'),
});
export type FaqInput = z.infer<typeof FaqInputSchema>;

const FaqOutputSchema = z.object({
  answer: z.string().describe('The pre-authored answer to the user query.'),
});
export type FaqOutput = z.infer<typeof FaqOutputSchema>;

export async function answerFaq(input: FaqInput): Promise<FaqOutput> {
  return answerFaqFlow(input);
}

const faqPrompt = ai.definePrompt({
  name: 'faqPrompt',
  input: {schema: FaqInputSchema},
  output: {schema: FaqOutputSchema},
  prompt: `You are a chatbot designed to answer frequently asked questions about a spiritual website.
  You have access to a set of pre-authored answers. Your task is to select the answer that is most semantically similar to the user's query.

  User Query: {{{query}}}

  Answer:`, // The actual answers would be provided via tool or as context.
});

const answerFaqFlow = ai.defineFlow(
  {
    name: 'answerFaqFlow',
    inputSchema: FaqInputSchema,
    outputSchema: FaqOutputSchema,
  },
  async input => {
    const {output} = await faqPrompt(input);
    return output!;
  }
);
