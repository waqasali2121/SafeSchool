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
} from "lucide-react";

export default function TeacherAttendancePage() {
  const { students, attendance, markAttendance, recordDeparture } = useApp();
  const [showQrModal, setShowQrModal] = useState(false);
  const [rfidSuccess, setRfidSuccess] = useState<string | null>(null);

  const handleSimulateRfid = (studentId: string, studentName: string) => {
    markAttendance(studentId, "present", "rfid_tap");
    setRfidSuccess(studentName);
    setTimeout(() => setRfidSuccess(null), 3000);
  };

  return (
    <DashboardShell
      title="Smart Attendance Terminal & Roll Call"
      subtitle="Multi-modal attendance tracking: Optical QR Badge Scanner, RFID Gate Tap, or Teacher Manual Override."
      action={
        <button
          onClick={() => setShowQrModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white text-xs font-bold shadow hover:opacity-95 transition"
        >
          <QrCode className="w-4 h-4" /> Launch Camera Scanner
        </button>
      }
    >
      {rfidSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>
            RFID Card Authenticated for <strong>{rfidSuccess}</strong>! Real-time WhatsApp confirmation dispatched to guardian.
          </span>
        </div>
      )}

      {/* Attendance Grid */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Roll Call Roster: Grade 10 - Lily
            </h3>
            <p className="text-xs text-slate-500">
              Date: {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Present
            </span>
            <span className="flex items-center gap-1 text-amber-500">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Late
            </span>
            <span className="flex items-center gap-1 text-red-500">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Absent
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {students.map((stu) => {
            const att = attendance.find((a) => a.studentId === stu.id);
            const currentStatus = att?.status || "absent";

            return (
              <div
                key={stu.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={stu.photoUrl}
                    alt={stu.fullName}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {stu.fullName}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Roll: {stu.rollNumber} • Parent: {stu.parentName} ({stu.parentPhone})
                    </p>
                    {att?.checkIn && (
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                        Checked in at: {att.checkIn} ({att.method.replace("_", " ").toUpperCase()})
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => markAttendance(stu.id, "present", "manual")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      currentStatus === "present"
                        ? "bg-emerald-600 text-white shadow"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Present
                  </button>

                  <button
                    onClick={() => markAttendance(stu.id, "late", "manual")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      currentStatus === "late"
                        ? "bg-amber-500 text-white shadow"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" /> Late
                  </button>

                  <button
                    onClick={() => markAttendance(stu.id, "absent", "manual")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                      currentStatus === "absent"
                        ? "bg-red-600 text-white shadow"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-700"
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" /> Absent
                  </button>

                  <button
                    onClick={() => handleSimulateRfid(stu.id, stu.fullName)}
                    className="px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 text-xs font-bold hover:bg-violet-600 hover:text-white transition flex items-center gap-1"
                    title="Simulate RFID Card Touch Sensor"
                  >
                    <Radio className="w-3.5 h-3.5" /> Tap RFID Card
                  </button>

                  {stu.isInsideCampus && (
                    <button
                      onClick={() => recordDeparture(stu.id)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 transition"
                    >
                      Exit Gate
                    </button>
                  )}
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
