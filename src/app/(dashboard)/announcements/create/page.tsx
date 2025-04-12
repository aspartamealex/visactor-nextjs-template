"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export default function CreateAnnouncement() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would call an API to create the announcement
    // For now, we'll just navigate back to the announcements page
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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="people">People</Label>
              <Select value={people} onValueChange={setPeople}>
                <SelectTrigger id="people">
                  <SelectValue placeholder="Select people" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Residents">All Residents</SelectItem>
                  <SelectItem value="Owners">Owners</SelectItem>
                  <SelectItem value="Committee">Committee</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                  <SelectItem value="Residents with Parking">Residents with Parking</SelectItem>
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