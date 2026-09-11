import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName = "Sara Ahmed", latitude = 33.7201, longitude = 73.0612 } = body;

    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });

    return NextResponse.json({
      success: true,
      alertId: `SOS-${Date.now()}`,
      studentName,
      timestamp: time,
      coordinates: { latitude, longitude },
      dispatches: [
        { recipient: "Parent (Tariq Ahmed)", channel: "SMS & WhatsApp Priority", status: "Delivered" },
        { recipient: "Campus Security Desk", channel: "Siren & Dispatch Console", status: "Active" },
        { recipient: "Metropolitan Police Precinct", channel: "Direct Hotwire", status: "Alerted" },
      ],
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to dispatch SOS" }, { status: 500 });
  }
}
