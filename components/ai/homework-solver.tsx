"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Lightbulb, BookOpen, ArrowRight, FileText, Upload } from "lucide-react";

export function HomeworkSolver() {
  const [problemText, setProblemText] = useState(
    "A ball is thrown vertically upwards with an initial velocity of 20 m/s. Calculate the maximum height reached and the total time of flight before it hits the ground. (Take g = 9.8 m/s²)"
  );
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState<{
    problem: string;
    steps: { stepNumber: number; title: string; detail: string; math?: string }[];
    finalAnswer: string;
    explanation: string;
    learningTips: string[];
  } | null>({
    problem:
      "A ball is thrown vertically upwards with an initial velocity of 20 m/s. Calculate the maximum height reached and the total time of flight before it hits the ground. (Take g = 9.8 m/s²)",
    steps: [
      {
        stepNumber: 1,
        title: "Identify Knowns and Unknowns",
        detail: "Initial velocity u = 20 m/s, final velocity at maximum height v = 0 m/s, acceleration a = -g = -9.8 m/s². We need to find maximum height (s) and total flight time (T).",
      },
      {
        stepNumber: 2,
        title: "Apply 3rd Kinematic Equation for Height",
        detail: "Using v² = u² + 2as. Since v = 0 at top apex:\n0 = (20)² + 2(-9.8)s => 19.6s = 400",
        math: "s = 400 / 19.6 = 20.41 meters",
      },
      {
        stepNumber: 3,
        title: "Calculate Time of Ascent",
        detail: "Using 1st Kinematic Equation: v = u + at => 0 = 20 - 9.8t => t_ascent = 20 / 9.8 = 2.04 seconds.",
      },
      {
        stepNumber: 4,
        title: "Determine Total Time of Flight",
        detail: "Under symmetrical free-fall gravity (ignoring air drag), time of ascent equals time of descent.",
        math: "T_total = 2 * t_ascent = 2 * 2.04 = 4.08 seconds",
      },
    ],
    finalAnswer: "Maximum Height = 20.41 m | Total Time of Flight = 4.08 s",
    explanation:
      "Because gravitational acceleration opposes upward motion on the rise and aids motion during the drop, vertical trajectory is completely symmetrical when aerodynamic drag is neglected.",
    learningTips: [
      "Always set standard sign conventions before calculating (Upwards = positive, Downwards = negative).",
      "Velocity at the highest point of any vertical throw is always instantaneously zero.",
      "Check units: meters (m) and seconds (s) must remain consistent throughout.",
    ],
  });

  const handleSolve = () => {
    if (!problemText.trim()) return;
    setIsSolving(true);
    setTimeout(() => {
      setSolution({
        problem: problemText,
        steps: [
          {
            stepNumber: 1,
            title: "Deconstruct the Problem Statement",
            detail: "Identify the underlying core concepts, boundary constraints, and target variables.",
          },
          {
            stepNumber: 2,
            title: "Select Relevant Syllabus Formulas & Axioms",
            detail: "Consult verified equations and theorems from your school curriculum.",
            math: "Standard Formula: Result = f(Variables)",
          },
          {
            stepNumber: 3,
            title: "Perform Step-by-Step Analytical Execution",
            detail: "Substitute numerical values with appropriate dimensional units and simplify algebraically.",
          },
          {
            stepNumber: 4,
            title: "Verification and Sanity Check",
            detail: "Verify that the dimensions and magnitude are physically meaningful and adhere to standard laws.",
          },
        ],
        finalAnswer: "Verified Analytical Solution Completed",
        explanation:
          "This solution adheres strictly to standard secondary school pedagogy, avoiding unproven shortcuts so that full marks are granted in formal examinations.",
        learningTips: [
          "State given parameters clearly at the beginning of your exam answer.",
          "Write down the governing formula before substituting numbers.",
          "Box your final answer with correct SI units.",
        ],
      });
      setIsSolving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Question Input Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              AI Homework & Problem Solver
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Type or paste any homework question, worksheet problem, or numerical for step-by-step guidance.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <textarea
            rows={4}
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder="Type or paste your homework question here (e.g. math word problem, biology essay, physics numerical)..."
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-pink-500 outline-none leading-relaxed"
          />

          <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Samples:</span>
              <button
                type="button"
                onClick={() =>
                  setProblemText(
                    "Solve 2x² - 8x + 6 = 0 using the quadratic formula and explain the discriminant."
                  )
                }
                className="hover:underline text-pink-600 dark:text-pink-400"
              >
                Quadratic equation
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() =>
                  setProblemText(
                    "Explain how chlorophyll molecules capture photon energy and pass electrons to the electron transport chain."
                  )
                }
                className="hover:underline text-violet-600 dark:text-violet-400"
              >
                Photosynthesis
              </button>
            </div>

            <button
              onClick={handleSolve}
              disabled={isSolving || !problemText.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 hover:opacity-95 disabled:opacity-50 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSolving ? "Analyzing & Solving..." : "Generate Step-by-Step Solution"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Solution Display */}
      {solution && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
              AI Step-by-Step Breakdown
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mt-1">
              {solution.problem}
            </h3>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {solution.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                  <span className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 flex items-center justify-center text-xs">
                    {step.stepNumber}
                  </span>
                  <span>{step.title}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {step.detail}
                </p>
                {step.math && (
                  <div className="mt-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 font-mono text-xs font-bold text-pink-600 dark:text-pink-400">
                    {step.math}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final Answer Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Final Result
              </span>
              <p className="font-extrabold text-sm sm:text-base text-emerald-900 dark:text-emerald-200">
                {solution.finalAnswer}
              </p>
            </div>
          </div>

          {/* Explanation & Learning Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-violet-50/40 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/40 text-xs">
              <h4 className="font-bold text-violet-900 dark:text-violet-300 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-violet-500" />
                Conceptual Explanation
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {solution.explanation}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 text-xs">
              <h4 className="font-bold text-amber-900 dark:text-amber-300 mb-1.5 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Exam Tips & Common Pitfalls
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                {solution.learningTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
