"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { ChildSwitcher } from "@/components/parent/child-switcher";
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Layers,
  Sparkles,
  Filter,
} from "lucide-react";

export default function ParentHomeworkPage() {
  const { homework, students, activeChildId } = useApp();
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "submitted">("all");

  const currentChild = students.find((s) => s.id === activeChildId) || students[0];
  const childHomework = homework.filter((h) => h.className === currentChild?.className);

  const filteredHomework = childHomework.filter((h) => {
    if (filterStatus === "pending") return !h.isCompletedByStudent;
    if (filterStatus === "submitted") return h.isCompletedByStudent;
    return true;
  });

  const pendingCount = childHomework.filter((h) => !h.isCompletedByStudent).length;
  const submittedCount = childHomework.filter((h) => h.isCompletedByStudent).length;

  return (
    <DashboardShell
      title="Homework & Assignment Monitoring"
      subtitle={`Track curriculum assignments, project deadlines, and submission statuses for ${currentChild?.fullName}`}
    >
      {/* Multi-Child Switcher */}
      <ChildSwitcher className="mb-6" />

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Assigned</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {childHomework.length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Pending Review / Due</span>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
              {pendingCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Submitted Work</span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              {submittedCount}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-xl transition ${
              filterStatus === "all"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            All ({childHomework.length})
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-3 py-1.5 rounded-xl transition ${
              filterStatus === "pending"
                ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilterStatus("submitted")}
            className={`px-3 py-1.5 rounded-xl transition ${
              filterStatus === "submitted"
                ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Submitted ({submittedCount})
          </button>
        </div>

        <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
          Showing curriculum tasks for {currentChild?.className}
        </span>
      </div>

      {/* Homework Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHomework.map((hw) => (
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
