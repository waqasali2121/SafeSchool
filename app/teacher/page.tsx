"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { QrScannerModal } from "@/components/attendance/qr-scanner-modal";
import {
  GraduationCap,
  QrCode,
  CheckSquare,
  Award,
  Sparkles,
  Megaphone,
  Clock,
  CheckCircle2,
  Users,
  ArrowUpRight,
} from "lucide-react";

export default function TeacherPage() {
  const { students, attendance, homework, marks } = useApp();
  const [showQrModal, setShowQrModal] = useState(false);

  const myClassStudents = students.filter((s) => s.className.includes("Grade 10 - Lily"));
  const presentCount = attendance.filter((a) => a.status === "present").length;

  return (
    <DashboardShell
      title="Teacher Command Center"
      subtitle="Welcome back, Dr. Amina Qureshi • Department of Science & Biology"
      action={
        <button
          onClick={() => setShowQrModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white text-xs font-bold shadow hover:opacity-95 transition"
        >
          <QrCode className="w-4 h-4" /> Open Turnstile Scanner
        </button>
      }
    >
      {/* Top summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">My Students (Grade 10-Lily)</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            28 Students
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {presentCount} Present in Class Today
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Active Homework Tasks</span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-2">
            {homework.length} Assigned
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Next due: Tomorrow, 4:00 PM</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Class Average Score</span>
          <div className="text-2xl font-black text-violet-600 dark:text-violet-400 mt-2">
            92.8% (Grade A+)
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Mid-Term & Monthly Quizzes</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">AI Teaching Assistant</span>
          <div className="text-2xl font-black text-pink-600 dark:text-pink-400 mt-2">
            Ready
          </div>
          <p className="text-[11px] text-slate-400 mt-1">MCQs & Lesson Rubric Builder</p>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/teacher/attendance"
          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-pink-500 transition text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <QrCode className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-slate-900 dark:text-white">Mark Attendance</h4>
          <p className="text-[10px] text-slate-400">QR / RFID / Manual</p>
        </Link>

        <Link
          href="/teacher/homework"
          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <CheckSquare className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-slate-900 dark:text-white">Manage Homework</h4>
          <p className="text-[10px] text-slate-400">Assign & Deadlines</p>
        </Link>

        <Link
          href="/teacher/marks"
          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-violet-500 transition text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-slate-900 dark:text-white">Enter Marks</h4>
          <p className="text-[10px] text-slate-400">Gradebook & Remarks</p>
        </Link>

        <Link
          href="/teacher/mcq-generator"
          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 transition text-center group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-xs text-slate-900 dark:text-white">AI MCQ Generator</h4>
          <p className="text-[10px] text-slate-400">Quiz & Test Creator</p>
        </Link>
      </div>

      {/* Roster & Attendance Status */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-pink-500" />
            Class 10 - Lily: Real-Time Attendance Roll Call
          </h3>
          <Link
            href="/teacher/attendance"
            className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline"
          >
            Mark Full Roll Call →
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {myClassStudents.map((stu) => {
            const att = attendance.find((a) => a.studentId === stu.id);
            return (
              <div key={stu.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={stu.photoUrl}
                    alt={stu.fullName}
                    className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">{stu.fullName}</h5>
                    <p className="text-[11px] text-slate-400">Roll: {stu.rollNumber}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      att?.status === "present"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : att?.status === "late"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                        : "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                    }`}
                  >
                    {att?.status || "Absent"}
                  </span>
                  <span className="font-mono text-slate-500 text-[11px] hidden sm:inline">
                    {att?.checkIn ? `In: ${att.checkIn}` : "Not scanned"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <QrScannerModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
    </DashboardShell>
  );
}
