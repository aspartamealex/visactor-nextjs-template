"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Announcements,
  CustomerSatisfication,
  FundBalance,
  Metrics,
} from "@/components/chart-blocks";
import Container from "@/components/container";

export default function Dashboard() 
{
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check server status
  useEffect(() => 
  {
    const checkServer = async () => 
    {
      try 
      {
        const response = await fetch('http://localhost:8000/api/login.php', 
        {
          method: 'HEAD',
          cache: 'no-cache'
        });
        
        setServerStatus(response.ok ? 'online' : 'offline');
        setError(null);
      } 
      catch (err) 
      {
        setServerStatus('offline');
        setError("Cannot connect to server");
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check login status
  useEffect(() => 
  {
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(!!storedUser);
  }, []);

  // Handle login
  const handleSubmit = async (e: React.FormEvent) => 
  {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (serverStatus === 'offline') 
    {
      setError("Server is not running");
      setIsLoading(false);
      return;
    }

    try 
    {
      const response = await fetch("http://localhost:8000/api/login.php", 
      {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) 
      {
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsLoggedIn(true);
        // Force reload the page to update all components
        window.location.reload();
      } 
      else 
      {
        setError(data.error || "Login failed");
      }
    } 
    catch (err) 
    {
      setError("Failed to connect to server");
    } 
    finally 
    {
      setIsLoading(false);
    }
  };

  // Show login form if user is not logged in
  if (!isLoggedIn) 
  {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access the dashboard</CardDescription>
            {serverStatus === 'checking' && (
              <p className="text-sm text-yellow-600">Checking server status...</p>
            )}
            {serverStatus === 'offline' && (
              <p className="text-sm text-red-600">Server is not running</p>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={serverStatus === 'offline'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={serverStatus === 'offline'}
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || serverStatus === 'offline'}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show dashboard content if user is logged in
  return (
    <div>
      <Metrics />
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-3 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-2">
          <FundBalance />
        </Container>
        <Container className="py-4 laptop:col-span-1">
          <Announcements />
        </Container>
      </div>
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-1 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-1">
          <CustomerSatisfication />
        </Container>
      </div>
    </div>
  )
}
