"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store/app-context";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  BarChart3,
  CalendarCheck2,
  CheckSquare,
  Award,
  HelpCircle,
  Megaphone,
  ShieldAlert,
  Heart,
  FileQuestion,
  Layers,
  Sparkles,
  QrCode,
  Radio,
  Clock,
  Compass,
  BellRing,
  Building2,
  UserPlus,
  ShieldCheck,
} from "lucide-react";

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { role, isSosActive, triggerSos } = useApp();

  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { href: "/admin", label: "Overview & Campus Safety", icon: <LayoutDashboard className="w-4 h-4" /> },
          { href: "/admin/alerts", label: "Student Alert System", icon: <BellRing className="w-4 h-4 text-rose-500" />, badge: "SMS/Push" },
          { href: "/admin/users", label: "User Accounts & RBAC", icon: <UserPlus className="w-4 h-4 text-blue-500" />, badge: "RBAC" },
          { href: "/admin/structure", label: "School Structure Setup", icon: <Building2 className="w-4 h-4 text-emerald-500" />, badge: "Setup" },
          { href: "/admin/students", label: "Student Registry", icon: <Users className="w-4 h-4" /> },
          { href: "/admin/teachers", label: "Faculty Directory", icon: <GraduationCap className="w-4 h-4" /> },
          { href: "/admin/documents", label: "RAG Knowledge Base", icon: <BookOpen className="w-4 h-4" />, badge: "AI" },
          { href: "/admin/analytics", label: "Analytics & Audit Logs", icon: <BarChart3 className="w-4 h-4 text-violet-500" />, badge: "Audit" },
        ];
      case "teacher":
        return [
          { href: "/teacher", label: "Teacher Command Center", icon: <LayoutDashboard className="w-4 h-4" /> },
          { href: "/teacher/attendance", label: "Smart Attendance Marker", icon: <QrCode className="w-4 h-4" />, badge: "QR/RFID" },
          { href: "/admin/alerts", label: "Issue Parent Alert", icon: <BellRing className="w-4 h-4 text-rose-500" />, badge: "Urgent" },
          { href: "/teacher/homework", label: "Homework Manager", icon: <CheckSquare className="w-4 h-4" /> },
          { href: "/teacher/marks", label: "Marks & Gradebook", icon: <Award className="w-4 h-4" /> },
          { href: "/teacher/mcq-generator", label: "MCQ & Quiz Builder", icon: <Sparkles className="w-4 h-4" />, badge: "AI" },
          { href: "/teacher/announcements", label: "Parent Broadcasts", icon: <Megaphone className="w-4 h-4" /> },
        ];
      case "parent":
        return [
          { href: "/parent", label: "Child Safety & Live Alerts", icon: <Heart className="w-4 h-4" />, badge: "Live" },
          { href: "/parent/attendance", label: "Arrival / Departure Logs", icon: <Clock className="w-4 h-4" /> },
          { href: "/parent/academics", label: "Report Card & Marks", icon: <Award className="w-4 h-4" /> },
          { href: "/parent/homework", label: "Homework Tracker", icon: <CheckSquare className="w-4 h-4" /> },
          { href: "/parent/emergency", label: "Emergency & Helplines", icon: <ShieldAlert className="w-4 h-4 text-red-500" /> },
        ];
      case "student":
      default:
        return [
          { href: "/student", label: "Student Portal Home", icon: <LayoutDashboard className="w-4 h-4" /> },
          { href: "/student/ai-assistant", label: "AI Learning Companion", icon: <Sparkles className="w-4 h-4 text-pink-500" />, badge: "RAG" },
          { href: "/student/mcq-practice", label: "MCQ Quiz Trainer", icon: <HelpCircle className="w-4 h-4 text-violet-500" /> },
          { href: "/student/homework-solver", label: "AI Homework Solver", icon: <FileText className="w-4 h-4 text-blue-500" /> },
          { href: "/student/assignment-generator", label: "Assignment Generator", icon: <FileQuestion className="w-4 h-4 text-emerald-500" /> },
          { href: "/student/study-tools", label: "Flashcards & Summaries", icon: <Layers className="w-4 h-4" /> },
          { href: "/student/sos", label: "Emergency SOS Radar", icon: <ShieldAlert className="w-4 h-4 text-rose-500" />, badge: "Safety" },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between p-4">
          {/* Top Section */}
          <div className="space-y-6">
            {/* Active Persona Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-pink-50 to-violet-50 dark:from-pink-950/20 dark:to-violet-950/20 border border-pink-100 dark:border-pink-900/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center font-extrabold text-sm shadow">
                  {role.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    {role} Dashboard
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    SafeAI School Verified
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md ${
                          isActive
                            ? "bg-pink-500 text-white"
                            : "bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Panic Action Card */}
          <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-center space-y-2.5">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Campus Safety SOS</span>
            </div>
            <p className="text-[11px] text-red-600/90 dark:text-red-400">
              1-tap broadcast to parents, security desk, and 1122.
            </p>
            <button
              onClick={() => triggerSos("Sara Ahmed")}
              className={`w-full py-2 px-3 text-xs font-extrabold rounded-xl transition shadow-md ${
                isSosActive
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:opacity-95"
              }`}
            >
              {isSosActive ? "SOS BROADCASTING!" : "PRESS EMERGENCY SOS"}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
