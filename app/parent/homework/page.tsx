"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { CheckSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function ParentHomeworkPage() {
  const { homework, students } = useApp();
  const daughter = students[0];

  return (
    <DashboardShell
      title="Homework & Assignment Monitoring"
      subtitle={`Track assignments, project deadlines, and completion statuses for ${daughter?.fullName}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homework.map((hw) => (
          <div
            key={hw.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
                  {hw.subject}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    hw.isCompletedByStudent
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                  }`}
                >
                  {hw.isCompletedByStudent ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" /> Submitted
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" /> Pending Work
                    </>
                  )}
                </span>
              </div>

              <h4 className="font-extrabold text-base text-slate-900 dark:text-white mt-3">
                {hw.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {hw.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Due: {hw.dueDate}
              </span>
              <span>Assigned by {hw.assignedBy}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
