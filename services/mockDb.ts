
import { User, UserRole, Course, EnrollmentRequest, RequestStatus, ValidationResult, AcademicDoc, DocType, Notification, GraduationRequest, AcademicEvent } from '../src/types';

// --- MOCK DATA ---

// IDs based on the provided PDF schedule
export const MOCK_COURSES: Course[] = [
  // --- 1º PERÍODO ---
  { id: 'c101', code: 'ADS101', name: 'Conceitos de Algoritmos', professor: 'Gilberto Viana', credits: 80, slots: 40, preReqs: [], schedule: 'Seg 19:00 / Qui 19:00', semester: 1 },
  { id: 'c102', code: 'MAT101', name: 'Introdução à Álgebra Linear', professor: 'Antônio', credits: 40, slots: 40, preReqs: [], schedule: 'Seg 20:50', semester: 1 },
  { id: 'c103', code: 'ADM101', name: 'Ger. Processos de Negócio', professor: 'Ocacir', credits: 40, slots: 40, preReqs: [], schedule: 'Ter 19:00', semester: 1 },
  { id: 'c104', code: 'ADS102', name: 'Lógica de Programação', professor: 'Cicero', credits: 80, slots: 40, preReqs: [], schedule: 'Ter 20:50 / Qua 19:00', semester: 1 },
  { id: 'c105', code: 'ADS103', name: 'Intro. Comp. e Software', professor: 'Danilo', credits: 80, slots: 40, preReqs: [], schedule: 'Qua 20:50 / Qui 20:50', semester: 1 },
  { id: 'c106', code: 'HUM101', name: 'Ética, Leg. e Cidadania', professor: 'Alberto', credits: 40, slots: 50, preReqs: [], schedule: 'Sex 19:00 (EAD)', semester: 1 },
  { id: 'c107', code: 'LET101', name: 'Leitura e Prod. Textos', professor: 'Beatriz', credits: 40, slots: 50, preReqs: [], schedule: 'Sex 20:50 (EAD)', semester: 1 },

  // --- 2º PERÍODO ---
  { id: 'c201', code: 'ADS201', name: 'Engenharia de Software I', professor: 'Wesley', credits: 80, slots: 35, preReqs: ['c105'], schedule: 'Seg 19:00 / Ter 20:50', semester: 2 },
  { id: 'c202', code: 'ADS202', name: 'Banco de Dados I', professor: 'Wesley', credits: 80, slots: 35, preReqs: ['c104'], schedule: 'Seg 20:50 / Qua 20:50', semester: 2 },
  { id: 'c203', code: 'ADS203', name: 'Linguagens de Programação', professor: 'Jean / Danilo', credits: 80, slots: 35, preReqs: ['c104'], schedule: 'Ter 19:00 / Qua 19:00', semester: 2 },
  { id: 'c204', code: 'MAT201', name: 'Probabilidade e Estatística', professor: 'Eila', credits: 40, slots: 35, preReqs: ['c102'], schedule: 'Qui 19:00', semester: 2 },
  { id: 'c205', code: 'ADS204', name: 'Arq. Org. Computadores', professor: 'Gilberto Viana', credits: 40, slots: 35, preReqs: ['c105'], schedule: 'Qui 20:50', semester: 2 },
  { id: 'c206', code: 'MET201', name: 'Metodologia Científica', professor: 'Henrique', credits: 40, slots: 50, preReqs: [], schedule: 'Sex 18:10 (EAD)', semester: 2 },
  { id: 'c207', code: 'LET201', name: 'Inglês Instrumental', professor: 'Beatriz', credits: 40, slots: 50, preReqs: [], schedule: 'Sex 19:00 (EAD)', semester: 2 },

  // --- 3º PERÍODO ---
  { id: 'c301', code: 'ADS301', name: 'Banco de Dados II', professor: 'Lucas', credits: 80, slots: 30, preReqs: ['c202'], schedule: 'Seg 19:00 / Qua 19:00', semester: 3 },
  { id: 'c302', code: 'ADS302', name: 'Sistemas Operacionais', professor: 'Gilberto Viana', credits: 40, slots: 30, preReqs: ['c205'], schedule: 'Seg 20:50', semester: 3 },
  { id: 'c303', code: 'ADS303', name: 'Prog. Orientada a Objetos I', professor: 'Cicero', credits: 80, slots: 30, preReqs: ['c203'], schedule: 'Ter 19:00 / Qua 20:50', semester: 3 },
  { id: 'c304', code: 'ADS304', name: 'Estrutura de Dados I', professor: 'Jean / Danilo', credits: 80, slots: 30, preReqs: ['c203'], schedule: 'Ter 20:50 / Qui 19:00', semester: 3 },
  { id: 'c305', code: 'MAT301', name: 'Matemática Aplicada', professor: 'Eila', credits: 40, slots: 30, preReqs: ['c204'], schedule: 'Qui 20:50', semester: 3 },
  { id: 'c306', code: 'ADS305', name: 'Engenharia de Software II', professor: 'Wesley', credits: 40, slots: 50, preReqs: ['c201'], schedule: 'Sex (EAD)', semester: 3 },

  // --- 4º PERÍODO ---
  { id: 'c401', code: 'ADS401', name: 'Engenharia de Software III', professor: 'Danielli', credits: 80, slots: 30, preReqs: ['c306'], schedule: 'Seg 19:00 / Sex (EAD)', semester: 4 },
  { id: 'c402', code: 'ADS402', name: 'Prog. Orientada a Objetos II', professor: 'Cicero', credits: 40, slots: 30, preReqs: ['c303'], schedule: 'Seg 20:50', semester: 4 },
  { id: 'c403', code: 'EXT401', name: 'Extensão I', professor: 'Ligia', credits: 80, slots: 30, preReqs: [], schedule: 'Ter 19:00 / Sex (EAD)', semester: 4 },
  { id: 'c404', code: 'ADS403', name: 'Redes de Computadores', professor: 'Junio', credits: 80, slots: 30, preReqs: ['c302'], schedule: 'Ter 20:50 / Qui 20:50', semester: 4 },
  { id: 'c405', code: 'ADS404', name: 'Desenv. Aplicações WEB I', professor: 'Cintia', credits: 80, slots: 30, preReqs: ['c203'], schedule: 'Qua 19:00 / Qui 19:00', semester: 4 },
  { id: 'c406', code: 'ADS405', name: 'Estrutura de Dados II', professor: 'Junio', credits: 40, slots: 30, preReqs: ['c304'], schedule: 'Qua 20:50', semester: 4 },

  // --- 5º PERÍODO ---
  { id: 'c501', code: 'ADS501', name: 'Sistemas Distribuídos', professor: 'Cicero', credits: 80, slots: 30, preReqs: ['c404'], schedule: 'Seg 19:00 / Sex (EAD)', semester: 5 },
  { id: 'c502', code: 'ADS502', name: 'Desenv. Aplicação WEB II', professor: 'Lucas', credits: 80, slots: 30, preReqs: ['c405'], schedule: 'Seg 20:50 / Qua 20:50', semester: 5 },
  { id: 'c503', code: 'ADS503', name: 'Tópicos Especiais', professor: 'Danielli', credits: 40, slots: 30, preReqs: [], schedule: 'Ter 19:00', semester: 5 },
  { id: 'c504', code: 'EXT501', name: 'Extensão II', professor: 'Cintia', credits: 80, slots: 30, preReqs: ['c403'], schedule: 'Ter 20:50 / Qui 20:50', semester: 5 },
  { id: 'c505', code: 'ADM501', name: 'Inteligência de Negócios', professor: 'Danielli', credits: 40, slots: 30, preReqs: [], schedule: 'Qua 19:00', semester: 5 },
  { id: 'c506', code: 'ADM502', name: 'Empreendedorismo', professor: 'Marcio', credits: 40, slots: 30, preReqs: [], schedule: 'Qui 19:00', semester: 5 },
  { id: 'c507', code: 'ADS504', name: 'Experiência do Usuário', professor: 'Danielli', credits: 40, slots: 50, preReqs: [], schedule: 'Sex (EAD)', semester: 5 },

  // --- 6º PERÍODO ---
  { id: 'c601', code: 'ADM601', name: 'Gerência de Projetos', professor: 'João Marcos', credits: 80, slots: 30, preReqs: [], schedule: 'Seg 19:00 / Sex (EAD)', semester: 6 },
  { id: 'c602', code: 'ADS601', name: 'Inteligência Artificial', professor: 'Danielli', credits: 80, slots: 30, preReqs: [], schedule: 'Seg 20:50 / Ter 20:50', semester: 6 },
  { id: 'c603', code: 'ADS602', name: 'Prog. Dispositivos Móveis', professor: 'Junio', credits: 80, slots: 30, preReqs: ['c402'], schedule: 'Ter 19:00 / Qui 19:00', semester: 6 },
  { id: 'c604', code: 'ADS603', name: 'Lab. Redes (Optativa)', professor: 'Junio', credits: 40, slots: 30, preReqs: ['c404'], schedule: 'Qua 19:00', semester: 6 },
  { id: 'c605', code: 'EXT601', name: 'Extensão III', professor: 'Jean / Ligia', credits: 120, slots: 30, preReqs: ['c504'], schedule: 'Qua 20:50 / Qui 20:50 / Sex (EAD)', semester: 6 },
  { id: 'c606', code: 'ADS604', name: 'Segurança da Informação', professor: 'Junio', credits: 40, slots: 50, preReqs: ['c404'], schedule: 'Sex (EAD)', semester: 6 },
];

