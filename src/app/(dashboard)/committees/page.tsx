"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

// Sample data for committees
const committees = [
  { id: 1, name: "Executive Committee", members: 5, chairperson: "John Smith", term: "2023-2024", status: "Active" },
  { id: 2, name: "Maintenance Committee", members: 4, chairperson: "Sarah Johnson", term: "2023-2024", status: "Active" },
  { id: 3, name: "Finance Committee", members: 3, chairperson: "Michael Brown", term: "2023-2024", status: "Active" },
  { id: 4, name: "Social Committee", members: 6, chairperson: "Emily Davis", term: "2023-2024", status: "Active" },
  { id: 5, name: "Security Committee", members: 4, chairperson: "David Wilson", term: "2023-2024", status: "Active" },
];

// Sample data for committee members
const committeeMembers = [
  { id: 1, name: "John Smith", role: "Chairperson", committee: "Executive Committee", unit: "A-101", email: "john.smith@example.com" },
  { id: 2, name: "Sarah Johnson", role: "Member", committee: "Executive Committee", unit: "A-102", email: "sarah.johnson@example.com" },
  { id: 3, name: "Michael Brown", role: "Member", committee: "Executive Committee", unit: "A-103", email: "michael.brown@example.com" },
  { id: 4, name: "Emily Davis", role: "Chairperson", committee: "Maintenance Committee", unit: "B-201", email: "emily.davis@example.com" },
  { id: 5, name: "David Wilson", role: "Member", committee: "Maintenance Committee", unit: "B-202", email: "david.wilson@example.com" },
];

export default function Committees() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Committees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">All committees active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">Across all committees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.4</div>
            <p className="text-xs text-muted-foreground">Per committee</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2023-2024</div>
            <p className="text-xs text-muted-foreground">Current term</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Committees</CardTitle>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Committee</span>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Chairperson</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {committees.map((committee) => (
                  <TableRow key={committee.id}>
                    <TableCell className="font-medium">{committee.name}</TableCell>
                    <TableCell>{committee.members}</TableCell>
                    <TableCell>{committee.chairperson}</TableCell>
                    <TableCell>{committee.term}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {committee.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Committee Members</CardTitle>
            <Button size="sm" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Add Member</span>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Committee</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {committeeMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.committee}</TableCell>
                    <TableCell>{member.unit}</TableCell>
                    <TableCell>{member.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 