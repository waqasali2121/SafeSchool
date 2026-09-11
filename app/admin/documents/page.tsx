"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import {
  BookOpen,
  Upload,
  FileText,
  CheckCircle2,
  Database,
  Layers,
  Sparkles,
  ArrowRight,
  Search,
} from "lucide-react";

export default function AdminDocumentsPage() {
  const { documents, uploadDocument } = useApp();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Biology & Life Sciences");
  const [className, setClassName] = useState("Grade 10 - Lily");
  const [fileType, setFileType] = useState<"pdf" | "docx" | "txt">("pdf");
  const [textContent, setTextContent] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !textContent) return;

    uploadDocument(title, subject, className, textContent, fileType);
    setTitle("");
    setTextContent("");
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadForm(false);
    }, 2500);
  };

  const totalChunks = documents.reduce((acc, d) => acc + d.chunksCount, 0);

  return (
    <DashboardShell
      title="RAG Learning Materials & Vector Index"
      subtitle="Curriculum ingestion pipeline. Upload textbooks, past papers, and policies for AI grounding."
      action={
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white text-xs font-bold shadow hover:opacity-95 transition"
        >
          <Upload className="w-4 h-4" /> Upload New Syllabus
        </button>
      }
    >
      {/* Pipeline Architecture Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-base">
              Supabase pgvector Knowledge Base Status: ACTIVE
            </h3>
          </div>
          <span className="font-mono text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
            {totalChunks} Chunks Vectorized
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Uploaded files pass through automated text extraction, chunking into 400-token blocks with 50-token overlap, and 768-dimension vector embeddings. When students question the AI, pgvector performs cosine similarity ranking so responses cite exact textbook pages.
        </p>
      </div>

      {/* Upload Form (Collapsible or Modal) */}
      {showUploadForm && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-in fade-in">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
            Ingest Curriculum Document (PDF / DOCX / TXT)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Text entered below will be indexed for instant RAG search across student portals.
          </p>

          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Document Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Physics Chapter 4 - Gravitation & Motion"
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="Biology & Life Sciences">Biology & Life Sciences</option>
                  <option value="Mathematics & Algebra">Mathematics & Algebra</option>
                  <option value="Physics">Physics</option>
                  <option value="Computer Science & AI">Computer Science & AI</option>
                  <option value="School Policies & Safety">School Policies & Safety</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Format Type</label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as "pdf" | "docx" | "txt")}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="pdf">PDF Book / Syllabus (.pdf)</option>
                  <option value="docx">Word Document (.docx)</option>
                  <option value="txt">Plain Text / Notes (.txt)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Text Content to Chunk & Vectorize
              </label>
              <textarea
                required
                rows={6}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste chapter text, key definitions, or curriculum notes..."
                className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono"
              />
            </div>

            {uploadSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Document successfully vectorized into pgvector embeddings!</span>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold shadow hover:bg-pink-700"
              >
                Chunk & Vectorize Document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Documents List */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-pink-500" />
          Indexed Curriculum Documents in Database
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {documents.map((doc) => (
            <div key={doc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{doc.title}</h4>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-1">
                    <span className="font-mono text-slate-600 dark:text-slate-300">{doc.filename}</span>
                    <span>•</span>
                    <span>{doc.subject}</span>
                    <span>•</span>
                    <span>{doc.fileSizeKb} KB</span>
                    <span>•</span>
                    <span>Uploaded: {doc.uploadedAt}</span>
                  </div>
                  {doc.summary && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {doc.summary}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="font-mono text-xs px-2.5 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold">
                  {doc.chunksCount} Chunks
                </span>
                <span className="text-xs px-2.5 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Vector Indexed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
