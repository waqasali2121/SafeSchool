"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { Clock, CheckCircle2, ShieldCheck, Calendar, Radio } from "lucide-react";

export default function ParentAttendancePage() {
  const { students, attendance } = useApp();
  const daughter = students[0];

  const pastLogs = [
    { date: "Today", checkIn: "07:45 AM", checkOut: "On Campus", method: "Smart QR Turnstile #1", status: "Present" },
    { date: "Yesterday", checkIn: "07:42 AM", checkOut: "01:45 PM", method: "RFID Card Tap", status: "Present" },
    { date: "Sep 9, 2026", checkIn: "07:48 AM", checkOut: "01:40 PM", method: "Smart QR Turnstile #2", status: "Present" },
    { date: "Sep 8, 2026", checkIn: "07:40 AM", checkOut: "01:42 PM", method: "RFID Card Tap", status: "Present" },
    { date: "Sep 7, 2026", checkIn: "07:45 AM", checkOut: "01:40 PM", method: "Smart QR Turnstile #1", status: "Present" },
  ];

  return (
    <DashboardShell
      title="Attendance Logs & Turnstile History"
      subtitle={`Verified campus arrival & departure history for ${daughter?.fullName}`}
    >
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Daily Timestamp Log
            </h3>
            <p className="text-xs text-slate-500">Each entry triggers an automated parental SMS/WhatsApp notification.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-xs">
              Attendance: 98.4%
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {pastLogs.map((log, idx) => (
            <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{log.date}</h4>
                  <p className="text-slate-400 font-mono text-[11px]">{log.method}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-slate-400 block text-[10px]">Arrival</span>
                  <span className="font-mono font-bold text-emerald-600">{log.checkIn}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Departure</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{log.checkOut}</span>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
