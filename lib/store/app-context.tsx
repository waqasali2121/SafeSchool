"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserRole,
  Student,
  AttendanceRecord,
  NotificationItem,
  HomeworkItem,
  MarkItem,
  RAGDocument,
  ChatMessage,
  EmergencyContact,
  StudentAlert,
  UserAccount,
  RBACRolePermissions,
  AcademicEvent,
  TimetableSlot,
  AuditLogEntry,
  TeacherCompliance,
  SchoolClass,
  Subject,
  StudyMaterial,
  StudentProgressNote,
  ParentMessage,
  PastExamPaper,
  RevisionChecklistItem,
  TimedPracticeQuestion,
  Teacher,
  WhatsAppMessage,
  WhatsAppConfig,
} from "../types";
import {
  INITIAL_STUDENTS,
  INITIAL_ATTENDANCE,
  INITIAL_NOTIFICATIONS,
  INITIAL_HOMEWORK,
  INITIAL_MARKS,
  INITIAL_DOCUMENTS,
  EMERGENCY_CONTACTS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_STUDENT_ALERTS,
  INITIAL_USER_ACCOUNTS,
  DEFAULT_RBAC_PERMISSIONS,
  INITIAL_ACADEMIC_EVENTS,
  INITIAL_TIMETABLE,
  INITIAL_AUDIT_LOGS,
  INITIAL_TEACHER_COMPLIANCE,
  INITIAL_STUDY_MATERIALS,
  INITIAL_PROGRESS_NOTES,
  INITIAL_PARENT_MESSAGES,
  INITIAL_PAST_PAPERS,
  INITIAL_REVISION_CHECKLIST,
  TIMED_PRACTICE_QUESTIONS,
  INITIAL_TEACHERS,
  INITIAL_WHATSAPP_CONFIG,
  INITIAL_WHATSAPP_MESSAGES,
} from "../mock-data";


