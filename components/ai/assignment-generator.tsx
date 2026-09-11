"use client";

import React, { useState } from "react";
import { Sparkles, FileText, Printer, Download, CheckCircle, Clock } from "lucide-react";

export function AssignmentGenerator() {
  const [subject, setSubject] = useState("Biology & Life Sciences");
  const [gradeClass, setGradeClass] = useState("Grade 10 - Lily");
  const [chapter, setChapter] = useState("Chapter 5: Cellular Metabolism & Photosynthesis");
  const [difficulty, setDifficulty] = useState("Medium");
  const [assignmentType, setAssignmentType] = useState<"mixed" | "short" | "long" | "essay" | "research">("mixed");
  const [isGenerating, setIsGenerating] = useState(false);

  // Generated Assignment State
  const [assignment, setAssignment] = useState({
    title: "Comprehensive Assignment: Cellular Respiration and Light Reactions",
    subject: "Biology & Life Sciences",
    className: "Grade 10 - Lily",
    difficulty: "Medium",
    dueDate: "2026-09-20",
    totalMarks: 50,
    instructions: [
      "Answer all questions in complete sentences with appropriate biological terminology.",
      "Neat, hand-drawn diagrams are required for questions 2 and 4.",
      "Cite primary textbook page numbers where applicable.",
      "Work must be submitted on or before the due date to the teacher portal.",
    ],
    questions: [
      {
        id: 1,
        type: "Short Question",
        prompt: "Differentiate between light-dependent and light-independent reactions regarding their cellular location and input requirements.",
        marks: 6,
      },
      {
        id: 2,
        type: "Diagram & Explanation",
        prompt: "Draw a fully labeled schematic diagram of the chloroplast thylakoid membrane illustrating Photosystems I and II, ATP synthase, and the electron transport chain.",
        marks: 10,
      },
      {
        id: 3,
        type: "Long Question",
        prompt: "Describe the three principal phases of cellular respiration: Glycolysis, the Krebs Cycle, and Oxidative Phosphorylation. Calculate the total theoretical yield of ATP per glucose molecule.",
        marks: 14,
      },
      {
        id: 4,
        type: "Research Application",
        prompt: "How do rising atmospheric CO2 concentrations and ambient temperature influence the rate of photosynthetic carbon fixation in C3 versus C4 plants?",
        marks: 10,
      },
      {
        id: 5,
        type: "Worksheet Analytical Problem",
        prompt: "An experimental plant leaf is sealed in an airtight chamber in the dark, then illuminated with green light only. Predict the changes in O2 and CO2 levels with scientific reasoning.",
        marks: 10,
      },
    ],
    answerKey: `1. Light reactions occur in thylakoid membranes (require H2O, photon energy). Calvin cycle occurs in stroma (requires CO2, ATP, NADPH).\n2. Diagram must label: Thylakoid lumen, stroma, PS II (P680), Plastoquinone, Cytochrome b6f, PS I (P700), Ferredoxin, NADP+ Reductase, ATP Synthase.\n3. Glycolysis generates 2 net ATP + 2 NADH in cytoplasm. Krebs Cycle produces 2 ATP + 6 NADH + 2 FADH2 in matrix. ETC produces 28-34 ATP. Total net = 36-38 ATP.\n4. C3 plants suffer photorespiration at elevated temps; C4 plants use PEP carboxylase to concentrate CO2 in bundle-sheath cells.\n5. In darkness: Respiration only (O2 decreases, CO2 rises). Under green light: Chlorophyll reflects green wavelengths, minimal photosynthesis occurs, respiration continues.`,
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAssignment({
        title: `Academic Assignment: ${chapter}`,
        subject,
        className: gradeClass,
        difficulty,
        dueDate: "2026-09-22",
        totalMarks: 50,
        instructions: [
          "Demonstrate thorough working and conceptual explanations.",
          "Cite textbook definitions verified by SafeAI curriculum index.",
          "Submit through Student Dashboard or physically to class teacher.",
        ],
        questions: [
          {
            id: 1,
            type: "Short Question",
            prompt: `Define the primary governing principles of ${chapter} and state two real-world examples.`,
            marks: 8,
          },
          {
            id: 2,
            type: "Long Analytical Question",
            prompt: `Break down the step-by-step mathematical or biological derivation required to solve problems related to ${chapter}.`,
            marks: 14,
          },
          {
            id: 3,
            type: "Essay / Case Study",
            prompt: `Critically evaluate experimental methodologies and common student misconceptions concerning ${chapter}.`,
            marks: 16,
          },
          {
            id: 4,
            type: "Research Task",
            prompt: "Prepare a 300-word structured research inquiry on modern technological advances connected with this subject.",
            marks: 12,
          },
        ],
        answerKey: `Evaluation Rubric for ${chapter}:\n• Full marks awarded for precise formulas, correct terminology, and structured reasoning.\n• Deduct 1 mark per missing diagram or incomplete derivation.\n• Answer key verified against school approved syllabus.`,
      });
      setIsGenerating(false);
    }, 900);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Input Configuration Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              AI Assignment & Worksheet Generator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instantly produces formatted student assignments, rubrics, and answer keys.
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
              <option value="Physics">Physics</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Class</label>
            <select
              value={gradeClass}
              onChange={(e) => setGradeClass(e.target.value)}
              className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="Grade 10 - Lily">Grade 10 - Lily</option>
              <option value="Grade 10 - Jasmine">Grade 10 - Jasmine</option>
              <option value="Grade 9 - Rose">Grade 9 - Rose</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Chapter / Topic</label>
            <input
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g. Chapter 3: Quadratic Equations"
              className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Difficulty Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="Easy">Standard / Foundational</option>
              <option value="Medium">Medium / Board Standard</option>
              <option value="Hard">Advanced / Competitive Exam</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Assignment Type:</span>
            <div className="flex gap-1">
              {(["mixed", "short", "long", "essay", "research"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setAssignmentType(t)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition ${
                    assignmentType === t
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-violet-500/20 hover:opacity-95 disabled:opacity-50 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? "Synthesizing Assignment..." : "Generate Assignment"}</span>
          </button>
        </div>
      </div>

      {/* Generated Printable Assignment Document */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
              SafeAI School Curriculum Assessment
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {assignment.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              <span>Subject: <strong>{assignment.subject}</strong></span>
              <span>•</span>
              <span>Class: <strong>{assignment.className}</strong></span>
              <span>•</span>
              <span>Total Marks: <strong>{assignment.totalMarks}</strong></span>
              <span>•</span>
              <span>Due: <strong>{assignment.dueDate}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Printer className="w-4 h-4" /> Print / PDF
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="my-6 p-4 rounded-2xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/40 text-xs">
          <h4 className="font-bold text-violet-900 dark:text-violet-300 mb-2">Instructions for Students:</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            {assignment.instructions.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
          </ul>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {assignment.questions.map((q) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className="text-violet-600 dark:text-violet-400">
                  Question {q.id} ({q.type})
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                  [{q.marks} Marks]
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                {q.prompt}
              </p>
            </div>
          ))}
        </div>

        {/* Answer Key & Teacher Grading Rubric */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 text-xs">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Teacher Answer Key & Scoring Guide:
            </h4>
            <div className="whitespace-pre-wrap font-mono text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
              {assignment.answerKey}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
