"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import {
  CheckSquare,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Sparkles,
  Users,
} from "lucide-react";

export default function TeacherHomeworkPage() {
  const { homework, addHomework } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("Biology & Life Sciences");
  const [className, setClassName] = useState("Grade 10 - Lily");
  const [dueDate, setDueDate] = useState("In 2 days, 4:00 PM");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    addHomework({
      title,
      description,
      subject,
      className,
      dueDate,
      assignedBy: "Dr. Amina Qureshi",
    });

    setTitle("");
    setDescription("");
    setShowAddForm(false);
  };

  return (
    <DashboardShell
      title="Homework & Assignment Management"
      subtitle="Create curriculum tasks, set completion deadlines, and track student submissions."
      action={
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white text-xs font-bold shadow hover:opacity-95 transition"
        >
          <Plus className="w-4 h-4" /> Assign New Homework
        </button>
      }
    >
      {/* Homework Creation Form */}
      {showAddForm && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-in fade-in">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
            Assign Homework / Class Worksheet
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Submitting this will automatically broadcast an in-app alert to all registered parents & students.
          </p>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Homework Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Chapter 6: Calvin Cycle Worksheet"
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="Biology & Life Sciences">Biology & Life Sciences</option>
                  <option value="Mathematics & Algebra">Mathematics & Algebra</option>
                  <option value="Computer Science & AI">Computer Science & AI</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Due Date</label>
                <input
                  type="text"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  placeholder="e.g. Tomorrow, 4:00 PM"
                  className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Task Instructions / Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the exercises to complete, page references, and submission format..."
                className="w-full mt-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold shadow hover:bg-pink-700"
              >
                Dispatch Homework to Class
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Homework List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homework.map((hw) => (
          <div
            key={hw.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                  {hw.subject}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{hw.className}</span>
              </div>

              <h4 className="font-extrabold text-base text-slate-900 dark:text-white mt-3">
                {hw.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {hw.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-1 text-pink-600 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> Due: {hw.dueDate}
                </span>
                <span>Assigned by {hw.assignedBy}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-violet-500" />
                  {hw.submissionsCount || 16} / {hw.totalStudents || 28} Submitted
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                  Active
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
