
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
    courses as initialCourses, 
    blogPosts as initialBlogPosts, 
    initialAnnouncements,
    Course as CourseType,
    BlogPost as BlogPostType,
    instructors as courseInstructors
} from '@/lib/initial-data';

export type Course = CourseType;
export type BlogPost = BlogPostType;
export const instructors = courseInstructors;

export type Announcement = {
    title: string;
    description: string;
    link: string;
};

interface AppDataContextType {
    courses: Course[];
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
    blogPosts: BlogPost[];
    setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
    announcements: Announcement[];
    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [courses, setCourses] = useState<Course[]>(initialCourses);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
    const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);

    return (
        <AppDataContext.Provider value={{
            courses, setCourses,
            blogPosts, setBlogPosts,
            announcements, setAnnouncements
        }}>
            {children}
        </AppDataContext.Provider>
    );
};

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (context === undefined) {
        throw new Error('useAppData must be used within an AppProvider');
    }
    return context;
};
