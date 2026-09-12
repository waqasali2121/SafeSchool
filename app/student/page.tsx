"use client";

import React, { useState } from "react";
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
  Calendar,
  MapPin,
  FileCheck,
  Check,
  Timer,
  ChevronRight,
  Send,
} from "lucide-react";

export default function StudentPage() {
  const { students, homework, marks, toggleHomeworkCompletion, triggerSos, isSosActive, attendance } = useApp();
  const currentStudent = students[0]; // Sara Ahmed
  const todayAttendance = attendance.find((a) => a.studentId === currentStudent?.id);

  // Daily period schedule for today (Monday)
  const todaySchedule = [
    { period: 1, subject: "Homeroom Roll-Call", time: "08:00 AM - 08:45 AM", room: "Lab 3", teacher: "Dr. Amina Qureshi", isCurrent: false, isCompleted: true },
    { period: 2, subject: "Biology & Life Sciences", time: "08:45 AM - 09:30 AM", room: "Lab 3", teacher: "Dr. Amina Qureshi", isCurrent: false, isCompleted: true },
    { period: 3, subject: "Mathematics & Algebra", time: "09:30 AM - 10:15 AM", room: "Lab 3", teacher: "Ms. Hiba Rashid", isCurrent: true, isCompleted: false },
    { period: 4, subject: "English Literature", time: "10:30 AM - 11:15 AM", room: "Room 101", teacher: "Mrs. Sarah Jenkins", isCurrent: false, isCompleted: false },
    { period: 5, subject: "Computer Science & AI", time: "11:15 AM - 12:00 PM", room: "AI Lab", teacher: "Engr. Noor Fatima", isCurrent: false, isCompleted: false },
    { period: 6, subject: "Physics", time: "12:30 PM - 01:15 PM", room: "Lab 3", teacher: "Dr. Samira Al-Mansoor", isCurrent: false, isCompleted: false },
  ];

  // Submitted Coursework & Practical Projects
  const submittedProjects = [
    {
      id: "p-1",
      title: "Cellular Photosynthesis Laboratory Write-Up",
      subject: "Biology & Life Sciences",
      grade: "A+",
      score: "49/50",
      submittedDate: "Sep 05, 2026",
      remarks: "Flawless microscopic diagrams and clear calculation of stomata aperture.",
      status: "Graded & Certified",
    },
    {
      id: "p-2",
      title: "AI Ethics & Algorithmic Fairness Research Paper",
      subject: "Computer Science & AI",
      grade: "A+",
      score: "48/50",
      submittedDate: "Aug 28, 2026",
      remarks: "Exceptional analysis of safety guardrails for student learning models.",
      status: "Graded & Certified",
    },
    {
      id: "p-3",
      title: "Kinematics Free-Fall Velocity Experiment",
      subject: "Physics",
      grade: "A",
      score: "45/50",
      submittedDate: "Sep 02, 2026",
      remarks: "Solid experimental data; consider adding uncertainty error margins.",
      status: "Graded & Certified",
    },
  ];

  // Attendance history stamps
  const pastAttendanceDays = [
    { date: "Today", checkIn: todayAttendance?.checkIn || "07:45 AM", method: "Smart QR Turnstile #1", status: "Present", onTime: true },
    { date: "Yesterday", checkIn: "07:42 AM", method: "RFID Card Tap", status: "Present", onTime: true },
    { date: "Sep 9, 2026", checkIn: "07:48 AM", method: "Smart QR Turnstile #2", status: "Present", onTime: true },
    { date: "Sep 8, 2026", checkIn: "07:40 AM", method: "RFID Card Tap", status: "Present", onTime: true },
  ];

  return (
    <DashboardShell
      title="Student Learning Companion & Command Center"
      subtitle={`Welcome back, ${currentStudent?.fullName} • Class: ${currentStudent?.className}`}
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
                SafeAI Student Verified
              </span>
              <span className="text-xs font-mono text-pink-100">Roll: {currentStudent?.rollNumber}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              Ready for academic excellence, {currentStudent?.fullName}?
            </h2>
            <p className="text-xs text-pink-100 mt-1 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-300 animate-pulse" />
                North Gate Turnstile Entry: {todayAttendance?.checkIn || "07:45 AM"}
              </span>
              <span>• Parent sync verified</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/student/ai-assistant"
            className="px-5 py-2.5 bg-white text-slate-900 font-extrabold text-xs rounded-xl shadow hover:bg-slate-100 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Open AI Tutor</span>
          </Link>

          <Link
            href="/student/exams"
            className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 border border-white/30"
          >
            <Award className="w-4 h-4" />
            <span>Past Papers & Exams</span>
          </Link>
        </div>
      </div>

      {/* Quick Access Modules Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <Link
          href="/student/ai-assistant"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-pink-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">AI Tutor</h4>
          <p className="text-[10px] text-slate-400">Grounded Textbook Q&A</p>
        </Link>

        <Link
          href="/student/exams"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Exam Prep</h4>
          <p className="text-[10px] text-slate-400">Past Papers & Timed Test</p>
        </Link>

        <Link
          href="/student/study-tools"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Study Generator</h4>
          <p className="text-[10px] text-slate-400">Quizzes, Decks & Sheets</p>
        </Link>

        <Link
          href="/student/mcq-practice"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-violet-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">MCQ Trainer</h4>
          <p className="text-[10px] text-slate-400">Confetti Score Drills</p>
        </Link>

        <Link
          href="/student/homework-solver"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <FileText className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">HW Solver</h4>
          <p className="text-[10px] text-slate-400">Step-by-Step Derivation</p>
        </Link>

        <Link
          href="/student/sos"
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-red-500 transition text-center group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">Safety SOS</h4>
          <p className="text-[10px] text-slate-400">Live Campus Geofence</p>
        </Link>
      </div>

      {/* Main Two Columns: Today's Daily Schedule & Homework Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Daily Period Schedule */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-pink-500" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Today&apos;s Class Schedule (Monday)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 dark:bg-pink-950/40 px-2.5 py-0.5 rounded-full">
              Grade 10 - Lily
            </span>
          </div>

          <div className="space-y-2.5">
            {todaySchedule.map((slot) => (
              <div
                key={slot.period}
                className={`p-3.5 rounded-2xl border transition text-xs flex items-center justify-between ${
                  slot.isCurrent
                    ? "bg-gradient-to-r from-pink-500/10 to-violet-500/10 border-pink-500/60 dark:border-pink-500/40 ring-2 ring-pink-500/20"
                    : slot.isCompleted
                    ? "bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 opacity-80"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl font-black flex items-center justify-center text-xs ${
                      slot.isCurrent
                        ? "bg-pink-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    P{slot.period}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                        {slot.subject}
                      </h4>
                      {slot.isCurrent && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-pink-600 text-white animate-pulse">
                          Now Live
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {slot.teacher} • {slot.room}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-slate-600 dark:text-slate-300 text-[11px] block">
                    {slot.time}
                  </span>
                  <span
                    className={`text-[9px] font-bold ${
                      slot.isCompleted ? "text-emerald-600" : slot.isCurrent ? "text-pink-600" : "text-slate-400"
                    }`}
                  >
                    {slot.isCompleted ? "Completed" : slot.isCurrent ? "In Progress" : "Upcoming"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Homework & Tasks Checklist */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-500" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Pending Homework Checklist
              </h3>
            </div>
            <span className="text-xs text-slate-400">1-tap circle to submit</span>
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
      </div>

      {/* Lower Row: Submitted Coursework Portfolio & Turnstile Arrival History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submitted Practical Projects */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-500" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Submitted Coursework & Practical Projects
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-600">3/3 Certified</span>
          </div>

          <div className="space-y-3">
            {submittedProjects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 text-xs"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-900 dark:text-white text-sm">{proj.title}</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-black">
                    Grade {proj.grade} ({proj.score})
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                  <span>{proj.subject}</span>
                  <span>•</span>
                  <span>Submitted: {proj.submittedDate}</span>
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-300 italic bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  Faculty Remarks: &ldquo;{proj.remarks}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Turnstile Check-In History */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-violet-500" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Turnstile Check-In & Punctuality Record
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-600">100% On-Time</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pastAttendanceDays.map((att, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">{att.date}</h5>
                    <p className="text-slate-400 text-[11px] font-mono">{att.method}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-600">{att.checkIn}</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Arrival Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
