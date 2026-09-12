"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { AlertCategory, AlertSeverity, AlertChannel } from "@/lib/types";
import {
  BellRing,
  Send,
  AlertTriangle,
  HeartPulse,
  Award,
  BookOpen,
  MessageSquare,
  Smartphone,
  Mail,
  CheckCircle2,
  Users,
  Radio,
  Clock,
  Filter,
  Eye,
  ShieldCheck,
} from "lucide-react";

export default function AdminAlertsPage() {
  const { students, classes, alerts, issueAlert } = useApp();

  // Form states
  const [targetType, setTargetType] = useState<"all" | "class" | "individual">("all");
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || "stu-1");
  const [selectedClass, setSelectedClass] = useState("Grade 10 - Lily");
  const [category, setCategory] = useState<AlertCategory>("medical");
  const [severity, setSeverity] = useState<AlertSeverity>("high");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [channels, setChannels] = useState<AlertChannel[]>(["sms", "push", "email"]);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // Success Feedback
  const [dispatchSuccess, setDispatchSuccess] = useState(false);
  const [previewTab, setPreviewTab] = useState<"sms" | "push" | "email">("sms");

  // Quick Preset Templates
  const applyPreset = (preset: {
    category: AlertCategory;
    severity: AlertSeverity;
    title: string;
    message: string;
    channels: AlertChannel[];
  }) => {
    setCategory(preset.category);
    setSeverity(preset.severity);
    setTitle(preset.title);
    setMessage(preset.message);
    setChannels(preset.channels);
  };

  const handleToggleChannel = (ch: AlertChannel) => {
    setChannels((prev) =>
      prev.includes(ch) ? (prev.length > 1 ? prev.filter((c) => c !== ch) : prev) : [...prev, ch]
    );
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    const student = students.find((s) => s.id === selectedStudentId);

    issueAlert({
      targetType,
      studentId: targetType === "individual" ? selectedStudentId : undefined,
      studentName: targetType === "individual" ? student?.fullName : undefined,
      className: targetType === "class" ? selectedClass : undefined,
      category,
      severity,
      title,
      message,
      channels,
      dispatchedBy: "Principal Farah Qureshi",
    });

    setDispatchSuccess(true);
    setTimeout(() => {
      setTitle("");
      setMessage("");
      setDispatchSuccess(false);
    }, 3500);
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filterCategory === "All") return true;
    return a.category.toLowerCase() === filterCategory.toLowerCase();
  });

  const getCategoryBadge = (cat: AlertCategory) => {
    switch (cat) {
      case "emergency":
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5" />,
          bg: "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-900",
        };
      case "medical":
        return {
          icon: <HeartPulse className="w-3.5 h-3.5" />,
          bg: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900",
        };
      case "behavioral":
        return {
          icon: <Award className="w-3.5 h-3.5" />,
          bg: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900",
        };
      case "academic":
      default:
        return {
          icon: <BookOpen className="w-3.5 h-3.5" />,
          bg: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900",
        };
    }
  };

  return (
    <DashboardShell
      title="Student Alert System to Parents"
      subtitle="Issue instant high-priority emergency alerts, medical flags, and behavioral updates delivered via SMS, Push, and Email."
    >
      {/* Top Banner Overview */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase bg-white/20 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Multi-Channel Carrier Dispatch
            </span>
            <span className="text-xs text-pink-100">Zero-Delay Delivery (Avg 1.2s)</span>
          </div>
          <h2 className="text-2xl font-black">Parent Emergency & Student Care Dispatch Center</h2>
          <p className="text-xs text-pink-100 mt-1 max-w-xl">
            Direct telemetry integration with cellular SMS gateways, web push notification protocols, and verified guardian contact records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 px-4 border border-white/20 text-center">
            <div className="text-xs font-semibold text-pink-100">SMS Gateway</div>
            <div className="text-xl font-black flex items-center justify-center gap-1 text-emerald-300">
              <ShieldCheck className="w-4 h-4" /> Operational
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-3 px-4 border border-white/20 text-center">
            <div className="text-xs font-semibold text-pink-100">Push Tokens</div>
            <div className="text-xl font-black">110 / 110</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Alert Dispatcher Form + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-bold">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Compose Instant Parent Alert
                </h3>
                <p className="text-xs text-slate-500">Configure recipient scope, urgency level, and delivery channels.</p>
              </div>
            </div>
          </div>

          {dispatchSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong>Alert Successfully Dispatched!</strong> Messages queued and delivered across selected channels ({channels.join(", ").toUpperCase()}). Parent app notification badges updated.
              </div>
            </div>
          )}

          {/* Quick Presets */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              ⚡ Rapid Dispatch Presets
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    category: "medical",
                    severity: "high",
                    title: "Medical Flag: Asthma Inhaler Administered",
                    message: "Student reported mild wheezing during PE. Inhaler administered at campus health center; vitals stable. Please contact school clinic if symptoms persist.",
                    channels: ["sms", "push", "email"],
                  })
                }
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition"
              >
                🏥 Inhaler / Clinic Visit
              </button>
              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    category: "emergency",
                    severity: "critical",
                    title: "URGENT SAFETY: Flash Rain Campus Hold",
                    message: "Due to sudden torrential rain, afternoon bus dismissals are delayed by 25 minutes for student safety. Security officers stationed at North & South Gates.",
                    channels: ["sms", "push", "email", "whatsapp"],
                  })
                }
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 hover:bg-red-100 transition"
              >
                🚨 Weather / Early Hold
              </button>
              <button
                type="button"
                onClick={() =>
                  applyPreset({
                    category: "behavioral",
                    severity: "normal",
                    title: "Behavioral Recognition: Kindness & Mentorship",
                    message: "We are proud to share that your daughter demonstrated exemplary leadership and kindness in mentoring junior students today.",
                    channels: ["push", "email"],
                  })
                }
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900 hover:bg-purple-100 transition"
              >
                ⭐ Mentorship Award
              </button>
            </div>
          </div>

          <form onSubmit={handleDispatch} className="space-y-4">
            {/* Target Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Recipient Scope</label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {[
                  { id: "all", label: "All Parents (110)", desc: "School-wide" },
                  { id: "class", label: "Class Section", desc: "Grade 10 - Lily" },
                  { id: "individual", label: "Single Student", desc: "Targeted Family" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTargetType(t.id as any)}
                    className={`p-3 rounded-2xl text-left border transition ${
                      targetType === t.id
                        ? "border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-white ring-2 ring-rose-400/20"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <div className="text-xs font-extrabold">{t.label}</div>
                    <div className="text-[11px] text-slate-400">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Selection Specifics */}
            {targetType === "individual" && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  {students.map((stu) => (
                    <option key={stu.id} value={stu.id}>
                      {stu.fullName} ({stu.rollNumber} - {stu.className}) • Parent: {stu.parentName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {targetType === "class" && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Academic Class</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name} ({cls.studentCount || 28} Students)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Category & Severity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Alert Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AlertCategory)}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="medical">Medical Flag (Clinic / Inhaler / Allergy)</option>
                  <option value="emergency">Emergency Notification (Safety / Weather)</option>
                  <option value="behavioral">Behavioral Update (Commendation / Notice)</option>
                  <option value="academic">Academic & Exam Notification</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Priority Level</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as AlertSeverity)}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="critical">Critical (Instant Push Tone + Multi-carrier SMS)</option>
                  <option value="high">High Priority (Urgent Notice Banner)</option>
                  <option value="normal">Normal (Standard In-App Update)</option>
                </select>
              </div>
            </div>

            {/* Delivery Channels */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Active Delivery Channels ({channels.length} Selected)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
                {[
                  { id: "sms" as AlertChannel, name: "SMS Gateway", icon: <Smartphone className="w-3.5 h-3.5" /> },
                  { id: "push" as AlertChannel, name: "Push Notify", icon: <BellRing className="w-3.5 h-3.5" /> },
                  { id: "email" as AlertChannel, name: "Email Broadcast", icon: <Mail className="w-3.5 h-3.5" /> },
                  { id: "whatsapp" as AlertChannel, name: "WhatsApp Sync", icon: <MessageSquare className="w-3.5 h-3.5" /> },
                ].map((ch) => {
                  const isChecked = channels.includes(ch.id);
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => handleToggleChannel(ch.id)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition ${
                        isChecked
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xs"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      {ch.icon}
                      <span>{ch.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Alert Title */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Alert Title / Subject</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Medical Flag: Inhaler Prescribed in School Clinic"
                className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
              />
            </div>

            {/* Message Content */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message Content</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type the detailed emergency or medical information to be dispatched to parents..."
                className="w-full mt-1.5 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Audited & logged under actor <strong>Principal Farah Qureshi</strong>
              </span>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs shadow-md hover:opacity-95 transition cursor-pointer"
              >
                <Send className="w-4 h-4" /> Dispatch Alert Instantly
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Parent Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-pink-500" />
                Live Parent Device Preview
              </h3>

              {/* Format Toggle Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {(["sms", "push", "email"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setPreviewTab(fmt)}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg uppercase transition cursor-pointer ${
                      previewTab === fmt
                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Render */}
            {previewTab === "sms" && (
              <div className="p-4 rounded-2xl bg-slate-950 text-white font-mono text-xs border border-slate-800 space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                  <span>SENDER: SafeAI-School (Shortcode 4482)</span>
                  <span>JUST NOW</span>
                </div>
                <div className="text-emerald-400 font-bold text-[11px]">
                  [SAFE-AI {severity.toUpperCase()} ALERT]
                </div>
                <p className="text-slate-200 text-xs leading-relaxed">
                  {title || "Medical Flag: Inhaler Prescribed in School Clinic"}
                </p>
                <p className="text-slate-300 text-xs">
                  {message ||
                    "Sara experienced mild wheezing during morning P.E. Clinic nurse administered Salbutamol inhaler. She has rested and returned to class safely."}
                </p>
                <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-800/80">
                  Direct inquiry hotline: +1 (555) 911-2020 • SafeAI School Portal
                </div>
              </div>
            )}

            {previewTab === "push" && (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">
                    S
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">SafeAI School App</span>
                  <span className="text-[10px] text-slate-400 ml-auto">Just now</span>
                </div>
                <div className="font-extrabold text-xs text-rose-600 dark:text-rose-400">
                  {title || "Urgent Campus Notice"}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                  {message || "Please tap to review high priority student safety alert."}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button className="px-3 py-1 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold">
                    View in Portal
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {previewTab === "email" && (
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b pb-2 text-[11px] text-slate-400">
                  <span>From: alerts@safeaischool.edu</span>
                  <span>To: parent@safeaischool.edu</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {title || "Official Campus Student Update"}
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {message ||
                    "This is an automated priority dispatch from SafeAI School Administration regarding your registered daughter."}
                </p>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-[11px] text-slate-500 space-y-1">
                  <div><strong>Student:</strong> Sara Ahmed (Roll #SAF-2026-042)</div>
                  <div><strong>Class:</strong> Grade 10 - Lily</div>
                  <div><strong>Action Required:</strong> Immediate confirmation optional</div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Dispatched Broadcast Telemetry
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="text-[11px] text-slate-400">Total Alerts Issued</div>
                <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{alerts.length}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                <div className="text-[11px] text-slate-400">Parent Open Rate</div>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">96.8%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast History & Delivery Audit Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4 mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-pink-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Recent Dispatches & Parent Receipt Log
            </h3>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-500">Filter Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="All">All Categories</option>
              <option value="medical">Medical</option>
              <option value="emergency">Emergency</option>
              <option value="behavioral">Behavioral</option>
              <option value="academic">Academic</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredAlerts.map((alt) => {
            const badge = getCategoryBadge(alt.category);
            return (
              <div key={alt.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border flex items-center gap-1 ${badge.bg}`}>
                      {badge.icon} {alt.category}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">{alt.createdAt}</span>
                    <span className="text-[11px] text-slate-400">• Dispatched by {alt.dispatchedBy}</span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{alt.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{alt.message}</p>

                  <div className="flex items-center gap-2 pt-1 text-[11px]">
                    <span className="font-semibold text-slate-500">Target:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      {alt.studentName || alt.className || "All Campus Guardians"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    {alt.channels.map((ch) => (
                      <span
                        key={ch}
                        className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Delivered ({alt.readCount || 1}/{alt.deliveredCount || 1} Read)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
