"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { QrScannerModal } from "@/components/attendance/qr-scanner-modal";
import {
  QrCode,
  Radio,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Send,
  Sparkles,
  Users,
  Check,
  Calendar,
  Layers,
  BellRing,
} from "lucide-react";

export default function TeacherAttendancePage() {
  const { students, attendance, batchSubmitAttendance, markAttendance, classes } = useApp();
  const [showQrModal, setShowQrModal] = useState(false);
  const [rfidSuccess, setRfidSuccess] = useState<string | null>(null);

  const [selectedClass, setSelectedClass] = useState("Grade 10 - Lily");
  const [selectedPeriod, setSelectedPeriod] = useState<{ number: number; name: string }>({
    number: 1,
    name: "Period 1: Biology & Life Sciences",
  });

  // Local state for the period roster attendance
  const [rosterStatus, setRosterStatus] = useState<Record<string, "present" | "late" | "absent">>({
    "stu-1": "present",
    "stu-2": "present",
    "stu-3": "absent",
    "stu-4": "late",
  });

  const [submissionFeedback, setSubmissionFeedback] = useState<{
    submitted: boolean;
    absentCount: number;
    periodName: string;
  } | null>(null);

  const periodsList = [
    { number: 0, name: "Daily Morning Homeroom Roll Call", time: "07:45 AM - 08:00 AM" },
    { number: 1, name: "Period 1: Biology & Life Sciences", time: "08:00 AM - 08:50 AM" },
    { number: 2, name: "Period 2: Mathematics & Algebra", time: "08:55 AM - 09:45 AM" },
    { number: 3, name: "Period 3: English Literature", time: "09:50 AM - 10:40 AM" },
    { number: 4, name: "Period 4: Computer Science & AI", time: "11:10 AM - 12:00 PM" },
    { number: 5, name: "Period 5: Physics", time: "12:05 PM - 12:55 PM" },
  ];

  const handleSetStudentStatus = (studentId: string, status: "present" | "late" | "absent") => {
    setRosterStatus((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const allPresent: Record<string, "present"> = {};
    students.forEach((s) => {
      allPresent[s.id] = "present";
    });
    setRosterStatus(allPresent);
  };

  const handleSubmitAttendance = () => {
    const records = students.map((s) => ({
      studentId: s.id,
      status: rosterStatus[s.id] || "present",
    }));

    batchSubmitAttendance(selectedClass, selectedPeriod.number, selectedPeriod.name, records);

    const absentees = records.filter((r) => r.status === "absent").length;
    setSubmissionFeedback({
      submitted: true,
      absentCount: absentees,
      periodName: selectedPeriod.name,
    });

    setTimeout(() => {
      setSubmissionFeedback(null);
    }, 5000);
  };

  const handleSimulateRfid = (studentId: string, studentName: string) => {
    markAttendance(studentId, "present", "rfid_tap");
    setRosterStatus((prev) => ({ ...prev, [studentId]: "present" }));
    setRfidSuccess(studentName);
    setTimeout(() => setRfidSuccess(null), 3000);
  };

  const presentCount = students.filter((s) => (rosterStatus[s.id] || "present") === "present").length;
  const lateCount = students.filter((s) => rosterStatus[s.id] === "late").length;
  const absentCount = students.filter((s) => rosterStatus[s.id] === "absent").length;

  return (
    <DashboardShell
      title="Push Attendance Tracking & Period Roll Call"
      subtitle="One-tap daily and period-wise digital attendance submission. Absence events automatically dispatch real-time parent notifications."
      action={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-xs font-bold hover:bg-pink-600 hover:text-white transition cursor-pointer"
          >
            <QrCode className="w-4 h-4" /> Scan Student QR Badge
          </button>
        </div>
      }
    >
      {/* Feedback Banners */}
      {rfidSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            RFID Card Authenticated for <strong>{rfidSuccess}</strong>! Real-time WhatsApp confirmation dispatched to guardian.
          </span>
        </div>
      )}

      {submissionFeedback && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs shadow-md space-y-1 animate-fade-in">
          <div className="flex items-center gap-2 font-black text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Attendance Submitted for {submissionFeedback.periodName}!</span>
          </div>
          <p className="text-emerald-50 text-[11px]">
            Roster records synchronized. {submissionFeedback.absentCount > 0 ? (
              <strong>
                ⚠️ {submissionFeedback.absentCount} absence event(s) detected: Real-time high-priority alerts pushed to parents via SMS and App inbox.
              </strong>
            ) : (
              "All students accounted for with 100% presence."
            )}
          </p>
        </div>
      )}

      {/* Top Configuration & Period Selection */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <Users className="w-4 h-4 text-pink-500" />
              <span>Target Class:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.name}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPresent}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-600 hover:text-white transition cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> One-Tap Mark All Present
            </button>
          </div>
        </div>

        {/* Period Selector Tabs */}
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Select Attendance Period
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {periodsList.map((p) => {
              const isSelected = selectedPeriod.number === p.number;
              return (
                <button
                  key={p.number}
                  type="button"
                  onClick={() => setSelectedPeriod({ number: p.number, name: p.name })}
                  className={`p-3 rounded-2xl text-left border transition cursor-pointer ${
                    isSelected
                      ? "border-pink-500 bg-pink-50/70 dark:bg-pink-950/40 text-pink-900 dark:text-white ring-2 ring-pink-400/20"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="text-xs font-extrabold truncate">
                    {p.number === 0 ? "Homeroom" : `P${p.number}`}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{p.time}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Roster & Quick Submission Bar */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
        {/* Status Summary Counts & Push Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              {presentCount} Present
            </span>
            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              {lateCount} Late
            </span>
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              {absentCount} Absent
            </span>
          </div>

          <button
            onClick={handleSubmitAttendance}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white text-xs font-extrabold shadow-md hover:opacity-95 transition cursor-pointer"
          >
            <Send className="w-4 h-4" /> Submit & Push to Parents
          </button>
        </div>

        {/* Student Roster Table */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {students.map((stu) => {
            const current = rosterStatus[stu.id] || "present";
            return (
              <div
                key={stu.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={stu.photoUrl}
                    alt={stu.fullName}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      {stu.fullName}
                      <span className="text-[10px] font-mono font-bold text-slate-400">({stu.rollNumber})</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Parent: <strong>{stu.parentName}</strong> • {stu.parentPhone}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => handleSimulateRfid(stu.id, stu.fullName)}
                        className="text-[10px] text-pink-600 dark:text-pink-400 font-bold hover:underline"
                      >
                        [Tap RFID Tag]
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3-State Push Selector */}
                <div className="flex items-center gap-1.5 self-end md:self-auto">
                  <button
                    type="button"
                    onClick={() => handleSetStudentStatus(stu.id, "present")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      current === "present"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Present
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetStudentStatus(stu.id, "late")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      current === "late"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Late
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetStudentStatus(stu.id, "absent")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      current === "absent"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Absent (Auto-Alert)
                  </button>
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