// Helper to get IDs of semester 1 and 2
const SEM1_IDS = MOCK_COURSES.filter(c => c.semester === 1).map(c => c.id);
const SEM2_IDS_EXCEPT_BD1 = MOCK_COURSES.filter(c => c.semester === 2 && c.name !== 'Banco de Dados I').map(c => c.id);

export const MOCK_USERS: User[] = [
  {
    id: 'u-joao',
    name: 'João da Silva',
    email: 'joao@sgm.edu.br',
    password: '@Joao123',
    role: UserRole.STUDENT,
    // Concluiu todo o 1º semestre + todo o 2º exceto BD1
    passedCourses: [...SEM1_IDS, ...SEM2_IDS_EXCEPT_BD1] 
  },
  {
    id: 'u-lucas',
    name: 'Lucas Formando',
    email: 'lucas@sgm.edu.br',
    password: '@Lucas23',
    role: UserRole.STUDENT,
    // Concluiu todas as disciplinas
    passedCourses: MOCK_COURSES.map(c => c.id) 
  },
  {
    id: 'coord-ligia',
    name: 'Prof. Ligia',
    email: 'ligia@sgm.edu.br',
    password: '@Ligia123',
    role: UserRole.COORDINATOR
  },
  {
    id: 'sec-maria',
    name: 'Maria Secretaria',
    email: 'maria@sgm.edu.br',
    password: '@Maria123',
    role: UserRole.SECRETARY
  }
];

