"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Owner 
{
    id: number;
    name: string;
    building: string;
    room: string;
}

interface InsuranceData 
{
    total: number;
    insured: number;
    leviesPaid: number;
    uninsuredOwners: Owner[];
    unpaidOwners: Owner[];
}

export default function InsuranceAndLevies() 
{
    const [data, setData] = useState<InsuranceData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => 
    {
        const fetchData = async () => 
        {
            try 
            {
                const response = await fetch("/api/insurance.php");
                if (!response.ok) 
                {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
            } 
            catch (err) 
            {
                setError(err instanceof Error ? err.message : "An error occurred");
            } 
            finally 
            {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) 
    {
        return <div>Loading...</div>;
    }

    if (error || !data) 
    {
        return <div>Error: {error}</div>;
    }

    const insurancePercentage = Math.round((data.insured / data.total) * 100);
    const levyPercentage = Math.round((data.leviesPaid / data.total) * 100);

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">April</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Insurance Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Insurance Coverage</span>
                            <span className="text-sm font-normal text-gray-500">
                                {data.insured}/{data.total} Owners Insured
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Insurance Coverage</span>
                                <span className="text-sm font-medium">{insurancePercentage}%</span>
                            </div>
                            <Progress value={insurancePercentage} className="h-2" />
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="font-medium">Uninsured Owners</h3>
                            <div className="space-y-2">
                                {data.uninsuredOwners.map(owner => (
                                    <div key={owner.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                        <div>
                                            <p className="font-medium">{owner.name}</p>
                                            <p className="text-sm text-gray-500">Unit {owner.building}-{owner.room}</p>
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="text-blue-500 border-blue-500 hover:bg-blue-100"
                                        >
                                            Contact
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                {/* Levies Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Levy Payments</span>
                            <span className="text-sm font-normal text-gray-500">
                                {data.leviesPaid}/{data.total} Levies Paid
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">Levy Collection Rate</span>
                                <span className="text-sm font-medium">{levyPercentage}%</span>
                            </div>
                            <Progress value={levyPercentage} className="h-2" />
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="font-medium">Unpaid Owners</h3>
                            <div className="space-y-2">
                                {data.unpaidOwners.map(owner => (
                                    <div key={owner.id} className="flex items-center justify-between p-2 bg-red-50 rounded-md">
                                        <div>
                                            <p className="font-medium">{owner.name}</p>
                                            <p className="text-sm text-gray-500">Unit {owner.building}-{owner.room}</p>
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="text-red-500 border-red-500 hover:bg-red-100"
                                        >
                                            Contact
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 