
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
  highlights?: {
    title: string;
    description: string;
  }[];
  whoCanAttend?: {
    title: string;
    description: string;
  }[];
  startDate?: string;
};

export const instructors = {
  rishi: {
    name: "Rishi Varma",
    title: "Founder & Lead Instructor",
    image: "https://placehold.co/100x100.png",
    aiHint: "spiritual man portrait",
  },
  anjali: {
    name: "Anjali Devi",
    title: "Vedic Chanting Expert",
    image: "https://placehold.co/100x100.png",
    aiHint: "chanting woman portrait",
  },
  sanjay: {
    name: "Sanjay Rao",
    title: "Nada Yoga Teacher",
    image: "https://placehold.co/100x100.png",
    aiHint: "yoga instructor portrait",
  }
}

// Set a dynamic start date for the first course, 10 days from now at 7 PM
const dynamicStartDate = new Date();
dynamicStartDate.setDate(dynamicStartDate.getDate() + 10);
dynamicStartDate.setHours(19, 0, 0, 0);


export const courses: Course[] = [
  {
    slug: "vedashiksha-introduction-to-vedas",
    title: "Vedashiksha: Introduction to Vedas and the Art of Vedic Chanting",
    category: "Beginner",
    image: "https://placehold.co/600x400.png",
    aiHint: "ancient scroll",
    description: "Duration: 6 months | Classes: 8 per month",
    fullDescription: `Vedashiksha offers a strong foundation in Vedic wisdom, combining authentic study with inner practice. Across 6 months, you’ll explore:
	•	The origin, purpose, and structure of the Vedas
	•	Introduction to the Vedangas—the pillars of Vedic learning
	•	The correct method of Vedic chanting
	•	Deep engagement with select suktas to integrate knowledge and devotion`,
    price: 49,
    rating: 4.8,
    reviews: 1254,
    duration: "6 months",
    lectures: 48,
    level: "All Levels",
    language: "English",
    resources: 1,
    instructor: instructors.rishi,
    startDate: dynamicStartDate.toISOString(),
    highlights: [
        {
            title: "Master the Art of Chanting",
            description: "Learn to chant with clarity and precision, guided by vedangas (axillary sciences) including shadba vijnana, the traditional science of sound. Let each syllable carry purity, power, and presence."
        },
        {
            title: "Go Beyond the Words",
            description: "Study suktas like Dasha Shāntayaḥ, Shraddhā, Medhā, and Prajñā with full Pada-vibhaga (word breakdown), Pada-artha (meanings), and contextual insights—to truly absorb their essence."
        },
        {
            title: "Symbolism & Stories of the Devatās",
            description: "Unveil the deeper meaning behind devatās like Indra, Brahma, Shiva, and the Lingam through puranic tales, iconography, and inner reflections."
        },
        {
            title: "Free E-Guide for Daily Practice",
            description: "Receive a detailed, downloadable guidebook to support your regular chanting—turning every session into a meditative and transformative experience."
        },
        {
            title: "Interactive Q&A + Personal Mentoring",
            description: "Get your questions answered live each week and connect with the Acharya directly for one-on-one guidance via WhatsApp."
        }
    ],
    whoCanAttend: [
        {
            title: "Dharma Enthusiasts",
            description: "Discover the core principles of Sanātana Dharma and how they illuminate a life of clarity, harmony, and purpose."
        },
        {
            title: "Parents & Families",
            description: "Learn and chant together as a family. Build a spiritual routine that strengthens emotional well-being and nurtures sacred values at home."
        },
        {
            title: "Children & Students",
            description: "Daily chanting enhances focus, memory, and emotional grounding. The healing vibrations of the Vedas support inner strength from an early age."
        },
        {
            title: "Teachers & Educators",
            description: "Bring this age-old wisdom into your classrooms. Learn to guide students in chanting while sharing values rooted in culture and tradition."
        },
        {
            title: "Spiritual Seekers",
            description: "Strengthen your sādhanā by understanding the deeper meaning behind mantras and aligning with the sound vibrations of the Vedas."
        },
        {
            title: "Samskrita & Chanting Learners",
            description: "Perfect for beginners and advanced learners alike—refine your pronunciation, rhythm, and meaning through the lens of Shabda Vijnana (science of sound)."
        }
    ],
    curriculum: [
        { title: "Introduction to Vedas", lessons: [{title: "Origin and Purpose", duration: "30:00"}, {title: "Structure of the Vedas", duration: "30:00"}] },
        { title: "The Art of Chanting", lessons: [{title: "Intro to Vedangas", duration: "45:00"}, {title: "Shabda Vijnana", duration: "45:00"}] },
        { title: "Sukta Studies", lessons: [{title: "Dasha Shāntayaḥ", duration: "60:00"}, {title: "Shraddhā & Medhā", duration: "60:00"}] },
    ],
    faqs: [
        { question: "Is this course suitable for absolute beginners?", answer: "Yes, Vedashiksha is open to all sincere seekers regardless of age, background, or experience. Whether you’re just beginning or deepening your journey, you’re warmly welcomed." },
        { question: "What is the time commitment?", answer: "The course runs for 6 months, with 8 classes per month. You will also receive a free e-guide for daily practice to support your learning." },
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
