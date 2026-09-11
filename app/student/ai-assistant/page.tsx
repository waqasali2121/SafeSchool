"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { ChatInterface } from "@/components/ai/chat-interface";

export default function StudentAiAssistantPage() {
  return (
    <DashboardShell
      title="RAG AI Learning Companion"
      subtitle="Ask questions grounded strictly in your school textbooks. Verified citations, page references & zero hallucinations."
    >
      <ChatInterface />
    </DashboardShell>
  );
}
