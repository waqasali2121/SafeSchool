"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  FileText,
  Layers,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Award,
  ArrowUpRight,
  CheckSquare,
  QrCode,
  Radio,
} from "lucide-react";

export default function StudentPage() {
  const { students, homework, marks, toggleHomeworkCompletion, triggerSos, isSosActive } = useApp();
  const currentStudent = students[0]; // Sara Ahmed

  return (
    <DashboardShell
      title="Student Learning Companion & Safety Portal"
      subtitle={`Welcome back, ${currentStudent?.fullName} • ${currentStudent?.className}`}
      action={
        <button
          onClick={() => triggerSos(currentStudent?.fullName)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
            isSosActive
              ? "bg-red-600 text-white animate-pulse"
              : "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:opacity-95"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{isSosActive ? "SOS BROADCASTING!" : "EMERGENCY SOS"}</span>
        </button>
      }
    >
      {/* Student Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentStudent?.photoUrl}
            alt={currentStudent?.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20">
                SafeAI Student
              </span>
              <span className="text-xs font-mono text-pink-100">Roll: {currentStudent?.rollNumber}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              Ready to learn today, {currentStudent?.fullName}?
            </h2>
            <p className="text-xs text-pink-100 mt-1 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-300 animate-pulse" />
                Campus Check-In Confirmed: {currentStudent?.lastSafetyCheckin}
              </span>
              <span>• Parent notified via WhatsApp</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/student/ai-assistant"
            className="px-5 py-2.5 bg-white text-slate-900 font-extrabold text-xs rounded-xl shadow hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Open AI Chatbot</span>
          </Link>
        </div>
      </div>

      {/* Quick AI Modules Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <Link
          href="/student/ai-assistant"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-pink-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">AI Assistant</h4>
          <p className="text-[10px] text-slate-400">RAG Textbook Q&A</p>
        </Link>

        <Link
          href="/student/mcq-practice"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-violet-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">MCQ Practice</h4>
          <p className="text-[10px] text-slate-400">Interactive Quiz</p>
        </Link>

        <Link
          href="/student/homework-solver"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Problem Solver</h4>
          <p className="text-[10px] text-slate-400">Step-by-Step</p>
        </Link>

        <Link
          href="/student/assignment-generator"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Assignments</h4>
          <p className="text-[10px] text-slate-400">Custom Worksheets</p>
        </Link>

        <Link
          href="/student/study-tools"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Flashcards</h4>
          <p className="text-[10px] text-slate-400">Active Recall</p>
        </Link>

        <Link
          href="/student/sos"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-red-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Safety Radar</h4>
          <p className="text-[10px] text-slate-400">SOS & Services</p>
        </Link>
      </div>

      {/* Main Two Columns: Homework Checklist & Academic Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Homework Checklist */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-pink-500" />
              My Homework & Tasks Checklist
            </h3>
            <span className="text-xs text-slate-400">Click circle to mark completed</span>
          </div>

          <div className="space-y-3">
            {homework.map((hw) => (
              <div
                key={hw.id}
                onClick={() => toggleHomeworkCompletion(hw.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  hw.isCompletedByStudent
                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 opacity-75"
                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 hover:border-pink-300"
                }`}
              >
                <div className="mt-0.5">
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      hw.isCompletedByStudent ? "text-emerald-600" : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`font-bold text-slate-900 dark:text-white ${
                        hw.isCompletedByStudent ? "line-through text-slate-400" : ""
                      }`}
                    >
                      {hw.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-pink-600">{hw.dueDate}</span>
                  </div>
                  <p className="text-slate-500 mt-1 line-clamp-2">{hw.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Exam Marks Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-violet-500" />
              Recent Examination Results
            </h3>
            <span className="text-xs font-bold text-emerald-600">GPA: 3.95 (A+)</span>
          </div>

          <div className="space-y-3">
            {marks.map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{m.subject}</h4>
                  <p className="text-[11px] text-slate-400">{m.examType}</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-slate-900 dark:text-white">
                    {m.obtainedMarks} / {m.totalMarks}
                  </span>
                  <span className="block text-[11px] text-pink-600 font-bold">Grade {m.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
