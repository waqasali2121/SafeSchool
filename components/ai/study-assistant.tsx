"use client";

import React, { useState } from "react";
import { INITIAL_FLASHCARDS } from "@/lib/mock-data";
import { Flashcard } from "@/lib/types";
import {
  Sparkles,
  BookOpen,
  Layers,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  CheckCircle,
  FileCheck,
} from "lucide-react";

export function StudyAssistant() {
  const [activeTab, setActiveTab] = useState<"summary" | "flashcards" | "revision">("flashcards");
  const [flashcards] = useState<Flashcard[]>(INITIAL_FLASHCARDS);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentCardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Pills */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("flashcards")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "flashcards"
              ? "bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Flashcards</span>
        </button>

        <button
          onClick={() => setActiveTab("summary")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "summary"
              ? "bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Chapter Summaries</span>
        </button>

        <button
          onClick={() => setActiveTab("revision")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "revision"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>7-Day Exam Revision Plan</span>
        </button>
      </div>

      {/* 1. Flashcards View */}
      {activeTab === "flashcards" && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
            <div>
              <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                Topic: {currentCard.topic} • {currentCard.subject}
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mt-0.5">
                Active Recall Card Deck
              </h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Card {currentCardIndex + 1} of {flashcards.length}
            </span>
          </div>

          {/* Interactive Flashcard */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[260px] rounded-3xl p-8 bg-gradient-to-br from-pink-50/60 via-purple-50/40 to-slate-50/70 dark:from-slate-800/80 dark:via-pink-950/20 dark:to-slate-900 border-2 border-pink-200 dark:border-pink-900/50 shadow-lg hover:border-pink-400 dark:hover:border-pink-700 transition-all flex flex-col items-center justify-center text-center relative group select-none"
          >
            <div className="absolute top-4 right-4 text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              <span>Tap to Flip</span>
            </div>

            <div className="max-w-lg">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider mb-4 inline-block bg-white dark:bg-slate-800 shadow-xs text-pink-600 dark:text-pink-400">
                {isFlipped ? "Answer / Solution" : "Question / Prompt"}
              </span>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {isFlipped ? currentCard.answer : currentCard.question}
              </h4>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Card
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-bold hover:bg-pink-200 transition"
            >
              <RotateCw className="w-3.5 h-3.5" /> Flip Card
            </button>

            <button
              onClick={handleNextCard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Next Card <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Chapter Summaries View */}
      {activeTab === "summary" && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              Curriculum Core Summaries
            </span>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-1">
              Biology Chapter 5: Photosynthesis & Energy Transfer
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-pink-500" />
                1. Light Reactions
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Occurs in thylakoid membranes. Photons split H2O into oxygen, producing ATP via chemiosmosis and NADPH via ferredoxin.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-violet-500" />
                2. Calvin Cycle
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Occurs in stroma. Rubisco enzyme fixes CO2 into 3-PGA, converted to G3P sugars using chemical energy from ATP and NADPH.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-500" />
                3. Limiting Factors
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Photosynthetic rate is constrained by Blackman&apos;s Principle of Limiting Factors: light intensity, temperature, and CO2 saturation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. 7-Day Exam Revision Plan View */}
      {activeTab === "revision" && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-4">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              AI Generated Schedule
            </span>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-1">
              Finals Prep: 7-Day High-Yield Revision Plan
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { day: "Day 1", subject: "Biology", topic: "Cell Structure & Photosynthesis Diagrams", hours: "2.5 hrs" },
              { day: "Day 2", subject: "Mathematics", topic: "Quadratic Equations, Factoring & Roots Formula", hours: "3.0 hrs" },
              { day: "Day 3", subject: "Physics", topic: "Newtonian Kinematics & Momentum Conservation", hours: "2.5 hrs" },
              { day: "Day 4", subject: "Computer Science", topic: "Python Functions, Loops & Algorithm Flowcharts", hours: "2.0 hrs" },
              { day: "Day 5", subject: "Chemistry", topic: "Periodic Trends & Chemical Bonding", hours: "2.5 hrs" },
              { day: "Day 6", subject: "Mock Exam", topic: "Timed 50-question MCQ drill + Long Answer Practice", hours: "3.5 hrs" },
              { day: "Day 7", subject: "Review & Rest", topic: "Flashcard rapid recall & mental wellness check", hours: "1.5 hrs" },
            ].map((plan, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-12 py-1 text-center font-bold rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                    {plan.day}
                  </span>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">
                      {plan.subject}: {plan.topic}
                    </h5>
                    <span className="text-[11px] text-slate-500">Recommended focus time: {plan.hours}</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Scheduled
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
