import db from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Handles GET request to check the database connection. 
 * Returns a simple query result or an error message. 
 */
export async function GET() {
  try {
    // Perform a simple database query to check the connection. 
    const [rows] = await db.query("SELECT 1+1 AS result");
    
    // Return a success response with the query result. 
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    // Return error response in case of failure. 
    return NextResponse.json({ success: false, error: error.message });
  }
}
