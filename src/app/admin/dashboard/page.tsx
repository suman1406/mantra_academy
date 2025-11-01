
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const RupeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 3h12" />
        <path d="M6 8h12" />
        <path d="M6 13h10" />
        <path d="m14 13 5 8" />
        <path d="M6 21h12" />
    </svg>
)


export default function AdminDashboard() {
  const [coursesCount, setCoursesCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [annCount, setAnnCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [c, b, a] = await Promise.all([
          fetch('/api/courses').then(r => r.ok ? r.json() : []),
          fetch('/api/blogs').then(r => r.ok ? r.json() : []),
          fetch('/api/announcements').then(r => r.ok ? r.json() : []),
        ]);
        setCoursesCount(Array.isArray(c) ? c.length : 0);
        setPostsCount(Array.isArray(b) ? b.length : 0);
        setAnnCount(Array.isArray(a) ? a.length : 0);
      } catch (err) {
        console.error('Failed to load dashboard counts', err);
      }
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <h1 className="text-3xl font-headline font-bold text-primary mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coursesCount}</div>
            <p className="text-xs text-muted-foreground">courses currently offered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postsCount}</div>
            <p className="text-xs text-muted-foreground">posts published</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{annCount}</div>
            <p className="text-xs text-muted-foreground">active announcements</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Welcome, Admin!</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">You can manage your courses, blog posts, and announcements from the navigation on the left.</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
