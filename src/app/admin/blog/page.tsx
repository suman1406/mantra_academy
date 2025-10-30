
"use client";

import { useState } from "react";
import { useAppData, BlogPost } from "@/context/AppDataContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const emptyPost: Omit<BlogPost, "slug"> = {
  title: "",
  author: "",
  date: new Date().toISOString().split('T')[0],
  excerpt: "",
  content: "",
  image: "https://placehold.co/800x600.png",
  aiHint: "",
};

export default function AdminBlogPage() {
  const { blogPosts, setBlogPosts } = useAppData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | Omit<BlogPost, 'slug'> | null>(null);

  const handleAdd = () => {
    setEditingPost({ ...emptyPost, date: new Date().toLocaleDateString('en-CA') });
    setIsDialogOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const handleDelete = (slug: string) => {
    setBlogPosts(blogPosts.filter(p => p.slug !== slug));
  };

  const handleSave = () => {
    if (!editingPost) return;

    const isEditing = 'slug' in editingPost && blogPosts.some(p => p.slug === editingPost.slug);

    if (isEditing) {
      setBlogPosts(blogPosts.map(p => (p.slug === (editingPost as BlogPost).slug ? (editingPost as BlogPost) : p)));
    } else {
      const newPost: BlogPost = {
        ...editingPost,
        slug: editingPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      } as BlogPost;
      setBlogPosts([newPost, ...blogPosts]);
    }
    setIsDialogOpen(false);
    setEditingPost(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingPost) return;
    const { name, value } = e.target;
    setEditingPost({ ...editingPost, [name]: value });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Manage Blog Posts</CardTitle>
                <CardDescription>Add, edit, or delete articles on the website.</CardDescription>
            </div>
            <Button onClick={handleAdd}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Post
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogPosts.map((post) => (
                <TableRow key={post.slug}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.slug)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
            <DialogTitle>{editingPost && 'slug' in editingPost && editingPost.slug ? 'Edit Post' : 'Add New Post'}</DialogTitle>
          </DialogHeader>
          {editingPost && (
             <ScrollArea className="max-h-[70vh] pr-6">
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" name="title" value={editingPost.title} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">Author</Label>
                    <Input id="author" name="author" value={editingPost.author} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">Date</Label>
                    <Input id="date" name="date" type="date" value={editingPost.date} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="excerpt" className="text-right">Excerpt</Label>
                    <Textarea id="excerpt" name="excerpt" value={editingPost.excerpt} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content" className="text-right">Content</Label>
                    <Textarea id="content" name="content" value={editingPost.content} onChange={handleChange} className="col-span-3 h-48" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">Image URL</Label>
                    <Input id="image" name="image" value={editingPost.image} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="aiHint" className="text-right">AI Hint</Label>
                    <Input id="aiHint" name="aiHint" value={editingPost.aiHint} onChange={handleChange} className="col-span-3" />
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
