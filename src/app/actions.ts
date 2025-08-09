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
      return { answer: "We offer a variety of courses on mantra science, Vedic chanting, and meditation. You can find all our featured courses on the homepage." };
    }
    if (lowerQuery.includes('mission') || lowerQuery.includes('vision') || lowerQuery.includes('about')) {
      return { answer: "Our mission is to revive the ancient science of mantras and make it accessible for modern seekers. Learn more on our 'About Us' page." };
    }
    if (lowerQuery.includes('who are you') || lowerQuery.includes('team')) {
      return { answer: "We are Mantra Academy, a place for learning the art and science of mantras. You can learn about our instructors on the 'About Us' page." };
    }
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
        return { answer: "Hello! It's a joy to connect with you. How can I help you today?" };
    }

    // Fallback if no specific keywords are matched.
    return { answer: "I'm here to help with questions about Mantra Academy. I can answer questions about our courses, our mission, or our instructors. Could you try rephrasing your question?" };

  } catch (error) {
    console.error('Error in AI query:', error);
    return { answer: 'I apologize, but I am having trouble connecting to my wisdom source at the moment. Please try again in a little while.' };
  }
}
