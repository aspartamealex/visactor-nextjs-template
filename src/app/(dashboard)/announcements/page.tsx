"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the announcement type
interface Announcement 
{
  id: number;
  title: string;
  content: string;
  date: string;
  people: string;
}

export default function Announcements() 
{
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch announcements from the API
  useEffect(() => 
  {
    const fetchAnnouncements = async () => 
    {
      try 
      {
        const response = await fetch('/api/announcements');
        const data = await response.json();
        setAnnouncements(data.announcements);
      } 
      catch (error) 
      {
        console.error('Failed to fetch announcements:', error);
      } 
      finally 
      {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Function to get the appropriate CSS class for people labels
  const getPeopleLabelClass = (people: string) => 
  {
    switch (people) 
    {
      case "Committee":
        return "bg-blue-100 text-blue-800";
      case "Owners":
        return "bg-gray-100 text-gray-800";
      case "Staff":
        return "bg-purple-100 text-purple-800";
      case "All":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/announcements/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    // In a real application, this would call an API to delete the announcement
    console.log(`Delete announcement with ID: ${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button onClick={() => router.push("/announcements/create")}>
          Create Announcement
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading announcements...</div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-8">No announcements found.</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>People</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow key={announcement.id}>
                <TableCell>{announcement.title}</TableCell>
                <TableCell>
                  <button
                    className="text-foreground hover:underline p-0 h-auto bg-transparent border-0 cursor-pointer"
                    onClick={() => setSelectedAnnouncement(announcement)}
                  >
                    {announcement.content.length > 100
                      ? `${announcement.content.substring(0, 100)}...`
                      : announcement.content}
                  </button>
                </TableCell>
                <TableCell>{announcement.date}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPeopleLabelClass(announcement.people)}`}>
                    {announcement.people}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Date: {selectedAnnouncement?.date}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              For: {selectedAnnouncement?.people}
            </p>
            <p className="whitespace-pre-wrap">{selectedAnnouncement?.content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 