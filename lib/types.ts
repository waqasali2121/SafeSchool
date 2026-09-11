export type UserRole = "admin" | "teacher" | "parent" | "student";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  phoneNumber?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  gradeLevel: number;
  section: string;
  roomNumber: string;
  studentCount?: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classId: string;
  teacherName?: string;
}

export interface Student {
  id: string;
  userId: string;
  fullName: string;
  rollNumber: string;
  classId: string;
  className: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  bloodGroup: string;
  rfidCardId: string;
  qrCodeToken: string;
  photoUrl: string;
  isInsideCampus: boolean;
  lastSafetyCheckin?: string;
  attendanceRate: number; // e.g. 98%
}

export interface Teacher {
  id: string;
  userId: string;
  fullName: string;
  employeeId: string;
  department: string;
  qualification: string;
  assignedClasses: string[];
}

export interface Parent {
  id: string;
  userId: string;
  fullName: string;
  relationship: "Mother" | "Father" | "Guardian";
  studentIds: string[];
  studentNames: string[];
  emergencyPhone: string;
  whatsappEnabled: boolean;
  address: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  className: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  method: "qr_scan" | "rfid_tap" | "manual" | "facial_ai";
  status: "present" | "late" | "absent" | "excused";
  parentNotifiedArrival: boolean;
  parentNotifiedDeparture: boolean;
}

export interface NotificationItem {
  id: string;
  recipientId: string;
  recipientRole: UserRole;
  category: "attendance" | "homework" | "marks" | "emergency" | "announcements" | "ai_updates";
  title: string;
  message: string;
  read: boolean;
  channel: "app" | "sms" | "whatsapp" | "email";
  createdAt: string;
  studentName?: string;
  urgent?: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  type: "Police" | "Hospital" | "Helpline" | "Security";
  phoneNumber: string;
  address: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  isActive: boolean;
}

export interface HomeworkItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  className: string;
  dueDate: string;
  assignedBy: string;
  submissionsCount?: number;
  totalStudents?: number;
  isCompletedByStudent?: boolean;
}

export interface MarkItem {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  examType: string;
  obtainedMarks: number;
  totalMarks: number;
  grade: string;
  teacherRemarks: string;
  date: string;
}

export interface RAGDocument {
  id: string;
  title: string;
  filename: string;
  fileType: "pdf" | "docx" | "txt";
  fileSizeKb: number;
  subject: string;
  className: string;
  status: "indexed" | "processing" | "failed";
  chunksCount: number;
  uploadedAt: string;
  summary?: string;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  page?: number;
  similarity?: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: string;
  sourceDocuments?: {
    title: string;
    page?: number;
    chunkSnippet: string;
  }[];
  confidenceScore?: number; // 0 to 100
  isOutOfScope?: boolean;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface GeneratedAssignment {
  id: string;
  title: string;
  subject: string;
  className: string;
  chapter: string;
  difficulty: string;
  instructions: string[];
  questions: {
    type: "short" | "long" | "essay" | "research";
    prompt: string;
    marks: number;
  }[];
  totalMarks: number;
  answerKey: string;
  createdAt: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  subject: string;
}
