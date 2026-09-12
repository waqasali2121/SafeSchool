"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import {
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  Plus,
  CheckCircle2,
  Search,
  Filter,
  X,
  UserCheck,
  Building,
  School,
  Check,
  Sparkles,
} from "lucide-react";

export default function AdminTeachersPage() {
  const { teachers, subjects, classes, addTeacher } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  // Form inputs
  const [fullName, setFullName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("Science & Mathematics");
  const [qualification, setQualification] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<string[]>(["Grade 10 - Lily"]);

  const departments = [
    "All",
    "Science & Biology",
    "Science & Mathematics",
    "Mathematics & Statistics",
    "Humanities & English",
    "Computer Science & Robotics",
    "Islamic Studies & Arabic",
    "Physical Education & Health",
  ];

  const triggerSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(""), 4000);
  };

  const handleOpenModal = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setEmployeeId(`TEA-${randomSuffix}`);
    setFullName("");
    setDepartment("Science & Mathematics");
    setQualification("M.Sc. Education / B.Ed");
    setEmail("");
    setPhone("");
    setSelectedClasses(["Grade 10 - Lily"]);
    setIsAddModalOpen(true);
  };

  const toggleClassSelection = (clsName: string) => {
    if (selectedClasses.includes(clsName)) {
      if (selectedClasses.length > 1) {
        setSelectedClasses(selectedClasses.filter((c) => c !== clsName));
      }
    } else {
      setSelectedClasses([...selectedClasses, clsName]);
    }
  };

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !department.trim()) return;

    const generatedEmail =
      email.trim() ||
      `${fullName.toLowerCase().replace(/[^a-z0-9]/g, ".")}@faculty.safeaischool.edu`;
    const finalPhone = phone.trim() || "+1 (555) 012-3456";

    addTeacher({
      fullName: fullName.trim(),
      employeeId: employeeId.trim() || `TEA-${Math.floor(100 + Math.random() * 900)}`,
      department: department.trim(),
      qualification: qualification.trim() || "B.Sc. / B.Ed Certified Educator",
      assignedClasses: selectedClasses.length > 0 ? selectedClasses : ["Grade 10 - Lily"],
      email: generatedEmail,
      phone: finalPhone,
    });

    setIsAddModalOpen(false);
    triggerSuccess(`Successfully onboarded ${fullName.trim()} into Faculty Directory & provisioned credentials.`);
  };

  // Filtered teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.assignedClasses.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept =
      selectedDepartment === "All" ||
      teacher.department.toLowerCase().includes(selectedDepartment.toLowerCase()) ||
      selectedDepartment.toLowerCase().includes(teacher.department.toLowerCase());

    return matchesSearch && matchesDept;
  });

  return (
    <DashboardShell
      title="Faculty Directory & Teaching Staff"
      subtitle="Teacher credentials, qualifications, subject allocations, and departmental oversight."
      action={
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-90 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Faculty Member
        </button>
      }
    >
      {/* Action Notification Banner */}
      {actionSuccessMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg("")} className="p-1 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by faculty name, ID, subject, class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <div className="flex items-center gap-1.5">
            {departments.slice(0, 5).map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedDepartment === dept
                    ? "bg-pink-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
                    {teacher.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                      {teacher.fullName}
                    </h4>
                    <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold">
                      {teacher.department} • <span className="font-mono">{teacher.employeeId}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Teacher Details */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    <strong className="text-slate-700 dark:text-slate-300">Qualification:</strong>{" "}
                    {teacher.qualification}
                  </span>
                </div>

                {teacher.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-mono text-[11px] truncate">{teacher.email}</span>
                  </div>
                )}

                {teacher.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{teacher.phone}</span>
                  </div>
                )}

                <div className="pt-1">
                  <strong className="block mb-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                    Assigned Classes:
                  </strong>
                  <div className="flex flex-wrap gap-1.5">
                    {teacher.assignedClasses.map((cls, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-semibold border border-blue-200/50 dark:border-blue-800/50"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active in Faculty
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                ID: {teacher.id}
              </span>
            </div>
          </div>
        ))}

        {filteredTeachers.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
            <School className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">No faculty members found</p>
            <p className="text-xs text-slate-500 mt-1">Try refining your search query or department filter.</p>
          </div>
        )}
      </div>

      {/* Curriculum Subject Assignments Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm mt-8">
        <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-pink-500" />
          Active Curriculum Subjects & Lead Educators
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {subjects.map((sub) => (
            <div key={sub.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white">{sub.name}</h5>
                <span className="text-[11px] font-mono text-slate-400">{sub.code}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.teacherName}</span>
                <p className="text-[11px] text-pink-600 font-medium">
                  {sub.periodsPerWeek ? `${sub.periodsPerWeek} Periods / Week` : "Curriculum Core"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Add New Faculty Member */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Add New Faculty Member
                  </h3>
                  <p className="text-xs text-slate-500">
                    Onboard teaching staff, set qualifications & assign classes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFaculty} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Full Name <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Salman Riaz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="Science & Biology">Science & Biology</option>
                    <option value="Science & Mathematics">Science & Mathematics</option>
                    <option value="Mathematics & Statistics">Mathematics & Statistics</option>
                    <option value="Humanities & English">Humanities & English</option>
                    <option value="Computer Science & Robotics">Computer Science & Robotics</option>
                    <option value="Islamic Studies & Arabic">Islamic Studies & Arabic</option>
                    <option value="Physical Education & Health">Physical Education & Health</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Academic Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. M.Sc. Applied Mathematics / B.Ed"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="salman.riaz@faculty.safeaischool.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Auto-generated if left blank</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Phone Contact
                  </label>
                  <input
                    type="text"
                    placeholder="+1 (555) 987-6543"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Assigned Class Sections (Select at least one)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {classes.map((cls) => {
                      const isSelected = selectedClasses.includes(cls.name);
                      return (
                        <button
                          key={cls.id}
                          type="button"
                          onClick={() => toggleClassSelection(cls.name)}
                          className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition cursor-pointer ${
                            isSelected
                              ? "bg-pink-50 dark:bg-pink-950/40 border-pink-500 text-pink-700 dark:text-pink-300 font-bold"
                              : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <span>{cls.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-pink-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Automatic Provisions info */}
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 flex items-start gap-2 text-[11px] text-blue-800 dark:text-blue-300">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Adding this faculty member will automatically provision their user account with the{" "}
                  <strong>Teacher</strong> role, generate portal credentials, and log the action in Audit Logs.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  Confirm & Add Faculty Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
