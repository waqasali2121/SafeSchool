"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { McqGenerator } from "@/components/ai/mcq-generator";

export default function StudentMcqPracticePage() {
  return (
    <DashboardShell
      title="Interactive MCQ Exam Trainer"
      subtitle="Practice verified curriculum questions with real-time scoring, instant explanations, and confetti celebrations."
    >
      <McqGenerator />
    </DashboardShell>
  );
}
