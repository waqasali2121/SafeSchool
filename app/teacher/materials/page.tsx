"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { StudyMaterial, StudyMaterialType } from "@/lib/types";
import {
  BookOpen,
  Plus,
  FileText,
  Video,
  Presentation,
  CheckSquare,
  Sparkles,
  Download,
  ExternalLink,
  Search,
  Filter,
  Layers,
  X,
  CheckCircle2,
  Play,
  FileCheck,
} from "lucide-react";

export default function TeacherStudyMaterialsPage() {
  const { studyMaterials, addStudyMaterial, subjects, classes } = useApp();

  const [subjectFilter, setSubjectFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<StudyMaterial | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Biology & Life Sciences");
  const [className, setClassName] = useState("Grade 10 - Lily");
  const [lessonChapter, setLessonChapter] = useState("Chapter 5: Bioenergetics");
  const [type, setType] = useState<StudyMaterialType>("pdf");
  const [fileUrl, setFileUrl] = useState("/materials/biology_notes.pdf");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [ragIndexed, setRagIndexed] = useState(true);

  const [uploadSuccess, setUploadSuccess] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !lessonChapter) return;

    addStudyMaterial({
      title,
      subject,
      className,
      lessonChapter,
      type,
      fileUrl: type !== "video_tutorial" ? fileUrl : undefined,
      videoUrl: type === "video_tutorial" ? (videoUrl || "https://www.youtube.com/watch?v=rdF50trSpeY") : undefined,
      description,
      uploadedBy: "Dr. Amina Qureshi",
      fileSizeKb: type !== "video_tutorial" ? Math.floor(800 + Math.random() * 2000) : undefined,
      ragIndexed: type === "pdf" && ragIndexed,
    });

    setShowUploadModal(false);
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setUploadSuccess(`Uploaded study material: ${title}`);
    setTimeout(() => setUploadSuccess(""), 4000);
  };

  const filteredMaterials = studyMaterials.filter((mat) => {
    const matchesSubject = subjectFilter === "All" || mat.subject.toLowerCase() === subjectFilter.toLowerCase();
    const matchesType = typeFilter === "All" || mat.type === typeFilter;
    const matchesSearch =
      mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.lessonChapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSubject && matchesType && matchesSearch;
  });

  const getTypeBadge = (matType: StudyMaterialType) => {
    switch (matType) {
      case "pdf":
        return {
          label: "PDF Notes",
          icon: <FileText className="w-3.5 h-3.5" />,
          color: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900",
        };
      case "slide_deck":
        return {
          label: "Slide Deck",
          icon: <Presentation className="w-3.5 h-3.5" />,
          color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
        };
      case "video_tutorial":
        return {
          label: "Video Tutorial",
          icon: <Video className="w-3.5 h-3.5" />,
          color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900",
        };
      case "syllabus":
        return {
          label: "Syllabus",
          icon: <FileCheck className="w-3.5 h-3.5" />,
          color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900",
        };
      case "homework":
      default:
        return {
          label: "Homework Worksheet",
          icon: <CheckSquare className="w-3.5 h-3.5" />,
          color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900",
        };
    }
  };

  const pdfCount = studyMaterials.filter((m) => m.type === "pdf").length;
  const slideCount = studyMaterials.filter((m) => m.type === "slide_deck").length;
  const videoCount = studyMaterials.filter((m) => m.type === "video_tutorial").length;
  const syllabusCount = studyMaterials.filter((m) => m.type === "syllabus").length;

  return (
    <DashboardShell
      title="Study Material & Class Notes Repository"
      subtitle="Upload and manage curriculum PDFs, lecture slide decks, syllabus outlines, worksheets, and video tutorials categorized by subject and lesson."
      action={
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white text-xs font-bold shadow hover:opacity-95 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Upload Study Resource
        </button>
      }
    >
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">PDF Handouts</div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{pdfCount} Documents</div>
          <div className="text-[11px] text-slate-400 mt-0.5">RAG Vector Grounded</div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Lecture Slide Decks</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{slideCount} Presentations</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Key chapter summaries</div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Video Tutorials</div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1">{videoCount} Tutorials</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Visual concept explainers</div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Syllabi & Rubrics</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{syllabusCount} Syllabi</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Term grading guides</div>
        </div>
      </div>

      {uploadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, lesson, or chapter..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Subject:</span>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="All">All Subjects</option>
              <option value="Biology & Life Sciences">Biology</option>
              <option value="Mathematics & Algebra">Mathematics</option>
              <option value="Computer Science & AI">Computer Science</option>
              <option value="Physics">Physics</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-500">Resource Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="All">All Types</option>
              <option value="pdf">PDF Handouts</option>
              <option value="slide_deck">Slide Decks</option>
              <option value="video_tutorial">Video Tutorials</option>
              <option value="syllabus">Syllabi</option>
              <option value="homework">Worksheets</option>
            </select>
          </div>
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((mat) => {
          const badge = getTypeBadge(mat.type);
          return (
            <div
              key={mat.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:shadow-md transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border flex items-center gap-1 ${badge.color}`}
                  >
                    {badge.icon} {badge.label}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">{mat.uploadedAt}</span>
                </div>

                <div>
                  <span className="text-[11px] font-extrabold text-pink-600 dark:text-pink-400 uppercase tracking-wider block">
                    {mat.lessonChapter}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5 leading-snug">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {mat.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{mat.subject}</span>
                  <span>•</span>
                  <span>{mat.className}</span>
                  {mat.fileSizeKb ? (
                    <>
                      <span>•</span>
                      <span className="font-mono">{mat.fileSizeKb} KB</span>
                    </>
                  ) : null}
                </div>

                {mat.ragIndexed && (
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                    <span>Active in Student AI Study Companion</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">By {mat.uploadedBy}</span>

                {mat.type === "video_tutorial" ? (
                  <button
                    onClick={() => setActiveVideoModal(mat)}
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-extrabold hover:underline cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" /> Watch Tutorial
                  </button>
                ) : (
                  <a
                    href={mat.fileUrl || "#"}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading resource: ${mat.title}`);
                    }}
                    className="flex items-center gap-1 text-pink-600 dark:text-pink-400 font-extrabold hover:underline cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Open / Download
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Upload New Study Material */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-pink-500" />
                Upload Curriculum Study Resource
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Resource Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Chapter 7: Nucleic Acids & DNA Structure Handout"
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Class Section</label>
                  <select
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Lesson / Chapter</label>
                  <input
                    type="text"
                    required
                    value={lessonChapter}
                    onChange={(e) => setLessonChapter(e.target.value)}
                    placeholder="e.g. Chapter 5: Bioenergetics"
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Resource Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as StudyMaterialType)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="pdf">PDF Class Handout</option>
                    <option value="slide_deck">Slide Deck Presentation</option>
                    <option value="video_tutorial">Video Tutorial</option>
                    <option value="homework">Homework Worksheet</option>
                    <option value="syllabus">Term Syllabus / Rubric</option>
                  </select>
                </div>
              </div>

              {type === "video_tutorial" ? (
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Video Link / YouTube URL</label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              ) : (
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">File Attachment (PDF / PPTX / DOCX)</label>
                  <input
                    type="text"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="/materials/lesson_document.pdf"
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-mono text-[11px]"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Resource Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key concepts covered, learning goals, or exam tips for students..."
                  className="w-full mt-1 p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800"
                />
              </div>

              {type === "pdf" && (
                <label className="flex items-center gap-2 p-3 rounded-2xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ragIndexed}
                    onChange={(e) => setRagIndexed(e.target.checked)}
                    className="rounded text-pink-600 focus:ring-pink-500"
                  />
                  <div className="text-[11px]">
                    <span className="font-bold text-pink-900 dark:text-pink-300">
                      Auto-Vectorize into Student AI Learning Companion
                    </span>
                    <p className="text-slate-500">Enables students to ask instant questions from this textbook chapter.</p>
                  </div>
                </label>
              )}

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 text-white font-extrabold shadow hover:opacity-95 transition cursor-pointer"
                >
                  Upload & Distribute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Video Player Preview */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-purple-600">{activeVideoModal.lessonChapter}</span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {activeVideoModal.title}
                </h3>
              </div>
              <button onClick={() => setActiveVideoModal(null)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden flex items-center justify-center relative shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/rdF50trSpeY"
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              {activeVideoModal.description}
            </p>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
