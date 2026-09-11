"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { HomeworkSolver } from "@/components/ai/homework-solver";

export default function StudentHomeworkSolverPage() {
  return (
    <DashboardShell
      title="AI Homework & Numerical Problem Solver"
      subtitle="Input tricky questions for step-by-step mathematical & conceptual breakdowns adhering to school grading rubrics."
    >
      <HomeworkSolver />
    </DashboardShell>
  );
}
