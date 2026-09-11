"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { Award, CheckCircle2, TrendingUp, Lightbulb, BookOpen, Download } from "lucide-react";

export default function ParentAcademicsPage() {
  const { marks, students } = useApp();
  const daughter = students[0];

  return (
    <DashboardShell
      title="Academic Report Card & Performance"
      subtitle={`Cumulative examination marks, letter grades, and faculty remarks for ${daughter?.fullName}`}
      action={
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-90 transition print:hidden"
        >
          <Download className="w-4 h-4" /> Download Official PDF Report Card
        </button>
      }
    >
      {/* Student Summary Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={daughter?.photoUrl}
            alt={daughter?.fullName}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-pink-500"
          />
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              {daughter?.fullName}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Class: {daughter?.className} • Roll Number: {daughter?.rollNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Overall GPA</span>
            <div className="text-2xl font-black text-pink-600 dark:text-pink-400">3.95 / 4.0</div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Class Rank</span>
            <div className="text-2xl font-black text-emerald-600">2nd in Class</div>
          </div>
        </div>
      </div>

      {/* Marks List */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-pink-500" />
          Subject-Wise Evaluation Table
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {marks.map((m) => {
            const percentage = Math.round((m.obtainedMarks / m.totalMarks) * 100);
            return (
              <div key={m.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{m.subject}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 font-bold">
                      Grade: {m.grade}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1 font-medium">
                    {m.examType} • Evaluated on: {m.date}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl italic">
                    Faculty Remarks: &ldquo;{m.teacherRemarks}&rdquo;
                  </p>
                </div>

                <div className="text-right min-w-[120px] self-end md:self-center">
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {m.obtainedMarks} / {m.totalMarks}
                  </span>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-emerald-500 h-full rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 mt-1 block">{percentage}% Score</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Improvement Suggestions */}
      <div className="p-6 rounded-3xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-900/40 text-xs">
        <h4 className="font-bold text-violet-900 dark:text-violet-300 mb-2 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-violet-500" />
          SafeAI Learning Advisor: Recommended Next Steps
        </h4>
        <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300 leading-relaxed">
          <li>Sara shows outstanding aptitude in Biology (94.5%) and Mathematics factoring.</li>
          <li>For Physics kinematics, encourage practicing 5 extra multi-step numerical problems in the Student AI Homework Solver.</li>
          <li>Encourage regular active recall practice using the automated flashcards module before midterm revisions.</li>
        </ul>
      </div>
    </DashboardShell>
  );
}
