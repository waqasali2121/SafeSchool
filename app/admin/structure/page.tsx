"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { AcademicEvent, SchoolClass, Subject, TimetableSlot } from "@/lib/types";
import {
  Building2,
  Calendar,
  Clock,
  Layers,
  BookOpen,
  GraduationCap,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  X,
  Users,
  MapPin,
} from "lucide-react";

export default function SchoolStructurePage() {
  const {
    academicEvents,
    addAcademicEvent,
    deleteAcademicEvent,
    classes,
    addClass,
    subjects,
    addSubject,
    timetableSlots,
    updateTimetableSlot,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"calendar" | "classes" | "subjects" | "timetable" | "assignments">("calendar");

  // Filter state for timetable
  const [selectedTimetableClass, setSelectedTimetableClass] = useState("Grade 10 - Lily");
  const [selectedDay, setSelectedDay] = useState<string>("All");

  // Modals state
  const [showEventModal, setShowEventModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [editSlot, setEditSlot] = useState<TimetableSlot | null>(null);

  // New Event Form State
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState<"term" | "exam" | "holiday" | "event" | "meeting">("event");
  const [eventStartDate, setEventStartDate] = useState("2026-10-15");
  const [eventEndDate, setEventEndDate] = useState("2026-10-16");
  const [eventTerm, setEventTerm] = useState<"Fall 2026" | "Spring 2027">("Fall 2026");
  const [eventDesc, setEventDesc] = useState("");

  // New Class Form State
  const [className, setClassName] = useState("");
  const [gradeLevel, setGradeLevel] = useState(10);
  const [section, setSection] = useState("C");
  const [roomNumber, setRoomNumber] = useState("Room 205");
  const [capacity, setCapacity] = useState(30);
  const [classTeacher, setClassTeacher] = useState("Dr. Amina Qureshi");

  // New Subject Form State
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectTeacher, setSubjectTeacher] = useState("Dr. Amina Qureshi");
  const [periodsPerWeek, setPeriodsPerWeek] = useState(4);

  // Success Notice
  const [notice, setNotice] = useState("");
  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) return;
    addAcademicEvent({
      title: eventTitle,
      type: eventType,
      startDate: eventStartDate,
      endDate: eventEndDate,
      term: eventTerm,
      description: eventDesc,
      isImportant: eventType === "exam" || eventType === "meeting",
    });
    setShowEventModal(false);
    setEventTitle("");
    setEventDesc("");
    showNotice(`Added academic calendar event: ${eventTitle}`);
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className) return;
    addClass({
      name: className,
      gradeLevel: Number(gradeLevel),
      section,
      roomNumber,
      studentCount: 0,
      capacity: Number(capacity),
      classTeacher,
    });
    setShowClassModal(false);
    setClassName("");
    showNotice(`Created new class section: ${className}`);
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !subjectCode) return;
    addSubject({
      name: subjectName,
      code: subjectCode,
      classId: "c-10a",
      teacherName: subjectTeacher,
      periodsPerWeek: Number(periodsPerWeek),
    });
    setShowSubjectModal(false);
    setSubjectName("");
    setSubjectCode("");
    showNotice(`Added course curriculum subject: ${subjectName}`);
  };

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editSlot) return;
    updateTimetableSlot(editSlot);
    setEditSlot(null);
    showNotice(`Updated timetable period for ${editSlot.day} ${editSlot.startTime}`);
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

  return (
    <DashboardShell
      title="School Structure & Academic Operations Management"
      subtitle="Configure academic calendars, terms, classes, sections, curriculum subjects, weekly timetables, and teacher allocations."
    >
      {/* Top Banner Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Academic Term</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">Fall 2026</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Session in progress (Week 5)</p>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Configured Classes</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{classes.length} Sections</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Grades 8, 9, 10</p>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subjects Offered</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{subjects.length} Core Subjects</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Full STEM & Humanities</p>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Weekly Timetable Slots</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{timetableSlots.length} Periods</div>
          <p className="text-[11px] text-pink-600 font-semibold mt-0.5">Zero teacher collisions</p>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: "calendar", label: "Academic Calendar & Events", icon: <Calendar className="w-4 h-4" /> },
          { id: "classes", label: "Classes & Sections", icon: <Building2 className="w-4 h-4" /> },
          { id: "subjects", label: "Subjects & Curriculum", icon: <BookOpen className="w-4 h-4" /> },
          { id: "timetable", label: "Weekly Timetable Grid", icon: <Clock className="w-4 h-4" /> },
          { id: "assignments", label: "Teacher-Class Assignments", icon: <GraduationCap className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Academic Calendar */}
      {activeTab === "calendar" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Academic Session Calendar (Fall 2026 - Spring 2027)
              </h3>
              <p className="text-xs text-slate-500">Scheduled terms, examination schedules, national holidays, and school milestones.</p>
            </div>
            <button
              onClick={() => setShowEventModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-95 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Schedule New Event
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {academicEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                        evt.type === "exam"
                          ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900"
                          : evt.type === "holiday"
                          ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900"
                          : evt.type === "meeting"
                          ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900"
                          : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900"
                      }`}
                    >
                      {evt.type}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">{evt.term}</span>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{evt.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{evt.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="font-mono text-slate-600 dark:text-slate-400 font-semibold">
                    {evt.startDate} {evt.endDate !== evt.startDate ? `to ${evt.endDate}` : ""}
                  </div>
                  <button
                    onClick={() => deleteAcademicEvent(evt.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-500 transition cursor-pointer"
                    title="Delete Event"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Classes & Sections */}
      {activeTab === "classes" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Configured Classes & Sections
              </h3>
              <p className="text-xs text-slate-500">Student capacity limits, homeroom locations, and lead class educators.</p>
            </div>
            <button
              onClick={() => setShowClassModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-95 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Class Section
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {classes.map((cls) => {
              const enrolled = cls.studentCount || 28;
              const max = cls.capacity || 30;
              const pct = Math.round((enrolled / max) * 100);
              return (
                <div
                  key={cls.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
                        Grade {cls.gradeLevel} • Sec {cls.section}
                      </span>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {cls.roomNumber}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{cls.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Class Teacher: <strong>{cls.classTeacher || "Dr. Amina Qureshi"}</strong>
                    </p>

                    {/* Capacity Bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-500">Enrollment</span>
                        <span className="text-slate-800 dark:text-slate-200">
                          {enrolled} / {max} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            pct >= 95 ? "bg-rose-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Smart Badge Sync: On</span>
                    <button
                      onClick={() => {
                        setSelectedTimetableClass(cls.name);
                        setActiveTab("timetable");
                      }}
                      className="text-pink-600 font-bold hover:underline"
                    >
                      View Timetable →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Subjects */}
      {activeTab === "subjects" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Course Curriculum & Subject Catalog
              </h3>
              <p className="text-xs text-slate-500">Curriculum subject codes, weekly teaching periods, and assigned lead educators.</p>
            </div>
            <button
              onClick={() => setShowSubjectModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-95 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add New Subject
            </button>
          </div>

          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Subject Title</th>
                  <th className="py-3 px-4">Course Code</th>
                  <th className="py-3 px-4">Lead Educator</th>
                  <th className="py-3 px-4">Weekly Periods</th>
                  <th className="py-3 px-4">RAG AI Textbook Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {subjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-white">
                      {sub.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 font-bold">{sub.code}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {sub.teacherName || "Unassigned"}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {sub.periodsPerWeek || 5} Periods / Wk
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center gap-1 w-max">
                        <Sparkles className="w-3 h-3 text-pink-500" /> Vector Indexed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Timetable */}
      {activeTab === "timetable" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">Selected Class:</span>
              <select
                value={selectedTimetableClass}
                onChange={(e) => setSelectedTimetableClass(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-extrabold text-slate-900 dark:text-white"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.name}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-400">
              💡 Tip: Click any slot to edit subject, instructor, or room number.
            </div>
          </div>

          {/* Timetable Days Grid */}
          <div className="space-y-4">
            {daysOfWeek.map((day) => {
              const daySlots = timetableSlots
                .filter((s) => s.className === selectedTimetableClass && s.day === day)
                .sort((a, b) => a.periodNumber - b.periodNumber);

              return (
                <div
                  key={day}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs"
                >
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">{day}</h4>
                    <span className="text-xs text-slate-400 ml-auto">{daySlots.length} Periods Scheduled</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                    {daySlots.map((slot) => (
                      <div
                        key={slot.id}
                        onClick={() => setEditSlot(slot)}
                        className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-sm transition cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-1">
                            <span>P{slot.periodNumber}</span>
                            <span className="font-mono">{slot.startTime}</span>
                          </div>
                          <h5 className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight">
                            {slot.subjectName}
                          </h5>
                          <p className="text-[11px] text-pink-600 dark:text-pink-400 font-semibold mt-1">
                            {slot.teacherName}
                          </p>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-2 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                          {slot.roomNumber}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Teacher Assignments */}
      {activeTab === "assignments" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Faculty Teaching Workload & Class Allocations
            </h3>
            <p className="text-xs text-slate-500">Monitor teacher weekly teaching periods and assigned secondary grade sections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Amina Qureshi",
                department: "Science & Biology",
                classes: ["Grade 10 - Lily", "Grade 9 - Rose"],
                subjects: ["Biology & Life Sciences"],
                periods: 18,
                max: 22,
              },
              {
                name: "Ms. Hiba Rashid",
                department: "Mathematics & Statistics",
                classes: ["Grade 10 - Lily", "Grade 10 - Jasmine"],
                subjects: ["Mathematics & Algebra"],
                periods: 19,
                max: 22,
              },
              {
                name: "Engr. Noor Fatima",
                department: "Computer Science & AI",
                classes: ["Grade 10 - Lily", "Grade 8 - Daisy"],
                subjects: ["Computer Science & AI"],
                periods: 16,
                max: 20,
              },
              {
                name: "Mrs. Sarah Jenkins",
                department: "Humanities & English",
                classes: ["Grade 10 - Lily", "Grade 9 - Rose"],
                subjects: ["English Literature"],
                periods: 15,
                max: 22,
              },
              {
                name: "Dr. Samira Al-Mansoor",
                department: "Physics",
                classes: ["Grade 10 - Lily"],
                subjects: ["Physics"],
                periods: 14,
                max: 20,
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                    <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">{t.department}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] font-bold block mb-1">Assigned Classes:</span>
                    <div className="flex flex-wrap gap-1">
                      {t.classes.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px] font-bold block mb-1">Courses:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{t.subjects.join(", ")}</span>
                  </div>
                </div>

                {/* Workload Bar */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Weekly Workload</span>
                    <span className="text-slate-800 dark:text-slate-200">
                      {t.periods} / {t.max} Periods
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-pink-500"
                      style={{ width: `${(t.periods / t.max) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Schedule New Event */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-500" />
                Schedule Academic Calendar Event
              </h3>
              <button onClick={() => setShowEventModal(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Event Title</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Annual Girls STEM & Robotics Fair"
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="event">Campus Event</option>
                    <option value="exam">Examination</option>
                    <option value="meeting">PTC Meeting</option>
                    <option value="holiday">Holiday</option>
                    <option value="term">Term Start/End</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Term</label>
                  <select
                    value={eventTerm}
                    onChange={(e) => setEventTerm(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="Fall 2026">Fall 2026</option>
                    <option value="Spring 2027">Spring 2027</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Start Date</label>
                  <input
                    type="date"
                    required
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">End Date</label>
                  <input
                    type="date"
                    required
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  placeholder="Details for faculty, students, and parents..."
                  className="w-full mt-1 p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-3 py-1.5 rounded-xl font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow cursor-pointer"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Class Section */}
      {showClassModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-pink-500" />
                Configure New Class Section
              </h3>
              <button onClick={() => setShowClassModal(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddClass} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Class Name</label>
                <input
                  type="text"
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="e.g. Grade 10 - Orchid"
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Grade Level</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Section</label>
                  <input
                    type="text"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Room Number</label>
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Student Capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Class Teacher</label>
                <input
                  type="text"
                  value={classTeacher}
                  onChange={(e) => setClassTeacher(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowClassModal(false)}
                  className="px-3 py-1.5 rounded-xl font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow cursor-pointer"
                >
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Subject */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-pink-500" />
                Add Curriculum Subject
              </h3>
              <button onClick={() => setShowSubjectModal(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubject} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Subject Name</label>
                <input
                  type="text"
                  required
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="e.g. Chemistry & Organic Science"
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Course Code</label>
                  <input
                    type="text"
                    required
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                    placeholder="CHM-106"
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Weekly Periods</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={periodsPerWeek}
                    onChange={(e) => setPeriodsPerWeek(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Lead Educator</label>
                <input
                  type="text"
                  value={subjectTeacher}
                  onChange={(e) => setSubjectTeacher(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowSubjectModal(false)}
                  className="px-3 py-1.5 rounded-xl font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow cursor-pointer"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Timetable Slot */}
      {editSlot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Reassign Period: {editSlot.day} (Period {editSlot.periodNumber})
              </h3>
              <button onClick={() => setEditSlot(null)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Subject</label>
                <input
                  type="text"
                  required
                  value={editSlot.subjectName}
                  onChange={(e) => setEditSlot({ ...editSlot, subjectName: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Teacher Name</label>
                <input
                  type="text"
                  required
                  value={editSlot.teacherName}
                  onChange={(e) => setEditSlot({ ...editSlot, teacherName: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Room Number</label>
                  <input
                    type="text"
                    value={editSlot.roomNumber}
                    onChange={(e) => setEditSlot({ ...editSlot, roomNumber: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Time Slot</label>
                  <input
                    type="text"
                    value={`${editSlot.startTime} - ${editSlot.endTime}`}
                    disabled
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-100 dark:bg-slate-800 text-slate-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditSlot(null)}
                  className="px-3 py-1.5 rounded-xl font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow cursor-pointer"
                >
                  Update Period
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
