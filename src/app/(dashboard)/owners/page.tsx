"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Sample data for owners
const owners = [
  { id: 1, name: "John Smith", building: "A", room: "101", email: "john.smith@example.com", phone: "0400 000 001", status: "Active" },
  { id: 2, name: "Sarah Johnson", building: "A", room: "102", email: "sarah.j@example.com", phone: "0400 000 002", status: "Active" },
  { id: 3, name: "Michael Brown", building: "A", room: "114", email: "michael.b@example.com", phone: "0400 000 003", status: "Active" },
  { id: 4, name: "Emily Davis", building: "B", room: "514", email: "emily.d@example.com", phone: "0400 000 004", status: "Active" },
  { id: 5, name: "David Wilson", building: "B", room: "202", email: "david.w@example.com", phone: "0400 000 005", status: "Inactive" },
  { id: 6, name: "Lisa Anderson", building: "B", room: "203", email: "lisa.a@example.com", phone: "0400 000 006", status: "Active" },
  { id: 7, name: "Robert Taylor", building: "C", room: "404", email: "robert.t@example.com", phone: "0400 000 007", status: "Active" },
  { id: 8, name: "Jennifer Martinez", building: "C", room: "310", email: "jennifer.m@example.com", phone: "0400 000 008", status: "Active" },
  { id: 9, name: "William Thomas", building: "C", room: "311", email: "william.t@example.com", phone: "0400 000 009", status: "Inactive" },
  { id: 10, name: "Patricia Garcia", building: "D", room: "401", email: "patricia.g@example.com", phone: "0400 000 010", status: "Active" },
  { id: 11, name: "James Rodriguez", building: "D", room: "402", email: "james.r@example.com", phone: "0400 000 011", status: "Active" },
  { id: 12, name: "Elizabeth White", building: "D", room: "403", email: "elizabeth.w@example.com", phone: "0400 000 012", status: "Active" },
  { id: 13, name: "Thomas Lee", building: "A", room: "104", email: "thomas.l@example.com", phone: "0400 000 013", status: "Inactive" },
  { id: 14, name: "Susan Clark", building: "B", room: "204", email: "susan.c@example.com", phone: "0400 000 014", status: "Active" },
  { id: 15, name: "Daniel Hall", building: "C", room: "304", email: "daniel.h@example.com", phone: "0400 000 015", status: "Active" },
  { id: 16, name: "Nancy Allen", building: "D", room: "404", email: "nancy.a@example.com", phone: "0400 000 016", status: "Inactive" },
  { id: 17, name: "Joseph Young", building: "A", room: "105", email: "joseph.y@example.com", phone: "0400 000 017", status: "Active" },
  { id: 18, name: "Karen King", building: "B", room: "205", email: "karen.k@example.com", phone: "0400 000 018", status: "Active" },
  { id: 19, name: "Christopher Wright", building: "C", room: "305", email: "christopher.w@example.com", phone: "0400 000 019", status: "Active" },
  { id: 20, name: "Betty Scott", building: "D", room: "405", email: "betty.s@example.com", phone: "0400 000 020", status: "Inactive" },
];

export default function OwnersOverview() {
  return (
    <div className="container mx-auto py-6">
      
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">353</div>
            <p className="text-xs text-muted-foreground">+10 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">325</div>
            <p className="text-xs text-muted-foreground">92% of total owners</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">8% of total owners</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Owners List</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Building</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {owners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell className="font-medium">{owner.name}</TableCell>
                  <TableCell>{owner.building}</TableCell>
                  <TableCell>{owner.room}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                  <TableCell>{owner.phone}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      owner.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {owner.status}
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