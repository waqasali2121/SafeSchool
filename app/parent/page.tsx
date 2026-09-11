"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { GeofenceCard } from "@/components/safety/geofence-card";
import {
  Heart,
  ShieldCheck,
  BellRing,
  Clock,
  CheckCircle2,
  Award,
  CheckSquare,
  AlertTriangle,
  Radio,
  Sparkles,
} from "lucide-react";

export default function ParentPage() {
  const { students, attendance, notifications, homework, marks, triggerSos, isSosActive } = useApp();
  const daughter = students[0]; // Sara Ahmed
  const todayAttendance = attendance.find((a) => a.studentId === daughter?.id);

  const parentNotifications = notifications.filter(
    (n) => n.recipientRole === "parent" || n.recipientId === "par-1" || n.recipientId === "u-all"
  );

  return (
    <DashboardShell
      title="Parent Safety & Learning Portal"
      subtitle={`Connected Guardian: Tariq Ahmed • Student: ${daughter?.fullName} (${daughter?.className})`}
      action={
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerSos(daughter?.fullName)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow ${
              isSosActive
                ? "bg-red-600 text-white animate-pulse"
                : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 hover:bg-rose-600 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{isSosActive ? "SOS BROADCASTING" : "Request Urgent Campus Assistance"}</span>
          </button>
        </div>
      }
    >
      {/* 1. Live Safety Status Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={daughter?.photoUrl}
            alt={daughter?.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20">
                Child Safety Verification
              </span>
              <span className="text-xs font-semibold text-pink-100 font-mono">
                {daughter?.rollNumber}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black mt-1">
              {daughter?.fullName} is currently {daughter?.isInsideCampus ? "Safely Inside Campus" : "Outside Campus Boundary"}
            </h3>
            <p className="text-xs text-pink-100 flex items-center gap-1.5 mt-1 font-medium">
              <Radio className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>
                {daughter?.isInsideCampus
                  ? `Turnstile Entry: ${todayAttendance?.checkIn || "07:45 AM"} (North Gate Smart Optical Sensor)`
                  : "Recorded Departure with Authorized Guardian"}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center self-stretch md:self-auto min-w-[140px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-100">
            Attendance Rate
          </span>
          <div className="text-2xl font-black">{daughter?.attendanceRate}%</div>
          <span className="text-[10px] text-emerald-300 font-bold">100% Punctual</span>
        </div>
      </div>

      {/* 2. Main Grid: Child Safety Feed + Geofence Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Real-time Notifications Feed */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BellRing className="w-4 h-4 text-pink-500" />
                Real-Time Safety & Academic Updates Feed
              </h3>
              <span className="text-xs text-slate-400">Live WhatsApp & App sync</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 space-y-3">
              {parentNotifications.slice(0, 4).map((notif) => (
                <div key={notif.id} className="pt-3 flex items-start gap-3 text-xs">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      notif.category === "attendance"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : notif.category === "marks"
                        ? "bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300"
                        : notif.category === "emergency"
                        ? "bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-300 animate-pulse"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300"
                    }`}
                  >
                    {notif.category === "attendance" ? (
                      <Clock className="w-4 h-4" />
                    ) : notif.category === "marks" ? (
                      <Award className="w-4 h-4" />
                    ) : (
                      <BellRing className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 dark:text-white">{notif.title}</h4>
                      <span className="text-[10px] text-slate-400">{notif.createdAt}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Report Card Preview */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-violet-500" />
                Latest Academic Results & Teacher Remarks
              </h3>
              <Link
                href="/parent/academics"
                className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline"
              >
                View Full Report Card →
              </Link>
            </div>

            <div className="space-y-3">
              {marks.slice(0, 2).map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900 dark:text-white text-sm">{m.subject}</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      Score: {m.obtainedMarks}/{m.totalMarks} (Grade {m.grade})
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-2 italic">
                    Teacher Feedback: &ldquo;{m.teacherRemarks}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Geofence Radar */}
        <div className="space-y-6">
          <GeofenceCard studentId={daughter?.id} />

          {/* Active Homework Card */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-blue-500" />
              Pending Homework for Sara
            </h3>

            <div className="space-y-3">
              {homework.slice(0, 2).map((hw) => (
                <div
                  key={hw.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>{hw.title}</span>
                  </div>
                  <span className="text-[11px] text-pink-600 font-semibold mt-1 block">
                    Due: {hw.dueDate}
                  </span>
                  <p className="text-slate-500 text-[11px] mt-1 line-clamp-1">{hw.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