export const MOCK_DOCS: AcademicDoc[] = [
  { id: 'd1', studentId: 'u-joao', studentName: 'João da Silva', type: DocType.ENROLLMENT_PROOF, date: '2023-10-01', status: 'Pendente' },
];

export const MOCK_GRAD_REQUESTS: GraduationRequest[] = [];

export const MOCK_EVENTS: AcademicEvent[] = [
    {
        id: 'ev1',
        title: 'Trabalho de Conclusão de Curso (TCC)',
        description: 'Atenção alunos do 6º período: A entrega da documentação inicial foi prorrogada até sexta-feira.',
        date: new Date().toISOString(),
        type: 'NOTICE',
        author: 'Coord. Ligia'
    },
    {
        id: 'ev2',
        title: 'Aula Magna: IA no Mercado',
        description: 'Palestra com convidado especial da Microsoft. Contará como horas complementares.',
        date: new Date().toISOString(),
        type: 'LECTURE',
        author: 'Prof. Danielli',
        courseId: 'c602' // Links to Inteligência Artificial
    },
    {
        id: 'ev3',
        title: 'Aviso: Banco de Dados I',
        description: 'A prova substitutiva ocorrerá na próxima segunda-feira, sala B-102.',
        date: new Date().toISOString(),
        type: 'NOTICE',
        author: 'Prof. Wesley',
        courseId: 'c202' // Links to Banco de Dados I
    }
];

