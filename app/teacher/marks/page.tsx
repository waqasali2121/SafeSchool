"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { Award, Plus, CheckCircle2, TrendingUp, Search, X, Sparkles, Filter, Users, FileCheck } from "lucide-react";

export default function TeacherMarksPage() {
  const { marks, students, recordStudentMark, subjects } = useApp();

  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedEvalType, setSelectedEvalType] = useState("All");
  const [searchStudent, setSearchStudent] = useState("");

  // Modal State
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || "stu-1");
  const [subject, setSubject] = useState("Biology & Life Sciences");
  const [evalType, setEvalType] = useState("Continuous Assessment");
  const [obtainedMarks, setObtainedMarks] = useState(48);
  const [totalMarks, setTotalMarks] = useState(50);
  const [teacherRemarks, setTeacherRemarks] = useState("Outstanding precision in laboratory experiments and cellular diagrams.");

  const [successNotice, setSuccessNotice] = useState("");

  // Automated letter grade calculation
  const calculateGrade = (obtained: number, total: number) => {
    const pct = (obtained / total) * 100;
    if (pct >= 90) return "A+";
    if (pct >= 80) return "A";
    if (pct >= 70) return "B";
    if (pct >= 60) return "C";
    return "D";
  };

  const handleRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === selectedStudentId);
    if (!student) return;

    const grade = calculateGrade(Number(obtainedMarks), Number(totalMarks));

    recordStudentMark({
      studentId: student.id,
      studentName: student.fullName,
      subject,
      examType: evalType,
      obtainedMarks: Number(obtainedMarks),
      totalMarks: Number(totalMarks),
      grade,
      teacherRemarks,
    });

    setShowRecordModal(false);
    setSuccessNotice(`Recorded ${evalType} score for ${student.fullName} (Grade ${grade})`);
    setTimeout(() => setSuccessNotice(""), 4000);
  };

  const filteredMarks = marks.filter((m) => {
    const matchesSubject = selectedSubject === "All" || m.subject.toLowerCase() === selectedSubject.toLowerCase();
    const matchesEval = selectedEvalType === "All" || m.examType.toLowerCase().includes(selectedEvalType.toLowerCase());
    const matchesStudent = m.studentName.toLowerCase().includes(searchStudent.toLowerCase());
    return matchesSubject && matchesEval && matchesStudent;
  });

  return (
    <DashboardShell
      title="Continuous Assessment & Student Gradebook"
      subtitle="Record continuous evaluations, quiz scores, terminal examination marks, and personal constructive feedback notes for parents."
      action={
        <button
          onClick={() => setShowRecordModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold shadow hover:opacity-95 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Record New Evaluation
        </button>
      }
    >
      {/* Grade Distribution Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Highest Assessment Score</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            94.5 / 100
          </div>
          <p className="text-[11px] text-slate-400">Sara Ahmed (Grade A+)</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Cohort Class Average</span>
          <div className="text-2xl font-black text-violet-600 dark:text-violet-400 mt-1">
            89.4%
          </div>
          <p className="text-[11px] text-slate-400">Grade 10 - Lily Section</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Pass Rate</span>
          <div className="text-2xl font-black text-pink-600 dark:text-pink-400 mt-1">
            100%
          </div>
          <p className="text-[11px] text-slate-400">28 of 28 Passed</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Parent Portal Sync</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Live Synced
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold">Immediate Guardian Access</p>
        </div>
      </div>

      {successNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            placeholder="Search student marks..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="All">All Subjects</option>
              <option value="Biology & Life Sciences">Biology</option>
              <option value="Mathematics & Algebra">Mathematics</option>
              <option value="Computer Science & AI">Computer Science</option>
              <option value="Physics">Physics</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Evaluation Type:</span>
            <select
              value={selectedEvalType}
              onChange={(e) => setSelectedEvalType(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="All">All Evaluations</option>
              <option value="Continuous">Continuous Evaluations</option>
              <option value="Quiz">Quizzes</option>
              <option value="Mid-Term">Mid-Term Exams</option>
              <option value="Terminal">Final Terminal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Gradebook Records Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-violet-500" />
            Continuous Evaluations & Assessment Roster
          </h3>
          <span className="text-xs text-slate-400">{filteredMarks.length} Scorecards Published</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredMarks.map((m) => (
            <div
              key={m.id}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {m.studentName}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded-md font-extrabold text-[11px] ${
                      m.grade === "A+" || m.grade === "A"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300"
                    }`}
                  >
                    Grade {m.grade}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    ({m.obtainedMarks} / {m.totalMarks} Marks • {Math.round((m.obtainedMarks / m.totalMarks) * 100)}%)
                  </span>
                </div>

                <p className="text-slate-500 font-medium">
                  {m.subject} • <span className="font-bold text-violet-600 dark:text-violet-400">{m.examType}</span> • Recorded: {m.date}
                </p>

                <p className="text-slate-600 dark:text-slate-300 mt-1 italic bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 leading-relaxed max-w-2xl">
                  &ldquo;{m.teacherRemarks}&rdquo;
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Published to Parent Report Card
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Record New Assessment */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-violet-500" />
                Record Assessment & Constructive Feedback
              </h3>
              <button onClick={() => setShowRecordModal(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecord} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Select Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                >
                  {students.map((stu) => (
                    <option key={stu.id} value={stu.id}>
                      {stu.fullName} ({stu.rollNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Evaluation Type</label>
                  <select
                    value={evalType}
                    onChange={(e) => setEvalType(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="Continuous Assessment">Continuous Evaluation</option>
                    <option value="Monthly Quiz">Monthly Quiz</option>
                    <option value="Mid-Term Examination">Mid-Term Examination</option>
                    <option value="Terminal Final Examination">Final Terminal Examination</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Marks Obtained</label>
                  <input
                    type="number"
                    step="0.5"
                    min={0}
                    required
                    value={obtainedMarks}
                    onChange={(e) => setObtainedMarks(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Total Marks</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 text-violet-800 dark:text-violet-300 flex items-center justify-between font-bold">
                <span>Calculated Grade:</span>
                <span className="text-base font-black">{calculateGrade(Number(obtainedMarks), Number(totalMarks))}</span>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Personal Constructive Teacher Remarks (Visible to Parents)
                </label>
                <textarea
                  required
                  rows={3}
                  value={teacherRemarks}
                  onChange={(e) => setTeacherRemarks(e.target.value)}
                  placeholder="Provide personalized positive reinforcement and areas of academic focus..."
                  className="w-full mt-1 p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowRecordModal(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold shadow hover:opacity-95 transition cursor-pointer"
                >
                  Publish to Gradebook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
