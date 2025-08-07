'use server';

import { answerFaq } from '@/ai/flows/answer-faq';

export async function handleFaqQuery(query: string): Promise<{ answer: string }> {
  try {
    // The provided Genkit flow 'answerFaq' is a simple prompt wrapper.
    // To fulfill the user's request for "pre-authored answers," we simulate
    // a knowledge-base lookup with keyword matching here.
    // A production implementation would involve a proper vector database search.
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('course') || lowerQuery.includes('learn')) {
      return { answer: "We offer a variety of courses on meditation, mindfulness, and spiritual development. You can find all our featured courses on the homepage." };
    }
    if (lowerQuery.includes('mission') || lowerQuery.includes('vision') || lowerQuery.includes('about')) {
      return { answer: "Our mission is to provide a sanctuary for spiritual seekers to find peace, wisdom, and community. Learn more on our 'About Us' page." };
    }
    if (lowerQuery.includes('who are you') || lowerQuery.includes('team')) {
      return { answer: "We are the Inner Light Sanctuary, a place for spiritual growth and learning. You can learn about our team and guides on the 'About Us' page." };
    }
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
        return { answer: "Hello! It's a joy to connect with you. How can I help you today?" };
    }

    // Fallback if no specific keywords are matched.
    return { answer: "I'm here to help with questions about Inner Light Sanctuary. I can answer questions about our courses, our mission, or our team. Could you try rephrasing your question?" };

  } catch (error) {
    console.error('Error in AI query:', error);
    return { answer: 'I apologize, but I am having trouble connecting to my wisdom source at the moment. Please try again in a little while.' };
  }
}
