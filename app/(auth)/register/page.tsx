"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/student");
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-pink-50/20 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-slate-200 dark:border-slate-700 mx-auto shadow-md mb-3 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="SafeAI School Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Student Enrollment & Safety Registry
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create your SafeAI School credential for turnstile access & AI companion
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-extrabold text-base">Enrollment Confirmed!</h3>
            <p className="text-xs">Redirecting to your student learning companion...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sara Ahmed"
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Class & Section</label>
                <select className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white">
                  <option>Grade 10 - Lily</option>
                  <option>Grade 10 - Jasmine</option>
                  <option>Grade 9 - Rose</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Guardian Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Ahmed"
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Guardian WhatsApp Phone</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 349-2810"
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Account Password</label>
              <input
                type="password"
                required
                defaultValue="secret123"
                className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 hover:opacity-95 transition"
            >
              Complete Enrollment & Issue Smart Badge
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
          <span>Already registered? </span>
          <Link href="/login" className="font-bold text-pink-600 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
