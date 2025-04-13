import { NextRequest, NextResponse } from 'next/server';

// ✅ Use 'nodejs' to switch to a regular Serverless Function
export const config = {
  runtime: 'nodejs',
  regions: ['syd1'], // ✅ Force deploy to Sydney region
};

function getGreeting(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Good Morning';
  else if (hour >= 12 && hour < 17) return 'Good Afternoon';
  else if (hour >= 17 && hour < 22) return 'Good Evening';
  else return 'Good Night';
}

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const hour = now.getHours();
    const greeting = getGreeting(hour);
    const role = 'Member of the Strata Committee'; // This could be dynamic in the future

    return NextResponse.json({
      greeting: `${greeting}, ${role}!`,
      region: 'syd1',
      localTime: now.toLocaleTimeString(),
      hour: hour,
    });
  } catch (error) {
    const hour = new Date().getHours();
    const greeting = getGreeting(hour);
    const role = 'Member of the Strata Committee';

    return NextResponse.json({
      greeting: `${greeting}, ${role}!`,
      region: 'fallback',
      localTime: new Date().toLocaleTimeString(),
      hour: hour,
    });
  }
}
