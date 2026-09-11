"use client";

import React from "react";
import { useApp } from "@/lib/store/app-context";
import { AlertTriangle, MapPin, PhoneCall, ShieldCheck, XCircle } from "lucide-react";

export function SosBanner() {
  const { isSosActive, sosDetails, clearSos } = useApp();

  if (!isSosActive) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-3 shadow-xl sticky top-16 z-30 animate-pulse-fast border-b border-red-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs uppercase tracking-wider bg-white/30 px-2 py-0.5 rounded-full">
                Active SOS Emergency
              </span>
              <span className="text-xs font-semibold">
                Student: <span className="underline font-bold">{sosDetails?.studentName || "Sara Ahmed"}</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-red-100 mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> GPS: {sosDetails?.lat}, {sosDetails?.lng} (Near Science Block)
              </span>
              <span>• Triggered at: {sosDetails?.timestamp}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:1122"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-red-700 font-bold text-xs rounded-xl shadow hover:bg-red-50 transition"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Call 1122
          </a>
          <button
            onClick={clearSos}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/30 hover:bg-black/40 text-white font-medium text-xs rounded-xl transition border border-white/20"
          >
            <XCircle className="w-3.5 h-3.5" /> Disarm / Clear Alert
          </button>
        </div>
      </div>
    </div>
  );
}
