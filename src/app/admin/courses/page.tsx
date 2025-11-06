
"use client";

import { useState, useEffect, useRef } from "react";
import { Course } from "@/context/AppDataContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2, Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import ProgressBar from "@/components/ui/progress";

const emptyCourse: Omit<Course, 'rating' | 'reviews'> = {
  slug: "", title: "", category: "", featured: false, image: "https://placehold.co/600x400.png", description: "",
  fullDescription: "", price: 0, // duration stored as total minutes
  duration: 0, lectures: 0, level: "Beginner", language: "English",
  instructor: { name: '', title: '', image: 'https://placehold.co/100x100.png' }, curriculum: [], faqs: [], highlights: [], whoCanAttend: [],
  startDate: new Date().toISOString().split('T')[0],
  badges: []
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | Omit<Course, 'rating' | 'reviews'> | null>(null);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [deletingSlugs, setDeletingSlugs] = useState<Record<string, boolean>>({});
  const nestedDebounceRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/courses');
        if (resp.ok) setCourses(await resp.json());
      } catch (err) {
        console.error('Failed to load courses', err);
      }
    })();
    // fetch instructors
    (async () => {
      try {
        const resp = await fetch('/api/instructors');
        if (resp.ok) setInstructors(await resp.json());
      } catch (err) {
        console.error('Failed to load instructors', err);
      }
    })();
  }, []);

  const handleAdd = () => {
    setEditingCourse(JSON.parse(JSON.stringify(emptyCourse)));
    setIsDialogOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(JSON.parse(JSON.stringify(course))); // Deep copy to avoid direct mutation
    setIsDialogOpen(true);
  };

  const handleDelete = (slug: string) => {
    // optimistic delete
    const previous = courses;
    setCourses(courses.filter(c => c.slug !== slug));
    setDeletingSlugs(prev => ({ ...prev, [slug]: true }));
    (async () => {
      try {
        const resp = await fetch(`/api/courses/${encodeURIComponent(slug)}`, { method: 'DELETE', credentials: 'same-origin' });
        if (!resp.ok) {
          throw new Error(await resp.text());
        }
        toast({ title: 'Deleted', description: 'Course removed', });
      } catch (err) {
        console.error('Delete error', err);
        setCourses(previous);
        toast({ title: 'Delete failed', description: 'Could not remove course', });
      } finally {
        setDeletingSlugs(prev => {
          const copy = { ...prev };
          delete copy[slug];
          return copy;
        });
      }
    })();
  };

  const handleSave = () => {
    if (!editingCourse) return;

    // validation
    if (!editingCourse.title || editingCourse.title.trim() === "") {
      toast({ title: 'Validation', description: 'Title is required' });
      return;
    }
    if (typeof editingCourse.price === 'undefined' || Number(editingCourse.price) < 0) {
      toast({ title: 'Validation', description: 'Price must be >= 0' });
      return;
    }
    if (!editingCourse.category || editingCourse.category.trim() === '') {
      toast({ title: 'Validation', description: 'Category is required' });
      return;
    }
    if (!editingCourse.description || editingCourse.description.trim() === '') {
      toast({ title: 'Validation', description: 'Short description is required' });
      return;
    }
    if (!editingCourse.fullDescription || editingCourse.fullDescription.trim() === '') {
      toast({ title: 'Validation', description: 'Full description is required' });
      return;
    }
    if (!editingCourse.image) {
      toast({ title: 'Validation', description: 'Image is required' });
      return;
    }
    if (!editingCourse.level || editingCourse.level.trim() === '') {
      toast({ title: 'Validation', description: 'Level is required' });
      return;
    }
    if (!editingCourse.language || editingCourse.language.trim() === '') {
      toast({ title: 'Validation', description: 'Language is required' });
      return;
    }
    if (!editingCourse.startDate) {
      toast({ title: 'Validation', description: 'Start date is required' });
      return;
    }

    (async () => {
      setIsSaving(true);
      try {
        const isEditing = 'slug' in editingCourse && editingCourse.slug && courses.some(c => c.slug === (editingCourse as Course).slug);
        if (isEditing) {
          const slug = (editingCourse as Course).slug;
          const payload = { ...(editingCourse as any), badges: (editingCourse as any).badges || [] };
          const resp = await fetch(`/api/courses/${encodeURIComponent(slug)}`, { method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          if (!resp.ok) throw new Error('Update failed');
          toast({ title: 'Updated', description: 'Course updated' });
        } else {
          const slug = (editingCourse as any).title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          const newCourse: Course = {
            ...(editingCourse as any),
            slug,
            rating: 0,
            reviews: 0,
            badges: (editingCourse as any).badges || [],
          } as Course;
          const resp = await fetch('/api/courses', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCourse) });
          if (!resp.ok) throw new Error('Create failed');
          toast({ title: 'Created', description: 'Course created' });
        }
        // refresh
        const refreshed = await fetch('/api/courses');
        if (refreshed.ok) setCourses(await refreshed.json());
        setIsDialogOpen(false);
        setEditingCourse(null);
      } catch (err) {
        console.error('Save failed', err);
        toast({ title: 'Save failed', description: 'Could not save course' });
      } finally {
        setIsSaving(false);
      }
    })();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingCourse) return;
    const { name, value } = e.target;
  const isNumber = ['price', 'lectures'].includes(name);
    setEditingCourse({ ...editingCourse, [name]: isNumber ? Number(value) : value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
     if (!editingCourse) return;
     if (name === "instructor") {
    const selectedInstructor = instructors.find((inst: any) => inst.name === value) || { name: value, title: '', image: 'https://placehold.co/100x100.png' };
      setEditingCourse({ ...editingCourse, instructor: selectedInstructor });
     } else {
        setEditingCourse({ ...editingCourse, [name]: value });
     }
  }
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingCourse || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPreviewSrc(dataUrl);
      setIsUploadingImage(true);
      setUploadProgress(0);
      try {
        const json = await import('@/lib/uploadClient').then(m => m.uploadFileToCloudinary(file, { onProgress: (p) => setUploadProgress(p) }));
        setEditingCourse((prev: any) => ({ ...prev, image: { url: json.secure_url || json.url, publicId: json.public_id, format: json.format, width: json.width, height: json.height, bytes: json.bytes } } as any));
      } catch (err) {
        console.error('Upload error', err);
        // keep dataUrl as preview but do not set to model
      } finally {
        setIsUploadingImage(false);
        setUploadProgress(0);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNestedChange = (
    section: 'curriculum' | 'faqs' | 'highlights' | 'whoCanAttend',
    index: number,
    field: string,
    value: any,
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

    // debounce nested lesson title changes to reduce rerenders
    if (subSection === 'lessons') {
      const key = `${section}:${index}:${subIndex}:${field}`;
      if (nestedDebounceRef.current[key]) clearTimeout(nestedDebounceRef.current[key]);
      nestedDebounceRef.current[key] = setTimeout(() => {
        setEditingCourse(newEditingCourse);
        delete nestedDebounceRef.current[key];
      }, 250);
    } else {
      setEditingCourse(newEditingCourse);
    }
  };

  const addNestedItem = (section: 'curriculum' | 'faqs' | 'highlights' | 'whoCanAttend') => {
    if (!editingCourse) return;
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));
    
    const newItem = section === 'curriculum' 
      ? { title: "", lessons: [{ title: "", durationMinutes: 0 }] }
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
    newEditingCourse.curriculum[sectionIndex].lessons.push({ title: "", durationMinutes: 0 });
    setEditingCourse(newEditingCourse);
  }

  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    if (!editingCourse) return;
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));
    newEditingCourse.curriculum[sectionIndex].lessons.splice(lessonIndex, 1);
    setEditingCourse(newEditingCourse);
  }

  // Badges (info-cards) helpers
  const addBadge = (preset?: { title?: string; subtitle?: string; icon?: string }) => {
    if (!editingCourse) return;
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));
    if (!Array.isArray(newEditingCourse.badges)) newEditingCourse.badges = [];
    newEditingCourse.badges.push({ title: preset?.title || '', subtitle: preset?.subtitle || '', icon: preset?.icon || '' });
    setEditingCourse(newEditingCourse);
  };

  const updateBadgeField = (index: number, field: string, value: any) => {
    if (!editingCourse) return;
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));
    if (!Array.isArray(newEditingCourse.badges)) newEditingCourse.badges = [];
    newEditingCourse.badges[index][field] = value;
    setEditingCourse(newEditingCourse);
  };

  const removeBadge = (index: number) => {
    if (!editingCourse) return;
    const newEditingCourse = JSON.parse(JSON.stringify(editingCourse));
    if (!Array.isArray(newEditingCourse.badges)) newEditingCourse.badges = [];
    newEditingCourse.badges.splice(index, 1);
    setEditingCourse(newEditingCourse);
  };

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
                <TableHead>Featured</TableHead>
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
                  <TableCell>{course.featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell>₹{course.price}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(course)} disabled={isSaving}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(course.slug)} disabled={Boolean(deletingSlugs[course.slug])}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
                        <Label htmlFor="featured" className="text-right">Feature on homepage</Label>
                        <div className="col-span-3 flex items-center">
                          <Switch id="featured" checked={Boolean((editingCourse as any).featured)} onCheckedChange={(val) => setEditingCourse({ ...(editingCourse as any), featured: val } as any)} />
                        </div>
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
                            <div className="flex items-center gap-4">
                              <Image src={typeof editingCourse.image === 'string' ? editingCourse.image : (editingCourse as any).image?.url || 'https://placehold.co/600x400.png'} alt="Course image preview" width={128} height={80} className="rounded-md object-cover" />
                              <div className="flex flex-col">
                                <Input id="image-upload" name="image-upload" type="file" onChange={handleImageChange} accept="image/*" className="file:text-primary file:font-semibold" />
                                {isUploadingImage && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <ProgressBar percent={uploadProgress} />
                                    <span className="text-sm">{uploadProgress}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                        </div>
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
              <Select name="instructor" value={editingCourse.instructor?.name || ''} onValueChange={(value) => handleSelectChange('instructor', value)}>
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  {instructors.map(inst => <SelectItem key={inst._id || inst.name} value={inst.name}>{inst.name}</SelectItem>)}
                </SelectContent>
              </Select>
                          </div>
                      </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="grid grid-cols-2 items-center gap-2">
                              <Label htmlFor="duration" className="text-right">Duration (hrs / mins)</Label>
                              <div className="flex gap-2">
                                <Input id="durationHours" name="durationHours" type="number" value={String(Math.floor((editingCourse.duration || 0)/60))} onChange={(e) => {
                                  const h = Number(e.target.value || 0);
                                  const mins = Number(editingCourse.duration || 0) % 60;
                                  setEditingCourse({ ...editingCourse, duration: h * 60 + mins });
                                }} className="w-20" />
                                <Input id="durationMins" name="durationMins" type="number" value={String((editingCourse.duration || 0) % 60)} onChange={(e) => {
                                  const m = Number(e.target.value || 0);
                                  const hrs = Math.floor((editingCourse.duration || 0)/60);
                                  setEditingCourse({ ...editingCourse, duration: hrs * 60 + m });
                                }} className="w-20" />
                              </div>
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
                      </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
               {/* Curriculum */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold">Curriculum</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                    {editingCourse.curriculum?.map((section: any, sectionIndex: number) => (
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
                            {section.lessons.map((lesson: any, lessonIndex: number) => {
                            const minutes = Number(lesson.durationMinutes || 0);
                            const hours = Math.floor(minutes / 60);
                            const mins = minutes % 60;
                            return (
                            <div key={lessonIndex} className="flex items-center gap-2 ml-4 mb-2">
                            <Input
                                placeholder="Lesson Title"
                                value={lesson.title}
                                onChange={(e) => handleNestedChange('curriculum', sectionIndex, 'title', e.target.value, 'lessons', lessonIndex)}
                            />
                            <div className="flex gap-1">
                              <Input
                                placeholder="hrs"
                                type="number"
                                min={0}
                                value={String(hours)}
                                onChange={(e) => {
                                  const h = Number(e.target.value || 0);
                                  const total = h * 60 + mins;
                                  handleNestedChange('curriculum', sectionIndex, 'durationMinutes', total, 'lessons', lessonIndex);
                                }}
                                className="w-16"
                              />
                              <Input
                                placeholder="mins"
                                type="number"
                                min={0}
                                max={59}
                                value={String(mins)}
                                onChange={(e) => {
                                  const m = Number(e.target.value || 0);
                                  const total = hours * 60 + m;
                                  handleNestedChange('curriculum', sectionIndex, 'durationMinutes', total, 'lessons', lessonIndex);
                                }}
                                className="w-20"
                              />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeLesson(sectionIndex, lessonIndex)}><X className="h-4 w-4 text-destructive" /></Button>
                            </div>
                            )})}
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

              {/* Badges / Info Cards */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold">Badges / Info Cards</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Quick add:</p>
                      <Button variant="outline" size="sm" onClick={() => addBadge({ title: 'Live Recordings', subtitle: 'Available for 30 days (1080P)', icon: '🎥' })}><Plus className="h-4 w-4 mr-2" />Recordings</Button>
                      <Button variant="outline" size="sm" onClick={() => addBadge({ title: 'Live Practice Timings', subtitle: '7:00 PM - 8:15 PM IST', icon: '🕘' })}><Plus className="h-4 w-4 mr-2" />Timings</Button>
                      <Button variant="outline" size="sm" onClick={() => addBadge({ title: 'If not Happy', subtitle: '100% money back*', icon: '✅' })}><Plus className="h-4 w-4 mr-2" />Guarantee</Button>
                    </div>

                    {(editingCourse.badges || []).map((b: any, i: number) => (
                      <Card key={i} className="p-4 bg-muted/50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="w-full grid grid-cols-3 gap-3">
                            <Input placeholder="Title" value={b.title} onChange={e => updateBadgeField(i, 'title', e.target.value)} />
                            <Input placeholder="Subtitle" value={b.subtitle || ''} onChange={e => updateBadgeField(i, 'subtitle', e.target.value)} />
                            <Input placeholder="Icon (name)" value={b.icon || ''} onChange={e => updateBadgeField(i, 'icon', e.target.value)} />
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => removeBadge(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => addBadge()}><Plus className="h-4 w-4 mr-2" />Add Badge</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <DialogClose asChild><Button variant="outline" disabled={isSaving}>Cancel</Button></DialogClose>
            <Button onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
