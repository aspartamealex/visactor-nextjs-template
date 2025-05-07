"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Announcement 
{
    id: number;
    title: string;
    content: string;
    date: string;
    people: string;
}

interface AnnouncementsResponse 
{
    total: number;
    announcements: Announcement[];
}

export default function AnnouncementsPage() 
{
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => 
    {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => 
    {
        try 
        {
            console.log("Fetching announcements...");
            const response = await fetch("/api/announcements.php", {
                credentials: "include",
                headers: {
                    "Accept": "application/json"
                }
            });
            console.log("Response status:", response.status);
            console.log("Response headers:", Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) 
            {
                throw new Error("Failed to fetch announcements");
            }
            const data: AnnouncementsResponse = await response.json();
            console.log("API Response:", data);
            setAnnouncements(data.announcements || []);
            setTotal(data.total || 0);
        } 
        catch (err) 
        {
            console.error("Fetch error:", err);
            setError(err instanceof Error ? err.message : "An error occurred");
            setAnnouncements([]);
            setTotal(0);
        } 
        finally 
        {
            setIsLoading(false);
        }
    };

    const handleCreate = () => 
    {
        router.push("/announcements/create");
    };

    if (isLoading) 
    {
        return <div>Loading...</div>;
    }

    if (error) 
    {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Announcements</h1>
                    <p className="text-gray-500">Total announcements: {total}</p>
                </div>
                <Button onClick={handleCreate} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Announcement
                </Button>
            </div>

            <div className="grid gap-6">
                {announcements.map((announcement) => (
                    <Card key={announcement.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>{announcement.title}</span>
                                <span className="text-sm font-normal text-gray-500">
                                    {new Date(announcement.date).toLocaleDateString()}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">{announcement.content}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    For: {announcement.people}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 