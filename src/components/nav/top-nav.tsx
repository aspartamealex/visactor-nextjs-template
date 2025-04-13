"use client";

import Container from "../container";
import { ThemeToggle } from "../theme-toggle";
import { useEffect, useState } from "react";

interface GreetingResponse 
{
  greeting: string;
  timezone: string;
  localTime: string;
  hour: number;
}

export default function TopNav({ title }: { title: string }) 
{
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Strata Website";
  const [greeting, setGreeting] = useState<GreetingResponse | null>(null);

  useEffect(() => 
  {
    const fetchGreeting = async () => 
    {
      try 
      {
        // Get the browser's timezone
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Send the timezone to the API
        const response = await fetch('/api/greeting', {
          headers: {
            'x-timezone': timezone
          }
        });
        
        const data = await response.json();
        setGreeting(data);
      } 
      catch (error) 
      {
        console.error('Failed to fetch greeting:', error);
      }
    };

    fetchGreeting();
  }, []);

  return (
    <Container className="flex h-24 flex-col justify-center border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{siteName}</h1>
          <h2 className="text-2xl font-medium text-muted-foreground">{title}</h2>
          {greeting && (
            <p className="text-2xl text-muted-foreground mt-1">{greeting.greeting}</p>
          )}
        </div>
        <ThemeToggle />
      </div>
    </Container>
  );
}
