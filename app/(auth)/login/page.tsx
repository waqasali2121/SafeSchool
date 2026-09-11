"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store/app-context";
import { UserRole } from "@/lib/types";
import {
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Users,
  UserCircle2,
  Lock,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("sara.ahmed@student.safeaischool.edu");
  const [password, setPassword] = useState("••••••••••••");

  const handleRoleSelect = (r: UserRole) => {
    setSelectedRole(r);
    switch (r) {
      case "admin":
        setEmail("admin@safeaischool.edu");
        break;
      case "teacher":
        setEmail("amina.qureshi@faculty.safeaischool.edu");
        break;
      case "parent":
        setEmail("tariq.ahmed@parent.safeaischool.edu");
        break;
      case "student":
      default:
        setEmail("sara.ahmed@student.safeaischool.edu");
        break;
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    router.push(`/${selectedRole}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-pink-50/20 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-violet-600 flex items-center justify-center text-white mx-auto shadow-md shadow-pink-500/20 mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            SafeAI School Portal
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose your role or test credentials to sign in
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
          {(
            [
              { key: "admin", label: "Admin", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
              { key: "teacher", label: "Teacher", icon: <GraduationCap className="w-3.5 h-3.5" /> },
              { key: "parent", label: "Parent", icon: <Users className="w-3.5 h-3.5" /> },
              { key: "student", label: "Student", icon: <UserCircle2 className="w-3.5 h-3.5" /> },
            ] as const
          ).map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => handleRoleSelect(r.key)}
              className={`py-2 text-xs font-bold rounded-xl flex flex-col items-center gap-1 transition ${
                selectedRole === r.key
                  ? "bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              {r.icon}
              <span className="text-[10px]">{r.label}</span>
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {selectedRole.toUpperCase()} Email Address
            </label>
            <div className="relative mt-1.5">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-pink-600 dark:text-pink-400 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative mt-1.5">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 hover:opacity-95 transition flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to {selectedRole.toUpperCase()} Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          <span>New student or guardian? </span>
          <Link href="/register" className="font-bold text-pink-600 hover:underline">
            Register Enrollment
          </Link>
        </div>
      </div>
    </div>
  );
}
