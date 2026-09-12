"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { ChildSwitcher } from "@/components/parent/child-switcher";
import {
  Clock,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Radio,
  AlertTriangle,
  Send,
  Smartphone,
  Mail,
  MessageCircle,
  FileCheck,
  Check,
  Layers,
} from "lucide-react";

export default function ParentAttendancePage() {
  const {
    students,
    attendance,
    activeChildId,
    alerts,
    acknowledgeEmergencyBroadcast,
  } = useApp();

  const [selectedTab, setSelectedTab] = useState<"daily" | "period" | "broadcasts">("daily");

  const currentChild = students.find((s) => s.id === activeChildId) || students[0];
  const todayRecord = attendance.find((a) => a.studentId === currentChild?.id);

  // Period attendance for current child
  const periodSchedule = [
    { period: 1, name: "Homeroom / Assembly", time: "08:00 AM - 08:45 AM", status: "Present", teacher: "Class Tutor", room: "Room 101" },
    { period: 2, name: currentChild?.className?.includes("10") ? "Biology & Life Sciences" : "General Science", time: "08:45 AM - 09:30 AM", status: "Present", teacher: "Dr. Amina Qureshi", room: "Lab 3" },
    { period: 3, name: "Mathematics & Algebra", time: "09:30 AM - 10:15 AM", status: "Present", teacher: "Ms. Hiba Rashid", room: "Lab 3" },
    { period: 4, name: "English Literature", time: "10:30 AM - 11:15 AM", status: "Present", teacher: "Mrs. Sarah Jenkins", room: "Lab 3" },
    { period: 5, name: "Computer Science & AI", time: "11:15 AM - 12:00 PM", status: "Present", teacher: "Engr. Noor Fatima", room: "AI Lab" },
    { period: 6, name: "Physical Education / STEM", time: "12:30 PM - 01:15 PM", status: "Present", teacher: "Coach Rehana", room: "Grounds" },
  ];

  // Past turnstile logs
  const pastLogs = currentChild?.className?.includes("10")
    ? [
        { date: "Today", checkIn: todayRecord?.checkIn || "07:45 AM", checkOut: "On Campus", method: "Smart QR Turnstile #1", status: "Present" },
        { date: "Yesterday", checkIn: "07:42 AM", checkOut: "01:45 PM", method: "RFID Card Tap", status: "Present" },
        { date: "Sep 9, 2026", checkIn: "07:48 AM", checkOut: "01:40 PM", method: "Smart QR Turnstile #2", status: "Present" },
        { date: "Sep 8, 2026", checkIn: "07:40 AM", checkOut: "01:42 PM", method: "RFID Card Tap", status: "Present" },
        { date: "Sep 7, 2026", checkIn: "07:45 AM", checkOut: "01:40 PM", method: "Smart QR Turnstile #1", status: "Present" },
      ]
    : [
        { date: "Today", checkIn: "07:42 AM", checkOut: "On Campus", method: "RFID Card Tap", status: "Present" },
        { date: "Yesterday", checkIn: "07:46 AM", checkOut: "01:40 PM", method: "Smart QR Turnstile #1", status: "Present" },
        { date: "Sep 9, 2026", checkIn: "07:44 AM", checkOut: "01:42 PM", method: "RFID Card Tap", status: "Present" },
        { date: "Sep 8, 2026", checkIn: "07:50 AM", checkOut: "01:45 PM", method: "Smart QR Turnstile #1", status: "Present" },
        { date: "Sep 7, 2026", checkIn: "07:41 AM", checkOut: "01:40 PM", method: "RFID Card Tap", status: "Present" },
      ];

  // Emergency broadcasts & receipts
  const emergencyBroadcasts = alerts.filter(
    (a) =>
      a.category === "emergency" ||
      a.category === "medical" ||
      a.severity === "critical" ||
      a.targetType === "all" ||
      a.studentId === currentChild?.id
  );

  return (
    <DashboardShell
      title="Attendance & Safety Broadcast Center"
      subtitle={`Verified campus turnstile check-ins, period-wise roll-call, and official emergency receipts for ${currentChild?.fullName}`}
    >
      {/* Multi-Child Switcher */}
      <ChildSwitcher className="mb-6" />

      {/* Real-Time Live Arrival Status Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Radio className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Live Turnstile Sync Active
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {currentChild?.rfidCardId}</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
              {currentChild?.fullName} is {currentChild?.isInsideCampus ? "Recorded On Campus" : "Off Campus"}
            </h3>
            <p className="text-xs text-slate-500">
              Arrival: <span className="font-bold text-emerald-600">{todayRecord?.checkIn || "07:45 AM"}</span> via North Gate Sensor • Automatic parental SMS/WhatsApp receipt issued.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-3 md:pt-0 md:pl-6">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Term Attendance</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {currentChild?.attendanceRate}%
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Punctuality</span>
            <div className="text-2xl font-black text-emerald-600">100%</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 mb-6">
        <button
          onClick={() => setSelectedTab("daily")}
          className={`pb-3 text-xs font-extrabold transition border-b-2 flex items-center gap-1.5 ${
            selectedTab === "daily"
              ? "border-pink-600 text-pink-600 dark:text-pink-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Calendar className="w-4 h-4" /> Daily Turnstile History
        </button>

        <button
          onClick={() => setSelectedTab("period")}
          className={`pb-3 text-xs font-extrabold transition border-b-2 flex items-center gap-1.5 ${
            selectedTab === "period"
              ? "border-pink-600 text-pink-600 dark:text-pink-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Layers className="w-4 h-4" /> Period-Wise Timetable Roll-Call
        </button>

        <button
          onClick={() => setSelectedTab("broadcasts")}
          className={`pb-3 text-xs font-extrabold transition border-b-2 flex items-center gap-1.5 ${
            selectedTab === "broadcasts"
              ? "border-pink-600 text-pink-600 dark:text-pink-400"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> Emergency Broadcast Receipts ({emergencyBroadcasts.length})
        </button>
      </div>

      {/* Tab 1: Daily Turnstile History */}
      {selectedTab === "daily" && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Daily Check-In / Check-Out Log
              </h3>
              <p className="text-xs text-slate-500">
                Optical QR scanner & RFID contactless sensor events with automated guardian dispatch.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
              Zero Unexcused Absences
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pastLogs.map((log, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{log.date}</h4>
                    <p className="text-slate-400 font-mono text-[11px]">{log.method}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Arrival Scan</span>
                    <span className="font-mono font-bold text-emerald-600">{log.checkIn}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Campus Dismissal</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{log.checkOut}</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold uppercase text-[10px]">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Period-Wise Attendance */}
      {selectedTab === "period" && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Period-Wise Daily Digital Roll-Call
              </h3>
              <p className="text-xs text-slate-500">
                Submitted in real time by course teachers for each academic period today.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-pink-600 bg-pink-50 dark:bg-pink-950/40 px-2.5 py-1 rounded-full">
              6 of 6 Periods Recorded
            </span>
          </div>

          <div className="space-y-3">
            {periodSchedule.map((p) => (
              <div
                key={p.period}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 flex items-center justify-center font-black">
                    P{p.period}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</h4>
                    <p className="text-slate-500 text-[11px]">
                      {p.teacher} • Room: {p.room} • {p.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-[10px] text-slate-400 font-mono">Digital Signature: Verified</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-extrabold text-[10px] uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Emergency Broadcast Receipts */}
      {selectedTab === "broadcasts" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-xs">
            <h4 className="font-bold text-red-900 dark:text-red-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              Automated Emergency Broadcast Audit & Confirmation
            </h4>
            <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              When emergency drills, weather closures, or medical alerts are issued, SafeAI School automatically transmits priority packets across cellular SMS, Native Push, and WhatsApp. Parents can acknowledge receipt below to confirm family safety.
            </p>
          </div>

          <div className="space-y-3">
            {emergencyBroadcasts.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        b.severity === "critical"
                          ? "bg-red-600 text-white"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {b.category.toUpperCase()} BROADCAST
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {b.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{b.createdAt}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
                  {b.message}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">Carrier Channels:</span>
                    {b.channels.map((ch) => (
                      <span
                        key={ch}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> SMS & Push Delivered
                    </span>

                    <button
                      onClick={() => acknowledgeEmergencyBroadcast(b.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition shadow-sm"
                    >
                      Acknowledge Safe Receipt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
