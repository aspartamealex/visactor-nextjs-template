"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Owner {
  id: number;
  name: string;
  building: string;
  room: string;
  email: string;
  phone: string;
  levies: boolean;
  insured: boolean;
}

interface OwnersResponse {
  total: number;
  owners: Owner[];
}

export default function OwnersPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [totalOwners, setTotalOwners] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/owners.php");
        if (!response.ok) {
          throw new Error("Failed to fetch owners");
        }
        const data: OwnersResponse = await response.json();
        setOwners(data.owners);
        setTotalOwners(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOwners();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Total Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOwners}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Owners List</CardTitle>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {owners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{owner.building}</TableCell>
                  <TableCell>{owner.room}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                  <TableCell>{owner.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 