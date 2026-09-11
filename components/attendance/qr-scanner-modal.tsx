"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import { QrCode, ScanLine, CheckCircle2, UserCheck, Sparkles, X, Radio } from "lucide-react";

export function QrScannerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { students, markAttendance } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || "stu-1");
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanSuccess(null);

    setTimeout(() => {
      setIsScanning(false);
      markAttendance(selectedStudentId, "present", "qr_scan");
      const stu = students.find((s) => s.id === selectedStudentId);
      setScanSuccess(stu?.fullName || "Student");
      setTimeout(() => {
        setScanSuccess(null);
      }, 3500);
    }, 1200);
  };

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Smart QR Attendance Terminal
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-speed optical check-in gate • Real-time parent broadcast
            </p>
          </div>
        </div>

        {/* Viewfinder simulator */}
        <div className="my-5 relative h-56 rounded-2xl bg-slate-950 flex flex-col items-center justify-center overflow-hidden border border-slate-800 text-white">
          {/* Scanning line animation */}
          <div className="absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-bounce" />

          {/* QR Target Frame */}
          <div className="w-36 h-36 border-2 border-pink-400/80 rounded-2xl p-2 relative flex items-center justify-center">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-pink-500" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-pink-500" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-pink-500" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-pink-500" />

            <QrCode className="w-24 h-24 text-pink-300 opacity-80" />
          </div>

          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1 font-mono">
            <Radio className="w-3 h-3 text-pink-400 animate-pulse" />
            CAMERA ACTIVE: Optical Sensor 1080p 60fps
          </p>
        </div>

        {/* Student selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Select Student ID Badge to Scan:
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none"
          >
            {students.map((stu) => (
              <option key={stu.id} value={stu.id}>
                {stu.fullName} ({stu.rollNumber}) - {stu.className}
              </option>
            ))}
          </select>

          {selectedStudent && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{selectedStudent.fullName}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Parent: {selectedStudent.parentName} ({selectedStudent.parentPhone})
                </p>
              </div>
              <span className="font-mono text-[10px] bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded-md">
                {selectedStudent.qrCodeToken}
              </span>
            </div>
          )}
        </div>

        {scanSuccess && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-bold">Scan Successful: {scanSuccess} Checked In!</p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                Automated arrival WhatsApp notification dispatched to guardian!
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
          <button
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 hover:opacity-95 disabled:opacity-50 transition"
          >
            <ScanLine className="w-4 h-4" />
            <span>{isScanning ? "Processing Badge Scan..." : "Simulate Badge Scan"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
