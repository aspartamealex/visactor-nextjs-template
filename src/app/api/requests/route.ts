import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to the JSON file
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'requests.json');

// Helper function to read the JSON file
const readRequestsData = () => {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading requests data:', error);
    return { requests: [] };
  }
};

// Helper function to write to the JSON file
const writeRequestsData = (data: any) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing requests data:', error);
    return false;
  }
};

// GET handler to fetch all requests
export async function GET() {
  const data = readRequestsData();
  return NextResponse.json(data.requests);
}

// POST handler to create a new request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = readRequestsData();
    
    // Generate a new ID (simple increment)
    const newId = data.requests.length > 0 
      ? Math.max(...data.requests.map((req: any) => req.id)) + 1 
      : 1;
    
    // Create new request with current date
    const newRequest = {
      id: newId,
      title: body.title,
      requester: body.requester,
      unit: body.unit,
      status: "Pending", // Default status
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };
    
    // Add the new request to the data
    data.requests.push(newRequest);
    
    // Write the updated data back to the file
    const success = writeRequestsData(data);
    
    if (success) {
      return NextResponse.json(newRequest, { status: 201 });
    } else {
      return NextResponse.json(
        { error: 'Failed to save request' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating request:', error);
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    );
  }
} 