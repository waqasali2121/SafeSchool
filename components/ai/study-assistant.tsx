"use client";

import React, { useState } from "react";
import { INITIAL_FLASHCARDS } from "@/lib/mock-data";
import { Flashcard } from "@/lib/types";
import { useApp } from "@/lib/store/app-context";
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
  Wand2,
  Download,
  Copy,
  Check,
  HelpCircle,
  FileText,
  Bookmark,
  Printer,
} from "lucide-react";

export function StudyAssistant() {
  const { studyMaterials } = useApp();
  const [activeTab, setActiveTab] = useState<"generator" | "flashcards" | "summary" | "revision">("generator");

  // Generator State
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("custom");
  const [generatorFormat, setGeneratorFormat] = useState<"takeaways" | "quiz" | "summary" | "flashcards">("takeaways");
  const [customNoteContent, setCustomNoteContent] = useState(
    "Photosynthesis is the process in green plants converting light energy into chemical energy stored in glucose: 6CO2 + 6H2O + light -> C6H12O6 + 6O2. Light reactions in thylakoid membranes split water into oxygen and synthesize ATP and NADPH. Calvin cycle in the stroma fixes carbon dioxide with RuBisCO enzyme into G3P sugars."
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<{
    type: "takeaways" | "quiz" | "summary" | "flashcards";
    title: string;
    items: any[];
    rawSummary?: string;
  } | null>({
    type: "takeaways",
    title: "Key Takeaway Revision Sheet: Photosynthesis & Energy Transfer",
    items: [
      { heading: "Chemical Equation", content: "6CO2 + 6H2O + photons → C6H12O6 + 6O2 (Endothermic reaction driven by solar radiation)." },
      { heading: "Organelle Architecture", content: "Chloroplast double membrane containing thylakoids (grana stacks) and fluid stroma." },
      { heading: "Light-Dependent Phase", content: "Photolysis in PS II splits H2O into 4H+, 4e-, and O2. ATP synthase produces chemical ATP via proton gradient." },
      { heading: "Light-Independent Phase", content: "RuBisCO fixes CO2 with 5-carbon RuBP, followed by reduction into G3P sugars." },
      { heading: "Rate-Limiting Factors", content: "Light intensity, ambient temperature (denatures RuBisCO > 40°C), and atmospheric CO2 concentration." },
    ],
  });

  // Flashcards State
  const [flashcards, setFlashcards] = useState<Flashcard[]>(INITIAL_FLASHCARDS);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentCard = flashcards[currentCardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleRunGenerator = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (generatorFormat === "takeaways") {
        setGeneratedOutput({
          type: "takeaways",
          title: "Custom High-Yield Takeaway Sheet",
          items: [
            { heading: "Fundamental Definition", content: customNoteContent.slice(0, 140) + "..." },
            { heading: "High-Yield Formula / Axiom", content: "Primary equation and stoichiometric balances reviewed in lecture notes." },
            { heading: "Exam Trap Alert", content: "Do not confuse stroma reactions (Calvin cycle) with cristae phosphorylation in mitochondria." },
            { heading: "Mnemonics for Quick Recall", content: "OIL RIG: Oxidation Is Loss, Reduction Is Gain of electrons." },
          ],
        });
      } else if (generatorFormat === "quiz") {
        setGeneratedOutput({
          type: "quiz",
          title: "Generated 3-Question Practice Quiz",
          items: [
            { q: "Where do the light-dependent reactions take place?", a: "Across the thylakoid membranes of chloroplasts." },
            { q: "What is the primary enzyme catalyzing carbon fixation?", a: "Ribulose-1,5-bisphosphate carboxylase-oxygenase (RuBisCO)." },
            { q: "What are the three limiting factors according to Blackman's Principle?", a: "Light intensity, CO2 concentration, and temperature." },
          ],
        });
      } else if (generatorFormat === "summary") {
        setGeneratedOutput({
          type: "summary",
          title: "Executive Synthesis & Core Takeaways",
          rawSummary: `Executive Summary: \n\n• Core Mechanism: ${customNoteContent}\n• Key takeaways emphasize molecular energy conversion, proton chemiosmosis across membranes, and cellular storage of carbohydrates.\n• Direct relevance: Covers 25% of the terminal Fall 2026 examination rubric.`,
          items: [],
        });
      } else if (generatorFormat === "flashcards") {
        const newDeck: Flashcard[] = [
          { id: "fc-g1", topic: "Lecture Concept", subject: "Class Notes", question: "What occurs during Photolysis of Water?", answer: "Water molecules are split into electrons, hydrogen protons, and oxygen gas via light in PS II." },
          { id: "fc-g2", topic: "Enzymology", subject: "Class Notes", question: "What is the role of RuBisCO in the Calvin Cycle?", answer: "Catalyzes the addition of CO2 to RuBP, forming 3-PGA molecules." },
          { id: "fc-g3", topic: "Cellular Energy", subject: "Class Notes", question: "How does ATP Synthase generate ATP in chloroplasts?", answer: "Utilizes the proton electrochemical gradient across the thylakoid membrane." },
        ];
        setFlashcards(newDeck);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setActiveTab("flashcards");
      }
      setIsGenerating(false);
    }, 700);
  };

  const handleCopyOutput = () => {
    if (!generatedOutput) return;
    const text = generatedOutput.items
      ? generatedOutput.items.map((it) => `${it.heading || it.q}: ${it.content || it.a}`).join("\n\n")
      : generatedOutput.rawSummary || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("generator")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "generator"
              ? "bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>AI Study Material Generator</span>
        </button>

        <button
          onClick={() => setActiveTab("flashcards")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "flashcards"
              ? "bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Flashcards ({flashcards.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("summary")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "summary"
              ? "bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum Summaries</span>
        </button>

        <button
          onClick={() => setActiveTab("revision")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "revision"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>7-Day Revision Plan</span>
        </button>
      </div>

      {/* 1. AI Study Material Generator View */}
      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input Notes & Format Selector */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-600">
                  <Wand2 className="w-4 h-4" />
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Convert Notes to Study Assets
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Select teacher-uploaded material or paste custom revision notes below.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Source Document / Material
              </label>
              <select
                value={selectedMaterialId}
                onChange={(e) => {
                  setSelectedMaterialId(e.target.value);
                  const found = studyMaterials.find((m) => m.id === e.target.value);
                  if (found) {
                    setCustomNoteContent(
                      `${found.title} (${found.subject} - ${found.lessonChapter}):\n${found.description}. Focus on key theorems, experimental apparatus, and test rubrics.`
                    );
                  }
                }}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-pink-500"
              >
                <option value="custom">-- Paste Custom Class Notes Below --</option>
                {studyMaterials.map((mat) => (
                  <option key={mat.id} value={mat.id}>
                    {mat.subject}: {mat.title} ({mat.lessonChapter})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Study Asset Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "takeaways", label: "Takeaway Sheet", icon: <FileText className="w-3.5 h-3.5" /> },
                  { id: "quiz", label: "Practice Quiz", icon: <HelpCircle className="w-3.5 h-3.5" /> },
                  { id: "summary", label: "Chapter Summary", icon: <BookOpen className="w-3.5 h-3.5" /> },
                  { id: "flashcards", label: "Flashcard Deck", icon: <Layers className="w-3.5 h-3.5" /> },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setGeneratorFormat(fmt.id as any)}
                    className={`flex items-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition ${
                      generatorFormat === fmt.id
                        ? "bg-pink-50 dark:bg-pink-950/40 border-pink-500 text-pink-700 dark:text-pink-300 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    {fmt.icon}
                    <span>{fmt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Lecture Notes Content
              </label>
              <textarea
                rows={7}
                value={customNoteContent}
                onChange={(e) => setCustomNoteContent(e.target.value)}
                placeholder="Paste class notes, definitions, or textbook paragraphs here..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white leading-relaxed focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              onClick={handleRunGenerator}
              disabled={isGenerating || !customNoteContent.trim()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 text-white font-extrabold text-xs shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              <span>{isGenerating ? "Generating Study Asset..." : "Generate AI Study Asset"}</span>
            </button>
          </div>

          {/* Right Column: Generated Output Display */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
                    SafeAI Generated Study Document
                  </span>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">
                    {generatedOutput?.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyOutput}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition print:hidden shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Sheet</span>
                  </button>
                </div>
              </div>

              {/* Render format-specific contents */}
              {generatedOutput?.type === "takeaways" && (
                <div className="space-y-3">
                  {generatedOutput.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-extrabold flex items-center justify-center text-[10px]">
                          {idx + 1}
                        </span>
                        <h5 className="font-extrabold text-slate-900 dark:text-white">
                          {item.heading}
                        </h5>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 pl-7 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {generatedOutput?.type === "quiz" && (
                <div className="space-y-3">
                  {generatedOutput.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 font-extrabold text-[10px]">
                          Question {idx + 1}
                        </span>
                        <h5 className="font-extrabold text-slate-900 dark:text-white">
                          {item.q}
                        </h5>
                      </div>
                      <div className="pl-2 mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300">
                        <strong className="text-emerald-600 dark:text-emerald-400">Solution: </strong>
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {generatedOutput?.type === "summary" && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 text-xs leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                  {generatedOutput.rawSummary}
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Grounded in approved school syllabus</span>
              <span className="text-pink-600 font-bold">Ready for exam revision</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Flashcards View */}
      {activeTab === "flashcards" && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
            <div>
              <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                Topic: {currentCard?.topic} • {currentCard?.subject}
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
                {isFlipped ? currentCard?.answer : currentCard?.question}
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

      {/* 3. Chapter Summaries View */}
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

      {/* 4. 7-Day Exam Revision Plan View */}
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
