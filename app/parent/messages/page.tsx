"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { ChildSwitcher } from "@/components/parent/child-switcher";
import {
  MessageSquare,
  Megaphone,
  Mail,
  Send,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Plus,
  Search,
  Filter,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

export default function ParentMessagesPage() {
  const {
    students,
    activeChildId,
    parentMessages,
    sendParentInquiry,
    markParentMessageAsRead,
    progressNotes,
  } = useApp();


  const [activeTab, setActiveTab] = useState<"teachers" | "announcements" | "progress">("teachers");
  const [searchQuery, setSearchQuery] = useState("");
  const [showComposeModal, setShowComposeModal] = useState(false);

  // Compose modal form state
  const [selectedTeacher, setSelectedTeacher] = useState("Dr. Amina Qureshi");
  const [inquirySubject, setInquirySubject] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [sentNotice, setSentNotice] = useState(false);

  const currentChild = students.find((s) => s.id === activeChildId) || students[0];

  // Direct Teacher Messages for current child
  const teacherMessages = parentMessages.filter(
    (m) =>
      m.senderType === "teacher" &&
      (!m.studentId || m.studentId === currentChild?.id)
  );

  // Administrative Announcements
  const adminAnnouncements = parentMessages.filter((m) => m.senderType === "admin");

  // Progress notes sent by teachers
  const childProgressNotes = progressNotes.filter((pn) => pn.studentId === currentChild?.id);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquirySubject || !inquiryMessage) return;

    sendParentInquiry(selectedTeacher, inquirySubject, inquiryMessage, currentChild?.id);
    setInquirySubject("");
    setInquiryMessage("");
    setSentNotice(true);
    setTimeout(() => {
      setSentNotice(false);
      setShowComposeModal(false);
    }, 1500);
  };

  // Available faculty for this child's class
  const availableTeachers = [
    { name: "Dr. Amina Qureshi", subject: "Biology & Life Sciences", role: "Head of Science & Class Teacher" },
    { name: "Ms. Hiba Rashid", subject: "Mathematics & Algebra", role: "Mathematics Department Lead" },
    { name: "Engr. Noor Fatima", subject: "Computer Science & AI", role: "AI & STEM Lab Coordinator" },
    { name: "Mrs. Sarah Jenkins", subject: "English Literature", role: "Senior Humanities Teacher" },
    { name: "Dr. Samira Al-Mansoor", subject: "Physics", role: "Physical Sciences Faculty" },
  ];

  return (
    <DashboardShell
      title="School Communication Hub"
      subtitle={`Official institutional announcements and direct private communications with ${currentChild?.fullName}'s teachers`}
      action={
        <button
          onClick={() => setShowComposeModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white text-xs font-bold shadow hover:opacity-95 transition"
        >
          <Plus className="w-4 h-4" /> Message Course Teacher
        </button>
      }
    >
      {/* Multi-Child Switcher */}
      <ChildSwitcher className="mb-6" />

      {/* Tabs & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("teachers")}
            className={`pb-2 px-1 text-xs font-extrabold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "teachers"
                ? "border-pink-600 text-pink-600 dark:text-pink-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Direct Teacher Comms ({teacherMessages.length})
          </button>

          <button
            onClick={() => setActiveTab("progress")}
            className={`pb-2 px-1 text-xs font-extrabold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "progress"
                ? "border-pink-600 text-pink-600 dark:text-pink-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4" /> Student Progress Notes ({childProgressNotes.length})
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`pb-2 px-1 text-xs font-extrabold transition border-b-2 flex items-center gap-1.5 ${
              activeTab === "announcements"
                ? "border-pink-600 text-pink-600 dark:text-pink-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Megaphone className="w-4 h-4" /> Admin Announcements ({adminAnnouncements.length})
          </button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search communications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Tab 1: Direct Messages with Course Teachers */}
      {activeTab === "teachers" && (
        <div className="space-y-4">
          {teacherMessages.length > 0 ? (
            teacherMessages
              .filter(
                (m) =>
                  m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  m.senderName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => markParentMessageAsRead(msg.id)}
                  className={`p-6 rounded-3xl border transition shadow-sm ${
                    msg.unread
                      ? "bg-pink-50/40 dark:bg-pink-950/20 border-pink-200 dark:border-pink-900/50"
                      : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-violet-600 text-white flex items-center justify-center font-bold">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                            {msg.senderName}
                          </h4>
                          {msg.unread && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-pink-600 text-white">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">{msg.senderRole}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold uppercase text-[10px] text-slate-600 dark:text-slate-300">
                        {msg.channel}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{msg.timestamp}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      {msg.subject}
                    </h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed whitespace-pre-line">
                      {msg.message}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">
                      Student: <span className="font-bold text-slate-700 dark:text-slate-300">{msg.studentName}</span>
                    </span>
                    <button
                      onClick={() => {
                        setSelectedTeacher(msg.senderName);
                        setInquirySubject(`Re: ${msg.subject}`);
                        setShowComposeModal(true);
                      }}
                      className="text-pink-600 dark:text-pink-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" /> Reply to Teacher
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                No direct teacher messages found for {currentChild?.fullName}.
              </p>
              <button
                onClick={() => setShowComposeModal(true)}
                className="mt-3 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold"
              >
                Send Direct Inquiry
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Progress Notes */}
      {activeTab === "progress" && (
        <div className="space-y-4">
          {childProgressNotes.length > 0 ? (
            childProgressNotes.map((pn) => (
              <div
                key={pn.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                      {pn.category.toUpperCase()} NOTE
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {pn.subject} • Faculty Feedback
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{pn.sentAt}</span>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 mt-3 italic bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 leading-relaxed">
                  &ldquo;{pn.note}&rdquo;
                </p>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>Author: <strong className="text-slate-900 dark:text-white">{pn.teacherName}</strong></span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Delivered via {pn.channel}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-400 text-xs italic">
              No individualized progress notes recorded yet for this term.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Administrative Announcements */}
      {activeTab === "announcements" && (
        <div className="space-y-4">
          {adminAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {ann.senderName}
                    </h4>
                    <p className="text-[11px] text-slate-500">{ann.senderRole}</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{ann.timestamp}</span>
              </div>

              <div className="mt-3">
                <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                  {ann.subject}
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                  {ann.message}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Addressed to: All Enrolled Families</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Official Circular
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compose Inquiry Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-pink-600" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Message Course Teacher
                </h3>
              </div>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {sentNotice ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white">
                  Inquiry Dispatched Successfully!
                </h4>
                <p className="text-xs text-slate-500">
                  {selectedTeacher} has been notified. You will receive an SMS and in-app reply notification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4 pt-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Student Profile
                  </label>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
                    {currentChild?.fullName} ({currentChild?.className} • Roll: {currentChild?.rollNumber})
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Select Course Educator
                  </label>
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500"
                  >
                    {availableTeachers.map((t) => (
                      <option key={t.name} value={t.name}>
                        {t.name} ({t.subject} - {t.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Inquiry regarding science practical test schedule"
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Detailed Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your constructive query or request for faculty consultation..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowComposeModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 text-white font-bold hover:bg-pink-700 transition shadow"
                  >
                    Send to Teacher
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
