import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

function getGreeting(hour: number): string 
{
  if (hour >= 5 && hour < 12) 
  {
    return 'Good Morning'
  } 
  else if (hour >= 12 && hour < 17) 
  {
    return 'Good Afternoon'
  } 
  else if (hour >= 17 && hour < 22) 
  {
    return 'Good Evening'
  } 
  else 
  {
    return 'Good Night'
  }
}

export async function GET(request: NextRequest) 
{
  try 
  {
    // Get the timezone from the request headers
    // This will be the browser's timezone
    const timezone = request.headers.get('x-timezone') || 'UTC'
    
    // Get current time in the browser's timezone
    const now = new Date()
    const hour = now.getHours()
    
    // Get greeting based on time
    const greeting = getGreeting(hour)
    
    // For demo purposes, we'll hardcode the role
    // In a real app, this would come from your auth system
    const role = "Member of the Strata Committee"
    
    return NextResponse.json({
      greeting: `${greeting}, ${role}!`,
      timezone: timezone,
      localTime: now.toLocaleTimeString(),
      hour: hour
    })
  } 
  catch (error) 
  {
    // Fallback greeting if anything fails
    const hour = new Date().getHours()
    const greeting = getGreeting(hour)
    const role = "Member of the Strata Committee"
    
    return NextResponse.json({
      greeting: `${greeting}, ${role}!`,
      timezone: 'UTC',
      localTime: new Date().toLocaleTimeString(),
      hour: hour
    })
  }
} 