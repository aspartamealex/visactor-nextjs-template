'use client';

import { useEffect, useState } from 'react';

interface ServerInfo 
{
    php_version: string;
    server_software: string;
    request_method: string;
}

interface ApiResponse 
{
    status: string;
    message: string;
    timestamp: string;
    server_info: ServerInfo;
}

export default function TestApi() 
{
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => 
    {
        const fetchData = async () => 
        {
            try 
            {
                const response = await fetch('/api/test.php');
                if (!response.ok) 
                {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } 
            catch (err) 
            {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } 
            finally 
            {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) 
    {
        return <div className="p-4">Loading...</div>;
    }

    if (error) 
    {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">PHP API Test</h2>
            {data && (
                <div className="space-y-2">
                    <p><span className="font-semibold">Status:</span> {data.status}</p>
                    <p><span className="font-semibold">Message:</span> {data.message}</p>
                    <p><span className="font-semibold">Timestamp:</span> {data.timestamp}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold">Server Info:</h3>
                        <ul className="list-disc list-inside">
                            <li>PHP Version: {data.server_info.php_version}</li>
                            <li>Server Software: {data.server_info.server_software}</li>
                            <li>Request Method: {data.server_info.request_method}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
} 