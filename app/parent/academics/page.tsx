"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { ChildSwitcher } from "@/components/parent/child-switcher";
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  BookOpen,
  Download,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Sparkles,
} from "lucide-react";

export default function ParentAcademicsPage() {
  const { marks, students, activeChildId, academicEvents } = useApp();

  const currentChild = students.find((s) => s.id === activeChildId) || students[0];
  const childMarks = marks.filter((m) => m.studentId === currentChild?.id);

  // Compute stats
  const totalObtained = childMarks.reduce((acc, m) => acc + m.obtainedMarks, 0);
  const totalMax = childMarks.reduce((acc, m) => acc + m.totalMarks, 0);
  const overallPercentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;
  const gpa = (overallPercentage / 25).toFixed(2); // e.g. 95% -> 3.8 - 4.0 scale

  // Upcoming Test Schedules for this child's grade
  const upcomingTests = currentChild?.className?.includes("10")
    ? [
        { subject: "Biology & Life Sciences", type: "Mid-Term Lab Practical", date: "Sep 15, 2026", time: "08:30 AM - 10:30 AM", room: "Science Lab 3", syllabus: "Microscopy, Plant Cytology, Stomata Regulation, and Photosynthesis Rates", teacher: "Dr. Amina Qureshi" },
        { subject: "Mathematics & Algebra", type: "Chapter 4 Trigonometry Quiz", date: "Sep 22, 2026", time: "09:30 AM - 10:30 AM", room: "Lab 3", syllabus: "Sine/Cosine Rules, Unit Circle, and Pythagorean Identities", teacher: "Ms. Hiba Rashid" },
        { subject: "Physics", type: "Kinematics Numerical Test", date: "Sep 28, 2026", time: "11:15 AM - 12:15 PM", room: "Lab 3", syllabus: "Equations of Motion, Velocity-Time Graphs, and Free Fall Acceleration", teacher: "Dr. Samira Al-Mansoor" },
      ]
    : [
        { subject: "General Science", type: "Unit 3 Ecosystems Evaluation", date: "Sep 18, 2026", time: "09:00 AM - 10:00 AM", room: "Room 204", syllabus: "Food Webs, Ecological Pyramids, and Water Cycle Dynamics", teacher: "Engr. Noor Fatima" },
        { subject: "Mathematics", type: "Linear Equations & Graphing Quiz", date: "Sep 24, 2026", time: "10:15 AM - 11:15 AM", room: "Room 204", syllabus: "Slope-Intercept Form, Coordinate Plotting, and Word Problems", teacher: "Ms. Hiba Rashid" },
      ];

  return (
    <DashboardShell
      title="Academic & Examination Portal"
      subtitle={`Cumulative examination marks, report card GPA, and upcoming test schedules for ${currentChild?.fullName}`}
      action={
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-90 transition print:hidden"
        >
          <Download className="w-4 h-4" /> Download Official PDF Report Card
        </button>
      }
    >
      {/* Multi-Child Switcher */}
      <ChildSwitcher className="mb-6" />

      {/* Student Academic Summary Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={currentChild?.photoUrl}
            alt={currentChild?.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-pink-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                {currentChild?.fullName}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300">
                {currentChild?.className}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Roll: <span className="font-mono">{currentChild?.rollNumber}</span> • Blood Group: <span className="font-mono">{currentChild?.bloodGroup}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-center border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-3 sm:pt-0 sm:pl-6">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Overall Percentage</span>
            <div className="text-2xl font-black text-pink-600 dark:text-pink-400">{overallPercentage}%</div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Cumulative GPA</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{gpa} / 4.0</div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Class Rank</span>
            <div className="text-2xl font-black text-emerald-600">Top 5%</div>
          </div>
        </div>
      </div>

      {/* Grid: Marks Table + Upcoming Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Subject-Wise Evaluation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-pink-500" />
                  Subject-Wise Evaluation Table ({childMarks.length})
                </h3>
                <p className="text-xs text-slate-400">Continuous marks, weighted scores, and constructive educator feedback</p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {childMarks.map((m) => {
                const percentage = Math.round((m.obtainedMarks / m.totalMarks) * 100);
                return (
                  <div key={m.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{m.subject}</h4>
                        <span className="px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 font-bold">
                          Grade: {m.grade}
                        </span>
                      </div>
                      <p className="text-slate-500 mt-1 font-medium">
                        {m.examType} • Evaluated on: {m.date}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl italic border border-slate-100 dark:border-slate-800">
                        Faculty Feedback: &ldquo;{m.teacherRemarks}&rdquo;
                      </p>
                    </div>

                    <div className="text-right min-w-[130px] self-end md:self-center">
                      <span className="text-lg font-black text-slate-900 dark:text-white">
                        {m.obtainedMarks} / {m.totalMarks}
                      </span>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1.5">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-emerald-500 h-full rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 mt-1 block">{percentage}% Score</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Learning Advisor */}
          <div className="p-6 rounded-3xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-900/40 text-xs">
            <h4 className="font-bold text-violet-900 dark:text-violet-300 mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-violet-500" />
              SafeAI Learning Advisor: Personalized Academic Insights for {currentChild?.fullName}
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>Strongest performance observed in laboratory scientific concept mastery and active collaborative discussions.</li>
              <li>Recommended: Practice numerical derivation problems using the Student AI Homework Solver before the upcoming mid-term assessments.</li>
              <li>Attendance punctuality is 100% — maintain this momentum into the terminal examination season.</li>
            </ul>
          </div>
        </div>

        {/* Right Col: Upcoming Test & Exam Schedules */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-pink-500" />
                Upcoming Test Schedule
              </h3>
              <span className="text-[10px] font-bold text-pink-600 bg-pink-50 dark:bg-pink-950/40 px-2 py-0.5 rounded-full">
                Fall 2026
              </span>
            </div>

            <div className="space-y-3.5">
              {upcomingTests.map((t, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900 dark:text-white">{t.subject}</span>
                    <span className="text-[10px] text-pink-600 font-extrabold">{t.date}</span>
                  </div>

                  <h5 className="font-semibold text-slate-700 dark:text-slate-300 mt-1">
                    {t.type}
                  </h5>

                  <div className="mt-2 space-y-1 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{t.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>Location: {t.room} • Invigilator: {t.teacher}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white">Syllabus Scope: </span>
                    {t.syllabus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
