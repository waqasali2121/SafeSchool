"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { Award, Plus, CheckCircle2, TrendingUp, Search } from "lucide-react";

export default function TeacherMarksPage() {
  const { marks, students } = useApp();
  const [examType, setExamType] = useState("Mid-Term Examination");
  const [selectedSubject, setSelectedSubject] = useState("Biology & Life Sciences");

  return (
    <DashboardShell
      title="Marks Management & Student Gradebook"
      subtitle="Record examination marks, compute letter grades, and attach constructive teacher feedback for parents."
      action={
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold shadow hover:opacity-95 transition">
          <Plus className="w-4 h-4" /> Record New Exam Scores
        </button>
      }
    >
      {/* Grade Distribution Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Highest Score</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            94.5 / 100
          </div>
          <p className="text-[11px] text-slate-400">Sara Ahmed (Grade A+)</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Class Average</span>
          <div className="text-2xl font-black text-violet-600 dark:text-violet-400 mt-1">
            88.2%
          </div>
          <p className="text-[11px] text-slate-400">Grade 10 - Lily Section</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Pass Rate</span>
          <div className="text-2xl font-black text-pink-600 dark:text-pink-400 mt-1">
            100%
          </div>
          <p className="text-[11px] text-slate-400">28 of 28 Passed</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Report Cards Published</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Synced
          </div>
          <p className="text-[11px] text-emerald-600">Visible to Parents</p>
        </div>
      </div>

      {/* Marks Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-violet-500" />
            Mid-Term & Monthly Assessment Gradebook
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="Biology & Life Sciences">Biology & Life Sciences</option>
              <option value="Mathematics & Algebra">Mathematics & Algebra</option>
              <option value="Computer Science & AI">Computer Science & AI</option>
              <option value="Physics">Physics</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {marks.map((m) => (
            <div
              key={m.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {m.studentName}
                  </h4>
                  <span className="px-2 py-0.5 rounded-md bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 font-bold">
                    Grade {m.grade}
                  </span>
                </div>
                <p className="text-slate-500 mt-1 font-medium">
                  {m.subject} • {m.examType} ({m.date})
                </p>
                <p className="text-slate-600 dark:text-slate-400 mt-1.5 italic bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl">
                  &ldquo;{m.teacherRemarks}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 self-end md:self-center">
                <div className="text-right">
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {m.obtainedMarks} / {m.totalMarks}
                  </span>
                  <p className="text-[11px] text-emerald-600 font-bold">
                    {Math.round((m.obtainedMarks / m.totalMarks) * 100)}%
                  </p>
                </div>

                <button className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  Edit Remarks
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
