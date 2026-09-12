"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import {
  Megaphone,
  Send,
  CheckCircle2,
  Users,
  MessageSquare,
  Sparkles,
  Smartphone,
  Mail,
  Heart,
  Clock,
  UserCheck,
  Award,
  BookOpen,
} from "lucide-react";

export default function TeacherAnnouncementsPage() {
  const { students, classes, notifications, progressNotes, sendStudentProgressNote, subjects } = useApp();

  const [activeTab, setActiveTab] = useState<"class_broadcast" | "progress_note">("class_broadcast");

  // Class Announcement Form State
  const [targetClass, setTargetClass] = useState("Grade 10 - Lily");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [channels, setChannels] = useState<string[]>(["whatsapp", "app"]);
  const [isBroadcastSent, setIsBroadcastSent] = useState(false);

  // Targeted Progress Note State
  const [targetStudentId, setTargetStudentId] = useState(students[0]?.id || "stu-1");
  const [noteCategory, setNoteCategory] = useState<"academic" | "behavioral" | "homework" | "remedial">("academic");
  const [noteSubject, setNoteSubject] = useState("Biology & Life Sciences");
  const [progressContent, setProgressContent] = useState("");
  const [noteChannel, setNoteChannel] = useState<"app" | "whatsapp" | "sms">("whatsapp");
  const [isNoteSent, setIsNoteSent] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    setIsBroadcastSent(true);
    setTimeout(() => {
      setTitle("");
      setMessage("");
      setIsBroadcastSent(false);
    }, 4000);
  };

  const handleSendProgressNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progressContent) return;

    const student = students.find((s) => s.id === targetStudentId);
    if (!student) return;

    sendStudentProgressNote({
      studentId: student.id,
      studentName: student.fullName,
      parentName: student.parentName,
      teacherName: "Dr. Amina Qureshi",
      subject: noteSubject,
      category: noteCategory,
      note: progressContent,
      channel: noteChannel,
    });

    setIsNoteSent(true);
    setProgressContent("");
    setTimeout(() => setIsNoteSent(false), 4000);
  };

  return (
    <DashboardShell
      title="Direct Parent Communication & Announcements"
      subtitle="Post official announcement feeds for specific classes or send targeted progress notes directly to designated parents."
    >
      {/* Top Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("class_broadcast")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            activeTab === "class_broadcast"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Megaphone className="w-4 h-4 text-pink-500" /> Official Class Announcements
        </button>

        <button
          onClick={() => setActiveTab("progress_note")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            activeTab === "progress_note"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <UserCheck className="w-4 h-4 text-violet-500" /> Targeted Student Progress Notes (1-to-1)
        </button>
      </div>

      {/* Tab 1: Class-Wide Announcements */}
      {activeTab === "class_broadcast" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Post Class Announcement
                </h3>
                <p className="text-xs text-slate-500">Dispatch official notices, circulars, and event invites to all families in a class section.</p>
              </div>
            </div>

            {isBroadcastSent && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Broadcast successfully dispatched to parent WhatsApp & App inboxes!</span>
              </div>
            )}

            <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Target Class Section</label>
                  <select
                    value={targetClass}
                    onChange={(e) => setTargetClass(e.target.value)}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                  >
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.name}>{cls.name} ({cls.studentCount || 28} Families)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Delivery Channels</label>
                  <div className="flex gap-2 mt-1.5">
                    {[
                      { id: "whatsapp", label: "WhatsApp" },
                      { id: "app", label: "SafeAI App" },
                      { id: "sms", label: "SMS" },
                    ].map((ch) => {
                      const active = channels.includes(ch.id);
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() =>
                            setChannels((prev) =>
                              prev.includes(ch.id) ? prev.filter((c) => c !== ch.id) : [...prev, ch.id]
                            )
                          }
                          className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                            active
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          }`}
                        >
                          {ch.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Announcement Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Girls STEM & Robotics Fair: Project Schedule"
                  className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Message Content</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type the official announcement notice to be published in the parent feed..."
                  className="w-full mt-1.5 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold shadow hover:opacity-95 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Broadcast Announcement
                </button>
              </div>
            </form>
          </div>

          {/* Past Announcements Feed (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-500" />
                Active Class Announcement Feed
              </h4>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Annual Girls STEM & Robotics Fair",
                  message: "Parents are warmly invited to inspect student AI science exhibits on Thursday, Oct 15 in the central courtyard.",
                  date: "2 days ago",
                  class: "Grade 10 - Lily",
                  channels: ["WhatsApp", "App"],
                },
                {
                  title: "Biology Microscope Lab Requirement",
                  message: "Please remind students to bring laboratory notebooks and clean slide coverslips for tomorrow's photolysis practical.",
                  date: "Sep 09, 2026",
                  class: "Grade 10 - Lily",
                  channels: ["WhatsApp"],
                },
                {
                  title: "Mid-Term Exam Datesheet Distribution",
                  message: "Official Mid-Term timetable has been published and dispatched. Revision sessions begin on Monday.",
                  date: "Sep 05, 2026",
                  class: "Grade 10 - Lily",
                  channels: ["App", "SMS"],
                },
              ].map((ann, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] text-pink-600 dark:text-pink-400 uppercase">{ann.class}</span>
                    <span className="text-[10px] text-slate-400">{ann.date}</span>
                  </div>
                  <h5 className="font-extrabold text-slate-900 dark:text-white">{ann.title}</h5>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{ann.message}</p>
                  <div className="pt-1 flex items-center gap-1">
                    {ann.channels.map((c, i) => (
                      <span key={i} className="px-1.5 py-0.2 rounded font-mono text-[9px] uppercase bg-white dark:bg-slate-800 border text-slate-500">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Targeted 1-to-1 Student Progress Notes */}
      {activeTab === "progress_note" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-500 to-indigo-600 text-white flex items-center justify-center shadow">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Send Targeted 1-to-1 Student Progress Note
                </h3>
                <p className="text-xs text-slate-500">
                  Send personalized, private feedback to a specific guardian regarding academic milestones, behavioral kudos, or areas for study focus.
                </p>
              </div>
            </div>

            {isNoteSent && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Targeted progress note dispatched directly to parent!</span>
              </div>
            )}

            <form onSubmit={handleSendProgressNote} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Target Student & Parent</label>
                  <select
                    value={targetStudentId}
                    onChange={(e) => setTargetStudentId(e.target.value)}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                  >
                    {students.map((stu) => (
                      <option key={stu.id} value={stu.id}>
                        {stu.fullName} • Guardian: {stu.parentName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Subject Course</label>
                  <select
                    value={noteSubject}
                    onChange={(e) => setNoteSubject(e.target.value)}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Feedback Category</label>
                  <select
                    value={noteCategory}
                    onChange={(e) => setNoteCategory(e.target.value as any)}
                    className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                  >
                    <option value="academic">Academic Progress & Mastery</option>
                    <option value="behavioral">Behavioral Commendation & Kudos</option>
                    <option value="homework">Homework Follow-Up</option>
                    <option value="remedial">Remedial Support & Exam Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Delivery Channel</label>
                  <div className="flex gap-2 mt-1.5">
                    {(["whatsapp", "app", "sms"] as const).map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setNoteChannel(ch)}
                        className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[11px] transition cursor-pointer ${
                          noteChannel === ch
                            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Constructive Personal Progress Note</label>
                <textarea
                  required
                  rows={4}
                  value={progressContent}
                  onChange={(e) => setProgressContent(e.target.value)}
                  placeholder="e.g. Sara demonstrated exemplary active recall during today's cellular respiration review. Encourage her to keep up this study technique..."
                  className="w-full mt-1.5 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold shadow hover:opacity-95 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Send Targeted Note to Parent
                </button>
              </div>
            </form>
          </div>

          {/* Timeline of Sent Progress Notes (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                Dispatched Student Progress Notes
              </h4>
            </div>

            <div className="space-y-3">
              {progressNotes.map((pn) => (
                <div
                  key={pn.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {pn.studentName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{pn.sentAt}</span>
                  </div>

                  <div className="text-[11px] text-slate-500 font-semibold">
                    To: <strong>{pn.parentName}</strong> • {pn.subject}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed italic bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800">
                    &ldquo;{pn.note}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded-full font-bold uppercase bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300">
                      {pn.category}
                    </span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Delivered via {pn.channel.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
