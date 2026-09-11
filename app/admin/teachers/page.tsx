"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { INITIAL_TEACHERS, INITIAL_SUBJECTS } from "@/lib/mock-data";
import { GraduationCap, Mail, Phone, BookOpen, Award, Plus, CheckCircle2 } from "lucide-react";

export default function AdminTeachersPage() {
  const [teachers] = useState(INITIAL_TEACHERS);
  const [subjects] = useState(INITIAL_SUBJECTS);

  return (
    <DashboardShell
      title="Faculty Directory & Teaching Staff"
      subtitle="Teacher qualifications, subject allocations, and departmental roles."
      action={
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-90 transition">
          <Plus className="w-4 h-4" /> Add New Faculty Member
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
                  {teacher.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {teacher.fullName}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                    {teacher.department} • {teacher.employeeId}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <p>
                  <strong>Qualification:</strong> {teacher.qualification}
                </p>
                <div>
                  <strong className="block mb-1 text-slate-700 dark:text-slate-300">Assigned Classes:</strong>
                  <div className="flex flex-wrap gap-1">
                    {teacher.assignedClasses.map((cls, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-semibold"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active in Faculty
              </span>
              <button className="text-pink-600 dark:text-pink-400 hover:underline font-semibold">
                Manage Schedule →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Curriculum Subject Assignments Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm mt-6">
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-pink-500" />
          Active Curriculum Subjects & Lead Educators
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {subjects.map((sub) => (
            <div key={sub.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white">{sub.name}</h5>
                <span className="text-[11px] font-mono text-slate-400">{sub.code}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.teacherName}</span>
                <p className="text-[11px] text-pink-600 font-medium">Grade 10 Curriculum</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
