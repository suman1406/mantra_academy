
export type Course = {
  slug: string;
  title: string;
  category: string;
  image: string;
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

export const instructors: Record<string, { name: string; title: string; image: string }> = {};

// Set a dynamic start date for the first course, 10 days from now at 7 PM
const dynamicStartDate = new Date();
dynamicStartDate.setDate(dynamicStartDate.getDate() + 10);
dynamicStartDate.setHours(19, 0, 0, 0);


export const courses: Course[] = [];

export const initialAnnouncements = [
    {
        title: "New Workshop: The Healing Power of Sound",
        description: "Join us for a transformative 3-day live workshop with Rishi Varma. Limited spots available.",
        link: "#"
    },
    {
        title: "Early-Bird Discount for Foundations Course",
        description: "Enroll in our Foundations of Mantra Science course by the end of the month and receive a 20% discount.",
        link: "/courses"
    },
     {
        title: "Community Meditation This Sunday",
        description: "Join our free global community meditation session this Sunday at 11:00 AM EST. All are welcome.",
        link: "#"
    },
    {
        title: "Advanced Chanting Techniques Webinar",
        description: "A new webinar for our advanced students is scheduled for next month. Sign up now!",
        link: "#"
    }
];
