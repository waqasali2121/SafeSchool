"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { useApp } from "@/lib/store/app-context";
import { UserRole, AccountStatus, UserAccount, RBACRolePermissions } from "@/lib/types";
import {
  Users,
  UserPlus,
  ShieldCheck,
  GraduationCap,
  Heart,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  KeyRound,
  Edit,
  Trash2,
  Filter,
  Check,
  X,
  Sliders,
  Sparkles,
  QrCode,
  Smartphone,
  Mail,
  Phone,
} from "lucide-react";

export default function AdminUsersPage() {
  const {
    userAccounts,
    addUserAccount,
    updateUserAccount,
    setUserAccountStatus,
    rbacPermissions,
    toggleRbacPermission,
    classes,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"directory" | "rbac">("directory");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Provisioning Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState<UserAccount | null>(null);

  // New User Form State
  const [newRole, setNewRole] = useState<UserRole>("teacher");
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newStatus, setNewStatus] = useState<AccountStatus>("active");
  // Role specific fields
  const [newEmployeeId, setNewEmployeeId] = useState("");
  const [newDepartment, setNewDepartment] = useState("Science & Mathematics");
  const [newQualification, setNewQualification] = useState("M.Sc. Education");
  const [newAssignedClass, setNewAssignedClass] = useState("Grade 10 - Lily");
  const [newRollNumber, setNewRollNumber] = useState("");
  const [newStudentClass, setNewStudentClass] = useState("Grade 10 - Lily");
  const [newParentName, setNewParentName] = useState("");
  const [newRelationship, setNewRelationship] = useState<"Mother" | "Father" | "Guardian">("Mother");

  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  const triggerSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(""), 3500);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newEmail) return;

    addUserAccount({
      fullName: newFullName,
      email: newEmail,
      phone: newPhone || "+1 (555) 000-1122",
      role: newRole,
      status: newStatus,
      employeeId: newRole === "teacher" ? (newEmployeeId || `TEA-${Math.floor(100 + Math.random() * 900)}`) : undefined,
      department: newRole === "teacher" ? newDepartment : undefined,
      qualification: newRole === "teacher" ? newQualification : undefined,
      assignedClasses: newRole === "teacher" ? [newAssignedClass] : undefined,
      rollNumber: newRole === "student" ? (newRollNumber || `SAF-2026-${Math.floor(100 + Math.random() * 900)}`) : undefined,
      className: newRole === "student" ? newStudentClass : undefined,
      parentName: newRole === "student" ? newParentName : undefined,
      relationship: newRole === "parent" ? newRelationship : undefined,
    });

    setShowAddModal(false);
    // Reset fields
    setNewFullName("");
    setNewEmail("");
    setNewPhone("");
    triggerSuccess(`Successfully provisioned account for ${newFullName} (${newRole.toUpperCase()})`);
  };

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;

    updateUserAccount(editUser.id, {
      fullName: editUser.fullName,
      email: editUser.email,
      phone: editUser.phone,
      department: editUser.department,
      qualification: editUser.qualification,
      className: editUser.className,
    });

    setEditUser(null);
    triggerSuccess(`Updated credentials and assignments for ${editUser.fullName}`);
  };

  const filteredUsers = userAccounts.filter((user) => {
    const matchesRole = roleFilter === "All" || user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === "All" || user.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesQuery =
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.employeeId && user.employeeId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.rollNumber && user.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesRole && matchesStatus && matchesQuery;
  });

  const activeCount = userAccounts.filter((u) => u.status === "active").length;
  const suspendedCount = userAccounts.filter((u) => u.status === "suspended").length;
  const revokedCount = userAccounts.filter((u) => u.status === "revoked").length;

  return (
    <DashboardShell
      title="User Account Provisioning & RBAC Management"
      subtitle="Provision, edit, assign, and revoke accounts for Teachers, Students, and Parents with granular Role-Based Access Control."
      action={
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow hover:opacity-95 transition cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-pink-500" /> Provision New User
        </button>
      }
    >
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Accounts</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{userAccounts.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Verified across 4 personas</div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Active Status</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{activeCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Full portal authorization</div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Suspended</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{suspendedCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Temporarily restricted</div>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Revoked</div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{revokedCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Credentials deactivated</div>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Main Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("directory")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            activeTab === "directory"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" /> User Directory & Lifecycle
        </button>

        <button
          onClick={() => setActiveTab("rbac")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            activeTab === "rbac"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sliders className="w-4 h-4 text-pink-500" /> Role-Based Access Control (RBAC) Matrix
        </button>
      </div>

      {/* Tab 1: User Directory */}
      {activeTab === "directory" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, employee or roll ID..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-semibold text-slate-500">Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="All">All Roles</option>
                  <option value="teacher">Teachers</option>
                  <option value="student">Students</option>
                  <option value="parent">Parents</option>
                  <option value="admin">Administrators</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-semibold text-slate-500">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="revoked">Revoked</option>
                </select>
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">User Details</th>
                    <th className="py-3 px-4">Role & Persona</th>
                    <th className="py-3 px-4">Assignments / ID</th>
                    <th className="py-3 px-4">Account Status</th>
                    <th className="py-3 px-4">Last Activity</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-violet-600 text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                            {user.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 dark:text-white">{user.fullName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                            user.role === "admin"
                              ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900"
                              : user.role === "teacher"
                              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900"
                              : user.role === "parent"
                              ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                        {user.role === "teacher" && (
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{user.department}</span>
                            <div className="text-[11px] text-slate-400">{user.employeeId}</div>
                          </div>
                        )}
                        {user.role === "student" && (
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{user.className}</span>
                            <div className="text-[11px] text-slate-400">{user.rollNumber}</div>
                          </div>
                        )}
                        {user.role === "parent" && (
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {user.relationship}: {user.studentNames?.join(", ") || "Sara Ahmed"}
                            </span>
                            <div className="text-[11px] text-slate-400">{user.phone}</div>
                          </div>
                        )}
                        {user.role === "admin" && (
                          <div className="text-slate-500 font-semibold">{user.department || "Executive"}</div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 w-max ${
                            user.status === "active"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : user.status === "suspended"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                          }`}
                        >
                          {user.status === "active" && <CheckCircle2 className="w-3 h-3" />}
                          {user.status === "suspended" && <AlertTriangle className="w-3 h-3" />}
                          {user.status === "revoked" && <XCircle className="w-3 h-3" />}
                          {user.status.toUpperCase()}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">{user.lastLogin || "Today"}</td>

                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        <button
                          onClick={() => setEditUser(user)}
                          title="Edit User Details"
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {user.status === "active" ? (
                          <button
                            onClick={() => setUserAccountStatus(user.id, "revoked")}
                            title="Revoke Account Credentials"
                            className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition cursor-pointer"
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setUserAccountStatus(user.id, "active")}
                            title="Reactivate Account"
                            className="p-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition cursor-pointer"
                          >
                            <Unlock className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: RBAC Matrix */}
      {activeTab === "rbac" && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-pink-500" />
                  Role-Based Access Control (RBAC) Permission Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Granular functional permission assignment across system modules. Click any toggle to update security policies.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">System Capability & Resource</th>
                    <th className="py-3 px-4 text-center">Administrator</th>
                    <th className="py-3 px-4 text-center">Faculty / Teacher</th>
                    <th className="py-3 px-4 text-center">Parent / Guardian</th>
                    <th className="py-3 px-4 text-center">Student</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { key: "canMarkAttendance" as const, label: "Mark Smart Attendance (Roll Call)", desc: "Classroom attendance marking" },
                    { key: "canScanQrRfid" as const, label: "Scan Turnstile QR Badges & RFID Cards", desc: "Turnstile gate verification" },
                    { key: "canIssueEmergencyAlerts" as const, label: "Issue Campus Emergency SOS Broadcasts", desc: "Critical school-wide alarms" },
                    { key: "canIssueMedicalAlerts" as const, label: "Issue Medical Flags & Clinic Updates", desc: "Health & clinic dispatch" },
                    { key: "canManageUsers" as const, label: "Provision & Revoke User Accounts", desc: "Credential & RBAC control" },
                    { key: "canManageStructure" as const, label: "Configure School Structure & Timetables", desc: "Academic calendars & periods" },
                    { key: "canUploadCurriculum" as const, label: "Ingest Textbooks into RAG AI Knowledge Base", desc: "Curriculum document indexing" },
                    { key: "canViewAuditLogs" as const, label: "Inspect Security & System Audit Logs", desc: "Immutable security history" },
                    { key: "canAssignHomework" as const, label: "Assign & Collect Student Homework", desc: "Coursework manager" },
                    { key: "canRecordMarks" as const, label: "Record Exam Marks & Gradebook Remarks", desc: "Academic assessment" },
                  ].map((perm) => (
                    <tr key={perm.key} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4">
                        <div className="font-extrabold text-slate-900 dark:text-white">{perm.label}</div>
                        <div className="text-[11px] text-slate-400">{perm.desc}</div>
                      </td>

                      {(["admin", "teacher", "parent", "student"] as UserRole[]).map((r) => {
                        const isGranted = rbacPermissions[r]?.[perm.key] ?? false;
                        return (
                          <td key={r} className="py-3 px-4 text-center">
                            <button
                              onClick={() => toggleRbacPermission(r, perm.key)}
                              disabled={r === "admin" && perm.key === "canManageUsers"} // Prevent admin lock-out
                              className={`w-7 h-7 rounded-xl flex items-center justify-center mx-auto transition cursor-pointer ${
                                isGranted
                                  ? "bg-emerald-500 text-white shadow-xs hover:bg-emerald-600"
                                  : "bg-slate-200 dark:bg-slate-700 text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600"
                              } ${r === "admin" && perm.key === "canManageUsers" ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                              {isGranted ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Provision New User */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-pink-500" />
                Provision New User Account
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Account Persona / Role</label>
                <div className="grid grid-cols-4 gap-2 mt-1.5">
                  {(["teacher", "student", "parent", "admin"] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setNewRole(r)}
                      className={`py-2 px-2 text-center rounded-xl text-xs font-extrabold uppercase transition cursor-pointer ${
                        newRole === r
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="e.g. Dr. Hina Tahir"
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="name@safeaischool.edu"
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+1 (555) 019-2810"
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Dynamic role fields */}
              {newRole === "teacher" && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="text-[11px] font-extrabold uppercase text-blue-600 dark:text-blue-400">
                    Faculty Specific Assignments
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Department</label>
                      <input
                        type="text"
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                        className="w-full mt-1 px-2.5 py-1.5 rounded-lg border text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Class Lead</label>
                      <select
                        value={newAssignedClass}
                        onChange={(e) => setNewAssignedClass(e.target.value)}
                        className="w-full mt-1 px-2.5 py-1.5 rounded-lg border text-xs"
                      >
                        {classes.map((cls) => (
                          <option key={cls.id} value={cls.name}>{cls.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {newRole === "student" && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="text-[11px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
                    Student Enrollment & Safety Token
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Class Section</label>
                      <select
                        value={newStudentClass}
                        onChange={(e) => setNewStudentClass(e.target.value)}
                        className="w-full mt-1 px-2.5 py-1.5 rounded-lg border text-xs"
                      >
                        {classes.map((cls) => (
                          <option key={cls.id} value={cls.name}>{cls.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Parent Name</label>
                      <input
                        type="text"
                        value={newParentName}
                        onChange={(e) => setNewParentName(e.target.value)}
                        placeholder="e.g. Tariq Ahmed"
                        className="w-full mt-1 px-2.5 py-1.5 rounded-lg border text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-extrabold shadow hover:opacity-95 transition cursor-pointer"
                >
                  Provision & Grant Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit User */}
      {editUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Edit User Profile: {editUser.fullName}
              </h3>
              <button
                onClick={() => setEditUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditUser} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  value={editUser.fullName}
                  onChange={(e) => setEditUser({ ...editUser, fullName: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Phone</label>
                <input
                  type="text"
                  value={editUser.phone}
                  onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              {editUser.role === "teacher" && (
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Department</label>
                  <input
                    type="text"
                    value={editUser.department || ""}
                    onChange={(e) => setEditUser({ ...editUser, department: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800 font-semibold"
                  />
                </div>
              )}

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="px-3 py-1.5 rounded-xl font-bold text-slate-500 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
