"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store/app-context";
import {
  ShieldAlert,
  Phone,
  Navigation,
  Building2,
  Hospital,
  Flame,
  Radio,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export function EmergencyRadar() {
  const { emergencyContacts, triggerSos, isSosActive } = useApp();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [dispatchedCall, setDispatchedCall] = useState<string | null>(null);

  const handleCall = (name: string, phone: string) => {
    setDispatchedCall(name);
    setTimeout(() => {
      setDispatchedCall(null);
    }, 4000);
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Nearby Emergency Services Radar
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time geofenced perimeter coordinates & priority response hotlines.
          </p>
        </div>

        <button
          onClick={() => triggerSos("Sara Ahmed")}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{isSosActive ? "SOS ACTIVE (Tap to broadcast again)" : "Trigger Instant SOS Panic"}</span>
        </button>
      </div>

      {dispatchedCall && (
        <div className="mb-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Direct dispatch connection established with: <strong>{dispatchedCall}</strong></span>
        </div>
      )}

      {/* Grid of emergency facilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map((contact) => (
          <div
            key={contact.id}
            className={`p-4 rounded-2xl border transition-all ${
              selectedService === contact.id
                ? "border-pink-500 bg-pink-50/40 dark:bg-pink-950/20 shadow-md"
                : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    contact.type === "Police"
                      ? "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400"
                      : contact.type === "Hospital"
                      ? "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400"
                      : "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {contact.type === "Police" ? (
                    <Building2 className="w-5 h-5" />
                  ) : contact.type === "Hospital" ? (
                    <Hospital className="w-5 h-5" />
                  ) : (
                    <Flame className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {contact.name}
                  </h4>
                  <span className="text-[10px] font-semibold text-pink-600 dark:text-pink-400">
                    {contact.distanceKm} km away • Priority Responder
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                24/7 Active
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 line-clamp-1">
              📍 {contact.address}
            </p>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
              <button
                onClick={() => handleCall(contact.name, contact.phoneNumber)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:opacity-90 transition"
              >
                <Phone className="w-3.5 h-3.5" /> Call {contact.phoneNumber}
              </button>

              <a
                href={`https://maps.google.com/?q=${contact.latitude},${contact.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1 py-2 px-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                title="Open GPS Navigation"
              >
                <Navigation className="w-3.5 h-3.5 text-pink-500" />
                <span>Navigate</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
