"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import { Shield, MapPin, Radio, BellRing, CheckCircle2 } from "lucide-react";

export function GeofenceCard({ studentId = "stu-1" }: { studentId?: string }) {
  const { students, recordDeparture, markAttendance } = useApp();
  const student = students.find((s) => s.id === studentId) || students[0];

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Campus Geofence & Boundary Radar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active 500m Safe Radius • RFID Gates & Smart Turnstiles
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
            student?.isInsideCampus
              ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
              : "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          {student?.isInsideCampus ? "INSIDE SAFE PERIMETER" : "OUTSIDE CAMPUS BOUNDARY"}
        </span>
      </div>

      {/* Interactive Geofence visualization simulation */}
      <div className="mt-5 p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/50 dark:from-slate-800/40 dark:to-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Concentric radar rings */}
        <div className="absolute w-48 h-48 rounded-full border border-pink-500/20 animate-ping opacity-30" />
        <div className="absolute w-64 h-64 rounded-full border border-violet-500/20" />
        <div className="absolute w-80 h-80 rounded-full border border-slate-300/40 dark:border-slate-700/40" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-500 to-violet-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-pink-500/30">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>

          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-3">
            {student?.fullName} ({student?.rollNumber})
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Class: {student?.className} • Last Ping: {student?.lastSafetyCheckin || "Recently"}
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-pink-500" />
            <span>Zone: Academic Wing East • North RFID Turnstile #2</span>
          </div>
        </div>
      </div>

      {/* Simulator buttons */}
      <div className="mt-5 flex flex-col sm:flex-row items-center gap-2.5">
        <button
          onClick={() => markAttendance(student.id, "present", "rfid_tap")}
          className="w-full sm:w-1/2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Simulate Arrival (RFID Gate Tap)</span>
        </button>
        <button
          onClick={() => recordDeparture(student.id)}
          className="w-full sm:w-1/2 py-2 px-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow"
        >
          <BellRing className="w-3.5 h-3.5 text-amber-400" />
          <span>Simulate Departure (Leaves Campus)</span>
        </button>
      </div>
    </div>
  );
}
