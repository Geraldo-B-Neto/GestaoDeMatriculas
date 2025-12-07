
export enum UserRole {
  STUDENT = 'ALUNO',
  COORDINATOR = 'COORDENADOR',
  SECRETARY = 'SECRETARIA'
}

export enum RequestStatus {
  PENDING = 'Em Análise',
  APPROVED = 'Aprovada',
  REJECTED = 'Rejeitada',
  SYSTEM_REJECTED = 'Rejeitada: Sistema',
  CANCELLED = 'Cancelada'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Added for Login Logic
  role: UserRole;
  // Specific for students
  passedCourses?: string[]; // IDs of courses already passed
}

export interface Course {
  id: string;
  code: string;
  name: string;
  professor: string; // Added field
  credits: number; // Carga horária
  slots: number;
  preReqs: string[]; // List of Course IDs
  schedule: string; // e.g., "Seg/Qua 19:00"
  semester: number;
}

export interface EnrollmentRequest {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  courseSchedule: string;
  status: RequestStatus;
  requestedAt: string; // ISO Date
  justification?: string; // For rejections
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  missingPreReqs?: boolean;
  hasTimeConflict?: boolean; // Visual indicator for schedule conflicts
}

export interface Notification {
  id: string;
  userId: string; // Changed: Link notification to specific user
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

// Secretary Types
export enum DocType {
  ENROLLMENT_PROOF = 'Comprovante de Matrícula',
  DIPLOMA_REQ = 'Solicitação de Diploma',
  HISTORY = 'Histórico Escolar',
  CERTIFICATE = 'Certificado de Conclusão'
}

export interface AcademicDoc {
  id: string;
  studentId: string; // Link to user
  studentName: string;
  type: DocType;
  date: string;
  status: 'Pendente' | 'Gerado' | 'Arquivado';
}

// Coordinator Graduation Types
export interface GraduationRequest {
  id: string;
  studentName: string;
  studentId: string;
  course: string;
  date: string;
  status: 'Pendente' | 'Deferido' | 'Indeferido';
}

// New Interface for Mural
export interface AcademicEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'NOTICE' | 'LECTURE';
  author: string;
  courseId?: string; // Optional link to a course
}
