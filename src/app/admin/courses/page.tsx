
"use client";

import { useState } from "react";
import { courses as initialCourses, Course, instructors as allInstructors } from "@/lib/course-data";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const emptyCourse: Omit<Course, 'rating' | 'reviews'> = {
  slug: "", title: "", category: "", image: "https://placehold.co/600x400.png", aiHint: "", description: "",
  fullDescription: "", price: 0, duration: "", lectures: 0, level: "All Levels", language: "English",
  resources: 0, instructor: allInstructors.rishi, curriculum: [], faqs: [], highlights: [], whoCanAttend: []
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | Omit<Course, 'rating' | 'reviews'> | null>(null);

  const handleAdd = () => {
    setEditingCourse(emptyCourse);
    setIsDialogOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setIsDialogOpen(true);
  };

  const handleDelete = (slug: string) => {
    setCourses(courses.filter(c => c.slug !== slug));
  };

  const handleSave = () => {
    if (!editingCourse) return;

    const isEditing = 'slug' in editingCourse && courses.some(c => c.slug === editingCourse.slug);

    if (isEditing) {
      setCourses(courses.map(c => (c.slug === (editingCourse as Course).slug ? (editingCourse as Course) : c)));
    } else {
      // For new course, generate slug and add rating/reviews
      const newCourse: Course = {
        ...editingCourse,
        slug: editingCourse.title.toLowerCase().replace(/\s+/g, '-'),
        rating: 0,
        reviews: 0,
      } as Course;
      setCourses([newCourse, ...courses]);
    }
    setIsDialogOpen(false);
    setEditingCourse(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingCourse) return;
    const { name, value } = e.target;
    setEditingCourse({ ...editingCourse, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
     if (!editingCourse) return;
     if (name === "instructor") {
         const selectedInstructor = Object.values(allInstructors).find(inst => inst.name === value) || allInstructors.rishi;
         setEditingCourse({ ...editingCourse, instructor: selectedInstructor });
     } else {
        setEditingCourse({ ...editingCourse, [name]: value });
     }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Manage Courses</CardTitle>
                <CardDescription>Add, edit, or delete courses offered by the academy.</CardDescription>
            </div>
            <Button onClick={handleAdd}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Course
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.slug}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(course)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(course.slug)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingCourse && 'slug' in editingCourse && courses.some(c => c.slug === editingCourse.slug) ? 'Edit Course' : 'Add New Course'}</DialogTitle>
          </DialogHeader>
          {editingCourse && (
            <ScrollArea className="max-h-[70vh] pr-6">
            <div className="grid gap-4 py-4 ">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" name="title" value={editingCourse.title} onChange={handleChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input id="category" name="category" value={editingCourse.category} onChange={handleChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Short Desc</Label>
                <Textarea id="description" name="description" value={editingCourse.description} onChange={handleChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullDescription" className="text-right">Full Desc</Label>
                <Textarea id="fullDescription" name="fullDescription" value={editingCourse.fullDescription} onChange={handleChange} className="col-span-3 h-32" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 items-center gap-2">
                    <Label htmlFor="price" className="text-right">Price</Label>
                    <Input id="price" name="price" type="number" value={editingCourse.price} onChange={handleChange} />
                </div>
                 <div className="grid grid-cols-2 items-center gap-2">
                    <Label htmlFor="level" className="text-right">Level</Label>
                    <Select name="level" value={editingCourse.level} onValueChange={(value) => handleSelectChange('level', value)}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All Levels">All Levels</SelectItem>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="grid grid-cols-2 items-center gap-2">
                    <Label htmlFor="duration" className="text-right">Duration</Label>
                    <Input id="duration" name="duration" value={editingCourse.duration} onChange={handleChange} />
                </div>
                 <div className="grid grid-cols-2 items-center gap-2">
                    <Label htmlFor="instructor" className="text-right">Instructor</Label>
                    <Select name="instructor" value={editingCourse.instructor.name} onValueChange={(value) => handleSelectChange('instructor', value)}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            {Object.values(allInstructors).map(inst => <SelectItem key={inst.name} value={inst.name}>{inst.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                 </div>
              </div>
            </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
