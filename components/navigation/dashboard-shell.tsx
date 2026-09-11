"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { useApp } from "@/lib/store/app-context";
import { UserRole } from "@/lib/types";
import {
  Lock,
  ShieldCheck,
  GraduationCap,
  Users,
  KeyRound,
  ArrowRight,
  AlertCircle,
  LogOut,
  Sparkles,
} from "lucide-react";

export function DashboardShell({
  children,
  title,
  subtitle,
  action,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isRoleUnlocked, unlockRole, lockRole, setRole } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine current portal role based on URL path
  let portalRole: UserRole = "student";
  if (pathname.startsWith("/admin")) portalRole = "admin";
  else if (pathname.startsWith("/teacher")) portalRole = "teacher";
  else if (pathname.startsWith("/parent")) portalRole = "parent";

  const isUnlocked = isRoleUnlocked(portalRole);

  // Authentication form state for locked portals
  const [authInput, setAuthInput] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const roleMeta: Record<
    UserRole,
    { title: string; color: string; icon: React.ReactNode; demoUser: string; demoPass: string }
  > = {
    admin: {
      title: "School Administration",
      color: "from-purple-600 to-indigo-600",
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      demoUser: "admin@safeaischool.edu (or 'admin')",
      demoPass: "SafeAdmin@2026",
    },
    teacher: {
      title: "Teacher Command Center",
      color: "from-blue-600 to-cyan-600",
      icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
      demoUser: "teacher@safeaischool.edu (or 'teacher')",
      demoPass: "Teacher@2026",
    },
    parent: {
      title: "Parent Safety Portal",
      color: "from-emerald-600 to-teal-600",
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      demoUser: "parent@safeaischool.edu (or 'parent')",
      demoPass: "Parent@2026",
    },
    student: {
      title: "Student Portal",
      color: "from-pink-600 to-violet-600",
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      demoUser: "sara.ahmed@student.safeaischool.edu",
      demoPass: "Student@2026",
    },
  };

  const currentMeta = roleMeta[portalRole];

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authInput || !authPass) return;

    setIsVerifying(true);
    setAuthError(null);

    const result = await unlockRole(portalRole, authInput, authPass);
    setIsVerifying(false);

    if (!result.success) {
      setAuthError(result.error || "Authentication failed. Access denied.");
    } else {
      setAuthInput("");
      setAuthPass("");
    }
  };

  const handleLockOut = () => {
    lockRole(portalRole);
    setRole("student");
    router.push("/student");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Dynamic Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {action}

              {/* Lock Portal button for authenticated non-student portals */}
              {isUnlocked && portalRole !== "student" && (
                <button
                  onClick={handleLockOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-bold hover:bg-red-600 hover:text-white transition"
                  title="Lock this portal and sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock & Sign Out</span>
                </button>
              )}
            </div>
          </div>

          {/* Conditional rendering: if protected role is locked, show Authentication Gate */}
          {!isUnlocked && portalRole !== "student" ? (
            <div className="max-w-lg mx-auto my-12 p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-in fade-in text-center">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700 shadow-inner">
                <Lock className="w-8 h-8 text-pink-600 dark:text-pink-400 animate-pulse" />
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
                Restricted Access Portal
              </span>

              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">
                {currentMeta.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                This portal is locked for security and privacy. Please verify your official {portalRole} credentials to proceed.
              </p>

              {authError && (
                <div className="mt-4 p-3 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleUnlock} className="mt-6 space-y-4 text-left">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Official Email or Username
                  </label>
                  <input
                    type="text"
                    required
                    value={authInput}
                    onChange={(e) => setAuthInput(e.target.value)}
                    placeholder={`e.g. ${portalRole}@safeaischool.edu`}
                    className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Account Password
                  </label>
                  <input
                    type="password"
                    required
                    value={authPass}
                    onChange={(e) => setAuthPass(e.target.value)}
                    placeholder="Enter password"
                    className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                {/* Demo credentials hint for convenience */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500">
                  <div className="font-bold text-slate-700 dark:text-slate-300 mb-0.5">
                    Authorized Credentials:
                  </div>
                  <div>Username/Email: <strong className="text-pink-600">{currentMeta.demoUser}</strong></div>
                  <div>Password: <strong className="text-pink-600">{currentMeta.demoPass}</strong></div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRole("student");
                      router.push("/student");
                    }}
                    className="w-1/3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-center"
                  >
                    Back to Student
                  </button>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 hover:opacity-95 disabled:opacity-50 transition flex items-center justify-center gap-1.5"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>{isVerifying ? "Verifying..." : "Verify & Unlock Portal"}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
}
