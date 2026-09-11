"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart3, TrendingUp, Calendar, AlertCircle, CheckCircle } from "lucide-react";

export default function AdminAnalyticsPage() {
  const dailyAttendanceData = [
    { day: "Mon", present: 104, late: 4, absent: 2 },
    { day: "Tue", present: 106, late: 3, absent: 1 },
    { day: "Wed", present: 103, late: 5, absent: 2 },
    { day: "Thu", present: 107, late: 2, absent: 1 },
    { day: "Fri", present: 102, late: 6, absent: 2 },
  ];

  const monthlyTrendData = [
    { month: "May", rate: 94.2 },
    { month: "Jun", rate: 95.8 },
    { month: "Jul", rate: 93.5 },
    { month: "Aug", rate: 96.1 },
    { month: "Sep", rate: 97.4 },
  ];

  return (
    <DashboardShell
      title="Attendance & Safety Analytics"
      subtitle="Institutional attendance trends, punctuality patterns, and gate check-in telemetry."
    >
      {/* Top metric highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Weekly Average Presence</span>
          <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
            96.8%
          </h3>
          <p className="text-xs text-slate-400 mt-1">Average 104 of 110 students daily</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Punctuality Rate (&lt; 8:00 AM)</span>
          <h3 className="text-3xl font-black text-pink-600 dark:text-pink-400 mt-2">
            95.2%
          </h3>
          <p className="text-xs text-slate-400 mt-1">Only 3.8% recorded as late arrival</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-500">Parent Notification Delivery</span>
          <h3 className="text-3xl font-black text-violet-600 dark:text-violet-400 mt-2">
            99.9%
          </h3>
          <p className="text-xs text-slate-400 mt-1">Instant delivery via WhatsApp & App</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-pink-500" />
            Daily Attendance Status (This Week)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="day" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "1rem",
                    color: "#fff",
                    border: "none",
                  }}
                />
                <Legend />
                <Bar dataKey="present" fill="#10b981" name="Present" radius={[6, 6, 0, 0]} />
                <Bar dataKey="late" fill="#f59e0b" name="Late" radius={[6, 6, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-violet-500" />
            5-Month Attendance Retention Curve (%)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                <YAxis domain={[90, 100]} stroke="#888" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "1rem",
                    color: "#fff",
                    border: "none",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#ec4899"
                  strokeWidth={3}
                  name="Attendance %"
                  dot={{ r: 5, fill: "#ec4899" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
