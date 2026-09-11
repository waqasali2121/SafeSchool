"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store/app-context";
import { RoleSwitcher } from "./role-switcher";
import { ThemeToggle } from "./theme-toggle";
import {
  ShieldAlert,
  Bell,
  CheckCheck,
  GraduationCap,
  Sparkles,
  HeartHandshake,
  Menu,
  X,
  Radio,
  ExternalLink,
} from "lucide-react";

export function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const pathname = usePathname();
  const { role, notifications, markNotificationAsRead, clearAllNotifications, triggerSos, isSosActive } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleHomeHref = `/${role}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile sidebar toggle + Brand logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 dark:from-pink-400 dark:to-violet-400">
                  SafeAI School
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 hidden sm:inline-block">
                  Girls Safety & AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                Every Girl Safe • Connected • Empowered
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Interactive Role Switcher */}
        <div className="hidden sm:block">
          <RoleSwitcher />
        </div>

        {/* Right Action Icons: SOS, Notifications, Theme, Role Portal */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick SOS Trigger Button */}
          <button
            onClick={() => triggerSos("Sara Ahmed")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
              isSosActive
                ? "bg-red-600 text-white animate-pulse"
                : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-600 hover:text-white"
            }`}
            title="Instant Campus SOS Alert"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden md:inline">{isSosActive ? "SOS ACTIVE!" : "SOS Alert"}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/60 dark:border-slate-800"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-600 text-[9px] font-bold text-white shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-pink-500 animate-pulse" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Live Parent & Safety Feeds
                    </h4>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[11px] text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <CheckCheck className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 py-2 space-y-1">
                  {notifications.slice(0, 6).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                        notif.read
                          ? "opacity-75 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                          : "bg-pink-50/50 dark:bg-pink-950/20 hover:bg-pink-50 dark:hover:bg-pink-950/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                            notif.category === "attendance"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : notif.category === "emergency"
                              ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 animate-pulse"
                              : notif.category === "homework"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                              : "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                          }`}
                        >
                          {notif.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{notif.createdAt}</span>
                      </div>
                      <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                        {notif.title}
                      </h5>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                  <Link
                    href={`/${role}`}
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-medium text-pink-600 dark:text-pink-400 hover:underline inline-flex items-center gap-1"
                  >
                    Open {role.toUpperCase()} Dashboard <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />

          {/* Go to Active Dashboard Link */}
          <Link
            href={roleHomeHref}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-white shadow-sm transition-all ${
              pathname.startsWith(`/${role}`)
                ? "bg-slate-900 dark:bg-white dark:text-slate-900"
                : "bg-gradient-to-r from-pink-600 to-violet-600 hover:opacity-95"
            }`}
          >
            <span>{role.charAt(0).toUpperCase() + role.slice(1)} Portal</span>
          </Link>
        </div>
      </div>

      {/* Mobile role switcher bar */}
      <div className="sm:hidden px-4 py-2 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 flex justify-center">
        <RoleSwitcher />
      </div>
    </header>
  );
}