// Initial Requests
const INITIAL_REQUESTS: EnrollmentRequest[] = [];

// --- LOGIC SERVICE ---

class EnrollmentService {
  private requests: EnrollmentRequest[] = [...INITIAL_REQUESTS];
  private documents: AcademicDoc[] = [...MOCK_DOCS];
  private notifications: Notification[] = [];
  private gradRequests: GraduationRequest[] = [...MOCK_GRAD_REQUESTS];
  private events: AcademicEvent[] = [...MOCK_EVENTS];
  private notifiedEligibility: string[] = [];

  constructor() {
    // Add initial system notification for all students
    MOCK_USERS.forEach(user => {
      this.notifications.push({
        id: `n-init-${user.id}`,
        userId: user.id,
        title: 'Bem-vindo ao SGM',
        message: 'O período de matrículas está aberto. Faça login para realizar sua solicitação.',
        date: new Date().toISOString(),
        read: false,
        type: 'info'
      });
    });
  }

  // Helper to add notification linked to user
  private addNotification(userId: string, title: string, message: string, type: 'info' | 'warning' | 'success') {
    this.notifications.unshift({
      id: `n-${Date.now()}-${Math.random()}`,
      userId,
      title,
      message,
      date: new Date().toISOString(),
      read: false,
      type
    });
  }

  // Helper to notify all users of a certain role
  private notifyRole(role: UserRole, title: string, message: string, type: 'info' | 'warning' | 'success') {
      const users = MOCK_USERS.filter(u => u.role === role);
      users.forEach(user => {
          this.addNotification(user.id, title, message, type);
      });
  }

  // --- TIME CONFLICT LOGIC ---
  public hasTimeConflict(schedule1: string, schedule2: string): boolean {
    if (!schedule1 || !schedule2) return false;
    
    // Normalize and split by delimiter to compare individual slots
    const slots1 = schedule1.split('/').map(s => s.trim());
    const slots2 = schedule2.split('/').map(s => s.trim());

    return slots1.some(s1 => slots2.includes(s1));
  }

  // Exposed helper for frontend to check conflicts BEFORE creating request
  checkConflictForStudent(studentId: string, newCourse: Course): { hasConflict: boolean, conflictingReq?: EnrollmentRequest } {
    const activeRequests = this.getRequestsByStudent(studentId).filter(r => 
        r.status === RequestStatus.PENDING || r.status === RequestStatus.APPROVED
    );

    for (const req of activeRequests) {
        const existingCourse = MOCK_COURSES.find(c => c.id === req.courseId);
        if (existingCourse && this.hasTimeConflict(existingCourse.schedule, newCourse.schedule)) {
            return { hasConflict: true, conflictingReq: req };
        }
    }

    return { hasConflict: false };
  }

  // RF06: Validação Automática de Requisitos
  validateRequest(student: User, course: Course, currentRequests: EnrollmentRequest[]): ValidationResult {
    // 1. Check Pre-requisites
    if (course.preReqs.length > 0) {
      const missing = course.preReqs.filter(reqId => !student.passedCourses?.includes(reqId));
      if (missing.length > 0) {
        const missingNames = missing.map(mId => MOCK_COURSES.find(c => c.id === mId)?.name).join(', ');
        return { isValid: false, message: `Pré-requisitos não atendidos: ${missingNames}`, missingPreReqs: true };
      }
    }

    // 2. Check Vacancies (Slots)
    const enrolledCount = this.requests.filter(r => 
      r.courseId === course.id && 
      (r.status === RequestStatus.APPROVED || r.status === RequestStatus.PENDING)
    ).length;

    if (enrolledCount >= course.slots) {
      return { isValid: false, message: 'Turma lotada (Sem vagas).' };
    }

    // 3. Check Duplicate
    const studentActiveRequests = currentRequests.filter(r => 
      r.status === RequestStatus.PENDING || r.status === RequestStatus.APPROVED
    );
    
    if (studentActiveRequests.some(r => r.courseId === course.id)) {
      return { isValid: false, message: 'Você já solicitou matrícula nesta disciplina.' };
    }

    // 4. Check if already passed
    if (student.passedCourses?.includes(course.id)) {
      return { isValid: false, message: 'Você já foi aprovado nesta disciplina.' };
    }

    return { isValid: true };
  }

