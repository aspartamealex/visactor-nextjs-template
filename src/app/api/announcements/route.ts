import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Path to the announcements JSON file
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'announcements.json')

// Helper function to read the announcements file
function readAnnouncements() 
{
  try 
  {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8')
    return JSON.parse(fileContent)
  } 
  catch (error) 
  {
    console.error('Error reading announcements file:', error)
    return { announcements: [] }
  }
}

// Helper function to write to the announcements file
function writeAnnouncements(data: any) 
{
  try 
  {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8')
    return true
  } 
  catch (error) 
  {
    console.error('Error writing to announcements file:', error)
    return false
  }
}

// GET handler to retrieve all announcements
export async function GET() 
{
  const data = readAnnouncements()
  return NextResponse.json(data)
}

// POST handler to create a new announcement
export async function POST(request: NextRequest) 
{
  try 
  {
    const data = readAnnouncements()
    const newAnnouncement = await request.json()
    
    // Generate a new ID (simple approach - in production use UUID)
    const newId = data.announcements.length > 0 
      ? Math.max(...data.announcements.map((a: any) => a.id)) + 1 
      : 1
    
    // Add the new announcement with the generated ID
    const announcementWithId = {
      ...newAnnouncement,
      id: newId,
      date: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
    }
    
    // Add to the announcements array
    data.announcements.push(announcementWithId)
    
    // Write back to the file
    const success = writeAnnouncements(data)
    
    if (success) 
    {
      return NextResponse.json({ 
        success: true, 
        message: 'Announcement created successfully',
        announcement: announcementWithId
      })
    } 
    else 
    {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to create announcement' 
      }, { status: 500 })
    }
  } 
  catch (error) 
  {
    console.error('Error creating announcement:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Error creating announcement' 
    }, { status: 500 })
  }
} 