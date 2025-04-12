"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateAnnouncement() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    people: "Residents",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePeopleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, people: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Submitting announcement:", formData);
    // Redirect back to announcements page
    router.push("/announcements");
  };

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
        <h1 className="text-2xl font-bold">Create New Announcement</h1>
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
              <label htmlFor="people" className="text-sm font-medium">
                People
              </label>
              <Select 
                value={formData.people} 
                onValueChange={handlePeopleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select people" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Committee">Committee</SelectItem>
                  <SelectItem value="Owners">Owners</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Residents">Residents</SelectItem>
                  <SelectItem value="Visitors">Visitors</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Create Announcement</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 