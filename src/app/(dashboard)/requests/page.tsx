"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Sample data for requests
const requests = [
  { id: 1, title: "Maintenance Request", requester: "John Smith", unit: "A-101", status: "Pending", date: "2023-12-01", priority: "Medium" },
  { id: 2, title: "Complaint", requester: "Sarah Johnson", unit: "A-102", status: "In Progress", date: "2023-12-05", priority: "High" },
  { id: 3, title: "Permission Request", requester: "Michael Brown", unit: "A-103", status: "Approved", date: "2023-11-28", priority: "Low" },
  { id: 4, title: "Maintenance Request", requester: "Emily Davis", unit: "B-201", status: "Completed", date: "2023-11-20", priority: "Medium" },
  { id: 5, title: "Complaint", requester: "David Wilson", unit: "B-202", status: "Pending", date: "2023-12-10", priority: "High" },
  { id: 6, title: "Permission Request", requester: "Lisa Anderson", unit: "B-203", status: "Rejected", date: "2023-11-15", priority: "Low" },
  { id: 7, title: "Maintenance Request", requester: "Robert Taylor", unit: "C-301", status: "In Progress", date: "2023-12-08", priority: "Medium" },
  { id: 8, title: "Complaint", requester: "Jennifer Martinez", unit: "C-302", status: "Pending", date: "2023-12-12", priority: "High" },
  { id: 9, title: "Permission Request", requester: "William Thomas", unit: "C-303", status: "Approved", date: "2023-11-25", priority: "Low" },
  { id: 10, title: "Maintenance Request", requester: "Patricia Garcia", unit: "D-401", status: "Completed", date: "2023-11-18", priority: "Medium" },
];

export default function Requests() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">40% of total requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">20% of total requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">40% of total requests</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Requests List</CardTitle>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>New Request</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Priority</TableHead>
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
                      request.priority === "High" ? "bg-red-100 text-red-800" : 
                      request.priority === "Medium" ? "bg-yellow-100 text-yellow-800" : 
                      "bg-green-100 text-green-800"
                    }`}>
                      {request.priority}
                    </span>
                  </TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
} 