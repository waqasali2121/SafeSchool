"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "@/lib/store/app-context";
import {
  Send,
  Sparkles,
  Bot,
  User,
  FileText,
  Copy,
  Check,
  RotateCcw,
  Download,
  AlertCircle,
  HelpCircle,
  Upload,
  BookOpen,
} from "lucide-react";

export function ChatInterface() {
  const { chatMessages, sendChatMessage, uploadDocument } = useApp();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Upload modal states
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadSubject, setUploadSubject] = useState("Biology");
  const [uploadContent, setUploadContent] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const query = input.trim();
    setInput("");
    setIsLoading(true);

    await sendChatMessage(query);
    setIsLoading(false);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportNotes = () => {
    const text = chatMessages
      .map((m) => `[${m.sender.toUpperCase()} - ${m.timestamp}]\n${m.content}\n`)
      .join("\n---------------------------\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SafeAI_Study_Notes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadContent) return;
    uploadDocument(uploadTitle, uploadSubject, "Grade 10 - Lily", uploadContent, "pdf");
    setUploadTitle("");
    setUploadContent("");
    setShowUploadModal(false);
  };

  const samplePrompts = [
    "Explain lesson 3 in simple terms",
    "Explain photosynthesis with real-world analogies",
    "What is the quadratic formula and discriminant?",
    "Break down cellular respiration step-by-step",
    "Summarize chapter 5 key exam takeaways",
    "SafeAI Campus Emergency & SOS Protocol",
  ];


  return (
    <div className="flex flex-col h-[740px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                SafeAI Student Learning Companion
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-100 text-pink-700 dark:bg-pink-950/80 dark:text-pink-300">
                RAG Grounded
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Curriculum-trained • Zero Hallucinations • Cites School Textbooks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Upload new syllabus PDF/Notes"
          >
            <Upload className="w-3.5 h-3.5 text-pink-500" />
            <span className="hidden sm:inline">Upload Notes</span>
          </button>
          <button
            onClick={handleExportNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Export chat as study notes"
          >
            <Download className="w-3.5 h-3.5 text-violet-500" />
            <span className="hidden sm:inline">Export Notes</span>
          </button>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatMessages.map((msg) => {
          const isAssistant = msg.sender === "assistant";
          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${isAssistant ? "justify-start" : "justify-end"}`}
            >
              {isAssistant && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 text-sm transition-all ${
                  isAssistant
                    ? "bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm"
                    : "bg-gradient-to-r from-pink-600 to-violet-600 text-white shadow-md shadow-pink-500/10"
                }`}
              >
                {/* Content */}
                <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>

                {/* Grounding / Source Citation Badge */}
                {isAssistant && msg.sourceDocuments && msg.sourceDocuments.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                      <span className="flex items-center gap-1 text-pink-600 dark:text-pink-400">
                        <BookOpen className="w-3.5 h-3.5" /> Source Citation:
                      </span>
                      {msg.confidenceScore !== undefined && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono text-[10px]">
                          Confidence: {msg.confidenceScore}%
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {msg.sourceDocuments.map((src, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800 text-xs"
                        >
                          <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-pink-500" />
                              {src.title}
                            </span>
                            {src.page && <span className="text-[10px] text-slate-400">Page {src.page}</span>}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 italic line-clamp-2">
                            &ldquo;{src.chunkSnippet}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SafeAI Strict Rule Message when out of scope */}
                {isAssistant && msg.isOutOfScope && (
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>SafeAI Shield: Out-of-curriculum questions are blocked to prevent hallucinations.</span>
                  </div>
                )}

                {/* Message footer & actions */}
                <div className="mt-3 flex items-center justify-between text-[11px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {isAssistant && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-pink-500 transition flex items-center gap-1"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {!isAssistant && (
                <div className="w-9 h-9 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
              Searching school curriculum and synthesizing verified answer...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts strip */}
      <div className="px-6 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-medium whitespace-nowrap">Suggested:</span>
        {samplePrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setInput(prompt)}
            className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-pink-400 dark:hover:border-pink-500 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-white dark:bg-slate-900"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question from your school textbooks or syllabus..."
          className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-pink-500 outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 rounded-2xl bg-gradient-to-r from-pink-600 to-violet-600 text-white shadow-md shadow-pink-500/20 hover:opacity-95 disabled:opacity-50 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              Ingest School Learning Material
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Paste or type notes, past papers, or syllabus text. The RAG pipeline will chunk and index it for AI questioning.
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Document Title</label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Chemistry Chapter 4 - Atomic Structure"
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject</label>
                <select
                  value={uploadSubject}
                  onChange={(e) => setUploadSubject(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                >
                  <option value="Biology">Biology & Life Sciences</option>
                  <option value="Mathematics">Mathematics & Algebra</option>
                  <option value="Computer Science">Computer Science & AI</option>
                  <option value="Physics">Physics</option>
                  <option value="Safety">Campus Safety & Policies</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Document Content / Text</label>
                <textarea
                  required
                  rows={5}
                  value={uploadContent}
                  onChange={(e) => setUploadContent(e.target.value)}
                  placeholder="Paste textbook text, notes, or definitions here to index into pgvector..."
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold text-xs shadow-md"
                >
                  Index & Embed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
