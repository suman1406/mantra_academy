
export type Course = {
  slug: string;
  title: string;
  category: string;
  image: string;
  aiHint: string;
  description: string;
  fullDescription: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  lectures: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  language: string;
  resources: number;
  instructor: {
    name: string;
    title: string;
    image: string;
    aiHint: string;
    bio: string;
  };
  curriculum: {
    title: string;
    lessons: {
      title: string;
      duration: string;
    }[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

const instructors = {
  rishi: {
    name: "Rishi Varma",
    title: "Founder & Lead Instructor",
    image: "https://placehold.co/100x100.png",
    aiHint: "spiritual man portrait",
    bio: "Rishi founded Mantra Academy to share the transformative power of ancient sound. He has spent over 20 years studying with masters in the Himalayas.",
  },
  anjali: {
    name: "Anjali Devi",
    title: "Vedic Chanting Expert",
    image: "https://placehold.co/100x100.png",
    aiHint: "chanting woman portrait",
    bio: "With a lineage of scholars, Anjali teaches the precise science of Vedic chanting with unparalleled clarity and devotion.",
  },
  sanjay: {
    name: "Sanjay Rao",
    title: "Nada Yoga Teacher",
    image: "https://placehold.co/100x100.png",
    aiHint: "yoga instructor portrait",
    bio: "Sanjay helps students connect with their inner sound through Nada Yoga, the yoga of sound. His approach is both meditative and deeply practical.",
  }
}

export const courses: Course[] = [
  {
    slug: "foundations-of-mantra-science",
    title: "Foundations of Mantra Science",
    category: "Beginner",
    image: "https://placehold.co/600x400.png",
    aiHint: "ancient scroll",
    description: "Learn the fundamentals of what mantras are, how they work, and correct pronunciation.",
    fullDescription: "This course is the perfect starting point for anyone new to the world of mantras. We will demystify the ancient science of sound, exploring the principles of vibration, resonance, and intention. You will learn the correct pronunciation of foundational mantras and develop a personal practice that you can carry with you for life. By the end of this course, you will have a solid understanding of how mantras can bring peace, clarity, and positive transformation into your life.",
    price: 49,
    rating: 4.8,
    reviews: 1254,
    duration: "4 hours",
    lectures: 25,
    level: "Beginner",
    language: "English",
    resources: 10,
    instructor: instructors.rishi,
    curriculum: [
        { title: "Introduction to Sound", lessons: [{title: "The Power of Vibration", duration: "10:00"}, {title: "What is a Mantra?", duration: "12:30"}] },
        { title: "Core Principles", lessons: [{title: "Intention (Sankalpa)", duration: "15:00"}, {title: "The Four Levels of Sound", duration: "18:00"}] },
    ],
    faqs: [
        { question: "Is this course suitable for absolute beginners?", answer: "Yes, this course is designed specifically for those with no prior experience in mantra chanting." },
        { question: "Do I need any special equipment?", answer: "No, all you need is a quiet space and an open mind. A journal for taking notes is recommended." },
    ]
  },
  {
    slug: "ganesha-mantras-for-success",
    title: "Ganesha Mantras for Success",
    category: "Prosperity",
    image: "https://placehold.co/600x400.png",
    aiHint: "ganesha statue",
    description: "Invoke the energy of Ganesha to remove obstacles and attract success in your life.",
    fullDescription: "Lord Ganesha is revered as the remover of obstacles and the lord of new beginnings. In this course, you will learn powerful mantras dedicated to Ganesha to clear your path, overcome challenges, and invite success and prosperity into all areas of your life. We will cover specific mantras for career, relationships, and spiritual growth.",
    price: 79,
    rating: 4.9,
    reviews: 2341,
    duration: "6 hours",
    lectures: 30,
    level: "All Levels",
    language: "English",
    resources: 12,
    instructor: instructors.anjali,
    curriculum: [
        { title: "Understanding Ganesha", lessons: [{title: "Symbolism of Ganesha", duration: "12:00"}, {title: "The Energy of Removal", duration: "14:00"}] },
        { title: "Core Ganesha Mantras", lessons: [{title: "Om Gam Ganapataye Namaha", duration: "20:00"}, {title: "Vakratunda Mahakaya", duration: "18:30"}] },
    ],
    faqs: [
        { question: "How quickly can I see results?", answer: "The effects of mantra practice vary from person to person. Consistency and sincerity are key. Many students report feeling a shift in their energy and perspective within a few weeks." },
    ]
  },
  {
    slug: "mantras-for-healing",
    title: "Mantras for Healing",
    category: "Wellness",
    image: "https://placehold.co/600x400.png",
    aiHint: "healing energy",
    description: "Explore powerful healing mantras to restore balance to your mind, body, and spirit.",
    fullDescription: "Discover the profound healing potential of sound. This course introduces you to specific mantras known for their therapeutic properties, helping to reduce stress, calm the mind, and promote physical well-being. You will learn how to direct healing energy using sound, creating a sanctuary of peace within yourself.",
    price: 99,
    rating: 4.9,
    reviews: 1889,
    duration: "8 hours",
    lectures: 40,
    level: "All Levels",
    language: "English",
    resources: 15,
    instructor: instructors.sanjay,
    curriculum: [
        { title: "Sound as Medicine", lessons: [{title: "The Vagus Nerve and Chanting", duration: "15:00"}, {title: "Mantras for Mental Clarity", duration: "20:00"}] },
        { title: "The Great Healing Mantra", lessons: [{title: "Introduction to Mahamrityunjaya Mantra", duration: "25:00"}] },
    ],
    faqs: [
        { question: "Can mantras cure physical illness?", answer: "Mantra practice is a complementary therapy that can support overall well-being. It is not a substitute for professional medical advice or treatment. It works on the energetic and mental levels to promote an environment conducive to healing." },
    ]
  },
  {
    slug: "advanced-vedic-chanting",
    title: "Advanced Vedic Chanting",
    category: "Advanced",
    image: "https://placehold.co/600x400.png",
    aiHint: "vedic text",
    description: "Deepen your practice with complex Vedic hymns and advanced chanting techniques.",
    fullDescription: "For the experienced practitioner, this course offers a deep dive into the art of Vedic chanting. We will explore complex hymns, intricate rhythmic patterns, and the subtle nuances of Sanskrit pronunciation that unlock the full power of these ancient vibrations. This course requires a foundational understanding of mantra science.",
    price: 149,
    rating: 5.0,
    reviews: 987,
    duration: "12 hours",
    lectures: 50,
    level: "Advanced",
    language: "English",
    resources: 20,
    instructor: instructors.anjali,
    curriculum: [
        { title: "The Rules of Vedic Chanting", lessons: [{title: "Svara and Pitch", duration: "30:00"}] },
        { title: "Complex Hymns", lessons: [{title: "Purusha Suktam", duration: "45:00"}] },
    ],
    faqs: [
        { question: "What are the prerequisites for this course?", answer: "We recommend completing the 'Foundations of Mantra Science' course or having at least one year of consistent mantra chanting experience." },
    ]
  },
  {
    slug: "lakshmi-mantras-for-abundance",
    title: "Lakshmi Mantras for Abundance",
    category: "Prosperity",
    image: "https://placehold.co/600x400.png",
    aiHint: "gold coins",
    description: "Attract wealth and abundance with the sacred sounds dedicated to Goddess Lakshmi.",
    fullDescription: "Tap into the flow of abundance with mantras dedicated to Goddess Lakshmi. This course teaches you how to cultivate an abundance mindset and attract prosperity in all its forms—financial, spiritual, and emotional. Learn the sacred chants to honor Lakshmi and invite her grace into your life.",
    price: 79,
    rating: 4.9,
    reviews: 3102,
    duration: "5 hours",
    lectures: 28,
    level: "All Levels",
    language: "English",
    resources: 11,
    instructor: instructors.rishi,
    curriculum: [
        { title: "The Essence of Abundance", lessons: [{title: "Understanding Lakshmi", duration: "10:00"}] },
        { title: "Core Lakshmi Mantras", lessons: [{title: "Om Shreem Mahalakshmyai Namaha", duration: "20:00"}] },
    ],
    faqs: [
        { question: "Is this course only about financial wealth?", answer: "No. While financial prosperity is an aspect, the course focuses on abundance in all areas of life, including health, relationships, and spiritual fulfillment." },
    ]
  },
  {
    slug: "the-bija-mantras",
    title: "The Bija Mantras",
    category: "Chakras",
    image: "https://placehold.co/600x400.png",
    aiHint: "chakra energy",
    description: "Learn the seed sounds of the chakras to awaken and balance your energy centers.",
    fullDescription: "Bija (seed) mantras are one-syllable sounds that activate the energy of the chakras. In this course, you will learn the specific bija mantra for each of the seven major chakras, how to pronounce them, and how to use them in meditation to cleanse, balance, and awaken your subtle energy system. This is a powerful practice for anyone interested in energy work.",
    price: 99,
    rating: 4.8,
    reviews: 1560,
    duration: "7 hours",
    lectures: 35,
    level: "Intermediate",
    language: "English",
    resources: 18,
    instructor: instructors.sanjay,
    curriculum: [
        { title: "Introduction to Chakras and Bija", lessons: [{title: "The Subtle Body", duration: "15:00"}] },
        { title: "The Seven Bija Mantras", lessons: [{title: "LAM to OM", duration: "30:00"}] },
    ],
    faqs: [
        { question: "What are the benefits of this practice?", answer: "Balancing the chakras through bija mantras can lead to improved emotional stability, increased vitality, greater mental clarity, and deeper spiritual connection." },
    ]
  },
  {
    slug: "gayatri-mantra-masterclass",
    title: "Gayatri Mantra Masterclass",
    category: "Advanced",
    image: "https://placehold.co/600x400.png",
    aiHint: "sunrise meditation",
    description: "Master the pronunciation, meaning, and deep spiritual significance of the Gayatri Mantra.",
    fullDescription: "The Gayatri Mantra is one of the most revered and powerful mantras in the Vedic tradition. This masterclass is a comprehensive deep dive into its every aspect. You will learn the word-by-word meaning, the precise pronunciation, the associated mythology, and the profound philosophical concepts it contains. This course is for those who wish to truly master this sacred chant.",
    price: 199,
    rating: 5.0,
    reviews: 1120,
    duration: "15 hours",
    lectures: 60,
    level: "Advanced",
    language: "English",
    resources: 25,
    instructor: instructors.anjali,
    curriculum: [
        { title: "History and Context", lessons: [{title: "Origin of the Gayatri", duration: "20:00"}] },
        { title: "Deconstructing the Mantra", lessons: [{title: "Word-by-Word Analysis", duration: "60:00"}] },
    ],
    faqs: [
        { question: "Is this course religious?", answer: "While the Gayatri Mantra comes from a specific tradition, this course focuses on its universal principles of light, wisdom, and inner awakening, making it accessible to people from all backgrounds." },
    ]
  },
  {
    slug: "mantras-for-inner-peace",
    title: "Mantras for Inner Peace",
    category: "Wellness",
    image: "https://placehold.co/600x400.png",
    aiHint: "serene landscape",
    description: "Find your center and cultivate profound tranquility with these peace-giving mantras.",
    fullDescription: "In a world of constant stimulation, inner peace is the ultimate luxury. This course provides a toolkit of powerful 'Shanti' (peace) mantras to help you quiet the mind, release anxiety, and cultivate a lasting state of tranquility. Learn to create an oasis of calm that you can access anytime, anywhere, simply through the power of your own voice.",
    price: 69,
    rating: 4.9,
    reviews: 2845,
    duration: "5 hours",
    lectures: 32,
    level: "All Levels",
    language: "English",
    resources: 14,
    instructor: instructors.sanjay,
    curriculum: [
        { title: "The Nature of Peace", lessons: [{title: "Finding Calm in Chaos", duration: "12:00"}] },
        { title: "Powerful Shanti Mantras", lessons: [{title: "Om Shanti Om", duration: "18:00"}] },
    ],
    faqs: [
        { question: "How is this different from regular meditation?", answer: "Mantra meditation uses sound as a focal point, which many people find easier than silent meditation. The vibrations themselves have a calming effect on the nervous system, providing a direct path to a state of peace." },
    ]
  }
];
