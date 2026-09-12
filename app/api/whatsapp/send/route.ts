import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      to,
      message,
      templateName,
      templateParams = [],
      category = "general",
      recipientName,
      studentName,
    } = body;

    if (!to || (!message && !templateName)) {
      return NextResponse.json(
        { error: "Recipient phone number and message or templateName are required." },
        { status: 400 }
      );
    }

    const cleanPhone = to.replace(/\D/g, "");
    const token = process.env.WHATSAPP_API_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    const time = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const generatedMsgId = `wmsg_meta_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Check if live Meta credentials are configured
    const isLiveConfigured =
      Boolean(token) &&
      Boolean(phoneNumberId) &&
      !token?.includes("your-whatsapp") &&
      !phoneNumberId?.includes("your-whatsapp");

    if (!isLiveConfigured) {
      // In development or simulation mode: succeed with mock response
      return NextResponse.json({
        success: true,
        mode: "simulation",
        messageId: generatedMsgId,
        recipient: {
          to: cleanPhone,
          name: recipientName || "Parent Contact",
          student: studentName,
        },
        category,
        timestamp: time,
        status: "delivered",
        note: "Simulated delivery successful. To dispatch real messages over cellular networks, provide WHATSAPP_API_TOKEN & WHATSAPP_PHONE_NUMBER_ID in .env.local",
      });
    }

    // Prepare Meta WhatsApp Cloud API Payload
    let payload: any;
    if (templateName) {
      payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanPhone,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en_US" },
          components:
            templateParams.length > 0
              ? [
                  {
                    type: "body",
                    parameters: templateParams.map((val: string) => ({
                      type: "text",
                      text: val,
                    })),
                  },
                ]
              : undefined,
        },
      };
    } else {
      payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: cleanPhone,
        type: "text",
        text: { preview_url: false, body: message },
      };
    }

    // Dispatch to Meta Graph API
    const metaResponse = await fetch(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const metaData = await metaResponse.json();

    if (!metaResponse.ok) {
      return NextResponse.json(
        {
          error: metaData.error?.message || "Meta WhatsApp API dispatch rejected",
          details: metaData.error,
        },
        { status: metaResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      mode: "live_meta_cloud_api",
      messageId: metaData.messages?.[0]?.id || generatedMsgId,
      status: "delivered",
      timestamp: time,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process WhatsApp request" },
      { status: 500 }
    );
  }
}
