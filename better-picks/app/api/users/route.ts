import { NextResponse } from 'next/server';

// Define your POST request handler
export async function POST(request: Request) {
  try {
    // Your logic for handling the POST request
    const data = await request.json();

    // Example response
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' });
  }
}

// You can also define other HTTP methods like GET, PUT, DELETE if needed
export async function GET(request: Request) {
  try {
    // Your logic for handling the GET request
    return NextResponse.json({ success: true, message: 'GET request handled' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
    return NextResponse.json({ success: false, error: 'An unknown error occurred' });
  }
}
