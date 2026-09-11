"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { EmergencyRadar } from "@/components/safety/emergency-radar";
import {
  ShieldAlert,
  Radio,
  MapPin,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Hospital,
  Building2,
} from "lucide-react";

export default function StudentSosPage() {
  const { isSosActive, sosDetails, triggerSos, clearSos } = useApp();

  return (
    <DashboardShell
      title="Student Emergency Safety & SOS Panic Hub"
      subtitle="1-tap immediate security response, verified parental SMS broadcast, and live GPS locator."
    >
      <div className="space-y-6">
        {/* Panic Button Hero Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm text-center">
          <div className="max-w-md mx-auto">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Direct Emergency Broadcast System
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Emergency Panic Button
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-8">
              Pressing this button instantly dispatches your live GPS coordinates to your parents, campus guards, and local authorities.
            </p>

            {/* Big Circular SOS Button */}
            <div className="relative inline-block">
              {isSosActive && (
                <div className="absolute -inset-4 rounded-full bg-red-600/30 animate-ping" />
              )}
              <button
                onClick={() => triggerSos("Sara Ahmed")}
                className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-4 border-white dark:border-slate-800 ${
                  isSosActive
                    ? "bg-gradient-to-tr from-red-600 to-rose-700 animate-pulse-fast shadow-red-600/50"
                    : "bg-gradient-to-tr from-red-600 via-rose-600 to-red-700 shadow-red-500/30 hover:shadow-red-500/50"
                }`}
              >
                <ShieldAlert className="w-14 h-14 sm:w-16 sm:h-16 mb-1" />
                <span className="text-2xl sm:text-3xl font-black tracking-wider">
                  {isSosActive ? "SOS ON" : "SOS"}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-90">
                  {isSosActive ? "BROADCASTING" : "TAP FOR HELP"}
                </span>
              </button>
            </div>

            {/* Current Coordinates & Status */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-center gap-2 font-mono font-bold text-slate-800 dark:text-slate-200">
                <MapPin className="w-4 h-4 text-pink-500" />
                <span>GPS: 33.7201° N, 73.0612° E (Science Wing - East Gate)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Accuracy: High Precision Cellular & Wi-Fi Triangulation</p>

              {isSosActive && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3">
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Parents Notified via SMS & WhatsApp
                  </span>
                  <button
                    onClick={clearSos}
                    className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-[11px] hover:bg-slate-300"
                  >
                    Disarm Alert
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nearby Emergency Services Radar */}
        <EmergencyRadar />
      </div>
    </DashboardShell>
  );
}
