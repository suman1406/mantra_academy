// Minimal initial data placeholders (cleared sample/default data)

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
};

export const blogPosts: BlogPost[] = [];

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
  // total duration in minutes
  duration: number;
  lectures: number;
  level: string;
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
      // duration in minutes
      durationMinutes: number;
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

export const courses: Course[] = [];

export const initialAnnouncements: any[] = [];
