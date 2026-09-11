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
} from "../types";
import {
  INITIAL_STUDENTS,
  INITIAL_ATTENDANCE,
  INITIAL_NOTIFICATIONS,
  INITIAL_HOMEWORK,
  INITIAL_MARKS,
  INITIAL_DOCUMENTS,
  EMERGENCY_CONTACTS,
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

  // Actions
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("student");
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [homework, setHomework] = useState<HomeworkItem[]>(INITIAL_HOMEWORK);
  const [marks] = useState<MarkItem[]>(INITIAL_MARKS);
  const [documents, setDocuments] = useState<RAGDocument[]>(INITIAL_DOCUMENTS);
  const [emergencyContacts] = useState<EmergencyContact[]>(EMERGENCY_CONTACTS);
  const [isSosActive, setIsSosActive] = useState(false);
  const [sosDetails, setSosDetails] = useState<{
    studentName: string;
    timestamp: string;
    lat: number;
    lng: number;
  } | null>(null);

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

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
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
