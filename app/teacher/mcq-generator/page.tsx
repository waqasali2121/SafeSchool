"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { McqGenerator } from "@/components/ai/mcq-generator";

export default function TeacherMcqGeneratorPage() {
  return (
    <DashboardShell
      title="AI MCQ & Assessment Test Creator"
      subtitle="Generate multiple choice question banks, unit quizzes, and printable test papers with answer keys."
    >
      <McqGenerator />
    </DashboardShell>
  );
}
