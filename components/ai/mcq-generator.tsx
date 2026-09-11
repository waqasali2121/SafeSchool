"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { INITIAL_MCQS } from "@/lib/mock-data";
import { MCQQuestion } from "@/lib/types";
import {
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  BookOpen,
  Filter,
} from "lucide-react";

export function McqGenerator() {
  const [subject, setSubject] = useState("Biology & Life Sciences");
  const [chapter, setChapter] = useState("Chapter 5: Photosynthesis");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");

  const [questions, setQuestions] = useState<MCQQuestion[]>(INITIAL_MCQS);
  const [userAnswers, setUserAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setIsSubmitted(false);
    setUserAnswers({});

    setTimeout(() => {
      // Generate questions customized to subject and difficulty
      let generated: MCQQuestion[] = [...INITIAL_MCQS];
      if (subject.includes("Math")) {
        generated = [
          {
            id: "mcq-m1",
            question: "What is the discriminant formula for a general quadratic equation ax² + bx + c = 0?",
            options: { A: "b² + 4ac", B: "b² - 4ac", C: "√(b - 4ac)", D: "4ac - b²" },
            correctAnswer: "B",
            explanation: "The discriminant is defined as Δ = b² - 4ac, which determines real or complex roots.",
            difficulty: "Easy",
          },
          {
            id: "mcq-m2",
            question: "If the discriminant Δ = 0, how many distinct real roots exist?",
            options: { A: "No real roots", B: "Two distinct real roots", C: "Exactly one repeated real root", D: "Infinite roots" },
            correctAnswer: "C",
            explanation: "When Δ = 0, both roots coalesce at x = -b / (2a).",
            difficulty: "Medium",
          },
          {
            id: "mcq-m3",
            question: "Find the roots of x² - 5x + 6 = 0.",
            options: { A: "x = 2 and x = 3", B: "x = -2 and x = -3", C: "x = 1 and x = 6", D: "x = -1 and x = 6" },
            correctAnswer: "A",
            explanation: "Factoring (x - 2)(x - 3) = 0 gives roots x = 2 and x = 3.",
            difficulty: "Easy",
          },
          {
            id: "mcq-m4",
            question: "What is the vertex form of a parabola?",
            options: { A: "y = ax + b", B: "y = a(x - h)² + k", C: "y = ax² + bx + c", D: "y = k(x + a)" },
            correctAnswer: "B",
            explanation: "The vertex form is y = a(x - h)² + k with vertex located at (h, k).",
            difficulty: "Medium",
          },
          {
            id: "mcq-m5",
            question: "What geometric curve represents a quadratic function?",
            options: { A: "Hyperbola", B: "Ellipse", C: "Parabola", D: "Spiral" },
            correctAnswer: "C",
            explanation: "All quadratic equations produce parabolic curves.",
            difficulty: "Easy",
          },
        ];
      } else {
        // Biology set
        generated = INITIAL_MCQS;
      }

      setQuestions(generated.slice(0, questionCount));
      setIsGenerating(false);
    }, 800);
  };

  const handleSelectOption = (qId: string, option: "A" | "B" | "C" | "D") => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const correctCount = questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
    if (correctCount >= Math.ceil(questions.length * 0.7)) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const score = questions.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
  const percentage = Math.round((score / questions.length) * 100) || 0;

  return (
    <div className="space-y-6">
      {/* Generator Controls */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center shadow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              AI Powered MCQ & Quiz Generator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Auto-generates verified multiple-choice questions from uploaded school curriculum.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="Biology & Life Sciences">Biology & Life Sciences</option>
              <option value="Mathematics & Algebra">Mathematics & Algebra</option>
              <option value="Computer Science & AI">Computer Science & AI</option>
              <option value="School Safety & Policies">School Safety & Policies</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Chapter / Topic</label>
            <input
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g. Chapter 5: Photosynthesis"
              className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Number of Questions</label>
            <div className="grid grid-cols-4 gap-1 mt-1.5">
              {[5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`py-2 text-xs font-bold rounded-xl transition ${
                    questionCount === num
                      ? "bg-pink-600 text-white shadow"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Difficulty</label>
            <div className="grid grid-cols-3 gap-1 mt-1.5">
              {(["Easy", "Medium", "Hard"] as const).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`py-2 text-xs font-bold rounded-xl transition ${
                    difficulty === diff
                      ? "bg-violet-600 text-white shadow"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 hover:opacity-95 disabled:opacity-50 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? "Generating Questions..." : "Generate AI Questions"}</span>
          </button>
        </div>
      </div>

      {/* Quiz Runner */}
      <div className="space-y-4">
        {questions.map((q, qIndex) => {
          const selected = userAnswers[q.id];
          const isAnswered = Boolean(selected);
          const isCorrect = selected === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 flex items-center justify-center text-xs font-bold">
                    Q{qIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Difficulty: {q.difficulty}
                  </span>
                </div>

                {isSubmitted && (
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      isCorrect
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1)
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </>
                    )}
                  </span>
                )}
              </div>

              <h4 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white mb-4 leading-relaxed">
                {q.question}
              </h4>

              {/* Options A, B, C, D */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(["A", "B", "C", "D"] as const).map((optKey) => {
                  const optText = q.options[optKey];
                  const isChoice = selected === optKey;
                  const isRightOption = q.correctAnswer === optKey;

                  let optClass =
                    "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300";

                  if (isSubmitted) {
                    if (isRightOption) {
                      optClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                    } else if (isChoice && !isRightOption) {
                      optClass = "border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200";
                    }
                  } else if (isChoice) {
                    optClass = "border-pink-500 bg-pink-50/80 dark:bg-pink-950/40 text-pink-900 dark:text-pink-100 font-bold shadow-sm";
                  }

                  return (
                    <button
                      key={optKey}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optKey)}
                      className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optClass}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {optKey}
                      </span>
                      <span className="leading-snug pt-0.5">{optText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Dropdown / Section */}
              {isSubmitted && (
                <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 mb-1">
                    <BookOpen className="w-3.5 h-3.5 text-pink-500" />
                    <span>Explanation & Textbook Reference:</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {q.explanation}
                  </p>
                  <p className="text-[11px] text-pink-600 dark:text-pink-400 font-semibold mt-1">
                    Correct Answer: <strong>{q.correctAnswer}</strong>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Submission Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {isSubmitted ? (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Score: {score} / {questions.length} ({percentage}%)
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {percentage >= 70 ? "Excellent mastery of curriculum topics!" : "Review the textbook explanation notes above."}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Answered: {Object.keys(userAnswers).length} of {questions.length} questions
          </div>
        )}

        <div className="flex items-center gap-3">
          {isSubmitted ? (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setUserAnswers({});
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
          ) : (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(userAnswers).length === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 hover:opacity-95 disabled:opacity-50 transition"
            >
              <span>Submit & Check Answers</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
