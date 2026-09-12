"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  BellRing,
  Download,
  Search,
  Filter,
  Users,
  Clock,
  Send,
  FileText,
  BookOpen,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const { auditLogs, teacherCompliance, sendComplianceReminder, attendance } = useApp();

  const [activeTab, setActiveTab] = useState<"attendance" | "audit" | "compliance">("attendance");

  // Audit Logs Filter & Search
  const [auditSearch, setAuditSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  // Reminder feedback
  const [reminderMsg, setReminderMsg] = useState("");

  const handleSendReminder = (teacherId: string, teacherName: string) => {
    sendComplianceReminder(teacherId);
    setReminderMsg(`Urgent compliance reminder dispatched to ${teacherName}`);
    setTimeout(() => setReminderMsg(""), 3500);
  };

  const handleExportAuditLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SafeAI_School_Audit_Logs_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesSeverity = severityFilter === "All" || log.severity.toLowerCase() === severityFilter.toLowerCase();
    const matchesRole = roleFilter === "All" || log.actorRole.toLowerCase() === roleFilter.toLowerCase();
    const matchesQuery =
      log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.actorName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.targetEntity.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(auditSearch.toLowerCase());
    return matchesSeverity && matchesRole && matchesQuery;
  });

  const dailyAttendanceData = [
    { day: "Mon", present: 104, late: 4, absent: 2 },
    { day: "Tue", present: 106, late: 3, absent: 1 },
    { day: "Wed", present: 103, late: 5, absent: 2 },
    { day: "Thu", present: 107, late: 2, absent: 1 },
    { day: "Fri", present: 102, late: 6, absent: 2 },
  ];

  const monthlyTrendData = [
    { month: "May", rate: 94.2 },
    { month: "Jun", rate: 95.8 },
    { month: "Jul", rate: 93.5 },
    { month: "Aug", rate: 96.1 },
    { month: "Sep", rate: 97.4 },
  ];

  const gradeBreakdownData = [
    { grade: "Grade 10 - Lily", presentRate: 98.4, lateRate: 1.6 },
    { grade: "Grade 10 - Jasmine", presentRate: 96.0, lateRate: 3.5 },
    { grade: "Grade 9 - Rose", presentRate: 95.5, lateRate: 4.2 },
    { grade: "Grade 8 - Daisy", presentRate: 97.1, lateRate: 2.1 },
  ];

  return (
    <DashboardShell
      title="System-Wide Analytics & Security Audit Logs"
      subtitle="Monitor real-time daily school attendance trends, immutable system security audit logs, and teacher curriculum upload compliance."
      action={
        activeTab === "audit" ? (
          <button
            onClick={handleExportAuditLogs}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-95 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-pink-500" /> Export Audit Trail (JSON)
          </button>
        ) : undefined
      }
    >
      {reminderMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{reminderMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("attendance")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            activeTab === "attendance"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-500" /> Real-Time Attendance Trends
        </button>

        <button
          onClick={() => setActiveTab("audit")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            activeTab === "audit"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <ClipboardList className="w-4 h-4 text-violet-500" /> System Activities & Audit Logs ({auditLogs.length})
        </button>

        <button
          onClick={() => setActiveTab("compliance")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            activeTab === "compliance"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-pink-500" /> Teacher Upload & Grading Compliance
        </button>
      </div>

      {/* Tab 1: Real-Time Attendance Trends */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
          {/* Top metric highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold text-slate-500">Weekly Average Presence</span>
              <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
                96.8%
              </h3>
              <p className="text-xs text-slate-400 mt-1">104 of 110 students daily</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold text-slate-500">Punctuality Rate (&lt; 8:00 AM)</span>
              <h3 className="text-3xl font-black text-pink-600 dark:text-pink-400 mt-2">
                95.2%
              </h3>
              <p className="text-xs text-slate-400 mt-1">3.8% late arrival rate</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold text-slate-500">Turnstile Optical Scan Ratio</span>
              <h3 className="text-3xl font-black text-violet-600 dark:text-violet-400 mt-2">
                92.4%
              </h3>
              <p className="text-xs text-slate-400 mt-1">QR badge & RFID card tap</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold text-slate-500">Parent Notification Delivery</span>
              <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
                99.9%
              </h3>
              <p className="text-xs text-slate-400 mt-1">Instant WhatsApp & SMS dispatch</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Breakdown */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-pink-500" />
                Daily Attendance Status Breakdown
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="day" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderRadius: "1rem",
                        color: "#fff",
                        border: "none",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="present" fill="#10b981" name="Present" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="late" fill="#f59e0b" name="Late" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Trend */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-violet-500" />
                5-Month Attendance Retention Curve (%)
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" stroke="#888" fontSize={12} />
                    <YAxis domain={[90, 100]} stroke="#888" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderRadius: "1rem",
                        color: "#fff",
                        border: "none",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#ec4899"
                      strokeWidth={3}
                      name="Attendance %"
                      dot={{ r: 5, fill: "#ec4899" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Class Section Breakdown */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm lg:col-span-2">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-500" />
                Section-wise Punctuality & Presence Comparison
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeBreakdownData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis type="number" domain={[85, 100]} stroke="#888" fontSize={12} />
                    <YAxis dataKey="grade" type="category" stroke="#888" fontSize={12} width={130} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderRadius: "1rem",
                        color: "#fff",
                        border: "none",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="presentRate" fill="#3b82f6" name="Present Rate %" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: System Activities & Security Audit Logs */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Search audit action, actor, or entity..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-500">Severity:</span>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="All">All Severities</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-500">Actor Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="All">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audit Log Table */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Actor & Role</th>
                    <th className="py-3 px-4">Action Type</th>
                    <th className="py-3 px-4">Target Entity</th>
                    <th className="py-3 px-4">Severity</th>
                    <th className="py-3 px-4">Details & Terminal IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {log.timestamp}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{log.actorName}</div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 font-mono">
                          {log.actorRole}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-pink-600 dark:text-pink-400 text-[11px]">
                        {log.action}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                        {log.targetEntity}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                            log.severity === "critical"
                              ? "bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900"
                              : log.severity === "warning"
                              ? "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900"
                              : "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900"
                          }`}
                        >
                          {log.severity}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-md">
                        <div className="text-slate-700 dark:text-slate-300 leading-snug">{log.details}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{log.ipAddress}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Teacher Upload Compliance */}
      {activeTab === "compliance" && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold text-slate-500">Overall Faculty Compliance</span>
              <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
                92.4%
              </h3>
              <p className="text-xs text-slate-400 mt-1">3 fully compliant, 2 follow-ups</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold text-slate-500">On-Time Roll-Call Submissions</span>
              <h3 className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-2">
                96.0%
              </h3>
              <p className="text-xs text-slate-400 mt-1">Submitted before 08:30 AM</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold text-slate-500">RAG AI Textbook Upload Quota</span>
              <h3 className="text-3xl font-black text-violet-600 dark:text-violet-400 mt-2">
                85.0%
              </h3>
              <p className="text-xs text-slate-400 mt-1">17 of 20 course modules indexed</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-xs font-bold text-slate-500">Gradebook Entries Finalized</span>
              <h3 className="text-3xl font-black text-pink-600 dark:text-pink-400 mt-2">
                88.2%
              </h3>
              <p className="text-xs text-slate-400 mt-1">Mid-term scorecards published</p>
            </div>
          </div>

          {/* Compliance Table */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Teacher Upload & Administrative Compliance Tracker
                </h3>
                <p className="text-xs text-slate-500">
                  Tracking daily attendance marking, lesson plan indexing into RAG, weekly homework assignments, and gradebook recordings.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Faculty Member</th>
                    <th className="py-3 px-4">Roll Call Attendance</th>
                    <th className="py-3 px-4">Lesson Plans / RAG</th>
                    <th className="py-3 px-4">Weekly Homework</th>
                    <th className="py-3 px-4">Marks & Gradebook</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {teacherCompliance.map((t) => (
                    <tr key={t.teacherId} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-slate-900 dark:text-white">{t.teacherName}</div>
                        <div className="text-[11px] text-slate-400">{t.department}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{t.attendanceSubmissionRate}%</div>
                        <div className="w-24 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              t.attendanceSubmissionRate >= 90 ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${t.attendanceSubmissionRate}%` }}
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {t.lessonPlansUploaded} / {t.lessonPlansRequired} Uploaded
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">Textbooks indexed</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 dark:text-white">{t.homeworkAssignedCount}</span>
                        <span className="text-slate-400"> Assignments</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{t.marksEnteredRate}%</div>
                        <span className="text-[10px] text-slate-400">Published to parents</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                            t.complianceStatus === "compliant"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900"
                              : t.complianceStatus === "warning"
                              ? "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900"
                              : "bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900"
                          }`}
                        >
                          {t.complianceStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {t.complianceStatus !== "compliant" ? (
                          <button
                            onClick={() => handleSendReminder(t.teacherId, t.teacherName)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-900 font-bold text-[11px] hover:bg-pink-600 hover:text-white transition cursor-pointer"
                          >
                            <Send className="w-3 h-3" /> Send Reminder
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold text-[11px] flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> All Verified
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
