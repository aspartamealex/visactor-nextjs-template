"use client";

import { useState } from "react";
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

// Sample data for announcements
const announcements = [
  { 
    id: 1, 
    title: "Reminder: Levy Payment Due", 
    content: "All owners are reminded to ensure their monthly levies are paid by April 30th to avoid late fees. Thank you for your cooperation.", 
    date: "2/4/2025", 
    people: "Owners" 
  },
  { 
    id: 2, 
    title: "Committee Meeting Agenda", 
    content: "Committee members are requested to submit the final election form for the May general meeting by April 27th.", 
    date: "10/4/2025", 
    people: "Committee" 
  },
  { 
    id: 3, 
    title: "Holiday Decorations", 
    content: "All owners are welcome to decorate their buildings for the Easter holiday. Please ensure all decorations will not cause fire hazards.", 
    date: "10/4/2025", 
    people: "Owners" 
  },
  { 
    id: 4, 
    title: "New Security System", 
    content: "We are implementing a new security system for the building. All workers will need to register their key card by 1st of May.", 
    date: "11/4/2025", 
    people: "Staff" 
  }
];

export default function Announcements() {
  const router = useRouter();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof announcements[0] | null>(null);

  const getPeopleLabelClass = (people: string) => {
    switch (people) {
      case "Committee":
        return "bg-blue-100 text-blue-800"
      case "Owners":
        return "bg-gray-100 text-gray-800"
      case "Staff":
        return "bg-purple-100 text-purple-800"
      case "All Residents":
        return "bg-green-100 text-green-800"
      case "Residents with Parking":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
        <Button onClick={() => router.push("/announcements/new")}>
          Create Announcement
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>People</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <button
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                    aria-label="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </button>
                  <button
                    className="p-1 rounded-full hover:bg-gray-100 text-red-500"
                    aria-label="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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