  getRequestsByStudent(studentId: string): EnrollmentRequest[] {
    return this.requests.filter(r => r.studentId === studentId && r.status !== RequestStatus.CANCELLED)
        .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
  }

  getAllPendingRequests(): EnrollmentRequest[] {
    return this.requests.filter(r => r.status === RequestStatus.PENDING);
  }

  createRequest(student: User, course: Course): EnrollmentRequest {
    const studentRequests = this.getRequestsByStudent(student.id);
    const activeRequests = studentRequests.filter(r => r.status !== RequestStatus.CANCELLED);
    
    const validation = this.validateRequest(student, course, activeRequests);
    const status = validation.isValid ? RequestStatus.PENDING : RequestStatus.SYSTEM_REJECTED;

    const newRequest: EnrollmentRequest = {
      id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      studentId: student.id,
      studentName: student.name,
      courseId: course.id,
      courseName: course.name,
      courseSchedule: course.schedule,
      status: status,
      requestedAt: new Date().toISOString(),
      justification: validation.isValid ? undefined : validation.message
    };

    this.requests.push(newRequest);

    if (status === RequestStatus.SYSTEM_REJECTED) {
      this.addNotification(
        student.id,
        'Solicitação Rejeitada Automaticamente',
        `Sua solicitação para ${course.name} foi recusada: ${validation.message}`,
        'warning'
      );
    } else {
      this.addNotification(
        student.id,
        'Solicitação Enviada',
        `Sua solicitação de matrícula em ${course.name} foi enviada para análise.`,
        'info'
      );
      
      // Notify Coordinator
      this.notifyRole(
          UserRole.COORDINATOR,
          'Nova Matrícula Pendente',
          `O aluno ${student.name} solicitou matrícula em ${course.name}.`,
          'info'
      );
    }

    return newRequest;
  }

  cancelRequest(requestId: string): void {
    const idx = this.requests.findIndex(r => r.id === requestId);
    if (idx !== -1) {
      const req = this.requests[idx];
      req.status = RequestStatus.CANCELLED;
      
      this.addNotification(
        req.studentId,
        'Solicitação Cancelada',
        `Você cancelou a solicitação para ${req.courseName}.`,
        'info'
      );
    }
  }

  checkScheduleConflict(studentId: string, courseId: string): { hasConflict: boolean, conflictingCourse?: string } {
    const studentApprovedRequests = this.requests.filter(r => 
        r.studentId === studentId && r.status === RequestStatus.APPROVED
    );
    const targetCourse = MOCK_COURSES.find(c => c.id === courseId);

    if (!targetCourse) return { hasConflict: false };

    const conflict = studentApprovedRequests.find(r => {
       const approvedCourse = MOCK_COURSES.find(c => c.id === r.courseId);
       return approvedCourse && this.hasTimeConflict(approvedCourse.schedule, targetCourse.schedule);
    });

    if (conflict) {
      return { hasConflict: true, conflictingCourse: conflict.courseName };
    }
    return { hasConflict: false };
  }

  updateStatus(requestId: string, status: RequestStatus, justification?: string): void {
    const idx = this.requests.findIndex(r => r.id === requestId);
    if (idx !== -1) {
      const req = this.requests[idx];

      if (status === RequestStatus.APPROVED) {
        const conflictCheck = this.checkScheduleConflict(req.studentId, req.courseId);
        if (conflictCheck.hasConflict) {
            throw new Error(`Conflito com ${conflictCheck.conflictingCourse}`);
        }
      }

      req.status = status;
      if (justification) {
        req.justification = justification;
      }

      const title = status === RequestStatus.APPROVED ? 'Matrícula Aprovada' : 'Matrícula Rejeitada';
      const type = status === RequestStatus.APPROVED ? 'success' : 'warning';
      const msg = status === RequestStatus.APPROVED 
        ? `Parabéns! Sua matrícula em ${req.courseName} foi confirmada.`
        : `Sua solicitação em ${req.courseName} foi rejeitada: ${justification}`;

      this.addNotification(req.studentId, title, msg, type);

      // Generate Enrollment Proof upon Approval
      if (status === RequestStatus.APPROVED) {
        this.documents.push({
            id: `doc-enroll-${Date.now()}`,
            studentId: req.studentId,
            studentName: req.studentName,
            type: DocType.ENROLLMENT_PROOF,
            date: new Date().toISOString(),
            status: 'Pendente'
        });
      }
    }
  }

