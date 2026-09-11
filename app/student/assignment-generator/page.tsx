"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { AssignmentGenerator } from "@/components/ai/assignment-generator";

export default function StudentAssignmentGeneratorPage() {
  return (
    <DashboardShell
      title="Curriculum Assignment & Worksheet Generator"
      subtitle="Synthesize structured academic exercises, essays, long questions, and answer keys."
    >
      <AssignmentGenerator />
    </DashboardShell>
  );
}
