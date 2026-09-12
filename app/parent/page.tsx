"use client";

import React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { GeofenceCard } from "@/components/safety/geofence-card";
import { ChildSwitcher } from "@/components/parent/child-switcher";
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
  HeartPulse,
  Smartphone,
  Mail,
  MessageSquare,
  ArrowRight,
  Send,
} from "lucide-react";

export default function ParentPage() {
  const {
    students,
    attendance,
    notifications,
    homework,
    marks,
    triggerSos,
    isSosActive,
    alerts,
    activeChildId,
    parentMessages,
    acknowledgeEmergencyBroadcast,
  } = useApp();

  // Selected child based on multi-child switcher
  const currentChild = students.find((s) => s.id === activeChildId) || students[0];
  const todayAttendance = attendance.find((a) => a.studentId === currentChild?.id);

  // Relevant emergency, medical, and priority alerts for this child
  const relevantAlerts = alerts.filter(
    (a) =>
      a.targetType === "all" ||
      (a.targetType === "class" && a.className === currentChild?.className) ||
      (a.targetType === "individual" && (a.studentId === currentChild?.id || a.studentName === currentChild?.fullName))
  );

  // Notifications relevant to parents
  const parentNotifications = notifications.filter(
    (n) => n.recipientRole === "parent" || n.recipientId === "par-1" || n.recipientId === "u-all"
  );

  // Marks and homework for selected child
  const childMarks = marks.filter((m) => m.studentId === currentChild?.id);
  const childHomework = homework.filter((h) => h.className === currentChild?.className);
  const childMessages = parentMessages.filter(
    (m) => !m.studentId || m.studentId === currentChild?.id
  );

  return (
    <DashboardShell
      title="Parent Safety & Learning Portal"
      subtitle={`Connected Guardian: Tariq Ahmed • Active Student Profile: ${currentChild?.fullName} (${currentChild?.className})`}
      action={
        <div className="flex items-center gap-2">
          <Link
            href="/parent/messages"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-pink-500" />
            <span>Teacher Inbox</span>
          </Link>

          <button
            onClick={() => triggerSos(currentChild?.fullName)}
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
      {/* 1. Multi-Child Profile Switcher */}
      <ChildSwitcher />

      {/* 2. Live Safety Status Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentChild?.photoUrl}
            alt={currentChild?.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20">
                Child Safety Verification
              </span>
              <span className="text-xs font-semibold text-pink-100 font-mono">
                {currentChild?.rollNumber}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black mt-1">
              {currentChild?.fullName} is currently {currentChild?.isInsideCampus ? "Safely Inside Campus" : "Outside Campus Boundary"}
            </h3>
            <p className="text-xs text-pink-100 flex items-center gap-1.5 mt-1 font-medium">
              <Radio className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>
                {currentChild?.isInsideCampus
                  ? `Turnstile Entry: ${todayAttendance?.checkIn || "07:45 AM"} (${todayAttendance?.method === "rfid_tap" ? "RFID Badge Tap" : "Smart Optical Turnstile"})`
                  : "Recorded Departure with Authorized Guardian"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center self-stretch md:self-auto min-w-[120px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-100">
              Attendance Rate
            </span>
            <div className="text-2xl font-black">{currentChild?.attendanceRate}%</div>
            <span className="text-[10px] text-emerald-300 font-bold">100% Punctual</span>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center self-stretch md:self-auto min-w-[120px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-100">
              Class Section
            </span>
            <div className="text-base font-black truncate">{currentChild?.className}</div>
            <span className="text-[10px] text-pink-200 font-semibold">Enrolled Term</span>
          </div>
        </div>
      </div>

      {/* 3. Main Grid: Child Safety Feed + Geofence Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Active High-Priority Alerts & Medical Flags */}
          {relevantAlerts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    Active Priority Alerts & Emergency Broadcasts ({relevantAlerts.length})
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Automatic multi-carrier dispatch</span>
              </div>

              <div className="space-y-2.5">
                {relevantAlerts.map((alt) => (
                  <div
                    key={alt.id}
                    className={`p-4 rounded-2xl border transition ${
                      alt.category === "medical"
                        ? "bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900"
                        : alt.category === "emergency"
                        ? "bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-900"
                        : "bg-purple-50/80 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            alt.severity === "critical"
                              ? "bg-red-600 text-white"
                              : "bg-rose-500 text-white"
                          }`}
                        >
                          {alt.category.toUpperCase()} ALERT
                        </span>
                        <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                          {alt.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">{alt.createdAt}</span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {alt.message}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 mt-2 border-t border-slate-200/60 dark:border-slate-800 text-[10px]">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <span>Transmission Verified:</span>
                        {alt.channels.map((ch) => (
                          <span
                            key={ch}
                            className="px-1.5 py-0.2 rounded font-bold uppercase bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {ch}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Delivered to Guardian
                        </span>
                        <button
                          onClick={() => acknowledgeEmergencyBroadcast(alt.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-[10px] hover:opacity-90 transition"
                        >
                          Confirm Receipt
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real-time Notifications & Safety Feed */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BellRing className="w-4 h-4 text-pink-500" />
                Live Attendance & Safety Feed
              </h3>
              <Link
                href="/parent/attendance"
                className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1"
              >
                Full Timestamp History <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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

          {/* Academic Report Card Preview for Active Child */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-violet-500" />
                  Academic Results & Teacher Feedback for {currentChild?.fullName}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Continuous evaluation and faculty appraisal</p>
              </div>
              <Link
                href="/parent/academics"
                className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1"
              >
                Official Report Card <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {childMarks.length > 0 ? (
                childMarks.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 dark:text-white text-sm">{m.subject}</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-extrabold">
                        {m.obtainedMarks} / {m.totalMarks} (Grade {m.grade})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span>{m.examType}</span>
                      <span>•</span>
                      <span>{m.date}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-2 italic bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      Teacher Feedback: &ldquo;{m.teacherRemarks}&rdquo;
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic py-3 text-center">
                  No examination marks published yet for this academic term.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Geofence Radar + Homework + Teacher Inbox */}
        <div className="space-y-6">
          <GeofenceCard studentId={currentChild?.id} />

          {/* Pending Homework for Active Child */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-500" />
                Active Homework ({childHomework.length})
              </h3>
              <Link
                href="/parent/homework"
                className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {childHomework.slice(0, 3).map((hw) => (
                <div
                  key={hw.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>{hw.title}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                        hw.isCompletedByStudent
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                      }`}
                    >
                      {hw.isCompletedByStudent ? "Submitted" : "Pending"}
                    </span>
                  </div>
                  <span className="text-[11px] text-pink-600 font-semibold mt-1 block">
                    Due: {hw.dueDate} • {hw.subject}
                  </span>
                  <p className="text-slate-500 text-[11px] mt-1 line-clamp-1">{hw.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Teacher Comms Widget */}
          <div className="rounded-3xl bg-gradient-to-br from-violet-500/10 via-pink-500/10 to-rose-500/10 border border-violet-200/60 dark:border-violet-900/40 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-500" />
                Direct Teacher Notes
              </h3>
              <Link
                href="/parent/messages"
                className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline"
              >
                Open Hub →
              </Link>
            </div>

            {childMessages.length > 0 ? (
              <div className="space-y-2.5">
                {childMessages.slice(0, 2).map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 dark:text-white">{msg.senderName}</span>
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>
                    <h5 className="font-semibold text-pink-600 dark:text-pink-400 text-[11px] mt-0.5">
                      {msg.subject}
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1 line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No unread teacher messages for this student.</p>
            )}

            <Link
              href="/parent/messages"
              className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition shadow"
            >
              <Send className="w-3.5 h-3.5" /> Send Inquiry to Course Teacher
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
