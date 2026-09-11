"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { StudyAssistant } from "@/components/ai/study-assistant";

export default function StudentStudyToolsPage() {
  return (
    <DashboardShell
      title="Study Tools: Flashcards, Summaries & Revision"
      subtitle="Interactive active recall decks, key concept chapter summaries, and 7-day exam schedules."
    >
      <StudyAssistant />
    </DashboardShell>
  );
}
