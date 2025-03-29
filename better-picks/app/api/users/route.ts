<<<<<<< HEAD
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
=======
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT 1+1 AS result");
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9
  }
}
