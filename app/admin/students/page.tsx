"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { Student } from "@/lib/types";
import { QrScannerModal } from "@/components/attendance/qr-scanner-modal";
import {
  Users,
  Search,
  Plus,
  QrCode,
  MapPin,
  Phone,
  ShieldCheck,
  Radio,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export default function AdminStudentsPage() {
  const { students } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [showQrModal, setShowQrModal] = useState(false);
  const [viewBadgeStudent, setViewBadgeStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter((stu) => {
    const matchesSearch =
      stu.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "All" || stu.className.includes(selectedClass);
    return matchesSearch && matchesClass;
  });

  return (
    <DashboardShell
      title="Student Directory & Safety Profiles"
      subtitle="Manage student enrollments, smart badges, emergency parent contacts, and campus presence."
      action={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-xs font-bold hover:bg-pink-600 hover:text-white transition"
          >
            <QrCode className="w-4 h-4" /> Scan Student Badge
          </button>
        </div>
      }
    >
      {/* Search & Filter Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student, roll number, or parent..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500">Filter Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
          >
            <option value="All">All Classes</option>
            <option value="10 - Lily">Grade 10 - Lily</option>
            <option value="10 - Jasmine">Grade 10 - Jasmine</option>
            <option value="9 - Rose">Grade 9 - Rose</option>
          </select>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredStudents.map((stu) => (
          <div
            key={stu.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Header with Photo & Campus Badge */}
              <div className="flex items-start justify-between gap-3">
                <img
                  src={stu.photoUrl}
                  alt={stu.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-pink-200 dark:border-pink-900 shadow-sm"
                />
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    stu.isInsideCampus
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      stu.isInsideCampus ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                    }`}
                  />
                  {stu.isInsideCampus ? "INSIDE CAMPUS" : "OUTSIDE"}
                </span>
              </div>

              <div className="mt-3">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {stu.fullName}
                </h4>
                <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold mt-0.5">
                  {stu.className} • Roll: {stu.rollNumber}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Parent:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{stu.parentName}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Emergency:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">{stu.parentPhone}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Blood Group:</span>
                  <span className="font-bold text-red-600 dark:text-red-400">{stu.bloodGroup}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-slate-400">Attendance:</span>
                  <span className="font-bold text-emerald-600">{stu.attendanceRate}%</span>
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <button
                onClick={() => setViewBadgeStudent(stu)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5 text-pink-500" /> View Smart Badge
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Smart Badge Modal */}
      {viewBadgeStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> SafeAI Student Safety Credential
            </div>

            <img
              src={viewBadgeStudent.photoUrl}
              alt={viewBadgeStudent.fullName}
              className="w-20 h-20 rounded-3xl object-cover mx-auto border-2 border-pink-500 shadow-md mb-2"
            />
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              {viewBadgeStudent.fullName}
            </h3>
            <p className="text-xs text-slate-500">{viewBadgeStudent.className}</p>

            <div className="my-5 p-4 rounded-2xl bg-slate-950 text-white flex flex-col items-center">
              <QrCode className="w-32 h-32 text-pink-400" />
              <span className="font-mono text-xs text-pink-300 mt-2">
                {viewBadgeStudent.qrCodeToken}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Emergency Contact: {viewBadgeStudent.parentPhone} ({viewBadgeStudent.parentName})
            </p>

            <button
              onClick={() => setViewBadgeStudent(null)}
              className="w-full mt-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <QrScannerModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
    </DashboardShell>
  );
}