  // Secretary Methods
  getAllDocuments(): AcademicDoc[] {
    const validStudentIds = MOCK_USERS.filter(u => u.role === UserRole.STUDENT).map(u => u.id);
    return this.documents.filter(d => validStudentIds.includes(d.studentId));
  }
  
  getDocumentsByStudent(studentId: string): AcademicDoc[] {
    return this.documents.filter(d => d.studentId === studentId);
  }

  updateDocStatus(docId: string, status: 'Gerado' | 'Arquivado'): void {
    const idx = this.documents.findIndex(d => d.id === docId);
    if (idx !== -1) {
      this.documents[idx].status = status;
      
      if (status === 'Gerado' || status === 'Arquivado') {
        const doc = this.documents[idx];
        this.addNotification(
          doc.studentId,
          'Documento Disponível',
          `Seu documento '${doc.type}' foi gerado/assinado e está disponível para download.`,
          'success'
        );
      }
    }
  }

  exportHistory(student: User): string {
    const passedIds = student.passedCourses || [];
    
    let report = `==================================================\n`;
    report += `              HISTÓRICO ESCOLAR\n`;
    report += `==================================================\n\n`;
    report += `INSTITUIÇÃO: IFTM - Campus Patrocínio\n`;
    report += `CURSO: Análise e Desenvolvimento de Sistemas\n`;
    report += `ALUNO: ${student.name.toUpperCase()}\n`;
    report += `MATRÍCULA: ${student.id.toUpperCase()}\n`;
    report += `DATA DE EMISSÃO: ${new Date().toLocaleDateString()}\n`;
    report += `--------------------------------------------------\n\n`;

    if (passedIds.length === 0) {
      report += "Nenhuma disciplina concluída até o momento.\n";
    } else {
      let totalHours = 0;

      for (let i = 1; i <= 6; i++) {
        const semesterCourses = MOCK_COURSES.filter(c => c.semester === i && passedIds.includes(c.id));
        
        if (semesterCourses.length > 0) {
          report += `[ ${i}º PERÍODO ]\n`;
          semesterCourses.forEach(c => {
            report += `- [${c.code}] ${c.name} (${c.credits}h)\n  Prof. ${c.professor} | Status: APROVADO\n`;
            totalHours += c.credits;
          });
          report += `\n`;
        }
      }

      const estimatedTotal = 2400; // Mock total
      const percentage = ((totalHours / estimatedTotal) * 100).toFixed(1);

      report += `--------------------------------------------------\n`;
      report += `RESUMO DE INTEGRALIZAÇÃO\n`;
      report += `TOTAL DE HORAS CURSADAS: ${totalHours}h\n`;
      report += `PROGRESSO ESTIMADO: ${percentage}%\n`;
      report += `STATUS: ${totalHours >= estimatedTotal ? 'CONCLUÍDO' : 'EM CURSO'}\n`;
    }

    report += `\n==================================================\n`;
    report += `Este documento é uma simulação gerada pelo sistema SGM.\n`;
    report += `Não possui validade legal sem assinatura da secretaria.\n`;

    return report;
  }

  getNotifications(userId: string): Notification[] {
    return this.notifications.filter(n => n.userId === userId);
  }

  markNotificationRead(id: string): void {
    const note = this.notifications.find(n => n.id === id);
    if (note) note.read = true;
  }

  markAllNotificationsRead(userId: string): void {
    this.notifications
      .filter(n => n.userId === userId)
      .forEach(n => n.read = true);
  }

