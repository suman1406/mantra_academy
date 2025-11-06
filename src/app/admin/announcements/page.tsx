
"use client";

import { useState, useEffect } from "react";
import { Announcement } from "@/context/AppDataContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const emptyAnnouncement: Announcement = {
  title: "",
  description: "",
  link: "#",
};

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [originalTitle, setOriginalTitle] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [deletingTitles, setDeletingTitles] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('/api/announcements');
        if (resp.ok) setAnnouncements(await resp.json());
      } catch (err) {
        console.error('Failed to load announcements', err);
      }
    })();
  }, []);

  const handleAdd = () => {
    setEditingAnnouncement({ ...emptyAnnouncement });
    setIsEditing(false);
    setIsDialogOpen(true);
    setOriginalTitle(null);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement({ ...announcement });
    setIsEditing(true);
    setIsDialogOpen(true);
    setOriginalTitle(announcement.title);
  };

  const handleDelete = (title: string) => {
    const previous = announcements;
    setAnnouncements(announcements.filter(a => a.title !== title));
    setDeletingTitles(prev => ({ ...prev, [title]: true }));
    (async () => {
      try {
        const resp = await fetch(`/api/announcements/${encodeURIComponent(title)}`, { method: 'DELETE', credentials: 'same-origin' });
        if (!resp.ok) throw new Error(await resp.text());
        toast({ title: 'Deleted', description: 'Announcement removed' });
      } catch (err) {
        console.error('Delete error', err);
        setAnnouncements(previous);
        toast({ title: 'Delete failed', description: 'Could not remove announcement' });
      } finally {
        setDeletingTitles(prev => {
          const copy = { ...prev };
          delete copy[title];
          return copy;
        });
      }
    })();
  };

  const handleSave = () => {
    if (!editingAnnouncement) return;
    // validation
    if (!editingAnnouncement.title || editingAnnouncement.title.trim() === '') {
      toast({ title: 'Validation', description: 'Title is required' });
      return;
    }
    (async () => {
      setIsSaving(true);
      try {
        if (isEditing) {
          // Use the originalTitle to identify the announcement to update even if the title was edited
          const target = originalTitle || editingAnnouncement.title;
          const resp = await fetch(`/api/announcements/${encodeURIComponent(target)}`, { method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingAnnouncement) });
          if (!resp.ok) throw new Error('Update failed');
          toast({ title: 'Updated', description: 'Announcement updated' });
        } else {
          const resp = await fetch('/api/announcements', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editingAnnouncement) });
          if (!resp.ok) throw new Error('Create failed');
          toast({ title: 'Created', description: 'Announcement created' });
        }
        const refreshed = await fetch('/api/announcements');
        if (refreshed.ok) setAnnouncements(await refreshed.json());
        setIsDialogOpen(false);
        setEditingAnnouncement(null);
        setOriginalTitle(null);
      } catch (err) {
        console.error('Save error', err);
        toast({ title: 'Save failed', description: 'Could not save announcement' });
      } finally {
        setIsSaving(false);
      }
    })();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingAnnouncement) return;
    const { name, value } = e.target;
    setEditingAnnouncement({ ...editingAnnouncement, [name]: value });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Manage Announcements</CardTitle>
                <CardDescription>Add, edit, or delete announcements on the homepage.</CardDescription>
            </div>
            <Button onClick={handleAdd}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Announcement
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow key={announcement.title}>
                  <TableCell className="font-medium">{announcement.title}</TableCell>
                  <TableCell>{announcement.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(announcement)} disabled={isSaving}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(announcement.title)} disabled={Boolean(deletingTitles[announcement.title])}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Announcement' : 'Add New Announcement'}</DialogTitle>
          </DialogHeader>
          {editingAnnouncement && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={editingAnnouncement.title} 
                  onChange={handleChange} 
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={editingAnnouncement.description} 
                  onChange={handleChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">Link</Label>
                <Input 
                  id="link" 
                  name="link" 
                  value={editingAnnouncement.link} 
                  onChange={handleChange} 
                  className="col-span-3" 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSave} disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
