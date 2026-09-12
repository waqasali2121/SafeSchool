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
  capacity?: number;
  classTeacher?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  classId: string;
  teacherName?: string;
  periodsPerWeek?: number;
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
  periodNumber?: number;
  periodName?: string;
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

export type AlertCategory = "emergency" | "medical" | "behavioral" | "academic" | "announcement";
export type AlertSeverity = "critical" | "high" | "normal";
export type AlertChannel = "sms" | "push" | "email" | "whatsapp";

export interface StudentAlert {
  id: string;
  targetType: "all" | "class" | "individual";
  studentId?: string;
  studentName?: string;
  classId?: string;
  className?: string;
  category: AlertCategory;
  severity: AlertSeverity;
  title: string;
  message: string;
  channels: AlertChannel[];
  deliveryStatus: "delivered" | "delivering" | "failed";
  deliveredCount?: number;
  readCount?: number;
  totalRecipients?: number;
  dispatchedBy: string;
  createdAt: string;
  actionRequired?: boolean;
}

export type AccountStatus = "active" | "suspended" | "revoked";

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: AccountStatus;
  createdAt: string;
  lastLogin?: string;
  avatarUrl?: string;
  employeeId?: string;
  department?: string;
  qualification?: string;
  assignedClasses?: string[];
  rollNumber?: string;
  className?: string;
  parentId?: string;
  parentName?: string;
  rfidCardId?: string;
  qrCodeToken?: string;
  relationship?: "Mother" | "Father" | "Guardian";
  studentNames?: string[];
}

export interface RBACRolePermissions {
  role: UserRole;
  canMarkAttendance: boolean;
  canScanQrRfid: boolean;
  canIssueEmergencyAlerts: boolean;
  canIssueMedicalAlerts: boolean;
  canManageUsers: boolean;
  canManageStructure: boolean;
  canUploadCurriculum: boolean;
  canViewAuditLogs: boolean;
  canAssignHomework: boolean;
  canRecordMarks: boolean;
}

export interface AcademicEvent {
  id: string;
  title: string;
  type: "term" | "exam" | "holiday" | "event" | "meeting";
  startDate: string;
  endDate: string;
  term: "Fall 2026" | "Spring 2027";
  description?: string;
  isImportant?: boolean;
}

export interface TimetableSlot {
  id: string;
  classId: string;
  className: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectName: string;
  teacherName: string;
  roomNumber: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetEntity: string;
  ipAddress: string;
  severity: "info" | "warning" | "critical";
  details: string;
}

export interface TeacherCompliance {
  teacherId: string;
  teacherName: string;
  department: string;
  attendanceSubmissionRate: number;
  lessonPlansUploaded: number;
  lessonPlansRequired: number;
  homeworkAssignedCount: number;
  marksEnteredRate: number;
  complianceStatus: "compliant" | "warning" | "overdue";
  lastActive: string;
}

export type StudyMaterialType = "pdf" | "slide_deck" | "syllabus" | "homework" | "video_tutorial";

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  className: string;
  lessonChapter: string;
  type: StudyMaterialType;
  fileUrl?: string;
  videoUrl?: string;
  description: string;
  uploadedBy: string;
  uploadedAt: string;
  fileSizeKb?: number;
  ragIndexed?: boolean;
}

export interface StudentProgressNote {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  teacherName: string;
  subject: string;
  category: "academic" | "behavioral" | "homework" | "remedial";
  note: string;
  sentAt: string;
  read: boolean;
  channel: "app" | "whatsapp" | "sms";
}
