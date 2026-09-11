import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, method = "qr_scan" } = body;

    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    return NextResponse.json({
      success: true,
      timestamp: time,
      method,
      studentId,
      parentNotification: {
        channel: "whatsapp",
        status: "dispatched",
        message: `Your daughter safely reached school at ${time}. Method: ${method.toUpperCase()}.`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process scan" }, { status: 500 });
  }
}
