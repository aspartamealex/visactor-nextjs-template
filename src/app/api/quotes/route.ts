import { NextResponse } from 'next/server';

// Array of fun facts about Strata
const strataQuotes = [
  "Strata was founded in 1961 in New South Wales.",
  "There are over 300 Strata buildings in Australia.",
  "Strata living is the fastest-growing form of property ownership in Australia.",
  "Strata committees must meet at least once every months.",
  "Strata buildings can be residential, commercial, or mixed-use.",
  "All residents of a Strata building can be elected to become the Strata Committee.",
  "In New South Wales, strata-titled apartment buildings are governed by the Strata Schemes Management Act (2015)."
];

export const runtime = 'edge';

export async function GET() {
  // Get a random quote from the array
  const randomIndex = Math.floor(Math.random() * strataQuotes.length);
  const randomQuote = strataQuotes[randomIndex];
  
  // Return the quote with a 200 status code
  return NextResponse.json({ quote: randomQuote }, { status: 200 });
} 