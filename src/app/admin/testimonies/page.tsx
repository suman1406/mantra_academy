"use client";

import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";

const emptyWord = { name: "", title: "", feedback: "", image: "https://placehold.co/120x120.png", featured: false };

export default function AdminTestimoniesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Record<string, boolean>>({});
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/testimonies');
        if (resp.ok) setItems(await resp.json());
      } catch (err) {
        console.error('Failed to load testimonies', err);
      }
    })();
  }, []);

  const handleAdd = () => {
    setEditing({ ...emptyWord });
    setPreviewSrc(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditing(item);
    const img = item?.image;
    if (!img) setPreviewSrc(null);
    else if (typeof img === 'string') setPreviewSrc(img);
    else setPreviewSrc(img?.url || img?.secure_url || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const previous = items;
    setItems(items.filter(i => i._id !== id));
    setDeletingIds(prev => ({ ...prev, [id]: true }));
    (async () => {
      try {
        const resp = await fetch(`/api/testimonies/${encodeURIComponent(id)}`, { method: 'DELETE', credentials: 'same-origin' });
        if (!resp.ok) throw new Error(await resp.text());
        toast({ title: 'Deleted', description: 'Item removed' });
      } catch (err) {
        console.error('Delete error', err);
        setItems(previous);
        toast({ title: 'Delete failed', description: 'Could not remove item' });
      } finally {
        setDeletingIds(prev => { const copy = { ...prev }; delete copy[id]; return copy; });
      }
    })();
  };

  const handleSave = () => {
    if (!editing) return;
    if (!editing.name || editing.name.trim() === '') { toast({ title: 'Validation', description: 'Name is required' }); return; }
    if (!editing.feedback || editing.feedback.trim() === '') { toast({ title: 'Validation', description: 'Feedback is required' }); return; }
    (async () => {
      setIsSaving(true);
      try {
        const isEditing = !!editing._id;
        if (isEditing) {
          const id = editing._id;
          const resp = await fetch(`/api/testimonies/${encodeURIComponent(id)}`, { method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
          if (!resp.ok) throw new Error('Update failed');
          toast({ title: 'Updated', description: 'Item updated' });
        } else {
          const resp = await fetch('/api/testimonies', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
          if (!resp.ok) throw new Error('Create failed');
          toast({ title: 'Created', description: 'Item created' });
        }
        const refreshed = await fetch('/api/testimonies');
        if (refreshed.ok) setItems(await refreshed.json());
        setIsDialogOpen(false);
        setEditing(null);
      } catch (err) {
        console.error('Save failed', err);
        toast({ title: 'Save failed', description: 'Could not save item' });
      } finally {
        setIsSaving(false);
      }
    })();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editing) return;
    const { name, value } = e.target;
    setEditing({ ...editing, [name]: value });
  };

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
        setEditing((prev: any) => ({ ...prev, image: { url: json.secure_url || json.url, publicId: json.public_id, format: json.format, width: json.width, height: json.height, bytes: json.bytes } }));
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

  const toggleFeatured = (val: boolean) => {
    if (!editing) return;
    setEditing({ ...editing, featured: val });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Testimonies</CardTitle>
                <CardDescription>Manage testimonies and choose which ones are featured on the homepage.</CardDescription>
            </div>
            <Button onClick={handleAdd}><PlusCircle className="mr-2 h-4 w-4"/> Add</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((it) => (
                <TableRow key={it._id || it.name}>
                  <TableCell className="font-medium">{it.name}</TableCell>
                  <TableCell>{it.title}</TableCell>
                  <TableCell>{it.featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(it)} disabled={isSaving}><Edit className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(it._id)} disabled={Boolean(deletingIds[it._id])}><Trash2 className="h-4 w-4 text-destructive"/></Button>
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
            <DialogTitle>{editing && editing._id ? 'Edit' : 'Add'}</DialogTitle>
          </DialogHeader>
          {editing && (
            <ScrollArea className="max-h-[70vh] pr-6">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" value={editing.name} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title / Position</Label>
                  <Input id="title" name="title" value={editing.title} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="feedback" className="text-right">Feedback</Label>
                  <Textarea id="feedback" name="feedback" value={editing.feedback} onChange={handleChange} className="col-span-3" />
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
                      previewSrc ? <img src={previewSrc} alt="preview" className="h-16 w-16 object-cover rounded" /> : (
                        editing?.image ? <img src={typeof editing.image === 'string' ? editing.image : editing.image?.url} alt="current" className="h-16 w-16 object-cover rounded" /> : null
                      )
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="featured" className="text-right">Featured on Home</Label>
                  <div className="col-span-3">
                    <Switch checked={Boolean(editing.featured)} onCheckedChange={(v) => toggleFeatured(Boolean(v))} />
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
