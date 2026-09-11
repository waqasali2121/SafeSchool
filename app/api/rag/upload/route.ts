import { NextRequest, NextResponse } from "next/server";
import { addLocalDocument } from "@/lib/rag/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, subject, className, content, fileType = "pdf" } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const { doc, chunksCount } = addLocalDocument(
      {
        title,
        filename: `${title.replace(/\s+/g, "_")}.${fileType}`,
        fileType,
        fileSizeKb: Math.floor(content.length / 10) + 120,
        subject: subject || "General Curriculum",
        className: className || "All Classes",
      },
      content
    );

    return NextResponse.json({
      success: true,
      document: doc,
      chunksCount,
      message: `Successfully extracted and indexed ${chunksCount} chunks into vector store.`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to index document" }, { status: 500 });
  }
}