  // Helpers for Completion
  getPendingCoursesForStudent(student: User): Course[] {
    if (!student.passedCourses) return MOCK_COURSES;
    return MOCK_COURSES.filter(c => !student.passedCourses?.includes(c.id));
  }
  
  checkGraduationEligibility(student: User) {
    if (this.notifiedEligibility.includes(student.id)) return;

    const pending = this.getPendingCoursesForStudent(student);
    if (pending.length === 0) {
        this.addNotification(
            student.id,
            'Colação de Grau',
            'Parabéns! Você concluiu 100% da grade curricular e já pode solicitar sua Colação de Grau na seção Conclusão de Curso.',
            'success'
        );
        this.notifiedEligibility.push(student.id);
    }
  }

  getAllStudentsProgress() {
    return MOCK_USERS.filter(u => u.role === UserRole.STUDENT).map(student => {
       const totalCredits = MOCK_COURSES.length; 
       const completed = student.passedCourses?.length || 0;
       const progress = Math.min(100, Math.round((completed / totalCredits) * 100));
       
       const pendingCount = totalCredits - completed;
       let missingText = pendingCount === 0 ? 'Nenhuma' : `${pendingCount} Disciplina(s)`;
       
       return {
         id: student.id,
         name: student.name,
         progress: progress,
         missing: missingText
       };
    });
  }

  getGraduationRequests(): GraduationRequest[] {
    return this.gradRequests;
  }

  getGraduationRequestForStudent(studentId: string): GraduationRequest | undefined {
      return this.gradRequests.find(r => r.studentId === studentId);
  }

  createGraduationRequest(student: User): void {
      const exists = this.gradRequests.find(r => r.studentId === student.id);
      if (exists) return;

      const newReq: GraduationRequest = {
          id: `grad-${Date.now()}`,
          studentId: student.id,
          studentName: student.name,
          course: 'Análise e Desenv. Sistemas',
          date: new Date().toISOString(),
          status: 'Pendente'
      };
      this.gradRequests.push(newReq);
      
      this.addNotification(
          student.id,
          'Colação de Grau Solicitada',
          'Sua solicitação de colação de grau foi enviada para análise da coordenação.',
          'info'
      );

      // Notify Coordinator
      this.notifyRole(
        UserRole.COORDINATOR,
        'Pedido de Colação de Grau',
        `O aluno ${student.name} solicitou colação de grau.`,
        'info'
      );
  }

  updateGradRequest(id: string, status: 'Deferido' | 'Indeferido'): void {
    const req = this.gradRequests.find(r => r.id === id);
    if (req) {
      req.status = status;
      
      if (status === 'Deferido') {
        this.addNotification(
            req.studentId,
            'Colação Deferida',
            `O pedido de colação de ${req.studentName} foi deferido. Documentos enviados para emissão na secretaria.`,
            'success'
        );

        this.notifyRole(
            UserRole.SECRETARY,
            'Documentação de Formatura',
            `O coordenador deferiu a colação de ${req.studentName}. Documentos aguardam emissão.`,
            'warning'
        );

        this.documents.push({
          id: `doc-dip-${Date.now()}`,
          studentId: req.studentId,
          studentName: req.studentName,
          type: DocType.DIPLOMA_REQ,
          date: new Date().toISOString(),
          status: 'Pendente'
        });

        this.documents.push({
            id: `doc-hist-${Date.now()}`,
            studentId: req.studentId,
            studentName: req.studentName,
            type: DocType.HISTORY,
            date: new Date().toISOString(),
            status: 'Pendente'
          });

         this.documents.push({
            id: `doc-cert-${Date.now()}`,
            studentId: req.studentId,
            studentName: req.studentName,
            type: DocType.CERTIFICATE,
            date: new Date().toISOString(),
            status: 'Pendente'
          });
      } else {
         this.addNotification(
            req.studentId,
            'Colação Indeferida',
            `O pedido de colação de ${req.studentName} foi indeferido.`,
            'warning'
        );
      }
    }
  }

  getEvents(): AcademicEvent[] {
    return this.events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

export const enrollmentService = new EnrollmentService();
