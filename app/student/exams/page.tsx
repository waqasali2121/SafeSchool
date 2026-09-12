"use client";

import React, { useState, useEffect } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  Filter,
  Layers,
  Play,
  RotateCcw,
  Sparkles,
  Timer,
  AlertTriangle,
  ChevronRight,
  BarChart3,
  TrendingUp,
} from "lucide-react";

export default function StudentExamsPage() {
  const { pastPapers, revisionChecklist, toggleRevisionChecklist } = useApp();
  const [activeTab, setActiveTab] = useState<"past_papers" | "checklist" | "simulator" | "analytics">("past_papers");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("all");

  // Timed Exam Simulator State
  const [isTestActive, setIsTestActive] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(900); // 15 mins
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);

  const practiceQuestions = [
    {
      id: "q1",
      question: "Which organelle component contains the RuBisCO enzyme for the Calvin Cycle?",
      options: { A: "Thylakoid Lumen", B: "Stroma", C: "Outer Membrane", D: "Mitochondrial Matrix" },
      correct: "B",
      explanation: "RuBisCO resides inside the chloroplast stroma where atmospheric CO2 is fixed into G3P sugars.",
    },
    {
      id: "q2",
      question: "What is the discriminant formula for ax² + bx + c = 0?",
      options: { A: "b² + 4ac", B: "b² - 4ac", C: "√(b² - 4ac)", D: "4ac - b²" },
      correct: "B",
      explanation: "The discriminant is Δ = b² - 4ac, which determines if roots are real distinct, real equal, or complex.",
    },
    {
      id: "q3",
      question: "During photophosphorylation, what electrochemical gradient drives ATP synthesis?",
      options: { A: "Proton (H+) gradient across thylakoid membrane", B: "Sodium (Na+) pump", C: "Glucose concentration gradient", D: "Oxygen pressure" },
      correct: "A",
      explanation: "Protons accumulated in the thylakoid lumen flow back to stroma through ATP synthase.",
    },
    {
      id: "q4",
      question: "An object is dropped from rest under gravity (g = 9.8 m/s²). What is its velocity after 3 seconds?",
      options: { A: "9.8 m/s", B: "19.6 m/s", C: "29.4 m/s", D: "44.1 m/s" },
      correct: "C",
      explanation: "Using v = u + gt with u = 0: v = 0 + (9.8)(3) = 29.4 m/s.",
    },
  ];

  // Timer interval for test simulator
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTestActive && timeLeftSeconds > 0 && !isTestSubmitted) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0 && isTestActive && !isTestSubmitted) {
      setIsTestSubmitted(true);
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeftSeconds, isTestSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const calculateScore = () => {
    let correct = 0;
    practiceQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) correct++;
    });
    return { correct, total: practiceQuestions.length, percentage: Math.round((correct / practiceQuestions.length) * 100) };
  };

  // Filtered past papers
  const filteredPapers = pastPapers.filter((p) => {
    if (selectedSubjectFilter === "all") return true;
    return p.subject.toLowerCase().includes(selectedSubjectFilter.toLowerCase());
  });

  // Checklist completion stats
  const completedChecklistCount = revisionChecklist.filter((c) => c.isCompleted).length;
  const checklistPercentage = Math.round((completedChecklistCount / revisionChecklist.length) * 100);

  return (
    <DashboardShell
      title="Exam Preparation & Revision Hub"
      subtitle="Access official past papers, interactive syllabus checklists, timed mock examinations, and performance diagnostics"
      action={
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold text-xs">
            Mid-Terms: 18 Days Left
          </span>
        </div>
      }
    >
      {/* Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit mb-6">
        <button
          onClick={() => setActiveTab("past_papers")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "past_papers"
              ? "bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Past Examination Papers ({pastPapers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("checklist")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "checklist"
              ? "bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Dynamic Revision Checklist ({checklistPercentage}%)</span>
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "simulator"
              ? "bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Timer className="w-3.5 h-3.5" />
          <span>Timed Exam Simulator</span>
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === "analytics"
              ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Exam Readiness Breakdown</span>
        </button>
      </div>

      {/* Tab 1: Past Examination Papers */}
      {activeTab === "past_papers" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Official Past Examination Papers Archive
              </h3>
              <p className="text-xs text-slate-500">
                Download past board and terminal exam question papers complete with grading rubrics and marking keys.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Subject:</span>
              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
              >
                <option value="all">All Subjects</option>
                <option value="biology">Biology</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="computer">Computer Science</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300">
                      {paper.subject}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-bold">
                      {paper.year} • {paper.term}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                    {paper.title}
                  </h4>

                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {paper.durationMinutes} mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> {paper.totalMarks} Marks
                    </span>
                    <span>{paper.fileSizeKb} KB</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    Answer Key Included
                  </span>

                  <button
                    onClick={() => alert(`Simulated downloading ${paper.title}.pdf with official solution key.`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Dynamic Revision Checklist */}
      {activeTab === "checklist" && (
        <div className="space-y-6">
          {/* Progress Header */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20">
                Syllabus Mastery Tracker
              </span>
              <h3 className="text-xl font-black mt-1">
                {completedChecklistCount} of {revisionChecklist.length} Revision Milestones Completed
              </h3>
              <p className="text-xs text-violet-100 mt-1">
                Tick off concepts as you review lecture summaries and textbook chapters.
              </p>
            </div>

            <div className="text-right">
              <span className="text-3xl font-black">{checklistPercentage}%</span>
              <span className="block text-[11px] text-violet-200">Exam Readiness</span>
            </div>
          </div>

          <div className="space-y-3">
            {revisionChecklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleRevisionChecklist(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  item.isCompleted
                    ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-violet-300"
                }`}
              >
                <div className="mt-0.5">
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      item.isCompleted ? "text-emerald-600" : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                </div>

                <div className="flex-1 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {item.subject}
                      </span>
                      <h4
                        className={`font-bold text-sm ${
                          item.isCompleted ? "line-through text-slate-400" : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {item.topic}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.2 rounded-full self-start sm:self-auto ${
                        item.importance === "high"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                      }`}
                    >
                      {item.importance} Priority
                    </span>
                  </div>

                  <p className="text-slate-500 font-medium text-[11px] mt-0.5">{item.chapter}</p>
                  {item.notesSummary && (
                    <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 italic text-[11px]">
                      Quick Takeaway: &ldquo;{item.notesSummary}&rdquo;
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Timed Exam Simulator */}
      {activeTab === "simulator" && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {!isTestActive && !isTestSubmitted ? (
            <div className="text-center py-10 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto">
                <Timer className="w-8 h-8" />
              </div>
              <h3 className="font-black text-xl text-slate-900 dark:text-white">
                Timed Practice Examination
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Test your conceptual recall under real exam conditions. You have 15 minutes to complete 4 high-yield cross-curriculum questions.
              </p>

              <button
                onClick={() => {
                  setIsTestActive(true);
                  setTimeLeftSeconds(900);
                  setSelectedAnswers({});
                  setIsTestSubmitted(false);
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white font-extrabold text-xs shadow-lg hover:opacity-95 transition flex items-center gap-2 mx-auto"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Timed Practice Exam</span>
              </button>
            </div>
          ) : isTestSubmitted ? (
            <div className="space-y-6">
              {/* Scorecard */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                  Examination Result
                </span>
                <div className="text-4xl font-black mt-1">{calculateScore().percentage}%</div>
                <p className="text-xs text-emerald-100 mt-1">
                  You scored {calculateScore().correct} of {calculateScore().total} questions correct!
                </p>
                <button
                  onClick={() => {
                    setIsTestActive(false);
                    setIsTestSubmitted(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow hover:bg-slate-100 transition inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Try Another Test
                </button>
              </div>

              {/* Review Answers */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Detailed Answer Key & Faculty Explanations:
                </h4>
                {practiceQuestions.map((q, idx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correct;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border text-xs ${
                        isCorrect
                          ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900"
                          : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span>Question {idx + 1} ({isCorrect ? "Correct" : "Incorrect"})</span>
                        <span className="font-mono">Your Pick: {userAnswer || "None"} • Correct: {q.correct}</span>
                      </div>
                      <p className="font-bold text-slate-900 dark:text-white mt-1">{q.question}</p>
                      <p className="mt-2 text-slate-600 dark:text-slate-300 italic">
                        <strong>Explanation: </strong> {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Active Exam Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Mid-Term Examination Simulation
                  </h4>
                  <p className="text-xs text-slate-500">Answer all questions before the clock expires.</p>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-mono font-black text-sm">
                  <Timer className="w-4 h-4 animate-pulse text-amber-600" />
                  <span>{formatTimer(timeLeftSeconds)}</span>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {practiceQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 font-black text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                        {q.question}
                      </h5>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {(["A", "B", "C", "D"] as const).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                          className={`p-3 rounded-xl border text-left font-medium transition ${
                            selectedAnswers[q.id] === opt
                              ? "bg-pink-600 text-white border-pink-600 font-bold shadow-xs"
                              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <span className="font-bold mr-2">{opt}.</span>
                          {q.options[opt]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400">
                  Answered: {Object.keys(selectedAnswers).length} of {practiceQuestions.length}
                </span>

                <button
                  onClick={() => setIsTestSubmitted(true)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-xs shadow hover:opacity-90 transition"
                >
                  Submit Examination
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Performance Analytics */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400">Estimated Exam GPA</span>
            <div className="text-3xl font-black text-pink-600 mt-1">3.95 / 4.0</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Predicted: Grade A+</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400">Syllabus Coverage</span>
            <div className="text-3xl font-black text-violet-600 mt-1">{checklistPercentage}%</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">On track for terminal finals</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase text-slate-400">Mock Exam Accuracy</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">92.4%</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Avg pace: 42s per question</p>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
