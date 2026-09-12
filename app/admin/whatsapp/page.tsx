"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import {
  MessageCircle,
  Send,
  Radio,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Settings2,
  Smartphone,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Inbox,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Filter,
  User,
  Sliders,
} from "lucide-react";

export default function AdminWhatsAppGatewayPage() {
  const {
    students,
    whatsAppConfig,
    whatsAppMessages,
    updateWhatsAppConfig,
    sendWhatsAppMessage,
    simulateInboundWhatsApp,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"feed" | "outbox" | "simulator" | "settings">("feed");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Outbound Dispatch Form
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || "");
  const [customToNumber, setCustomToNumber] = useState<string>("");
  const [useCustomNumber, setUseCustomNumber] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<
    "alert" | "attendance" | "marks" | "parent_inquiry" | "general"
  >("attendance");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("none");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendFeedback, setSendFeedback] = useState<string>("");

  // Inbound Simulator Form
  const [simSenderPhone, setSimSenderPhone] = useState<string>("+1 (555) 349-2810");
  const [simSenderName, setSimSenderName] = useState<string>("Tariq Ahmed (Parent)");
  const [simInboundText, setSimInboundText] = useState<string>(
    "Sara is having a slight cold today but will attend all classes. Please alert her class teacher."
  );
  const [simFeedback, setSimFeedback] = useState<string>("");

  // Settings Form State
  const [phoneIdInput, setPhoneIdInput] = useState<string>(whatsAppConfig.phoneNumberId);
  const [wabaIdInput, setWabaIdInput] = useState<string>(whatsAppConfig.businessAccountId);
  const [displayPhoneInput, setDisplayPhoneInput] = useState<string>(whatsAppConfig.displayPhoneNumber);
  const [verifyTokenInput, setVerifyTokenInput] = useState<string>(whatsAppConfig.webhookVerifyToken);
  const [autoReplyEnabled, setAutoReplyEnabled] = useState<boolean>(whatsAppConfig.autoReplyEnabled);
  const [copiedToken, setCopiedToken] = useState<boolean>(false);
  const [copiedWebhook, setCopiedWebhook] = useState<boolean>(false);
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleCopyWebhook = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    navigator.clipboard.writeText(`${origin}/api/whatsapp/webhook`);
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(verifyTokenInput);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateWhatsAppConfig({
      phoneNumberId: phoneIdInput.trim(),
      businessAccountId: wabaIdInput.trim(),
      displayPhoneNumber: displayPhoneInput.trim(),
      webhookVerifyToken: verifyTokenInput.trim(),
      autoReplyEnabled,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleSendOutbound = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent.trim()) return;

    setIsSending(true);
    const targetPhone = useCustomNumber
      ? customToNumber.trim()
      : selectedStudent?.parentPhone || "+1 (555) 349-2810";
    const recipientName = useCustomNumber
      ? "Manual Recipient"
      : `${selectedStudent?.parentName} (Parent of ${selectedStudent?.fullName})`;

    await sendWhatsAppMessage(
      targetPhone,
      messageContent.trim(),
      selectedCategory,
      recipientName,
      selectedStudent?.fullName,
      selectedTemplate !== "none" ? selectedTemplate : undefined
    );

    setIsSending(false);
    setMessageContent("");
    setSendFeedback(`Message dispatched successfully to ${targetPhone} via WhatsApp Gateway!`);
    setTimeout(() => setSendFeedback(""), 4000);
  };

  const handleSimulateInbound = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInboundText.trim()) return;

    simulateInboundWhatsApp(simSenderPhone.trim(), simInboundText.trim(), simSenderName.trim());
    setSimFeedback(`Inbound WhatsApp message simulated from ${simSenderName}! Auto-reply and logs triggered.`);
    setTimeout(() => setSimFeedback(""), 4000);
  };

  const templates = [
    {
      id: "none",
      name: "Freeform Text Message (24h Customer Window)",
      category: "general",
      text: "",
    },
    {
      id: "student_arrival_notice",
      name: "Turnstile Safe Arrival Alert (Template)",
      category: "attendance",
      text: `Assalamu Alaikum ${selectedStudent?.parentName || "Parent"}. ${selectedStudent?.fullName || "Your child"} safely reached campus through the North Gate Turnstile at 07:45 AM (Smart QR Scan Verified).`,
    },
    {
      id: "unexcused_absence_warning",
      name: "Immediate Absence Alert (Template)",
      category: "alert",
      text: `ATTENDANCE ALERT: ${selectedStudent?.fullName || "Your child"} was marked absent for roll call today. Please verify if this is an excused absence or reply to this message.`,
    },
    {
      id: "emergency_broadcast",
      name: "Campus Security Emergency Broadcast (Template)",
      category: "alert",
      text: `🚨 URGENT CAMPUS NOTICE: School is in precautionary secure state due to severe weather. All students are safe inside classrooms with faculty.`,
    },
    {
      id: "assessment_score_published",
      name: "Exam & Gradebook Update (Template)",
      category: "marks",
      text: `Academic Update: Assessment scores for ${selectedStudent?.fullName || "your child"} have been published to the portal. Please review your parent dashboard.`,
    },
  ];

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const tmpl = templates.find((t) => t.id === templateId);
    if (tmpl && tmpl.text) {
      setMessageContent(tmpl.text);
      if (tmpl.category) setSelectedCategory(tmpl.category as any);
    }
  };

  const filteredMessages = whatsAppMessages.filter((m) => {
    if (filterCategory === "all") return true;
    if (filterCategory === "inbound") return m.direction === "inbound";
    if (filterCategory === "outbound") return m.direction === "outbound";
    return m.category === filterCategory;
  });

  return (
    <DashboardShell
      title="Meta WhatsApp Cloud API Gateway"
      subtitle="Broadcast real-time student attendance notices, emergency dispatches & receive parent inquiries"
      action={
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Gateway Online: {whatsAppConfig.displayPhoneNumber}</span>
          </div>
        </div>
      }
    >
      {/* Top Navigation Tabs */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-200/80 dark:border-slate-800 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("feed")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === "feed"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
          }`}
        >
          <MessageCircle className="w-4 h-4" /> Live Message Stream ({whatsAppMessages.length})
        </button>

        <button
          onClick={() => setActiveTab("outbox")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === "outbox"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
          }`}
        >
          <Send className="w-4 h-4" /> Send Outbound Broadcast
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === "simulator"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
          }`}
        >
          <Smartphone className="w-4 h-4 text-emerald-500" /> Parent Reply Simulator
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === "settings"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
          }`}
        >
          <Settings2 className="w-4 h-4" /> Meta API Credentials
        </button>
      </div>

      {/* TAB 1: LIVE MESSAGE STREAM */}
      {activeTab === "feed" && (
        <div className="space-y-6">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Dispatched</span>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {whatsAppMessages.filter((m) => m.direction === "outbound").length}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <ArrowUpRight className="w-3 h-3" /> Outbound alerts
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Parent Inbound</span>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {whatsAppMessages.filter((m) => m.direction === "inbound").length}
              </p>
              <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                <ArrowDownLeft className="w-3 h-3" /> Inquiries received
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Read Rate</span>
              <p className="text-xl font-extrabold text-emerald-600 mt-1">98.2%</p>
              <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Blue-check confirmation</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Auto-Responder</span>
              <p className="text-xl font-extrabold text-indigo-600 mt-1">
                {whatsAppConfig.autoReplyEnabled ? "Active" : "Disabled"}
              </p>
              <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">Automated confirmation</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              {["all", "attendance", "alert", "marks", "inbound", "outbound"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                    filterCategory === cat
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveTab("outbox")}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-xs hover:opacity-90 transition"
            >
              <Send className="w-3.5 h-3.5" /> New Message
            </button>
          </div>

          {/* Messages Feed */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-500" />
              WhatsApp Message Dispatch & Response Activity
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMessages.map((msg) => {
                const isOutbound = msg.direction === "outbound";
                return (
                  <div key={msg.id} className="py-4 flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                        isOutbound
                          ? "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600"
                          : "bg-blue-100 dark:bg-blue-950/70 text-blue-600"
                      }`}
                    >
                      {isOutbound ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {isOutbound ? `To: ${msg.recipientName || msg.toNumber}` : `From: ${msg.fromNumber}`}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              isOutbound
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                                : "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                            }`}
                          >
                            {msg.direction}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold">
                            {msg.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{msg.timestamp}</span>
                          {msg.status === "read" && (
                            <span className="text-blue-500 font-bold flex items-center gap-0.5">
                              <Check className="w-3.5 h-3.5 stroke-[3]" /> Read
                            </span>
                          )}
                          {msg.status === "delivered" && (
                            <span className="text-slate-400 font-semibold flex items-center gap-0.5">
                              <Check className="w-3.5 h-3.5" /> Delivered
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="mt-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                        {msg.content}
                      </p>

                      {msg.studentName && (
                        <div className="mt-1 text-[11px] text-slate-400 flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>Referenced Student: <strong className="text-slate-600 dark:text-slate-300">{msg.studentName}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredMessages.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <Inbox className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-semibold">No WhatsApp events match the current filter</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OUTBOUND BROADCAST FORM */}
      {activeTab === "outbox" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-500" />
                Dispatch WhatsApp Alert / Message
              </h3>
              <p className="text-xs text-slate-500">
                Send official WhatsApp notifications directly to registered parent phones with instant delivery.
              </p>
            </div>

            {sendFeedback && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{sendFeedback}</span>
              </div>
            )}

            <form onSubmit={handleSendOutbound} className="space-y-4">
              {/* Recipient Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Recipient Destination
                </label>
                <div className="flex items-center gap-4 mb-2">
                  <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      checked={!useCustomNumber}
                      onChange={() => setUseCustomNumber(false)}
                      className="accent-emerald-600"
                    />
                    Select Enrolled Student & Parent
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-semibold cursor-pointer">
                    <input
                      type="radio"
                      checked={useCustomNumber}
                      onChange={() => setUseCustomNumber(true)}
                      className="accent-emerald-600"
                    />
                    Custom Phone Number
                  </label>
                </div>

                {!useCustomNumber ? (
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.fullName} ({s.className}) — Parent: {s.parentName} ({s.parentPhone})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="+1 (555) 012-3456 or 923001234567"
                    value={customToNumber}
                    onChange={(e) => setCustomToNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                )}
              </div>

              {/* Message Category */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Message Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="attendance">Daily Attendance Notice</option>
                    <option value="alert">High-Priority Alert / Emergency</option>
                    <option value="marks">Examination & Grade Marks</option>
                    <option value="parent_inquiry">Direct Parent Follow-Up</option>
                    <option value="general">General Administrative Broadcast</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Pre-Approved Meta Template
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => handleSelectTemplate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    {templates.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Text */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Message Body
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter message text to be delivered to parent's WhatsApp app..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Transmitting from WhatsApp Business Phone: <strong className="text-slate-600 dark:text-slate-300">{whatsAppConfig.displayPhoneNumber}</strong>
                </span>
                <button
                  type="submit"
                  disabled={isSending}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" /> {isSending ? "Dispatching..." : "Send WhatsApp Alert"}
                </button>
              </div>
            </form>
          </div>

          {/* Live Mobile Preview */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 shadow-xl flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-extrabold text-white">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs leading-none">SafeAI School Broadcast</h5>
                    <span className="text-[10px] text-emerald-400">Official Verified Business</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Preview</span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="p-3 rounded-2xl bg-emerald-900/60 border border-emerald-700/60 max-w-[90%] ml-auto text-xs space-y-1">
                  <p className="text-slate-200 leading-relaxed">
                    {messageContent || "Type a message or select a template to preview the parent's incoming WhatsApp bubble..."}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-300">
                    <span>Just now</span>
                    <Check className="w-3 h-3 text-blue-400 stroke-[3]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 inline mr-1" />
              Meta End-to-End Encrypted via Official Cloud Graph API v20.0
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INBOUND PARENT SIMULATOR */}
      {activeTab === "simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-500" />
                Inbound WhatsApp Webhook Simulator
              </h3>
              <p className="text-xs text-slate-500">
                Simulate a parent replying from their WhatsApp phone to verify webhook handling, auto-replies, and communication hub sync.
              </p>
            </div>

            {simFeedback && (
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>{simFeedback}</span>
              </div>
            )}

            <form onSubmit={handleSimulateInbound} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Parent Sender Name
                </label>
                <input
                  type="text"
                  value={simSenderName}
                  onChange={(e) => setSimSenderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Parent WhatsApp Phone Number
                </label>
                <input
                  type="text"
                  value={simSenderPhone}
                  onChange={(e) => setSimSenderPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Inbound Message Body (Parent Reply)
                </label>
                <textarea
                  rows={3}
                  required
                  value={simInboundText}
                  onChange={(e) => setSimInboundText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Target Destination: <strong>{whatsAppConfig.displayPhoneNumber} (School Webhook)</strong>
                </span>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition cursor-pointer"
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" /> Simulate Inbound Message
                </button>
              </div>
            </form>
          </div>

          {/* Explanation Box */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              What Happens When a Parent Replies via WhatsApp?
            </h4>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <strong className="text-slate-800 dark:text-slate-200 block">1. Instant Webhook Dispatch</strong>
                <p>Meta calls your Next.js webhook at <code className="text-pink-600 font-mono">/api/whatsapp/webhook</code> with JSON message payloads and sender details.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <strong className="text-slate-800 dark:text-slate-200 block">2. Ingested into Parent Communication Hub</strong>
                <p>The message automatically appears in your school&apos;s Communication Hub (<code className="text-pink-600 font-mono">/parent/messages</code>) and the live activity stream.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <strong className="text-slate-800 dark:text-slate-200 block">3. Intelligent Auto-Responder</strong>
                <p>If enabled, an automated cordial acknowledgment is returned back to the parent confirming receipt and notifying the class teacher.</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <strong className="text-slate-800 dark:text-slate-200 block">4. Emergency Verification</strong>
                <p>If parents reply during an emergency broadcast with words like &apos;OK&apos; or &apos;CONFIRMED&apos;, their emergency receipt is automatically checked.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: META API SETTINGS */}
      {activeTab === "settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-emerald-500" />
                Meta Developers WhatsApp Cloud API Configuration
              </h3>
              <p className="text-xs text-slate-500">
                Configure your Meta App Phone Number ID, WhatsApp Business Account ID, and Webhook verification tokens.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Configuration saved successfully and updated in application memory!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    WhatsApp Phone Number ID
                  </label>
                  <input
                    type="text"
                    value={phoneIdInput}
                    onChange={(e) => setPhoneIdInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Found in Meta App &gt; WhatsApp &gt; API Setup</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    WhatsApp Business Account ID (WABA)
                  </label>
                  <input
                    type="text"
                    value={wabaIdInput}
                    onChange={(e) => setWabaIdInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Display Sender Number
                  </label>
                  <input
                    type="text"
                    value={displayPhoneInput}
                    onChange={(e) => setDisplayPhoneInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Webhook Verification Token
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={verifyTokenInput}
                      onChange={(e) => setVerifyTokenInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleCopyToken}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
                    >
                      {copiedToken ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Auto-Responder Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <strong className="text-xs text-slate-900 dark:text-white block">
                    Automated Inbound Acknowledgment Responder
                  </strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Instantly replies to incoming parent queries confirming their message is queued for the educators.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoReplyEnabled}
                  onChange={(e) => setAutoReplyEnabled(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition cursor-pointer"
                >
                  Save Gateway Configuration
                </button>
              </div>
            </form>
          </div>

          {/* Webhook URL Endpoint Box */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-500" />
              Meta Callback Webhook URL
            </h4>

            <p className="text-xs text-slate-500">
              Paste this URL into Meta Developer Dashboard &gt; WhatsApp &gt; Configuration &gt; Callback URL:
            </p>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
              <code className="text-xs font-mono text-pink-600 truncate">
                /api/whatsapp/webhook
              </code>
              <button
                type="button"
                onClick={handleCopyWebhook}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-xs hover:bg-slate-50 cursor-pointer shrink-0"
              >
                {copiedWebhook ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> For Localhost Testing
              </div>
              <p>
                Meta requires a public HTTPS URL for webhooks. When testing locally on your computer, use <strong>ngrok</strong>:
              </p>
              <code className="block bg-amber-100/70 dark:bg-amber-900/60 px-2 py-1 rounded font-mono text-[10px] mt-1">
                ngrok http 3000
              </code>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
