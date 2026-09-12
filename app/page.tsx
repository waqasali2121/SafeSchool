"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/lib/store/app-context";
import { QrScannerModal } from "@/components/attendance/qr-scanner-modal";
import {
  ShieldCheck,
  Sparkles,
  Heart,
  GraduationCap,
  Users,
  QrCode,
  BellRing,
  MapPin,
  Bot,
  Layers,
  Award,
  ChevronRight,
  Radio,
  ArrowUpRight,
  CheckCircle2,
  PhoneCall,
  Send,
  Building,
  School,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  const { role, setRole, triggerSos, isSosActive } = useApp();
  const [showQrModal, setShowQrModal] = useState(false);
  const [demoRequested, setDemoRequested] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: "", school: "", email: "", phone: "" });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoRequested(true);
    setTimeout(() => {
      setDemoForm({ name: "", school: "", email: "", phone: "" });
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/70 dark:border-slate-800 bg-gradient-to-b from-pink-50/50 via-white to-slate-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Glow ambient background orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-pink-500/15 via-purple-500/10 to-emerald-500/15 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Brand Logo Presentation */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white border-2 border-pink-200 dark:border-pink-900 shadow-xl shadow-pink-500/10 flex items-center justify-center p-1 hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="SafeAI School Logo"
                width={96}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs font-bold mb-8 shadow-xs animate-in fade-in">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>AI Powered Smart School Safety & Learning Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight sm:leading-none">
            SafeAI{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 dark:from-pink-400 dark:to-violet-400">
              School
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl font-extrabold text-slate-700 dark:text-slate-300 mt-4 tracking-tight">
            Every Girl Safe. Every Parent Connected. Every Student Empowered.
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
            The next-generation ecosystem purpose-built for girls&apos; schools. Combining real-time smart attendance, automated parent safety broadcasts, geofenced SOS panic radars, and an intelligent RAG learning companion grounded strictly in your school textbooks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
            <Link
              href="/student"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 text-white font-extrabold text-sm shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore Student AI Portal</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all"
            >
              <QrCode className="w-4 h-4 text-pink-500" />
              <span>Test QR Attendance Gate</span>
            </button>

            <button
              onClick={() => triggerSos("Sara Ahmed")}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                isSosActive
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 hover:bg-rose-600 hover:text-white"
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>{isSosActive ? "SOS BROADCASTING!" : "Test SOS Panic Alarm"}</span>
            </button>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-200/60 dark:border-slate-800/80">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-pink-600 dark:text-pink-400">100%</span>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Arrival & Exit Safety</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-violet-600 dark:text-violet-400">&lt;2s</span>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Parent WhatsApp Alert</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">0%</span>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">AI Hallucination Risk</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-500 dark:text-amber-400">24/7</span>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Geofenced Panic Radar</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR ROLE PORTALS SHOWCASE */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-pink-600 dark:text-pink-400">
              Unified Campus Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              One Intelligent Platform for Every Stakeholder
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Seamlessly tailored interfaces for Administrators, Teachers, Parents, and Students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. School Admin */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-purple-400 dark:hover:border-purple-500 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">School Admin</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Central command for student registries, faculty assignments, curriculum document indexing, and campus security logs.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Student & Teacher Records
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> RAG Knowledge Base Upload
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Attendance Analytics
                  </li>
                </ul>
              </div>
              <Link
                href="/admin"
                onClick={() => setRole("admin")}
                className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold text-xs hover:bg-purple-600 hover:text-white transition"
              >
                <span>Launch Admin Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 2. Teacher Portal */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-400 dark:hover:border-blue-500 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Teacher Dashboard</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Fast QR attendance roll-call, homework dispatch, exam gradebook recorder, and AI MCQ quiz generation.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Smart Attendance Scanner
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> AI Assignment & MCQ Builder
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Parent Broadcast Messages
                  </li>
                </ul>
              </div>
              <Link
                href="/teacher"
                onClick={() => setRole("teacher")}
                className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold text-xs hover:bg-blue-600 hover:text-white transition"
              >
                <span>Launch Teacher Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3. Parent Portal */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Parent Safety Feed</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Instant arrival and departure updates, daily attendance timestamps, homework deadlines, and academic report cards.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Real-Time Arrival Alerts
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Departure Logs
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Homework & Marks Cards
                  </li>
                </ul>
              </div>
              <Link
                href="/parent"
                onClick={() => setRole("parent")}
                className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-600 hover:text-white transition"
              >
                <span>Launch Parent Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 4. Student AI Companion */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-pink-400 dark:hover:border-pink-500 transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Student AI Assistant</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Grounded AI study partner, interactive MCQ trainer, homework step solver, revision flashcards, and 1-tap SOS panic button.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" /> RAG Textbook Questioning
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" /> Interactive MCQ Trainer
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" /> Step-by-Step Problem Solver
                  </li>
                </ul>
              </div>
              <Link
                href="/student"
                onClick={() => setRole("student")}
                className="mt-6 flex items-center justify-between px-4 py-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold text-xs hover:bg-pink-600 hover:text-white transition"
              >
                <span>Launch Student Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SMART ATTENDANCE & PARENT REAL-TIME ALERTS */}
      <section className="py-16 sm:py-24 border-t border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Child Safety First
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2 leading-tight">
                Instant Parent Arrival & Departure Notifications
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 leading-relaxed font-medium">
                No more worrying if your daughter safely reached school. The moment she scans her smart badge or passes through the campus gate, SafeAI School dispatches real-time verified updates straight to parents via WhatsApp, SMS, and App.
              </p>

              <div className="mt-8 space-y-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Smart QR & RFID Ready</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Sub-second turnstile recognition with support for printed student badges and RFID smart cards.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0">
                    <BellRing className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">WhatsApp & SMS Broadcast</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      &ldquo;Your daughter Sara Ahmed safely reached school at 7:45 AM.&rdquo; Real-time peace of mind for every family.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Geofenced Campus Security</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Active virtual perimeter detects unscheduled boundary departures and alerts guards immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Preview Mockup */}
            <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  Parent Real-Time Notification Stream
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  ONLINE
                </span>
              </div>

              {/* Sample WhatsApp Notification Card */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
                  <span>📱 WhatsApp Safety Alert</span>
                  <span className="text-[10px] opacity-75">7:45 AM</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                  &ldquo;Dear Mr. Tariq Ahmed, your daughter <strong>Sara Ahmed</strong> safely reached school at <strong>7:45 AM</strong> via North Gate Smart QR Entry.&rdquo;
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified by SafeAI Turnstile Sensor #3</span>
                </div>
              </div>

              {/* Sample Departure Alert */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-700 dark:text-slate-300">
                  <span>🔔 Departure Confirmation</span>
                  <span className="text-[10px] opacity-75">1:40 PM</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                  &ldquo;Your daughter <strong>Sara Ahmed</strong> has left school at <strong>1:40 PM</strong> with authorized guardian.&rdquo;
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Launch QR Badge Check-In Simulator</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RAG AI ARCHITECTURE SHOWCASE */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Zero Hallucination Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              Curriculum Grounded RAG Pipeline
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
              Unlike generic AI chatbots that hallucinate false facts, SafeAI answers only from uploaded school textbooks and cites exact page references.
            </p>
          </div>

          {/* Pipeline Diagram */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
            {[
              { step: "1", title: "PDF / DOCX", desc: "Upload Syllabus", icon: "📄" },
              { step: "2", title: "Text Extraction", desc: "Normalize Content", icon: "⚙️" },
              { step: "3", title: "Chunking", desc: "400-word Segments", icon: "✂️" },
              { step: "4", title: "Embeddings", desc: "pgvector Indexing", icon: "🧠" },
              { step: "5", title: "Retriever", desc: "Semantic Search", icon: "🔍" },
              { step: "6", title: "Grounded Answer", desc: "With Citations", icon: "✨" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center relative"
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400">Step {item.step}</span>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white mt-0.5">{item.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* AI Response Strict Rule Showcase */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 max-w-3xl mx-auto">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Bot className="w-4 h-4 text-pink-500" />
              Verified SafeAI Response Standard:
            </h4>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-3 font-mono">
              <div className="text-slate-500">Student Prompt: &ldquo;Explain photosynthesis&rdquo;</div>
              <div className="text-slate-900 dark:text-white font-sans text-sm">
                &ldquo;Photosynthesis is the process where green plants convert sunlight, water, and carbon dioxide into glucose and oxygen.&rdquo;
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-pink-600 dark:text-pink-400 font-sans text-xs">
                <span>📖 Source: Biology Chapter 5 (p. 42).pdf</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold">
                  Confidence: 96%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REQUEST SCHOOL DEMO / CONTACT SECTION */}
      <section className="py-16 sm:py-24 border-t border-slate-200/70 dark:border-slate-800 bg-gradient-to-b from-slate-50/50 to-pink-50/30 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-pink-600 dark:text-pink-400">
            Get Started with SafeAI
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
            Empower Your School With Safety & Intelligence
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium">
            Join forward-thinking girls&apos; academies transforming student safety, parent communication, and academic excellence.
          </p>

          <div className="mt-10 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl text-left">
            {demoRequested ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-extrabold text-lg">Demo Request Received!</h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  Our school safety consultant will reach out within 2 business hours to schedule your campus walkthrough.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                      placeholder="e.g. Principal Farah Qureshi"
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">School / Institution Name</label>
                    <input
                      type="text"
                      required
                      value={demoForm.school}
                      onChange={(e) => setDemoForm({ ...demoForm, school: e.target.value })}
                      placeholder="e.g. St. Mary's Girls College"
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Official Email</label>
                    <input
                      type="email"
                      required
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      placeholder="admin@stmarys.edu"
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Contact Number</label>
                    <input
                      type="tel"
                      required
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 hover:opacity-95 transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request School Demo & Proposal</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-slate-950 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-white border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="SafeAI School"
                width={28}
                height={28}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-black text-slate-900 dark:text-white">SafeAI School</span>
            <span className="hidden md:inline">• Every Girl Safe. Every Parent Connected. Every Student Empowered.</span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} SafeAI School Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* QR Scanner Simulator Modal */}
      <QrScannerModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
    </div>
  );
}
