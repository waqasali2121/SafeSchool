"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import { Users, Sparkles, ShieldCheck, Heart, Radio, ChevronRight } from "lucide-react";

export function ChildSwitcher({ className = "" }: { className?: string }) {
  const { students, activeChildId, setActiveChildId } = useApp();

  // Filter children linked to parent Tariq Ahmed (par-1)
  const children = students.filter((s) => s.parentId === "par-1");
  const activeChild = children.find((c) => c.id === activeChildId) || children[0];

  if (children.length <= 1) return null;

  return (
    <div className={`p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Multi-Child Family Switcher
            </h4>
            <p className="text-[11px] text-slate-500">
              Switch dashboards to view real-time safety, grades, and homework per child.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 self-start sm:self-auto">
          {children.length} Children Enrolled
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
        {children.map((child) => {
          const isSelected = child.id === activeChild?.id;
          return (
            <button
              key={child.id}
              onClick={() => setActiveChildId(child.id)}
              className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? "bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-violet-500/10 border-pink-500/60 dark:border-pink-500/40 shadow-sm ring-2 ring-pink-500/20"
                  : "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={child.photoUrl}
                    alt={child.fullName}
                    className="w-11 h-11 rounded-xl object-cover border border-white dark:border-slate-700 shadow-sm"
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 ${
                      child.isInsideCampus ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                    title={child.isInsideCampus ? "Safely inside campus" : "Off-campus"}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {child.fullName}
                    </span>
                    {isSelected && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-pink-600 text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {child.className} • Roll: <span className="font-mono">{child.rollNumber}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                    child.isInsideCampus
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                      : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <Radio className={`w-3 h-3 ${child.isInsideCampus ? "animate-pulse" : ""}`} />
                  {child.isInsideCampus ? "On Campus" : "Off Campus"}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block mt-1">
                  {child.attendanceRate}% Attendance
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