import { generateRAGAnswer, addLocalDocument, getLocalDocuments } from "../rag/engine";

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  students: Student[];
  attendance: AttendanceRecord[];
  notifications: NotificationItem[];
  homework: HomeworkItem[];
  marks: MarkItem[];
  documents: RAGDocument[];
  emergencyContacts: EmergencyContact[];
  chatMessages: ChatMessage[];
  isSosActive: boolean;
  sosDetails: {
    studentName: string;
    timestamp: string;
    lat: number;
    lng: number;
  } | null;

  // New Domain Entities
  alerts: StudentAlert[];
  userAccounts: UserAccount[];
  rbacPermissions: Record<string, RBACRolePermissions>;
  academicEvents: AcademicEvent[];
  timetableSlots: TimetableSlot[];
  auditLogs: AuditLogEntry[];
  teacherCompliance: TeacherCompliance[];
  classes: SchoolClass[];
  subjects: Subject[];
  studyMaterials: StudyMaterial[];
  progressNotes: StudentProgressNote[];
  parentMessages: ParentMessage[];
  teachers: Teacher[];

  // Parent Role Multi-Child & Comms
  activeChildId: string;
  setActiveChildId: (id: string) => void;
  sendParentInquiry: (teacherName: string, subject: string, message: string, studentId?: string) => void;
  markParentMessageAsRead: (id: string) => void;
  acknowledgeEmergencyBroadcast: (alertId: string) => void;

  unlockedRoles: Record<UserRole, boolean>;
  isRoleUnlocked: (role: UserRole) => boolean;
  unlockRole: (role: UserRole, usernameOrEmail: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  lockRole: (role: UserRole) => void;

  // Existing Actions
  markAttendance: (studentId: string, status: "present" | "late" | "absent", method?: "qr_scan" | "rfid_tap" | "manual") => void;
  recordDeparture: (studentId: string) => void;
  triggerSos: (studentName?: string) => void;
  clearSos: () => void;
  sendChatMessage: (content: string) => Promise<void>;
  addHomework: (item: Omit<HomeworkItem, "id" | "submissionsCount" | "isCompletedByStudent">) => void;
  toggleHomeworkCompletion: (id: string) => void;
  uploadDocument: (title: string, subject: string, className: string, rawContent: string, fileType?: "pdf" | "docx" | "txt") => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Core Module Actions
  issueAlert: (alertData: Omit<StudentAlert, "id" | "createdAt" | "deliveryStatus" | "deliveredCount" | "readCount" | "totalRecipients">) => void;
  addUserAccount: (user: Omit<UserAccount, "id" | "createdAt">) => void;
  updateUserAccount: (id: string, updates: Partial<UserAccount>) => void;
  setUserAccountStatus: (id: string, status: "active" | "suspended" | "revoked") => void;
  toggleRbacPermission: (targetRole: UserRole, key: keyof Omit<RBACRolePermissions, "role">) => void;
  addAcademicEvent: (event: Omit<AcademicEvent, "id">) => void;
  deleteAcademicEvent: (id: string) => void;
  addClass: (cls: Omit<SchoolClass, "id">) => void;
  updateClass: (id: string, updates: Partial<SchoolClass>) => void;
  addSubject: (subj: Omit<Subject, "id">) => void;
  updateTimetableSlot: (slot: TimetableSlot) => void;
  addAuditLog: (action: string, targetEntity: string, details: string, severity?: "info" | "warning" | "critical") => void;
  sendComplianceReminder: (teacherId: string) => void;
  addTeacher: (teacherData: Omit<Teacher, "id" | "userId"> & { email?: string; phone?: string }) => void;

  // Teacher Classroom Operations Actions
  recordStudentMark: (mark: Omit<MarkItem, "id" | "date">) => void;
  addStudyMaterial: (material: Omit<StudyMaterial, "id" | "uploadedAt">) => void;
  sendStudentProgressNote: (note: Omit<StudentProgressNote, "id" | "sentAt" | "read">) => void;
  batchSubmitAttendance: (className: string, periodNumber: number, periodName: string, records: { studentId: string; status: "present" | "late" | "absent" }[]) => void;

  // WhatsApp Gateway & Communication
  whatsAppConfig: WhatsAppConfig;
  whatsAppMessages: WhatsAppMessage[];
  updateWhatsAppConfig: (updates: Partial<WhatsAppConfig>) => void;
  sendWhatsAppMessage: (toNumber: string, content: string, category?: WhatsAppMessage["category"], recipientName?: string, studentName?: string, templateName?: string) => Promise<{ success: boolean; messageId?: string; error?: string }>;
  simulateInboundWhatsApp: (fromNumber: string, content: string, senderName?: string) => void;

  // Student Exam Prep & Revision
  pastPapers: PastExamPaper[];
  revisionChecklist: RevisionChecklistItem[];
  toggleRevisionChecklist: (id: string) => void;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("student");
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [homework, setHomework] = useState<HomeworkItem[]>(INITIAL_HOMEWORK);
  const [marks, setMarks] = useState<MarkItem[]>(INITIAL_MARKS);
  const [documents, setDocuments] = useState<RAGDocument[]>(INITIAL_DOCUMENTS);
  const [emergencyContacts] = useState<EmergencyContact[]>(EMERGENCY_CONTACTS);
  const [isSosActive, setIsSosActive] = useState(false);
  const [sosDetails, setSosDetails] = useState<{
    studentName: string;
    timestamp: string;
    lat: number;
    lng: number;
  } | null>(null);

  // New Core Module States
  const [alerts, setAlerts] = useState<StudentAlert[]>(INITIAL_STUDENT_ALERTS);
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(INITIAL_USER_ACCOUNTS);
  const [rbacPermissions, setRbacPermissions] = useState<Record<string, RBACRolePermissions>>(DEFAULT_RBAC_PERMISSIONS);
  const [academicEvents, setAcademicEvents] = useState<AcademicEvent[]>(INITIAL_ACADEMIC_EVENTS);
  const [timetableSlots, setTimetableSlots] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [teacherCompliance, setTeacherCompliance] = useState<TeacherCompliance[]>(INITIAL_TEACHER_COMPLIANCE);
  const [classes, setClasses] = useState<SchoolClass[]>(INITIAL_CLASSES);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [progressNotes, setProgressNotes] = useState<StudentProgressNote[]>(INITIAL_PROGRESS_NOTES);
  const [parentMessages, setParentMessages] = useState<ParentMessage[]>(INITIAL_PARENT_MESSAGES);
  const [activeChildId, setActiveChildId] = useState<string>("stu-1");
  const [pastPapers] = useState<PastExamPaper[]>(INITIAL_PAST_PAPERS);
  const [revisionChecklist, setRevisionChecklist] = useState<RevisionChecklistItem[]>(INITIAL_REVISION_CHECKLIST);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);


  const [unlockedRoles, setUnlockedRoles] = useState<Record<UserRole, boolean>>({
    student: true,
    admin: false,
    teacher: false,
    parent: false,
  });

  const isRoleUnlocked = (r: UserRole): boolean => {
    if (r === "student") return true;
    return Boolean(unlockedRoles[r]);
  };

  const unlockRole = async (
    targetRole: UserRole,
    usernameOrEmail: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanInput = usernameOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    const credentialsMap: Record<UserRole, { emails: string[]; pass: string; name: string }> = {
      admin: { emails: ["admin@safeaischool.edu", "admin"], pass: "SafeAdmin@2026", name: "Principal Farah Qureshi" },
      teacher: { emails: ["teacher@safeaischool.edu", "teacher", "amina.qureshi@faculty.safeaischool.edu"], pass: "Teacher@2026", name: "Dr. Amina Qureshi" },
      parent: { emails: ["parent@safeaischool.edu", "parent", "tariq.ahmed@parent.safeaischool.edu"], pass: "Parent@2026", name: "Tariq Ahmed" },
      student: { emails: ["sara.ahmed@student.safeaischool.edu", "student"], pass: "Student@2026", name: "Sara Ahmed" },
    };

    const targetCreds = credentialsMap[targetRole];
    if (!targetCreds) return { success: false, error: "Invalid role specified." };

    const matchesUser = targetCreds.emails.includes(cleanInput);
    const matchesPass = cleanPass === targetCreds.pass;

    if (!matchesUser || !matchesPass) {
      return {
        success: false,
        error: `Incorrect credentials for ${targetRole.toUpperCase()}. Please check your username/email and password.`,
      };
    }

    setUnlockedRoles((prev) => ({ ...prev, [targetRole]: true }));
    setRole(targetRole);
    return { success: true };
  };

  const lockRole = (r: UserRole) => {
    setUnlockedRoles((prev) => ({ ...prev, [r]: false }));
    if (role === r) {
      setRole("student");
    }
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      content: "Assalamu Alaikum! I am your SafeAI School Learning Companion. I can answer questions from your uploaded school textbooks, summarize chapters, generate MCQs, or solve homework problems. How can I help you today?",
      timestamp: "Just now",
      confidenceScore: 100,
    },
  ]);

  // Mark student check-in
  const markAttendance = (
    studentId: string,
    status: "present" | "late" | "absent",
    method: "qr_scan" | "rfid_tap" | "manual" = "qr_scan"
  ) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const timeString = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    // Update students inside campus flag
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              isInsideCampus: status !== "absent",
              lastSafetyCheckin: `Today at ${timeString}`,
            }
          : s
      )
    );

    // Update or insert attendance record
    const todayStr = new Date().toISOString().split("T")[0];
    setAttendance((prev) => {
      const existing = prev.find((a) => a.studentId === studentId && a.date === todayStr);
      if (existing) {
        return prev.map((a) =>
          a.id === existing.id
            ? { ...a, status, checkIn: timeString, method, parentNotifiedArrival: true }
            : a
        );
      }
      const newRec: AttendanceRecord = {
        id: `att-${Date.now()}`,
        studentId,
        studentName: student.fullName,
        rollNumber: student.rollNumber,
        className: student.className,
        date: todayStr,
        checkIn: timeString,
        method,
        status,
        parentNotifiedArrival: true,
        parentNotifiedDeparture: false,
      };
      return [newRec, ...prev];
    });

    // Generate Real-time Parent Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientId: student.parentId,
      recipientRole: "parent",
      category: "attendance",
      title: "Safe Arrival Confirmed",
      message: `Your daughter ${student.fullName} safely reached school at ${timeString}. Method: ${method.replace("_", " ").toUpperCase()}.`,
      read: false,
      channel: "whatsapp",
      createdAt: "Just now",
      studentName: student.fullName,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Record student leaving school
  const recordDeparture = (studentId: string) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const timeString = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, isInsideCampus: false, lastSafetyCheckin: `Left at ${timeString}` } : s
      )
    );

    const todayStr = new Date().toISOString().split("T")[0];
    setAttendance((prev) =>
      prev.map((a) =>
        a.studentId === studentId && a.date === todayStr
          ? { ...a, checkOut: timeString, parentNotifiedDeparture: true }
          : a
      )
    );

    // Parent departure alert
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientId: student.parentId,
      recipientRole: "parent",
      category: "attendance",
      title: "Campus Departure Alert",
      message: `Your daughter ${student.fullName} has left school at ${timeString}.`,
      read: false,
      channel: "whatsapp",
      createdAt: "Just now",
      studentName: student.fullName,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Trigger SOS Panic Alert
  const triggerSos = (studentName = "Sara Ahmed") => {
    setIsSosActive(true);
    const timestamp = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    setSosDetails({
      studentName,
      timestamp,
      lat: 33.7201,
      lng: 73.0612,
    });

    // High priority alert to Parent & School Security
    const sosNotif: NotificationItem = {
      id: `sos-${Date.now()}`,
      recipientId: "par-1",
      recipientRole: "parent",
      category: "emergency",
      title: "EMERGENCY SOS ALERT: Student Triggered Assistance",
      message: `HIGH PRIORITY: ${studentName} pressed the SOS Button at ${timestamp}. Live GPS Coordinates: 33.7201° N, 73.0612° E. Campus safety officers and local dispatch notified!`,
      read: false,
      channel: "sms",
      createdAt: "Just now",
      studentName,
      urgent: true,
    };
    setNotifications((prev) => [sosNotif, ...prev]);
  };

  const clearSos = () => {
    setIsSosActive(false);
    setSosDetails(null);
  };

  // RAG Chat Message
  const sendChatMessage = async (content: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    try {
      const ragResult = await generateRAGAnswer(content);
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        content: ragResult.answer,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
        sourceDocuments: ragResult.sourceDocuments,
        confidenceScore: ragResult.confidenceScore,
        isOutOfScope: ragResult.isOutOfScope,
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        content: "I cannot find this information in the uploaded school material.",
        timestamp: "Just now",
        confidenceScore: 0,
        isOutOfScope: true,
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    }
  };

  // Homework actions
  const addHomework = (item: Omit<HomeworkItem, "id" | "submissionsCount" | "isCompletedByStudent">) => {
    const newHw: HomeworkItem = {
      ...item,
      id: `hw-${Date.now()}`,
      submissionsCount: 0,
      totalStudents: 28,
      isCompletedByStudent: false,
    };
    setHomework((prev) => [newHw, ...prev]);

    // Parent notification for new homework
    const hwNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientId: "par-1",
      recipientRole: "parent",
      category: "homework",
      title: `New Homework: ${item.subject}`,
      message: `${item.title} due ${item.dueDate}. Assigned by ${item.assignedBy}.`,
      read: false,
      channel: "app",
      createdAt: "Just now",
      studentName: "Sara Ahmed",
    };
    setNotifications((prev) => [hwNotif, ...prev]);
  };

  const toggleHomeworkCompletion = (id: string) => {
    setHomework((prev) =>
      prev.map((h) => (h.id === id ? { ...h, isCompletedByStudent: !h.isCompletedByStudent } : h))
    );
  };

  // Upload Document for RAG
  const uploadDocument = (
    title: string,
    subject: string,
    className: string,
    rawContent: string,
    fileType: "pdf" | "docx" | "txt" = "pdf"
  ) => {
    const filename = `${title.replace(/\s+/g, "_")}.${fileType}`;
    const result = addLocalDocument(
      {
        title,
        filename,
        fileType,
        fileSizeKb: Math.floor(rawContent.length / 10) + 120,
        subject,
        className,
      },
      rawContent
    );
    setDocuments(getLocalDocuments());

    // Broadcast AI update notification
    const docNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      recipientId: "all",
      recipientRole: "student",
      category: "ai_updates",
      title: "New Learning Material Indexed",
      message: `${title} (${result.chunksCount} chunks indexed) is now ready in your AI Study Assistant!`,
      read: false,
      channel: "app",
      createdAt: "Just now",
    };
    setNotifications((prev) => [docNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addAuditLog = (action: string, targetEntity: string, details: string, severity: "info" | "warning" | "critical" = "info") => {
    const actorMap: Record<UserRole, string> = {
      admin: "Principal Farah Qureshi",
      teacher: "Dr. Amina Qureshi",
      parent: "Tariq Ahmed",
      student: "Sara Ahmed",
    };
    const timeString = `Today at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
    const newLog: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: timeString,
      actorName: actorMap[role] || "System Administrator",
      actorRole: role,
      action,
      targetEntity,
      ipAddress: "192.168.1.10 (Command Center)",
      severity,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const issueAlert = (alertData: Omit<StudentAlert, "id" | "createdAt" | "deliveryStatus" | "deliveredCount" | "readCount" | "totalRecipients">) => {
    const timeString = `Today at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
    const totalRecipients = alertData.targetType === "all" ? students.length : alertData.targetType === "class" ? 28 : 1;
    const newAlert: StudentAlert = {
      ...alertData,
      id: `alt-${Date.now()}`,
      createdAt: timeString,
      deliveryStatus: "delivered",
      deliveredCount: totalRecipients,
      readCount: Math.max(1, Math.floor(totalRecipients * 0.85)),
      totalRecipients,
    };
    setAlerts((prev) => [newAlert, ...prev]);

    // Push parent notification
    const newNotif: NotificationItem = {
      id: `notif-alt-${Date.now()}`,
      recipientId: alertData.studentId ? "par-1" : "u-all",
      recipientRole: "parent",
      category: alertData.category === "emergency" ? "emergency" : alertData.category === "academic" ? "marks" : "announcements",
      title: `${alertData.severity.toUpperCase()} ALERT: ${alertData.title}`,
      message: `${alertData.message} [Channels: ${alertData.channels.join(", ").toUpperCase()}]`,
      read: false,
      channel: alertData.channels.includes("whatsapp") ? "whatsapp" : alertData.channels.includes("sms") ? "sms" : "app",
      createdAt: "Just now",
      studentName: alertData.studentName,
      urgent: alertData.severity === "critical" || alertData.severity === "high",
    };
    setNotifications((prev) => [newNotif, ...prev]);

    addAuditLog(
      "ALERT_DISPATCHED",
      alertData.studentName ? `${alertData.studentName} (${alertData.category})` : `Broadcast (${alertData.category})`,
      `Dispatched ${alertData.severity} alert "${alertData.title}" across ${alertData.channels.join(", ")} to ${totalRecipients} recipients.`,
      alertData.severity === "critical" ? "critical" : alertData.severity === "high" ? "warning" : "info"
    );
  };

  const addUserAccount = (user: Omit<UserAccount, "id" | "createdAt">) => {
    const newAccount: UserAccount = {
      ...user,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
    };
    setUserAccounts((prev) => [newAccount, ...prev]);
    addAuditLog(
      "USER_PROVISIONED",
      `${user.fullName} (${user.role.toUpperCase()})`,
      `Created new user account with role ${user.role} and status ${user.status}.`,
      "info"
    );
  };

  const updateUserAccount = (id: string, updates: Partial<UserAccount>) => {
    setUserAccounts((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updates } : u))
    );
    const existing = userAccounts.find((u) => u.id === id);
    addAuditLog(
      "USER_UPDATED",
      existing ? `${existing.fullName} (${existing.role})` : id,
      `Updated user profile details and assignments.`,
      "info"
    );
  };

  const setUserAccountStatus = (id: string, status: "active" | "suspended" | "revoked") => {
    setUserAccounts((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
    const existing = userAccounts.find((u) => u.id === id);
    addAuditLog(
      "USER_STATUS_UPDATED",
      existing ? `${existing.fullName} (${existing.role})` : id,
      `Changed account status to ${status.toUpperCase()}.`,
      status === "revoked" || status === "suspended" ? "critical" : "info"
    );
  };

  const toggleRbacPermission = (targetRole: UserRole, key: keyof Omit<RBACRolePermissions, "role">) => {
    setRbacPermissions((prev) => {
      const current = prev[targetRole] || { ...DEFAULT_RBAC_PERMISSIONS[targetRole] };
      const updated = {
        ...prev,
        [targetRole]: {
          ...current,
          [key]: !current[key],
        },
      };
      return updated;
    });
    addAuditLog(
      "RBAC_UPDATED",
      `Role: ${targetRole.toUpperCase()}`,
      `Toggled permission "${String(key)}".`,
      "warning"
    );
  };

  const addAcademicEvent = (event: Omit<AcademicEvent, "id">) => {
    const newEvent: AcademicEvent = {
      ...event,
      id: `evt-${Date.now()}`,
    };
    setAcademicEvents((prev) => [...prev, newEvent]);
    addAuditLog("CALENDAR_EVENT_ADDED", event.title, `Scheduled ${event.type} event from ${event.startDate} to ${event.endDate}.`, "info");
  };

  const deleteAcademicEvent = (id: string) => {
    const target = academicEvents.find((e) => e.id === id);
    setAcademicEvents((prev) => prev.filter((e) => e.id !== id));
    if (target) {
      addAuditLog("CALENDAR_EVENT_DELETED", target.title, `Removed academic event from calendar.`, "warning");
    }
  };

  const addClass = (cls: Omit<SchoolClass, "id">) => {
    const newClass: SchoolClass = {
      ...cls,
      id: `c-${Date.now()}`,
    };
    setClasses((prev) => [...prev, newClass]);
    addAuditLog("CLASS_CREATED", newClass.name, `Added class section with capacity ${newClass.capacity || 30}.`, "info");
  };

  const updateClass = (id: string, updates: Partial<SchoolClass>) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    addAuditLog("CLASS_UPDATED", id, `Updated class parameters.`, "info");
  };

  const addSubject = (subj: Omit<Subject, "id">) => {
    const newSubj: Subject = {
      ...subj,
      id: `sub-${Date.now()}`,
    };
    setSubjects((prev) => [...prev, newSubj]);
    addAuditLog("SUBJECT_CREATED", newSubj.name, `Configured new subject ${newSubj.code} with lead educator ${newSubj.teacherName}.`, "info");
  };

  const updateTimetableSlot = (slot: TimetableSlot) => {
    setTimetableSlots((prev) => prev.map((s) => (s.id === slot.id ? slot : s)));
    addAuditLog(
      "TIMETABLE_SLOT_UPDATED",
      `${slot.className} (${slot.day} P${slot.periodNumber})`,
      `Reassigned period to ${slot.subjectName} with ${slot.teacherName} in ${slot.roomNumber}.`,
      "info"
    );
  };

  const sendComplianceReminder = (teacherId: string) => {
    const teacher = teacherCompliance.find((t) => t.teacherId === teacherId);
    if (!teacher) return;
    const notif: NotificationItem = {
      id: `notif-rem-${Date.now()}`,
      recipientId: teacherId,
      recipientRole: "teacher",
      category: "announcements",
      title: "Action Required: Educational Compliance Notice",
      message: `Dear ${teacher.teacherName}, please update your pending curriculum uploads, weekly homework assignments, and attendance logs.`,
      read: false,
      channel: "app",
      createdAt: "Just now",
      urgent: true,
    };
    setNotifications((prev) => [notif, ...prev]);
    addAuditLog(
      "COMPLIANCE_REMINDER_SENT",
      teacher.teacherName,
      `Dispatched urgent compliance follow-up notification. Attendance rate: ${teacher.attendanceSubmissionRate}%, Uploads: ${teacher.lessonPlansUploaded}/${teacher.lessonPlansRequired}.`,
      "warning"
    );
  };

  const addTeacher = (teacherData: Omit<Teacher, "id" | "userId"> & { email?: string; phone?: string }) => {
    const teacherId = `tea-${Date.now()}`;
    const userId = `usr-tea-${Date.now()}`;

    const newTeacher: Teacher = {
      id: teacherId,
      userId,
      fullName: teacherData.fullName,
      employeeId: teacherData.employeeId,
      department: teacherData.department,
      qualification: teacherData.qualification,
      assignedClasses: teacherData.assignedClasses,
      email: teacherData.email,
      phone: teacherData.phone,
    };

    setTeachers((prev) => [newTeacher, ...prev]);

    // Automatically create corresponding UserAccount with teacher role
    const newUserAccount: UserAccount = {
      id: userId,
      fullName: teacherData.fullName,
      email: teacherData.email || `${teacherData.fullName.toLowerCase().replace(/[^a-z0-9]/g, ".")}@faculty.safeaischool.edu`,
      phone: teacherData.phone || "+1 (555) 000-0000",
      role: "teacher",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      lastLogin: "Never",
      employeeId: teacherData.employeeId,
      department: teacherData.department,
      qualification: teacherData.qualification,
      assignedClasses: teacherData.assignedClasses,
    };
    setUserAccounts((prev) => [newUserAccount, ...prev]);

    addAuditLog(
      "FACULTY_MEMBER_ADDED",
      `${newTeacher.fullName} (${newTeacher.employeeId})`,
      `Added new faculty educator to ${newTeacher.department} with classes: ${newTeacher.assignedClasses.join(", ") || "General"}. Provisioned user credentials.`,
      "info"
    );
  };

  const recordStudentMark = (mark: Omit<MarkItem, "id" | "date">) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const newMark: MarkItem = {
      ...mark,
      id: `m-${Date.now()}`,
      date: todayStr,
    };
    setMarks((prev) => [newMark, ...prev]);

    // Parent notification
    const student = students.find((s) => s.id === mark.studentId);
    const notif: NotificationItem = {
      id: `notif-mark-${Date.now()}`,
      recipientId: student?.parentId || "par-1",
      recipientRole: "parent",
      category: "marks",
      title: `Assessment Score Published: ${mark.subject}`,
      message: `${mark.studentName} scored ${mark.obtainedMarks}/${mark.totalMarks} (Grade ${mark.grade}) in ${mark.examType}. Remarks: "${mark.teacherRemarks}"`,
      read: false,
      channel: "app",
      createdAt: "Just now",
      studentName: mark.studentName,
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog(
      "ASSESSMENT_RECORDED",
      `${mark.studentName} (${mark.subject})`,
      `Recorded ${mark.examType} score: ${mark.obtainedMarks}/${mark.totalMarks} (Grade ${mark.grade}). Remarks: "${mark.teacherRemarks}"`,
      "info"
    );
  };

  const addStudyMaterial = (mat: Omit<StudyMaterial, "id" | "uploadedAt">) => {
    const timeStr = `Today at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
    const newMat: StudyMaterial = {
      ...mat,
      id: `mat-${Date.now()}`,
      uploadedAt: timeStr,
    };
    setStudyMaterials((prev) => [newMat, ...prev]);

    if (mat.type === "pdf" && mat.ragIndexed) {
      uploadDocument(
        mat.title,
        mat.subject,
        mat.className,
        `Class Study Material: ${mat.title} for ${mat.lessonChapter}. Description: ${mat.description}`
      );
    }

    addAuditLog(
      "STUDY_MATERIAL_UPLOADED",
      `${mat.title} (${mat.subject})`,
      `Uploaded ${mat.type} curriculum resource for ${mat.lessonChapter}.`,
      "info"
    );
  };

  const sendStudentProgressNote = (noteData: Omit<StudentProgressNote, "id" | "sentAt" | "read">) => {
    const timeStr = `Today at ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
    const newNote: StudentProgressNote = {
      ...noteData,
      id: `pn-${Date.now()}`,
      sentAt: timeStr,
      read: false,
    };
    setProgressNotes((prev) => [newNote, ...prev]);

    const notif: NotificationItem = {
      id: `notif-pn-${Date.now()}`,
      recipientId: "par-1",
      recipientRole: "parent",
      category: noteData.category === "academic" ? "marks" : noteData.category === "homework" ? "homework" : "announcements",
      title: `Progress Note from ${noteData.teacherName}`,
      message: `Regarding ${noteData.studentName} (${noteData.subject}): "${noteData.note}"`,
      read: false,
      channel: noteData.channel,
      createdAt: "Just now",
      studentName: noteData.studentName,
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog(
      "PROGRESS_NOTE_SENT",
      `${noteData.studentName} (Parent: ${noteData.parentName})`,
      `Sent direct ${noteData.category} progress note via ${noteData.channel.toUpperCase()}: "${noteData.note}"`,
      "info"
    );
  };

  const batchSubmitAttendance = (
    className: string,
    periodNumber: number,
    periodName: string,
    records: { studentId: string; status: "present" | "late" | "absent" }[]
  ) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const timeString = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    // Update attendance state
    setAttendance((prev) => {
      let updated = [...prev];
      records.forEach((rec) => {
        const student = students.find((s) => s.id === rec.studentId);
        if (!student) return;

        const existingIdx = updated.findIndex(
          (a) => a.studentId === rec.studentId && a.date === todayStr && a.periodNumber === periodNumber
        );

        const newRec: AttendanceRecord = {
          id: existingIdx >= 0 ? updated[existingIdx].id : `att-${Date.now()}-${rec.studentId}`,
          studentId: rec.studentId,
          studentName: student.fullName,
          rollNumber: student.rollNumber,
          className,
          date: todayStr,
          checkIn: rec.status !== "absent" ? timeString : undefined,
          method: "manual",
          status: rec.status,
          parentNotifiedArrival: rec.status !== "absent",
          parentNotifiedDeparture: false,
          periodNumber,
          periodName,
        };

        if (existingIdx >= 0) {
          updated[existingIdx] = newRec;
        } else {
          updated = [newRec, ...updated];
        }
      });
      return updated;
    });

    // Auto-trigger alerts for any absences
    const absentees = records.filter((r) => r.status === "absent");
    absentees.forEach((abs) => {
      const student = students.find((s) => s.id === abs.studentId);
      if (!student) return;

      const absenceNotif: NotificationItem = {
        id: `notif-abs-${Date.now()}-${student.id}`,
        recipientId: student.parentId,
        recipientRole: "parent",
        category: "attendance",
        title: "URGENT ATTENDANCE: Absence Alert",
        message: `Your daughter ${student.fullName} was marked ABSENT for ${periodName} (Period ${periodNumber}) at ${timeString}. Please confirm if this is an excused absence.`,
        read: false,
        channel: "sms",
        createdAt: "Just now",
        studentName: student.fullName,
        urgent: true,
      };
      setNotifications((prev) => [absenceNotif, ...prev]);
    });

    addAuditLog(
      "PERIOD_ATTENDANCE_SUBMITTED",
      `${className} (${periodName} - P${periodNumber})`,
      `Submitted digital attendance for ${records.length} students. Present: ${records.filter((r) => r.status === "present").length}, Late: ${records.filter((r) => r.status === "late").length}, Absent: ${absentees.length}. Automated parent absence alerts dispatched.`,
      absentees.length > 0 ? "warning" : "info"
    );
  };

  // Parent Role Communication Handlers
  const sendParentInquiry = (teacherName: string, subject: string, message: string, studentId?: string) => {
    const targetStudentId = studentId || activeChildId;
    const student = students.find((s) => s.id === targetStudentId);
    const newMsg: ParentMessage = {
      id: `pmsg-${Date.now()}`,
      senderType: "parent",
      senderName: "Tariq Ahmed (Guardian)",
      senderRole: "Parent",
      recipientName: teacherName,
      studentId: targetStudentId,
      studentName: student?.fullName || "Sara Ahmed",
      subject,
      message,
      timestamp: "Just now",
      unread: false,
      channel: "app",
      category: "general",
      replyCount: 0,
    };
    setParentMessages((prev) => [newMsg, ...prev]);

    addAuditLog(
      "PARENT_INQUIRY_DISPATCHED",
      teacherName,
      `Guardian Tariq Ahmed sent direct inquiry regarding ${student?.fullName || "student"}: "${subject}"`,
      "info"
    );
  };

  const markParentMessageAsRead = (id: string) => {
    setParentMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: false } : m))
    );
  };

  const acknowledgeEmergencyBroadcast = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId ? { ...a, readCount: (a.readCount || 0) + 1 } : a
      )
    );
    const alert = alerts.find((a) => a.id === alertId);
    addAuditLog(
      "EMERGENCY_BROADCAST_ACKNOWLEDGED",
      alert?.title || alertId,
      `Guardian Tariq Ahmed verified safe digital receipt for broadcast "${alert?.title || alertId}"`,
      "info"
    );
  };

  const toggleRevisionChecklist = (id: string) => {
    setRevisionChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (

    <AppContext.Provider
      value={{
        role,
        setRole,
        unlockedRoles,
        isRoleUnlocked,
        unlockRole,
        lockRole,
        students,
        attendance,
        notifications,
        homework,
        marks,
        documents,
        emergencyContacts,
        chatMessages,
        isSosActive,
        sosDetails,
        markAttendance,
        recordDeparture,
        triggerSos,
        clearSos,
        sendChatMessage,
        addHomework,
        toggleHomeworkCompletion,
        uploadDocument,
        markNotificationAsRead,
        clearAllNotifications,
        // Core Module Entities
        alerts,
        userAccounts,
        rbacPermissions,
        academicEvents,
        timetableSlots,
        auditLogs,
        teacherCompliance,
        classes,
        subjects,
        studyMaterials,
        progressNotes,
        // Core Module Handlers
        issueAlert,
        addUserAccount,
        updateUserAccount,
        setUserAccountStatus,
        toggleRbacPermission,
        addAcademicEvent,
        deleteAcademicEvent,
        addClass,
        updateClass,
        addSubject,
        updateTimetableSlot,
        addAuditLog,
        sendComplianceReminder,
        // Teacher Operations Handlers
        recordStudentMark,
        addStudyMaterial,
        sendStudentProgressNote,
        batchSubmitAttendance,
        // Parent Role Handlers & Multi-Child
        parentMessages,
        activeChildId,
        setActiveChildId,
        sendParentInquiry,
        markParentMessageAsRead,
        acknowledgeEmergencyBroadcast,
        // Student Exam Prep & Revision
        pastPapers,
        revisionChecklist,
        toggleRevisionChecklist,
        // Faculty Directory
        teachers,
        addTeacher,
      }}
    >


      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
