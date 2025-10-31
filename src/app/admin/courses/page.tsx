
"use client";

import { useState } from "react";
import { useAppData, Course, instructors as allInstructors } from "@/context/AppDataContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

const emptyCourse: Omit<Course, 'rating' | 'reviews'> = {
  slug: "", title: "", category: "", image: "https://placehold.co/600x400.png", aiHint: "", description: "",
  fullDescription: "", price: 0, duration: "", lectures: 0, level: "All Levels", language: "English",
  resources: 0, instructor: allInstructors.rishi, curriculum: [], faqs: [], highlights: [], whoCanAttend: [],
  startDate: new Date().toISOString().split('T')[0],
};

export default function AdminCoursesPage() {
  const { courses, setCourses } = useAppData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | Omit<Course, 'rating' | 'reviews'> | null>(null);

  const handleAdd = () => {
    setEditingCourse(JSON.parse(JSON.stringify(emptyCourse)));
    setIsDialogOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(JSON.parse(JSON.stringify(course))); // Deep copy to avoid direct mutation
    setIsDialogOpen(true);
  };

  const handleDelete = (slug: string) => {
    setCourses(courses.filter(c => c.slug !== slug));
  };

  const handleSave = () => {
    if (!editingCourse) return;

    const isEditing = 'slug' in editingCourse && editingCourse.slug && courses.some(c => c.slug === editingCourse.slug);

    if (isEditing) {
      setCourses(courses.map(c => (c.slug === (editingCourse as Course).slug ? (editingCourse as Course) : c)));
    } else {
       const slug = editingCourse.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const newCourse: Course = {
        ...editingCourse,
        slug: slug,
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
    const isNumber = ['price', 'lectures', 'resources'].includes(name);
    setEditingCourse({ ...editingCourse, [name]: isNumber ? Number(value) : value });
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
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingCourse || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditingCourse({ ...editingCourse, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleNestedChange = (
    section: 'curriculum' | 'faqs' | 'highlights' | 'whoCanAttend',
    index: number,
    field: string,
    value: string,
    subSection?: 'lessons',
    subIndex?: number
  ) => {
    if (!editingCourse) return;
    
    // Create a deep copy to avoid direct state mutation
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));

    if (subSection && subIndex !== undefined && newEditingCourse[section][index][subSection]) {
        newEditingCourse[section][index][subSection][subIndex][field] = value;
    } else {
        newEditingCourse[section][index][field] = value;
    }
    
    setEditingCourse(newEditingCourse);
  };

  const addNestedItem = (section: 'curriculum' | 'faqs' | 'highlights' | 'whoCanAttend') => {
    if (!editingCourse) return;
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));
    
    const newItem = section === 'curriculum' 
      ? { title: "", lessons: [{ title: "", duration: "" }] }
      : section === 'faqs'
      ? { question: "", answer: "" }
      : section === 'highlights' || section === 'whoCanAttend'
      ? { title: "", description: "" }
      : {}; // Fallback for safety

    newEditingCourse[section].push(newItem);
    setEditingCourse(newEditingCourse);
  };
  
  const removeNestedItem = (section: 'curriculum' | 'faqs' | 'highlights' | 'whoCanAttend', index: number) => {
    if (!editingCourse) return;
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));
    newEditingCourse[section].splice(index, 1);
    setEditingCourse(newEditingCourse);
  };
  
  const addLesson = (sectionIndex: number) => {
    if (!editingCourse) return;
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));
    newEditingCourse.curriculum[sectionIndex].lessons.push({ title: "", duration: "" });
    setEditingCourse(newEditingCourse);
  }

  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    if (!editingCourse) return;
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));
    newEditingCourse.curriculum[sectionIndex].lessons.splice(lessonIndex, 1);
    setEditingCourse(newEditingCourse);
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
                  <TableCell>₹{course.price}</TableCell>
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingCourse && 'slug' in editingCourse && editingCourse.slug ? 'Edit Course' : 'Add New Course'}</DialogTitle>
          </DialogHeader>
          {editingCourse && (
            <ScrollArea className="max-h-[80vh] pr-6">
            <div className="grid gap-6 py-4 ">
              {/* Basic Info */}
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold">Basic Information</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
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
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Image</Label>
                        <div className="col-span-3 flex items-center gap-4">
                            <Image src={editingCourse.image} alt="Course image preview" width={128} height={80} className="rounded-md object-cover" />
                            <Input id="image" name="image" type="file" onChange={handleImageChange} accept="image/*" className="col-span-3 file:text-primary file:font-semibold" />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="aiHint" className="text-right">AI Hint</Label>
                        <Input id="aiHint" name="aiHint" value={editingCourse.aiHint} onChange={handleChange} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 items-center gap-2">
                           <Label htmlFor="price" className="text-right">Price (₹)</Label>
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
                            <Label htmlFor="startDate" className="text-right">Start Date</Label>
                            <Input id="startDate" name="startDate" type="date" value={editingCourse.startDate?.split('T')[0]} onChange={handleChange} />
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
                        <div className="grid grid-cols-2 gap-4">
                         <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="duration" className="text-right">Duration</Label>
                            <Input id="duration" name="duration" value={editingCourse.duration} onChange={handleChange} />
                        </div>
                         <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="lectures" className="text-right">Lectures</Label>
                            <Input id="lectures" name="lectures" type="number" value={editingCourse.lectures} onChange={handleChange} />
                        </div>
                      </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="language" className="text-right">Language</Label>
                            <Input id="language" name="language" value={editingCourse.language} onChange={handleChange} />
                        </div>
                         <div className="grid grid-cols-2 items-center gap-2">
                            <Label htmlFor="resources" className="text-right">Resources</Label>
                            <Input id="resources" name="resources" type="number" value={editingCourse.resources} onChange={handleChange} />
                        </div>
                      </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
               {/* Curriculum */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">Curriculum</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                    {editingCourse.curriculum?.map((section, sectionIndex) => (
                        <Card key={sectionIndex} className="p-4 bg-muted/50">
                        <div className="flex justify-between items-center mb-2">
                            <Input
                            placeholder="Section Title"
                            value={section.title}
                            onChange={(e) => handleNestedChange('curriculum', sectionIndex, 'title', e.target.value)}
                            className="font-semibold"
                            />
                            <Button variant="ghost" size="icon" onClick={() => removeNestedItem('curriculum', sectionIndex)}><X className="h-4 w-4" /></Button>
                        </div>
                        {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center gap-2 ml-4 mb-2">
                            <Input
                                placeholder="Lesson Title"
                                value={lesson.title}
                                onChange={(e) => handleNestedChange('curriculum', sectionIndex, 'title', e.target.value, 'lessons', lessonIndex)}
                            />
                            <Input
                                placeholder="Duration (e.g., 30:00)"
                                value={lesson.duration}
                                onChange={(e) => handleNestedChange('curriculum', sectionIndex, 'duration', e.target.value, 'lessons', lessonIndex)}
                                className="w-32"
                            />
                            <Button variant="ghost" size="icon" onClick={() => removeLesson(sectionIndex, lessonIndex)}><X className="h-4 w-4 text-destructive" /></Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => addLesson(sectionIndex)} className="ml-4 mt-2"><Plus className="h-4 w-4 mr-2" />Add Lesson</Button>
                        </Card>
                    ))}
                    <Button variant="outline" onClick={() => addNestedItem('curriculum')}><Plus className="h-4 w-4 mr-2" />Add Section</Button>
                    </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Other Sections */}
              {(['highlights', 'whoCanAttend', 'faqs'] as const).map(sectionName => (
                  <Accordion key={sectionName} type="single" collapsible>
                      <AccordionItem value="item-1">
                          <AccordionTrigger className="font-semibold capitalize">{sectionName.replace(/([A-Z])/g, ' $1')}</AccordionTrigger>
                          <AccordionContent className="space-y-2 pt-4">
                               {editingCourse[sectionName]?.map((item: any, index: number) => (
                                <Card key={index} className="p-4 bg-muted/50">
                                    <div className="flex justify-end">
                                      <Button variant="ghost" size="icon" onClick={() => removeNestedItem(sectionName, index)}><X className="h-4 w-4 text-destructive" /></Button>
                                    </div>
                                    <div className="grid gap-2">
                                        <Input 
                                            placeholder={sectionName === 'faqs' ? 'Question' : 'Title'}
                                            value={sectionName === 'faqs' ? item.question : item.title}
                                            onChange={e => handleNestedChange(sectionName, index, sectionName === 'faqs' ? 'question' : 'title', e.target.value)}
                                        />
                                        <Textarea 
                                            placeholder={sectionName === 'faqs' ? 'Answer' : 'Description'}
                                            value={sectionName === 'faqs' ? item.answer : item.description}
                                            onChange={e => handleNestedChange(sectionName, index, sectionName === 'faqs' ? 'answer' : 'description', e.target.value)}
                                        />
                                    </div>
                                </Card>
                               ))}
                               <Button variant="outline" onClick={() => addNestedItem(sectionName)}><Plus className="h-4 w-4 mr-2" />Add Item</Button>
                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              ))}

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

    