import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, current_events } = body;

    // Here you would typically save the events to your database
    // For now, we'll just log it
    // console.log("Events tracked:", { session_id, current_events });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking events:", error);
    return NextResponse.json(
      { error: "Failed to track events" },
      { status: 500 }
    );
  }
}
