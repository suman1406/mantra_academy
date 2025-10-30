
"use client";

import { useState } from "react";
import { useAppData, Announcement } from "@/context/AppDataContext";
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
  const { announcements, setAnnouncements } = useAppData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setEditingAnnouncement({ ...emptyAnnouncement });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement({ ...announcement });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (title: string) => {
    setAnnouncements(announcements.filter(a => a.title !== title));
  };

  const handleSave = () => {
    if (!editingAnnouncement) return;

    if (isEditing) {
      setAnnouncements(announcements.map(a => (a.title === editingAnnouncement.title ? editingAnnouncement : a)));
    } else {
      // Simple way to check for duplicates, assumes title is unique
      const existing = announcements.find(a => a.title === editingAnnouncement.title);
      if (existing) {
        // In a real app, show an error to the user
        alert("An announcement with this title already exists.");
        return;
      }
      setAnnouncements([editingAnnouncement, ...announcements]);
    }
    setIsDialogOpen(false);
    setEditingAnnouncement(null);
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
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(announcement)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(announcement.title)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
                  disabled={isEditing}
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
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
