import { NextRequest, NextResponse } from "next/server";

// 1. GET: Webhook Verification challenge sent by Meta Developer Platform
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken =
    process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "safeai_school_verify_token_2026";

  if (mode === "subscribe" && token === verifyToken) {
    console.log("[WhatsApp Webhook] Meta challenge verification passed successfully.");
    return new Response(challenge || "OK", { status: 200 });
  }

  return new Response("Forbidden: Verification Token Mismatch", { status: 403 });
}

// 2. POST: Inbound notifications (Parent messages & delivery status updates)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // Case A: Receiving an inbound message from a parent
    if (value?.messages && value.messages.length > 0) {
      const messageObj = value.messages[0];
      const fromNumber = messageObj.from; // e.g. "923001234567" or "15553492810"
      const messageText = messageObj.text?.body || "(Media / Document Attachment)";
      const timestamp = messageObj.timestamp;

      console.log(
        `[WhatsApp Inbound Event] From: ${fromNumber} | Message: "${messageText}" | Timestamp: ${timestamp}`
      );

      // Return event acknowledged back to Meta immediately (Meta requires 200 OK within 3s)
      return NextResponse.json({
        status: "EVENT_RECEIVED",
        type: "inbound_message",
        from: fromNumber,
        preview: messageText,
      });
    }

    // Case B: Delivery Status updates (sent -> delivered -> read)
    if (value?.statuses && value.statuses.length > 0) {
      const statusObj = value.statuses[0];
      const status = statusObj.status; // "delivered" | "read" | "failed"
      const recipientId = statusObj.recipient_id;

      console.log(`[WhatsApp Delivery Status] To: ${recipientId} | Status: ${status}`);

      return NextResponse.json({
        status: "STATUS_ACKNOWLEDGED",
        type: "status_update",
        recipientId,
        deliveryStatus: status,
      });
    }

    return NextResponse.json({ status: "EVENT_RECEIVED", note: "No action required" });
  } catch (error: any) {
    console.error("[WhatsApp Webhook Error]:", error);
    return NextResponse.json(
      { error: "Failed to process webhook event", details: error.message },
      { status: 500 }
    );
  }
}
