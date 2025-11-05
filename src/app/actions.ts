'use server';

import { answerFaq } from '@/ai/flows/answer-faq';

export async function handleFaqQuery(query: string): Promise<{ answer: string }> {
  try {
    const lowerQuery = query.toLowerCase();

    // ====== GENERAL GREETING ======
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('namaste')) {
      return { answer: "Namaste! Welcome to Mantra Academy — where ancient wisdom meets modern life. How may I assist you today?" };
    }

    // ====== PHILOSOPHY ======
    if (lowerQuery.includes('philosophy') || lowerQuery.includes('what do you believe') || lowerQuery.includes('values')) {
      return { 
        answer: "At Mantra Academy, our philosophy is to bring Bharat’s timeless spiritual heritage into the present. Rooted in the Vedas, Upanishads, Itihasas, and Puranas, we see ancient wisdom as a living guide for balance, clarity, and purpose in modern life. We blend tradition with practical insights to help seekers reconnect with their roots and live meaningfully." 
      };
    }

    // ====== MISSION ======
    if (lowerQuery.includes('mission') || lowerQuery.includes('goal')) {
      return { 
        answer: "Our mission is to preserve, embody, and transmit the authentic wisdom of the Vedas, Sanskrit, and Indian Knowledge Systems through immersive and heartfelt teaching. Mantra Academy nurtures understanding, chanting skill, and spiritual growth by blending traditional Gurukula learning with modern education." 
      };
    }

    // ====== VISION ======
    if (lowerQuery.includes('vision') || lowerQuery.includes('future') || lowerQuery.includes('aim')) {
      return { 
        answer: "Our vision is to revive and nurture the timeless Yogic and Vedic culture in every Bharatiya’s heart by creating a global space for authentic Gurukula-style learning. We envision a vibrant community rooted in mantra, knowledge, and devotion — inspiring harmony, pride, and self-transformation for generations." 
      };
    }

    // ====== ABOUT US / ORGANIZATION ======
    if (lowerQuery.includes('about') || lowerQuery.includes('who are you') || lowerQuery.includes('mantra academy')) {
      return { 
        answer: "Mantra Academy is an online extension of the Gurukula spirit — dedicated to transmitting Vedic wisdom, Sanskrit, and the art of chanting in a modern, accessible way. Inspired by the teachings of Acharya Dr. Ramachandra Bhat Kotemane, we blend the sacred discipline of ancient education with the flexibility of online learning to serve seekers worldwide." 
      };
    }

    // ====== INSPIRATION / ACHARYA ======
    if (lowerQuery.includes('acharya') || lowerQuery.includes('dr ramachandra bhat') || lowerQuery.includes('founder')) {
      return { 
        answer: "Our guiding light is Acharya Dr. Ramachandra Bhat Kotemane — a scholar, mystic, and visionary leader of the Vedic and Yogic world. As Pradhana Acharya of Veda Vijnana Gurukulam and former Vice-Chancellor of SVYASA Yoga University, his life’s work bridges scholarship and sādhanā, preserving the purity of Yoga and Vedic knowledge for modern times." 
      };
    }

    // ====== TEAM: KARTHIK SHARMA ======
    if (lowerQuery.includes('karthik') || lowerQuery.includes('sharma')) {
      return { 
        answer: "Karthik Sharma is a dedicated scholar shaped by 13+ years of Gurukula training. Introduced to Krishna Yajurveda at age 10, he has studied the Upanishads, Bhagavad Gita, Brahmasutras, and Yogasutras under Acharya Dr. Ramachandra Bhat Kotemane. He holds an M.A. (Vidwat) and M.Phil in Advaita Vedanta and is pursuing doctoral research, carrying forward the Gurukula spirit for modern seekers." 
      };
    }

    // ====== TEAM: JYOTHI SHARMA ======
    if (lowerQuery.includes('jyothi') || lowerQuery.includes('bhat')) {
      return { 
        answer: "Jyothi M. Bhat is a scholar and teacher deeply rooted in the Gurukula tradition, blending Advaita Vedānta wisdom with a modern approach to teaching. Her path integrates scriptural study, sound-based learning, and lived devotion — helping students experience transformation through Sanskrit, meaning, and spiritual practice." 
      };
    }

    // ====== COURSES GENERIC ======
    if (lowerQuery.includes('course') || lowerQuery.includes('learn') || lowerQuery.includes('study') || lowerQuery.includes('program')) {
      return { 
        answer: "We offer structured online courses designed to bring Vedic wisdom and chanting into your daily life — including Vedashiksha (Vedic Chanting), Pūjā Vidhi, Durga Saptashati Study, and Jijñāsā for children. Each course blends traditional Gurukula learning with personal mentorship and Q&A guidance from the Acharya." 
      };
    }

    // ====== CONTACT / HELP ======
    if (lowerQuery.includes('contact') || lowerQuery.includes('help') || lowerQuery.includes('support')) {
      return { 
        answer: "You can reach out to the Mantra Academy team directly through our website’s contact page or via WhatsApp support for personalized guidance from the Acharya or instructors." 
      };
    }

    // ====== DEFAULT FALLBACK ======
    return { 
      answer: "I'm here to help with everything about Mantra Academy — our philosophy, mission, vision, or teachers. You can ask about our Acharya, team members, or any of the courses we offer to begin your spiritual learning journey." 
    };

  } catch (error) {
    console.error('Error in AI query:', error);
    return { answer: 'Apologies, but I’m unable to connect to my wisdom source right now. Please try again shortly.' };
  }
}