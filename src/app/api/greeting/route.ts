import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; //Edge Function

function getGreeting(hour: number): string {
  if (hour >= 5 && hour < 12) return 'Good Morning';
  else if (hour >= 12 && hour < 17) return 'Good Afternoon';
  else if (hour >= 17 && hour < 22) return 'Good Evening';
  else return 'Good Night';
}

export async function GET(request: NextRequest) {
  try {
    const timezone = request.headers.get('x-timezone') || 'Australia/Sydney';

    // Get the current time in the selected timezone using `Intl.DateTimeFormat`
    const formatter = new Intl.DateTimeFormat('en-AU', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: timezone,
    });

    const parts = formatter.formatToParts(new Date());
    const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 12);

    const now = new Date().toLocaleTimeString('en-AU', { timeZone: timezone });

    const greeting = getGreeting(hour);
    const role = 'Member of the Strata Committee';

    return NextResponse.json({
      greeting: `${greeting}, ${role}!`,
      timezone,
      localTime: now,
      hour,
    });
  } catch (error) {
    const now = new Date();
    const hour = now.getHours();
    const greeting = getGreeting(hour);
    const role = 'Member of the Strata Committee';

    return NextResponse.json({
      greeting: `${greeting}, ${role}!`,
      timezone: 'fallback',
      localTime: now.toLocaleTimeString(),
      hour,
    });
  }
}
