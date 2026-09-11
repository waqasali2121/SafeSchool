import { NextRequest, NextResponse } from "next/server";
import { generateRAGAnswer } from "@/lib/rag/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "A valid query string is required" }, { status: 400 });
    }

    const result = await generateRAGAnswer(query);

    return NextResponse.json({
      success: true,
      answer: result.answer,
      sourceDocuments: result.sourceDocuments,
      confidenceScore: result.confidenceScore,
      isOutOfScope: result.isOutOfScope,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        answer: "I cannot find this information in the uploaded school material.",
        sourceDocuments: [],
        confidenceScore: 0,
        isOutOfScope: true,
      },
      { status: 500 }
    );
  }
}
