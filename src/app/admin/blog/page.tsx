
"use client";

import { useState, useEffect, useRef } from "react";
import { BlogPost } from "@/context/AppDataContext";
import { renderMarkdownToHtml } from "@/lib/markdown";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProgressBar from "@/components/ui/progress";

const emptyPost: Omit<BlogPost, "slug"> = {
  title: "",
  author: "",
    date: new Date().toISOString().split('T')[0],
  excerpt: "",
  content: "",
  image: "https://placehold.co/800x600.png",
};

export default function AdminBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | Omit<BlogPost, 'slug'> | null>(null);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [deletingSlugs, setDeletingSlugs] = useState<Record<string, boolean>>({});
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/blogs');
        if (resp.ok) setBlogPosts(await resp.json());
      } catch (err) {
        console.error('Failed to load blog posts', err);
      }
    })();
  }, []);

  const handleAdd = () => {
    setEditingPost({ ...emptyPost, date: new Date().toLocaleDateString('en-CA') });
    setIsDialogOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    // preview existing image
    const img = (post as any).image;
    if (!img) setPreviewSrc(null);
    else if (typeof img === 'string') setPreviewSrc(img);
    else setPreviewSrc(img?.url || img?.secure_url || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (slug: string) => {
    // optimistic
    const previous = blogPosts;
    setBlogPosts(blogPosts.filter(p => p.slug !== slug));
    setDeletingSlugs(prev => ({ ...prev, [slug]: true }));
    (async () => {
      try {
        const resp = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, { method: 'DELETE', credentials: 'same-origin' });
        if (!resp.ok) throw new Error(await resp.text());
        toast({ title: 'Deleted', description: 'Post removed' });
      } catch (err) {
        console.error('Delete error', err);
        setBlogPosts(previous);
        toast({ title: 'Delete failed', description: 'Could not remove post' });
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
    if (!editingPost) return;
    // simple validation
    if (!editingPost.title || editingPost.title.trim() === '') {
      toast({ title: 'Validation', description: 'Title is required' });
      return;
    }
    (async () => {
      setIsSaving(true);
      try {
        const isEditing = 'slug' in editingPost && !!(editingPost as any).slug;
        if (isEditing) {
          const slug = (editingPost as BlogPost).slug;
          const resp = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, { method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingPost) });
          if (!resp.ok) {
            const text = await resp.text();
            console.error('Update failed:', resp.status, text);
            throw new Error(text || 'Update failed');
          }
          toast({ title: 'Updated', description: 'Post updated' });
        } else {
          const newPost = { ...(editingPost as any), slug: (editingPost as any).title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') };
          const resp = await fetch('/api/blogs', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newPost) });
          if (!resp.ok) {
            const text = await resp.text();
            console.error('Create failed:', resp.status, text);
            throw new Error(text || 'Create failed');
          }
          toast({ title: 'Created', description: 'Post created' });
        }
        // refresh list
        const refreshed = await fetch('/api/blogs');
        if (refreshed.ok) setBlogPosts(await refreshed.json());
        setIsDialogOpen(false);
        setEditingPost(null);
      } catch (err) {
        console.error('Save failed', err);
        toast({ title: 'Save failed', description: 'Could not save post' });
      } finally {
        setIsSaving(false);
      }
    })();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingPost) return;
    const { name, value } = e.target;
    setEditingPost({ ...editingPost, [name]: value });
  };

  // Markdown toolbar helpers
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const wrapSelection = (before: string, after?: string) => {
    if (!contentRef.current || !editingPost) return;
    const ta = contentRef.current;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end);
    const wrapAfter = typeof after === 'undefined' ? before : after;
    const newValue = ta.value.substring(0, start) + before + selected + wrapAfter + ta.value.substring(end);
    setEditingPost({ ...editingPost, content: newValue });
    // put caret after inserted text
    requestAnimationFrame(() => {
      const pos = start + before.length + selected.length + wrapAfter.length;
      ta.focus();
      ta.setSelectionRange(pos, pos);
    });
  };

  const insertLink = () => {
    if (!contentRef.current || !editingPost) return;
    const ta = contentRef.current;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end) || 'link text';
    const url = 'https://';
    const newValue = ta.value.substring(0, start) + `[${selected}](${url})` + ta.value.substring(end);
    setEditingPost({ ...editingPost, content: newValue });
    requestAnimationFrame(() => {
      const pos = start + (`[${selected}](${url})`).length;
      ta.focus();
      ta.setSelectionRange(pos, pos);
    });
  };

  const insertUnorderedList = () => {
    if (!contentRef.current || !editingPost) return;
    const ta = contentRef.current;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end) || '';
    const lines = selected.split(/\r?\n/);
    const wrapped = lines.map(ln => ln.trim() ? `- ${ln}` : '').join('\n');
    const newValue = ta.value.substring(0, start) + wrapped + ta.value.substring(end);
    setEditingPost({ ...editingPost, content: newValue });
  };

  const insertOrderedList = () => {
    if (!contentRef.current || !editingPost) return;
    const ta = contentRef.current;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end) || '';
    const lines = selected.split(/\r?\n/);
    let counter = 1;
    const wrapped = lines.map(ln => ln.trim() ? `${counter++}. ${ln}` : '').join('\n');
    const newValue = ta.value.substring(0, start) + wrapped + ta.value.substring(end);
    setEditingPost({ ...editingPost, content: newValue });
  };

  const insertBlockquote = () => {
    if (!contentRef.current || !editingPost) return;
    const ta = contentRef.current;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end) || '';
    const lines = selected.split(/\r?\n/);
    const wrapped = lines.map(ln => ln.trim() ? `> ${ln}` : '>').join('\n');
    const newValue = ta.value.substring(0, start) + wrapped + ta.value.substring(end);
    setEditingPost({ ...editingPost, content: newValue });
  };

  const insertCodeBlock = () => {
    if (!contentRef.current || !editingPost) return;
    const ta = contentRef.current;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end) || '';
    const wrapped = '```\n' + selected + '\n```\n';
    const newValue = ta.value.substring(0, start) + wrapped + ta.value.substring(end);
    setEditingPost({ ...editingPost, content: newValue });
  };

  const insertHR = () => {
    if (!contentRef.current || !editingPost) return;
    const ta = contentRef.current;
    const pos = ta.selectionEnd || ta.value.length;
    const newValue = ta.value.substring(0, pos) + '\n---\n' + ta.value.substring(pos);
    setEditingPost({ ...editingPost, content: newValue });
  };

  const [previewVisible, setPreviewVisible] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPreviewSrc(dataUrl);
      setIsUploadingImage(true);
      setUploadProgress(0);
      try {
  const json = await import('@/lib/uploadClient').then(m => m.uploadFileToCloudinary(file, { onProgress: (p) => setUploadProgress(p) }));
  setEditingPost((prev: any) => ({ ...prev, image: { url: json.secure_url || json.url, publicId: json.public_id, format: json.format, width: json.width, height: json.height, bytes: json.bytes } } as any));
        toast({ title: 'Image uploaded', description: 'Image uploaded successfully' });
      } catch (err) {
        console.error('Upload error', err);
        toast({ title: 'Upload failed', description: 'Could not upload image' });
      } finally {
        setIsUploadingImage(false);
        setUploadProgress(0);
      }
    };
    reader.readAsDataURL(file);
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
                  <TableCell>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(post.date))}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(post)} disabled={isSaving}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(post.slug)} disabled={Boolean(deletingSlugs[post.slug])}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
                <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="content" className="text-right">Content</Label>
                    <div className="col-span-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Button size="sm" variant="ghost" onClick={() => wrapSelection('**', '**')}>Bold</Button>
                                        <Button size="sm" variant="ghost" onClick={() => wrapSelection('*', '*')}>Italic</Button>
                                        <Button size="sm" variant="ghost" onClick={() => wrapSelection('### ', '\n')}>Heading</Button>
                                        <Button size="sm" variant="ghost" onClick={insertLink}>Link</Button>
                                        <Button size="sm" variant="ghost" onClick={() => insertUnorderedList()}>UL</Button>
                                        <Button size="sm" variant="ghost" onClick={() => insertOrderedList()}>OL</Button>
                                        <Button size="sm" variant="ghost" onClick={() => insertBlockquote()}>Quote</Button>
                                        <Button size="sm" variant="ghost" onClick={() => insertCodeBlock()}>Code</Button>
                                        <Button size="sm" variant="ghost" onClick={() => insertHR()}>HR</Button>
                                        <Button size="sm" variant="ghost" onClick={() => setPreviewVisible(v => !v)}>{previewVisible ? 'Edit' : 'Preview'}</Button>
                                      </div>
                      <Textarea id="content" name="content" ref={contentRef as any} value={editingPost.content} onChange={handleChange} className="h-48" />
                      {previewVisible && (
                        <div className="mt-3 prose max-w-none p-4 rounded bg-muted/5 border border-border" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(editingPost.content || '') }} />
                      )}
                    </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageFile" className="text-right">Image</Label>
                    <div className="col-span-3 flex items-center gap-4">
                      <input id="imageFile" type="file" accept="image/*" onChange={handleFileChange} />
                      {isUploadingImage ? (
                        <div className="flex items-center gap-3">
                          <ProgressBar percent={uploadProgress} />
                          <span className="text-sm">{uploadProgress}%</span>
                        </div>
                      ) : (
                        previewSrc ? <img src={previewSrc} alt="preview" className="h-24 w-32 object-cover rounded" /> : (
                          editingPost?.image ? <img src={typeof editingPost.image === 'string' ? editingPost.image : (editingPost as any).image?.url} alt="current" className="h-24 w-32 object-cover rounded" /> : null
                        )
                      )}
                    </div>
                </div>
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
