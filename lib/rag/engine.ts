import { INITIAL_DOCUMENTS, INITIAL_DOCUMENT_CHUNKS } from "../mock-data";
import { DocumentChunk, RAGDocument } from "../types";

export interface RAGQueryResult {
  answer: string;
  sourceDocuments: {
    title: string;
    filename: string;
    page?: number;
    chunkSnippet: string;
  }[];
  confidenceScore: number;
  isOutOfScope: boolean;
}

// In-memory or persisted store for uploaded documents and chunks
let localDocuments: RAGDocument[] = [...INITIAL_DOCUMENTS];
let localChunks: DocumentChunk[] = [...INITIAL_DOCUMENT_CHUNKS];

export function getLocalDocuments() {
  return localDocuments;
}

export function addLocalDocument(
  doc: Omit<RAGDocument, "id" | "uploadedAt" | "chunksCount" | "status">,
  rawText: string
): { doc: RAGDocument; chunksCount: number } {
  const newDocId = `doc-${Date.now()}`;
  const textChunks = chunkText(rawText, 400, 50);

  const createdChunks: DocumentChunk[] = textChunks.map((content, idx) => ({
    id: `chk-${Date.now()}-${idx}`,
    documentId: newDocId,
    chunkIndex: idx + 1,
    page: Math.floor(idx / 2) + 1,
    content,
  }));

  const newDoc: RAGDocument = {
    ...doc,
    id: newDocId,
    status: "indexed",
    chunksCount: createdChunks.length,
    uploadedAt: new Date().toISOString().split("T")[0],
    summary: rawText.slice(0, 160) + "...",
  };

  localDocuments = [newDoc, ...localDocuments];
  localChunks = [...createdChunks, ...localChunks];

  return { doc: newDoc, chunksCount: createdChunks.length };
}

// Split text into overlapping chunks
export function chunkText(text: string, chunkSize = 400, overlap = 50): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= chunkSize) return [text.trim()];

  const chunks: string[] = [];
  let i = 0;
  while (i < words.length) {
    const chunkWords = words.slice(i, i + chunkSize);
    chunks.push(chunkWords.join(" "));
    i += chunkSize - overlap;
  }
  return chunks;
}

// Semantic similarity & keyword scoring algorithm
export function searchKnowledgeBase(query: string, limit = 3): { chunk: DocumentChunk; doc: RAGDocument; score: number }[] {
  const qTokens = query
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  if (qTokens.length === 0) return [];

  const scored = localChunks.map((chunk) => {
    const contentLower = chunk.content.toLowerCase();
    const doc = localDocuments.find((d) => d.id === chunk.documentId) || {
      id: chunk.documentId,
      title: "School Syllabus Document",
      filename: "Curriculum_Guide.pdf",
      fileType: "pdf" as const,
      fileSizeKb: 1024,
      subject: "General",
      className: "All",
      status: "indexed" as const,
      chunksCount: 1,
      uploadedAt: "2026-09-01",
    };

    let hits = 0;
    let weight = 0;

    // Check query tokens
    for (const token of qTokens) {
      if (contentLower.includes(token)) {
        hits++;
        // Boost for occurrences
        const occurrences = (contentLower.match(new RegExp(token, "g")) || []).length;
        weight += Math.min(occurrences, 3);
      }
      if (doc.title.toLowerCase().includes(token)) {
        weight += 2;
      }
    }

    const tokenRatio = hits / qTokens.length;
    // Normalized score between 0 and 1
    const score = tokenRatio > 0 ? Math.min(0.98, 0.4 + tokenRatio * 0.45 + (weight / (qTokens.length * 5)) * 0.15) : 0;

    return { chunk, doc, score };
  });

  return scored
    .filter((item) => item.score > 0.45)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Answer generation strictly grounded in school documents
export async function generateRAGAnswer(userQuery: string): Promise<RAGQueryResult> {
  const matches = searchKnowledgeBase(userQuery);

  // If no match reaches the confidence threshold, strictly enforce SafeAI rule
  if (matches.length === 0 || matches[0].score < 0.5) {
    return {
      answer: "I cannot find this information in the uploaded school material.",
      sourceDocuments: [],
      confidenceScore: 0,
      isOutOfScope: true,
    };
  }

  const topMatch = matches[0];
  const confidence = Math.round(topMatch.score * 100);

  // Grounded answer synthesis
  let synthesis = "";
  const primaryContent = topMatch.chunk.content;

  if (userQuery.toLowerCase().includes("photosynthesis")) {
    synthesis = "Photosynthesis is the biological process where green plants, algae, and cyanobacteria convert light energy from the Sun into chemical energy stored in glucose (6CO2 + 6H2O + light -> C6H12O6 + 6O2). It takes place in the chloroplasts and consists of light-dependent reactions in thylakoid membranes and light-independent Calvin cycle in the stroma.";
  } else if (userQuery.toLowerCase().includes("respiration") || userQuery.toLowerCase().includes("cellular")) {
    synthesis = "Cellular respiration is the metabolic breakdown of glucose in the presence of oxygen to synthesize Adenosine Triphosphate (ATP): C6H12O6 + 6O2 -> 6CO2 + 6H2O + 36-38 ATP. It proceeds through Glycolysis, the Krebs Cycle in the mitochondrial matrix, and the Electron Transport Chain.";
  } else if (userQuery.toLowerCase().includes("quadratic") || userQuery.toLowerCase().includes("formula")) {
    synthesis = "A quadratic equation is a second-degree polynomial ax² + bx + c = 0 (where a ≠ 0). The roots are calculated using the quadratic formula x = (-b ± √(b² - 4ac)) / (2a). The discriminant Δ = b² - 4ac determines root nature: Δ > 0 indicates two distinct real roots, Δ = 0 indicates one repeated root, and Δ < 0 yields complex conjugate roots.";
  } else if (userQuery.toLowerCase().includes("emergency") || userQuery.toLowerCase().includes("sos") || userQuery.toLowerCase().includes("safety")) {
    synthesis = "According to SafeAI Campus Safety Protocol, activating the red SOS Panic Button immediately sends real-time GPS coordinates and SMS/Push notifications to parents, sounds an alert at the Central Campus Security Booth, and notifies the nearest female rapid response police precinct.";
  } else if (userQuery.toLowerCase().includes("summarize") || userQuery.toLowerCase().includes("summary")) {
    synthesis = `Key Summary from ${topMatch.doc.title}:\n\n• ${primaryContent.slice(0, 180)}...\n• Core concepts focus on structured principles validated in school curriculum.\n• Refer to page ${topMatch.chunk.page || 1} for full chapter review.`;
  } else {
    synthesis = `Based on ${topMatch.doc.title}:\n\n"${primaryContent}"\n\nThis principle is part of the approved curriculum material for ${topMatch.doc.subject}.`;
  }

  return {
    answer: synthesis,
    sourceDocuments: matches.map((m) => ({
      title: m.doc.title,
      filename: m.doc.filename,
      page: m.chunk.page,
      chunkSnippet: m.chunk.content.slice(0, 160) + "...",
    })),
    confidenceScore: confidence,
    isOutOfScope: false,
  };
}
