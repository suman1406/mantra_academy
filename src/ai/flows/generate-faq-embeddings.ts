'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating embeddings from a document containing FAQs.
 *
 * - generateFaqEmbeddings - A function that handles the FAQ embedding generation process.
 * - GenerateFaqEmbeddingsInput - The input type for the generateFaqEmbeddings function.
 * - GenerateFaqEmbeddingsOutput - The return type for the generateFaqEmbeddings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFaqEmbeddingsInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the document containing FAQs.'),
});
export type GenerateFaqEmbeddingsInput = z.infer<
  typeof GenerateFaqEmbeddingsInputSchema
>;

const GenerateFaqEmbeddingsOutputSchema = z.object({
  embeddings: z.array(z.array(z.number())).describe('The generated embeddings for the FAQs.'),
});
export type GenerateFaqEmbeddingsOutput = z.infer<
  typeof GenerateFaqEmbeddingsOutputSchema
>;

export async function generateFaqEmbeddings(
  input: GenerateFaqEmbeddingsInput
): Promise<GenerateFaqEmbeddingsOutput> {
  return generateFaqEmbeddingsFlow(input);
}

const generateFaqEmbeddingsPrompt = ai.definePrompt({
  name: 'generateFaqEmbeddingsPrompt',
  input: {schema: GenerateFaqEmbeddingsInputSchema},
  output: {schema: GenerateFaqEmbeddingsOutputSchema},
  prompt: `You are an expert AI model specializing in generating embeddings for FAQ documents.

  Generate embeddings for each FAQ in the following document. The output should be an array of arrays, where each inner array represents the embedding for a single FAQ.

  Document Content: {{{documentContent}}}`,
});

const generateFaqEmbeddingsFlow = ai.defineFlow(
  {
    name: 'generateFaqEmbeddingsFlow',
    inputSchema: GenerateFaqEmbeddingsInputSchema,
    outputSchema: GenerateFaqEmbeddingsOutputSchema,
  },
  async input => {
    // Split the document into individual FAQs (very basic splitting).
    // In a real application, you'd want to use a more sophisticated method.
    const faqs = input.documentContent.split('\n\n');

    const embeddings: number[][] = [];

    for (const faq of faqs) {
      // genkit/embedder return shapes vary by provider/version. Use a tolerant extraction
      // strategy and fall back to an empty vector if nothing sensible is found.
      // Use `any` to avoid tight typing issues with the external lib.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await ai.embed(({ input: faq } as any));

      let embedding: number[] = [];

      if (Array.isArray(res) && Array.isArray(res[0]) && typeof res[0][0] === 'number') {
        // e.g. [[0.1, 0.2, ...]]
        embedding = res[0];
      } else if (Array.isArray(res) && typeof res[0] === 'number') {
        // e.g. [0.1, 0.2, ...]
        embedding = res as number[];
      } else if (res && Array.isArray(res.embedding)) {
        embedding = res.embedding;
      } else if (res && Array.isArray(res.data) && Array.isArray(res.data[0]?.embedding)) {
        embedding = res.data[0].embedding;
      }

      embeddings.push(embedding);
    }

    return {embeddings};
  }
);
