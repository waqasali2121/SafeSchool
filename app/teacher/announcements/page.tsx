"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { Megaphone, Send, CheckCircle2, Users, Bell } from "lucide-react";

export default function TeacherAnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState<"all" | "whatsapp" | "app">("all");
  const [isSent, setIsSent] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    setIsSent(true);
    setTimeout(() => {
      setTitle("");
      setMessage("");
      setIsSent(false);
    }, 3000);
  };

  return (
    <DashboardShell
      title="Parent Announcements & Broadcasts"
      subtitle="Dispatch important classroom notices, event invites, and circulars directly to parents."
    >
      <div className="max-w-2xl mx-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Compose Class Announcement
            </h3>
            <p className="text-xs text-slate-500">Recipients: Parents of Grade 10 - Lily (28 Families)</p>
          </div>
        </div>

        {isSent && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Broadcast successfully dispatched to parent WhatsApp & App inboxes!</span>
          </div>
        )}

        <form onSubmit={handleBroadcast} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Announcement Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Science Fair Project Submissions & Exhibition"
              className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Delivery Channels</label>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {[
                { id: "all", label: "WhatsApp + App (Priority)" },
                { id: "whatsapp", label: "WhatsApp Only" },
                { id: "app", label: "SafeAI App Only" },
              ].map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setChannel(ch.id as any)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl transition ${
                    channel === ch.id
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message Content</label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your notice or instructions for parents..."
              className="w-full mt-1.5 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold text-xs shadow-lg shadow-pink-500/20 hover:opacity-95 transition"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Announcement</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
