'use client';

import { useEffect, useState } from 'react';

interface DbResponse 
{
    status: string;
    message: string;
    server_version?: string;
    tables?: string[];
    connection_info?: {
        host: string;
        port: string;
        database: string;
    };
}

export default function DbTestPage() 
{
    const [data, setData] = useState<DbResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => 
    {
        const fetchData = async () => 
        {
            try 
            {
                const response = await fetch('http://localhost:8000/api/db-test.php');
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
        return <div className="p-4">Testing database connection...</div>;
    }

    if (error) 
    {
        return (
            <div className="p-4 text-red-500">
                <h2 className="text-xl font-bold mb-2">Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>
            {data && (
                <div className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded">
                        <h2 className="text-xl font-bold mb-2">Status</h2>
                        <p className={data.status === 'success' ? 'text-green-600' : 'text-red-600'}>
                            {data.status}
                        </p>
                        <p>{data.message}</p>
                    </div>

                    {data.server_version && (
                        <div className="p-4 bg-gray-100 rounded">
                            <h2 className="text-xl font-bold mb-2">Server Info</h2>
                            <p>MySQL Version: {data.server_version}</p>
                        </div>
                    )}

                    {data.connection_info && (
                        <div className="p-4 bg-gray-100 rounded">
                            <h2 className="text-xl font-bold mb-2">Connection Info</h2>
                            <p>Host: {data.connection_info.host}</p>
                            <p>Port: {data.connection_info.port}</p>
                            <p>Database: {data.connection_info.database}</p>
                        </div>
                    )}

                    {data.tables && data.tables.length > 0 && (
                        <div className="p-4 bg-gray-100 rounded">
                            <h2 className="text-xl font-bold mb-2">Available Tables</h2>
                            <ul className="list-disc list-inside">
                                {data.tables.map((table, index) => (
                                    <li key={index}>{table}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
} 