"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { GeofenceCard } from "@/components/safety/geofence-card";
import { EmergencyRadar } from "@/components/safety/emergency-radar";
import { QrScannerModal } from "@/components/attendance/qr-scanner-modal";
import {
  Users,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  QrCode,
  Radio,
  ArrowUpRight,
  Sparkles,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function AdminPage() {
  const { students, attendance, documents, triggerSos, isSosActive } = useApp();
  const [showQrModal, setShowQrModal] = useState(false);

  const totalStudents = students.length;
  const insideCampusCount = students.filter((s) => s.isInsideCampus).length;
  const attendanceRate = 96.5;

  return (
    <DashboardShell
      title="School Administration & Campus Safety Command"
      subtitle="Comprehensive campus monitoring, student safety feeds, and academic oversight."
      action={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-xs font-bold hover:bg-pink-600 hover:text-white transition"
          >
            <QrCode className="w-4 h-4" /> Scan Turnstile QR
          </button>
          <Link
            href="/admin/documents"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-90 transition"
          >
            <BookOpen className="w-4 h-4 text-pink-500" /> Upload Curriculum
          </Link>
        </div>
      }
    >
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Students Enrolled</span>
            <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            110 <span className="text-xs font-semibold text-emerald-600">Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">4 Academic Sections (Grades 8-10)</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Inside Campus Now</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
            {insideCampusCount} of {totalStudents}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Checked in via Smart Gates</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Attendance Rate</span>
            <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {attendanceRate}%
          </div>
          <p className="text-[11px] text-emerald-600 mt-1">↑ 2.1% higher than last month</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">RAG Documents</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            {documents.length} Indexed
          </div>
          <p className="text-[11px] text-slate-400 mt-1">pgvector Semantic Index Active</p>
        </div>
      </div>

      {/* Main Grid: Campus Safety Feeds & Geofence Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Geofence Radar Card */}
          <GeofenceCard studentId="stu-1" />

          {/* Real-time Campus Attendance & Safety Log */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-500" />
                Live Turnstile Check-In & Departure Logs
              </h3>
              <Link
                href="/admin/analytics"
                className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline"
              >
                View Full Logs →
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 space-y-2">
              {attendance.map((rec) => (
                <div key={rec.id} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        rec.status === "present"
                          ? "bg-emerald-500"
                          : rec.status === "late"
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {rec.studentName} ({rec.rollNumber})
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {rec.className} • Gate: {rec.method.replace("_", " ").toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {rec.checkIn || "Absent"}
                    </span>
                    <p className="text-[10px] text-emerald-600 font-semibold">
                      Parent Notified {rec.parentNotifiedArrival ? "✓" : "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Emergency Radar & Fast Drill */}
        <div className="space-y-6">
          <EmergencyRadar />

          <div className="p-6 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-violet-600 text-white shadow-lg space-y-3">
            <h3 className="font-extrabold text-base">Annual Campus Safety Drill</h3>
            <p className="text-xs text-pink-100 leading-relaxed">
              Test full school notification broadcast, geofence alarm, and police dispatch connection in simulation mode.
            </p>
            <button
              onClick={() => triggerSos("Campus Safety Drill Simulator")}
              className="w-full py-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl shadow hover:bg-slate-100 transition"
            >
              Simulate Campus-Wide Drill Alert
            </button>
          </div>
        </div>
      </div>

      <QrScannerModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
    </DashboardShell>
  );
}
