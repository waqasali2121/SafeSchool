"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import { UserRole } from "@/lib/types";
import { ShieldCheck, GraduationCap, Users, UserCircle2, Lock } from "lucide-react";

export function RoleSwitcher() {
  const { role, setRole, isRoleUnlocked } = useApp();

  const roles: { key: UserRole; label: string; icon: React.ReactNode; color: string }[] = [
    { key: "admin", label: "Admin", icon: <ShieldCheck className="w-3.5 h-3.5" />, color: "text-purple-600 dark:text-purple-400" },
    { key: "teacher", label: "Teacher", icon: <GraduationCap className="w-3.5 h-3.5" />, color: "text-blue-600 dark:text-blue-400" },
    { key: "parent", label: "Parent", icon: <Users className="w-3.5 h-3.5" />, color: "text-emerald-600 dark:text-emerald-400" },
    { key: "student", label: "Student", icon: <UserCircle2 className="w-3.5 h-3.5" />, color: "text-pink-600 dark:text-pink-400" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2 uppercase tracking-wider hidden md:inline-block">
        Role:
      </span>
      {roles.map((r) => {
        const isActive = role === r.key;
        const isLocked = r.key !== "student" && !isRoleUnlocked(r.key);

        return (
          <button
            key={r.key}
            onClick={() => setRole(r.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              isActive
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-slate-200/60 dark:ring-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50"
            }`}
            title={isLocked ? `${r.label} (Protected - Password Required)` : r.label}
          >
            <span className={isActive ? r.color : ""}>{r.icon}</span>
            <span>{r.label}</span>
            {isLocked && <Lock className="w-2.5 h-2.5 text-slate-400" />}
          </button>
        );
      })}
    </div>
  );
}
