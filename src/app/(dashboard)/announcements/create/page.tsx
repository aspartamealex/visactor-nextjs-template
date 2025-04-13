"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateAnnouncementForm 
{
  title: string;
  content: string;
  date: string;
  people: string;
}

export default function CreateAnnouncement() 
{
  const router = useRouter();
  
  // Get today's date in YYYY-MM-DD format for the date input
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<CreateAnnouncementForm>({
    title: "",
    content: "",
    date: formattedToday,
    people: "All"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convert YYYY-MM-DD to dd/mm/yyyy for API
  const formatDateForAPI = (dateStr: string) => 
  {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => 
  {
    e.preventDefault();
    setIsSubmitting(true);

    try 
    {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: formatDateForAPI(formData.date)
        }),
      });

      if (!response.ok) 
      {
        throw new Error('Failed to create announcement');
      }

      router.push('/announcements');
    } 
    catch (error) 
    {
      console.error('Error creating announcement:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create Announcement</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="people">For</Label>
          <Select
            value={formData.people}
            onValueChange={(value) => setFormData({ ...formData, people: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select People" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Owners">Owners</SelectItem>
              <SelectItem value="Committee">Committee</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Announcement"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/announcements")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
} 