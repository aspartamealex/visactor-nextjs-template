"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateAnnouncementPage() 
{
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => 
    {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            content: formData.get("content"),
            date: new Date().toISOString().split("T")[0],
            people: formData.get("people")
        };

        try 
        {
            console.log("Sending data:", data); // Debug log
            const response = await fetch("/api/announcements.php", 
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data),
                mode: "cors",
                credentials: "include"
            });

            console.log("Response status:", response.status); // Debug log
            
            if (!response.ok) 
            {
                const errorData = await response.json().catch(() => null);
                console.error("Error response:", errorData); // Debug log
                throw new Error(errorData?.error || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Success response:", result); // Debug log
            router.push("/announcements");
        } 
        catch (err) 
        {
            console.error("Error details:", err); // Debug log
            setError(err instanceof Error ? err.message : "An error occurred while creating the announcement");
        } 
        finally 
        {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Announcement</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">
                                Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                required
                                placeholder="Enter announcement title"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">
                                Content
                            </label>
                            <Textarea
                                id="content"
                                name="content"
                                required
                                placeholder="Enter announcement content"
                                rows={5}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="people" className="text-sm font-medium">
                                For
                            </label>
                            <Select name="people" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select audience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Owners">Owners</SelectItem>
                                    <SelectItem value="Committee">Committee</SelectItem>
                                    <SelectItem value="Staff">Staff</SelectItem>
                                    <SelectItem value="All">All</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                                Error: {error}
                            </div>
                        )}

                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create Announcement"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 