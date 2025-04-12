"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Sample data for announcements (in a real app, this would come from an API)
const announcements = [
  { 
    id: 1, 
    title: "Annual General Meeting", 
    content: "The Annual General Meeting will be held on December 15th, 2023 at 7:00 PM in the community hall.", 
    author: "John Smith", 
    date: "2023-11-01", 
    priority: "High" 
  },
  { 
    id: 2, 
    title: "Maintenance Notice", 
    content: "Scheduled maintenance for the elevator system will take place on November 20th, 2023 from 9:00 AM to 5:00 PM.", 
    author: "Sarah Johnson", 
    date: "2023-10-15", 
    priority: "Medium" 
  },
  { 
    id: 3, 
    title: "Holiday Decorations", 
    content: "Residents are welcome to decorate their balconies for the holiday season. Please ensure all decorations are securely fastened.", 
    author: "Michael Brown", 
    date: "2023-11-10", 
    priority: "Low" 
  },
  { 
    id: 4, 
    title: "New Security System", 
    content: "We are implementing a new security system for the building. All residents will need to register their key fobs by December 1st.", 
    author: "Emily Davis", 
    date: "2023-10-20", 
    priority: "High" 
  },
  { 
    id: 5, 
    title: "Community Clean-up Day", 
    content: "Join us for our annual community clean-up day on November 25th. Meet at the main entrance at 9:00 AM.", 
    author: "David Wilson", 
    date: "2023-11-05", 
    priority: "Medium" 
  },
];

export default function EditAnnouncement({ params }: { params: { id: string } }) {
  const router = useRouter();
  const announcementId = parseInt(params.id);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "Medium",
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the announcement data from an API
    const announcement = announcements.find(a => a.id === announcementId);
    
    if (announcement) {
      setFormData({
        title: announcement.title,
        content: announcement.content,
        priority: announcement.priority,
      });
    }
    
    setIsLoading(false);
  }, [announcementId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, priority: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated data to your backend
    console.log("Updating announcement:", { id: announcementId, ...formData });
    // Redirect back to announcements page
    router.push("/announcements");
  };

  if (isLoading) {
    return <div className="container mx-auto py-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2" 
          onClick={() => router.push("/announcements")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Announcements
        </Button>
        <h1 className="text-2xl font-bold">Edit Announcement</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Announcement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter announcement title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter announcement content"
                rows={6}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <Select 
                value={formData.priority} 
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Update Announcement</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 