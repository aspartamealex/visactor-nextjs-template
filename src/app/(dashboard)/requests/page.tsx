"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

// Define the Request interface
interface Request {
  id: number;
  title: string;
  requester: string;
  unit: string;
  status: string;
  date: string;
}

export default function Requests() {
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch requests from the API
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests');
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Calculate statistics
  const totalRequests = requests.length;
  const completedRequests = requests.filter(request => request.status === "Completed").length;

  // Handle create new request
  const handleCreateRequest = () => {
    router.push("/requests/create");
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">All time requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedRequests}</div>
            <p className="text-xs text-muted-foreground">{Math.round((completedRequests / totalRequests) * 100) || 0}% of total requests</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Requests List</CardTitle>
          <Button size="sm" className="flex items-center gap-2" onClick={handleCreateRequest}>
            <Plus className="h-4 w-4" />
            <span>New Request</span>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading requests...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>{request.requester}</TableCell>
                    <TableCell>{request.unit}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        request.status === "Completed" ? "bg-green-100 text-green-800" : 
                        request.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                        request.status === "Approved" ? "bg-green-100 text-green-800" : 
                        request.status === "Rejected" ? "bg-red-100 text-red-800" : 
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {request.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 