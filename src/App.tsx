
import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole, Course, RequestStatus, EnrollmentRequest, AcademicDoc, Notification, GraduationRequest, AcademicEvent } from './types';
import {MOCK_USERS, MOCK_COURSES, enrollmentService } from '../services/mockDb';
import { 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  LogOut, 
  Menu, 
  Download, 
  Phone, 
  AlertCircle,
  Search,
  User as UserIcon,
  FileText,
  Filter,
  Trash2,
  Archive,
  X,
  ChevronRight,
  HelpCircle,
  Bell,
  ChevronDown,
  ArrowLeft,
  Mail,
  MessageCircle,
  Ban,
  ArrowUpDown,
  GraduationCap,
  Settings,
  Shield,
  Save,
  Lock,
  Globe,
  BarChart2,
  FileCheck,
  Briefcase,
  RefreshCw,
  Grid,
  Megaphone,
  Layout,
  Sparkles,
  PlayCircle
} from 'lucide-react';

// --- COMPONENTS ---

// 1. Login Component
const LoginScreen = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (user) {
        onLogin(user);
      } else {
        setError('E-mail ou senha inválidos.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-primary p-6 text-center">
          <h1 className="text-2xl font-bold text-white">SGM</h1>
          <p className="text-blue-100">Sistema de Gestão de Matrículas</p>
        </div>
        
        <form onSubmit={handleLoginSubmit} className="p-8 space-y-6">
          <div className="text-center text-gray-600 mb-4">
            <p>Acesse sua conta para continuar</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="nome@sgm.edu.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="password" 
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-primary text-white rounded-md font-bold hover:bg-blue-800 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="mt-4 p-4 bg-gray-50 rounded text-xs text-gray-500 border border-gray-200">
             <p className="font-bold mb-1">Credenciais de Teste:</p>
             <ul className="space-y-1">
               <li>João: <code>joao@sgm.edu.br</code> | <code>@Joao123</code></li>
               <li>Lucas: <code>lucas@sgm.edu.br</code> | <code>@Lucas23</code></li>
               <li>Ligia (Coord): <code>ligia@sgm.edu.br</code> | <code>@Ligia123</code></li>
               <li>Maria (Sec): <code>maria@sgm.edu.br</code> | <code>@Maria123</code></li>
             </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

// Rejection Modal
const RejectionModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: (reason: string) => void }) => {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <div className="bg-red-50 p-4 border-b border-red-100 rounded-t-lg flex justify-between items-center">
          <h3 className="text-red-800 font-bold flex items-center gap-2">
            <XCircle size={20} />
            Rejeitar Matrícula
          </h3>
          <button onClick={onClose} className="text-red-400 hover:text-red-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motivo da Rejeição:
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 focus:ring-red-500 focus:border-red-500 outline-none text-sm"
            rows={4}
            placeholder="Descreva o motivo (ex: Falta de pré-requisitos, choque de horário não detectado, etc.)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => onConfirm(reason || 'Critério Acadêmico')}
            className="px-4 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors shadow-sm"
          >
            Confirmar Rejeição
          </button>
        </div>
      </div>
    </div>
  );
};

// Conflict Resolution Modal
const ConflictResolutionModal = ({ 
  isOpen, 
  onClose, 
  onSwap, 
  newCourse, 
  conflictingReq 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onSwap: () => void, 
  newCourse: Course | null, 
  conflictingReq: EnrollmentRequest | null 
}) => {
  if (!isOpen || !newCourse || !conflictingReq) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-in fade-in zoom-in duration-200">
        <div className="bg-amber-50 p-4 border-b border-amber-100 rounded-t-lg flex justify-between items-center">
          <h3 className="text-amber-800 font-bold flex items-center gap-2">
            <AlertCircle size={20} />
            Conflito de Horário Detectado
          </h3>
          <button onClick={onClose} className="text-amber-500 hover:text-amber-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Você está tentando solicitar matrícula na disciplina:
          </p>
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mb-4">
             <p className="font-bold text-blue-900">{newCourse.name}</p>
             <p className="text-sm text-blue-700">{newCourse.schedule}</p>
          </div>

          <p className="text-gray-700 mb-4">
            Porém, este horário conflita com uma solicitação ativa:
          </p>
          <div className="bg-red-50 p-3 rounded-md border border-red-100 mb-6">
             <p className="font-bold text-red-900">{conflictingReq.courseName}</p>
             <p className="text-sm text-red-700">{conflictingReq.courseSchedule}</p>
             <span className="text-xs font-bold text-red-600 uppercase mt-1 inline-block bg-white px-2 py-0.5 rounded border border-red-200">
               Status: {conflictingReq.status}
             </span>
          </div>

          <p className="text-sm text-gray-500 italic">
            Como deseja prosseguir?
          </p>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors flex-1 md:flex-none"
          >
            Manter Anterior
            <span className="block text-[10px] font-normal text-gray-400">Cancelar Nova Solicitação</span>
          </button>
          <button 
            onClick={onSwap}
            className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm flex-1 md:flex-none flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Substituir
            <span className="hidden md:block text-[10px] font-normal opacity-80 pl-1">Cancelar Antiga & Solicitar Nova</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Recommendation Preview Modal
const RecommendationPreviewModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  recommendedCourses 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onConfirm: () => void, 
  recommendedCourses: Course[] 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-in fade-in zoom-in duration-200">
        <div className="bg-indigo-50 p-4 border-b border-indigo-100 rounded-t-lg flex justify-between items-center">
          <h3 className="text-indigo-800 font-bold flex items-center gap-2">
            <Sparkles size={20} className="text-indigo-600" />
            Sugestão Inteligente de Matrícula
          </h3>
          <button onClick={onClose} className="text-indigo-400 hover:text-indigo-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="mb-4">
             <p className="text-gray-600 mb-2">
               O sistema encontrou <strong>{recommendedCourses.length}</strong> disciplinas que se encaixam no seu horário e cumprem os requisitos.
             </p>
          </div>

          <div className="space-y-2 mb-6">
             {recommendedCourses.map((c, i) => (
               <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-200">
                  <div>
                    <p className="font-bold text-gray-800">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.code} • Semestre {c.semester}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-indigo-600">{c.schedule}</p>
                  </div>
               </div>
             ))}
          </div>

          <div className="bg-indigo-50 p-4 rounded text-sm text-indigo-900 flex gap-2">
             <Clock size={16} className="shrink-0 mt-0.5"/>
             <p>Ao confirmar, o sistema enviará solicitações para todas as disciplinas listadas acima. Você poderá cancelar qualquer uma delas individualmente depois.</p>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <CheckCircle size={18}/>
            Confirmar Solicitação em Massa
          </button>
        </div>
      </div>
    </div>
  );
};

// Change Password Modal
const ChangePasswordModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm animate-in fade-in zoom-in duration-200">
        <div className="bg-gray-50 p-4 border-b border-gray-100 rounded-t-lg flex justify-between items-center">
          <h3 className="text-gray-800 font-bold flex items-center gap-2">
            <Lock size={18} />
            Alterar Senha
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Senha Atual</label>
            <input type="password" className="w-full border rounded p-2 text-sm focus:ring-primary focus:border-primary outline-none"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nova Senha</label>
            <input type="password" className="w-full border rounded p-2 text-sm focus:ring-primary focus:border-primary outline-none"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Confirmar Nova Senha</label>
            <input type="password" className="w-full border rounded p-2 text-sm focus:ring-primary focus:border-primary outline-none"/>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => { alert('Senha alterada com sucesso!'); onClose(); }}
            className="px-4 py-2 bg-primary text-white rounded-md font-medium text-sm hover:bg-blue-800 transition-colors shadow-sm"
          >
            Salvar Senha
          </button>
        </div>
      </div>
    </div>
  );
};

// Course Details Modal
const CourseDetailsModal = ({ course, onClose }: { course: Course, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-primary px-6 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-lg">{course.name}</h3>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Código</p>
               <p className="text-gray-800">{course.code}</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Carga Horária</p>
               <p className="text-gray-800">{course.credits} Horas</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Semestre Ideal</p>
               <p className="text-gray-800">{course.semester}º</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Vagas Totais</p>
               <p className="text-gray-800">{course.slots}</p>
             </div>
          </div>
          
          <div className="border-t pt-4">
             <p className="text-xs text-gray-500 uppercase font-bold mb-1">Professor Responsável</p>
             <div className="flex items-center gap-2">
               <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                 <UserIcon size={16} />
               </div>
               <p className="font-medium text-gray-800">{course.professor}</p>
             </div>
          </div>

          <div className="border-t pt-4">
             <p className="text-xs text-gray-500 uppercase font-bold mb-1">Horário</p>
             <div className="flex items-center gap-2 bg-gray-50 p-3 rounded border border-gray-100">
               <Clock size={18} className="text-gray-400" />
               <p className="font-medium text-gray-700">{course.schedule}</p>
             </div>
          </div>

          <div className="border-t pt-4">
             <p className="text-xs text-gray-500 uppercase font-bold mb-1">Pré-requisitos</p>
             {course.preReqs.length > 0 ? (
               <ul className="list-disc pl-5 text-sm text-gray-600">
                 {course.preReqs.map(id => {
                   const req = MOCK_COURSES.find(c => c.id === id);
                   return <li key={id}>{req?.name} ({req?.code})</li>
                 })}
               </ul>
             ) : (
               <p className="text-sm text-gray-500 italic">Esta disciplina não possui pré-requisitos.</p>
             )}
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-medium hover:bg-gray-300 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  return (
    <details className="group border rounded-lg bg-white overflow-hidden transition-all duration-300">
      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer bg-white hover:bg-gray-50 transition-colors">
        <span className="font-medium text-gray-700 group-open:text-primary">{question}</span>
        <span className="transition-transform group-open:rotate-180">
          <ChevronDown size={18} className="text-gray-400 group-open:text-primary" />
        </span>
      </summary>
      <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600 border-t">
        {answer}
      </div>
    </details>
  );
};

// --- NEW VIEWS FOR SIDEBAR ---

// Notifications View
const NotificationsView = ({ user }: { user: User }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications([...enrollmentService.getNotifications(user.id)]);
  }, [user.id]);

  const handleMarkAsRead = (id?: string) => {
    if (id) {
      enrollmentService.markNotificationRead(id);
    } else {
      enrollmentService.markAllNotificationsRead(user.id);
    }
    setNotifications([...enrollmentService.getNotifications(user.id)]);
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell className="text-primary"/> 
            Minhas Notificações
          </h2>
          <button 
            onClick={() => handleMarkAsRead()}
            className="text-sm text-primary hover:underline font-medium"
          >
            Marcar todas como lidas
          </button>
        </div>
        
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-500 py-12 flex flex-col items-center gap-3">
              <div className="bg-gray-100 p-4 rounded-full">
                <Bell size={32} className="text-gray-400"/>
              </div>
              <p>Nenhuma notificação encontrada.</p>
            </div>
          ) : (
            notifications.map(note => (
              <div 
                key={note.id} 
                onClick={() => handleMarkAsRead(note.id)}
                className={`p-4 rounded-lg border flex gap-3 cursor-pointer transition-all hover:shadow-sm ${note.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}
              >
                <div className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${note.read ? 'bg-gray-300' : 'bg-blue-600'}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-semibold text-sm ${note.read ? 'text-gray-700' : 'text-blue-900'}`}>{note.title}</h4>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={10}/>
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{note.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Profile View
const UserProfile = ({ user }: { user: User }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  const [showPwdModal, setShowPwdModal] = useState(false);

  const handleSave = () => {
    // Mock save
    alert('Dados atualizados com sucesso!');
    setIsEditing(false);
  };

  const accessHistory = [
    { date: '26/11/2025 14:30', ip: '192.168.1.10', device: 'Chrome / Windows' },
    { date: '25/11/2025 09:15', ip: '192.168.1.10', device: 'Chrome / Windows' },
    { date: '24/11/2025 18:45', ip: '201.55.43.12', device: 'Safari / iPhone' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <ChangePasswordModal isOpen={showPwdModal} onClose={() => setShowPwdModal(false)} />

       <div className="bg-white p-6 rounded-lg shadow-sm border">
         <div className="flex flex-col md:flex-row items-center gap-6">
           <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg shrink-0">
             {user.name.charAt(0)}
           </div>
           
           <div className="flex-1 w-full text-center md:text-left">
             {isEditing ? (
               <div className="space-y-3 max-w-md">
                 <input 
                   type="text" 
                   value={formData.name} 
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   className="w-full border rounded p-2 text-lg font-bold text-gray-800"
                 />
                 <input 
                   type="email" 
                   value={formData.email} 
                   onChange={e => setFormData({...formData, email: e.target.value})}
                   className="w-full border rounded p-2 text-gray-600"
                 />
                 <div className="flex gap-2 justify-center md:justify-start pt-2">
                   <button onClick={handleSave} className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm"><Save size={14}/> Salvar</button>
                   <button onClick={() => setIsEditing(false)} className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm"><X size={14}/> Cancelar</button>
                 </div>
               </div>
             ) : (
               <>
                <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                <p className="text-gray-500">{formData.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wide">
                  {user.role}
                </span>
               </>
             )}
           </div>

           {!isEditing && (
             <button onClick={() => setIsEditing(true)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm font-medium">
               <Settings size={16}/> Editar Dados
             </button>
           )}
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-lg shadow-sm border">
           <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
             <BookOpen size={18} className="text-primary"/> 
             Informações Acadêmicas
           </h3>
           <div className="space-y-3 text-sm">
             <div className="flex justify-between">
               <span className="text-gray-500">Matrícula (ID)</span>
               <span className="font-medium">{user.id.toUpperCase()}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-gray-500">Curso</span>
               <span className="font-medium">Ciência da Computação</span>
             </div>
             <div className="flex justify-between">
               <span className="text-gray-500">Status</span>
               <span className="text-green-600 font-medium">Ativo</span>
             </div>
             <div className="flex justify-between">
               <span className="text-gray-500">Ingresso</span>
               <span className="font-medium">2023.1</span>
             </div>
           </div>
         </div>

         <div className="bg-white p-6 rounded-lg shadow-sm border">
           <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
             <Shield size={18} className="text-primary"/>
             Segurança
           </h3>
           <div className="space-y-4">
             <button 
               onClick={() => setShowPwdModal(true)}
               className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center group"
             >
               <span className="flex items-center gap-2"><Lock size={16} className="text-gray-400"/> Alterar Senha</span>
               <ChevronRight size={16} className="text-gray-400 group-hover:text-primary"/>
             </button>
             
             <div className="pt-2">
               <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-1">
                 <Globe size={12}/> Histórico de Acesso Recente
               </h4>
               <div className="overflow-hidden rounded-lg border border-gray-200">
                 <table className="w-full text-xs text-left">
                   <thead className="bg-gray-100 text-gray-600">
                     <tr>
                       <th className="px-3 py-2">Data</th>
                       <th className="px-3 py-2">IP</th>
                       <th className="px-3 py-2">Disp.</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {accessHistory.map((log, i) => (
                       <tr key={i} className="hover:bg-gray-50">
                         <td className="px-3 py-2">{log.date}</td>
                         <td className="px-3 py-2 text-gray-500">{log.ip}</td>
                         <td className="px-3 py-2 text-gray-500">{log.device}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
}

// Course Completion View
const CompletionView = ({ user }: { user: User }) => {
  const isStudent = user.role === UserRole.STUDENT;
  
  // States for Coordinator
  const [coordTab, setCoordTab] = useState<'status' | 'requests'>('status');
  const [gradRequests, setGradRequests] = useState<GraduationRequest[]>([]);
  const [studentProgressList, setStudentProgressList] = useState<any[]>([]); // Dynamic data
  
  // Filters for Tab 1 (Status)
  const [statusSearch, setStatusSearch] = useState('');
  const [statusSort, setStatusSort] = useState<'asc' | 'desc'>('desc'); // Sort by Progress

  // Filters for Tab 2 (Requests)
  const [reqSearch, setReqSearch] = useState('');
  const [reqSort, setReqSort] = useState<'asc' | 'desc'>('desc'); // Sort by Date
  
  // States for Student
  const [generatedDocs, setGeneratedDocs] = useState<AcademicDoc[]>([]);
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  useEffect(() => {
    if (!isStudent) {
      setGradRequests(enrollmentService.getGraduationRequests());
      setStudentProgressList(enrollmentService.getAllStudentsProgress()); // Fetch dynamic progress
    } else {
      // Fetch generated docs for student (Available or Generated)
      const docs = enrollmentService.getDocumentsByStudent(user.id);
      setGeneratedDocs(docs.filter(d => d.status === 'Gerado' || d.status === 'Arquivado'));
      
      // Check if student is eligible for graduation notification
      enrollmentService.checkGraduationEligibility(user);
    }
  }, [isStudent, user.id, triggerRefresh]);

  if (isStudent) {
    const totalCredits = 2400; // Mock total
    const completedCredits = (user.passedCourses?.length || 0) * 60; // Mock logic
    
    // Get actual pending courses based on mock DB
    const pendingCourses = enrollmentService.getPendingCoursesForStudent(user);

    // Calculate progress: If no pending courses, force 100%, otherwise calculate
    const progress = pendingCourses.length === 0 ? 100 : Math.min(100, Math.round((completedCredits / totalCredits) * 100));

    // Graduation Request Logic for Student
    const hasGradRequest = enrollmentService.getGraduationRequestForStudent(user.id);
    const canRequestGraduation = progress === 100 && !hasGradRequest;

    const handleRequestGraduation = () => {
        enrollmentService.createGraduationRequest(user);
        setTriggerRefresh(prev => prev + 1); // Trigger UI update without reload
    };

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <GraduationCap size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Progresso do Curso</h2>
              <p className="text-blue-100">Bacharelado em Ciência da Computação</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Conclusão Geral</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-3">
              <div 
                className="bg-accent h-3 rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2 text-blue-100 text-right">
              {pendingCourses.length === 0 ? 'Todas as disciplinas concluídas' : `${completedCredits} de ${totalCredits} horas cumpridas (estimado)`}
            </p>
          </div>

          {/* Graduation Request Button or Status */}
          {canRequestGraduation && (
              <div className="mt-6 pt-4 border-t border-white/20 text-center">
                  <p className="mb-3 font-medium">Parabéns! Você completou 100% do curso.</p>
                  <button 
                      onClick={handleRequestGraduation}
                      className="px-6 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors animate-bounce"
                  >
                      Solicitar Colação de Grau
                  </button>
              </div>
          )}

          {hasGradRequest && (
              <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                      <div>
                          <p className="font-bold text-sm">Solicitação de Colação</p>
                          <p className="text-xs opacity-80">Enviada em {new Date(hasGradRequest.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          hasGradRequest.status === 'Deferido' ? 'bg-green-500 text-white' : 
                          hasGradRequest.status === 'Indeferido' ? 'bg-red-500 text-white' : 
                          'bg-yellow-500 text-white'
                      }`}>
                          {hasGradRequest.status}
                      </span>
                  </div>
              </div>
          )}
        </div>
        
        {/* Documentos Gerados (Downloads) */}
        {generatedDocs.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-green-500 animate-in fade-in slide-in-from-bottom-2">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileCheck size={18} className="text-green-600"/> 
              Documentos Oficiais Disponíveis
            </h3>
            <div className="space-y-3">
               {generatedDocs.map(doc => (
                 <div key={doc.id} className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-100">
                    <div>
                      <p className="font-semibold text-gray-800">{doc.type}</p>
                      <p className="text-xs text-gray-500">Emitido em: {new Date(doc.date).toLocaleDateString()}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Iniciando download de: ${doc.type}`)}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-green-200 text-green-700 rounded text-sm font-medium hover:bg-green-100 transition-colors"
                    >
                      <Download size={16}/> Baixar
                    </button>
                 </div>
               ))}
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen size={18} className="text-primary"/> 
            Disciplinas Pendentes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {pendingCourses.length === 0 ? (
               <p className="text-green-600 flex items-center gap-2"><CheckCircle size={16}/> Você concluiu todas as disciplinas!</p>
             ) : (
               pendingCourses.map(course => (
                 <div key={course.id} className="border rounded-lg p-3 hover:bg-gray-50 flex justify-between items-center">
                   <div>
                     <p className="font-bold text-sm text-gray-800">{course.name}</p>
                     <p className="text-xs text-gray-500">{course.code} • {course.credits}h</p>
                   </div>
                   <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Semestre {course.semester}</span>
                 </div>
               ))
             )}
          </div>
        </div>
      </div>
    );
  }

  // Coordinator/Secretary View
  const handleGradAction = (id: string, action: 'Deferido' | 'Indeferido') => {
    enrollmentService.updateGradRequest(id, action);
    setGradRequests([...enrollmentService.getGraduationRequests()]); // refresh
    alert(`Solicitação ${action.toLowerCase()} com sucesso! Documentos enviados para secretaria.`);
  };

  // Filtering Logic for Tab 1
  const filteredStatus = studentProgressList
    .filter(s => s.name.toLowerCase().includes(statusSearch.toLowerCase()))
    .sort((a, b) => statusSort === 'desc' ? b.progress - a.progress : a.progress - b.progress);

  // Filtering Logic for Tab 2
  const filteredRequests = gradRequests
    .filter(r => r.studentName.toLowerCase().includes(reqSearch.toLowerCase()) || r.course.toLowerCase().includes(reqSearch.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return reqSort === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="bg-white p-6 rounded-lg shadow-sm border">
         <h2 className="text-xl font-bold mb-2">Gestão de Formandos</h2>
         <p className="text-gray-600">Controle de alunos aptos e solicitações de colação de grau.</p>
       </div>

       {/* Tabs with Student Portal Style */}
       <div className="bg-white rounded-lg shadow-sm p-2 flex overflow-x-auto gap-2">
         <button onClick={() => setCoordTab('status')} className={`flex-1 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${coordTab === 'status' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
           Situação Geral
         </button>
         <button onClick={() => setCoordTab('requests')} className={`flex-1 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${coordTab === 'requests' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
           Solicitações de Conclusão
         </button>
       </div>

       {coordTab === 'status' && (
         <>
           {/* Filters Toolbar */}
           <div className="bg-gray-50 p-3 rounded-lg border flex flex-col md:flex-row gap-3 items-center">
             <div className="relative w-full md:flex-1">
               <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
               <input 
                 type="text" 
                 placeholder="Buscar aluno..." 
                 className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary outline-none"
                 value={statusSearch}
                 onChange={(e) => setStatusSearch(e.target.value)}
               />
             </div>
             <button 
                onClick={() => setStatusSort(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
             >
                <BarChart2 size={16} />
                {statusSort === 'desc' ? 'Maior Progresso' : 'Menor Progresso'}
             </button>
           </div>

           <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
             <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-700 uppercase font-medium border-b">
                 <tr>
                   <th className="px-6 py-3">Aluno</th>
                   <th className="px-6 py-3">Progresso</th>
                   <th className="px-6 py-3">Pendências</th>
                 </tr>
               </thead>
               <tbody className="divide-y">
                 {filteredStatus.length === 0 ? (
                    <tr><td colSpan={3} className="px-6 py-4 text-center text-gray-500">Nenhum aluno encontrado.</td></tr>
                 ) : filteredStatus.map((s, i) => (
                   <tr key={i} className="hover:bg-gray-50">
                     <td className="px-6 py-4 font-medium text-gray-900">{s.name}</td>
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-2">
                         <div className="w-24 bg-gray-200 rounded-full h-2">
                           <div 
                              className={`${s.progress >= 95 ? 'bg-green-500' : 'bg-blue-500'} h-2 rounded-full`} 
                              style={{width: `${s.progress}%`}}
                            ></div>
                         </div>
                         <span className="text-xs text-gray-600 font-bold">{s.progress}%</span>
                       </div>
                     </td>
                     <td className="px-6 py-4 text-gray-500">{s.missing}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </>
       )}

       {coordTab === 'requests' && (
         <>
            {/* Filters Toolbar */}
           <div className="bg-gray-50 p-3 rounded-lg border flex flex-col md:flex-row gap-3 items-center">
             <div className="relative w-full md:flex-1">
               <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
               <input 
                 type="text" 
                 placeholder="Buscar por aluno ou curso..." 
                 className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary outline-none"
                 value={reqSearch}
                 onChange={(e) => setReqSearch(e.target.value)}
               />
             </div>
             <button 
                onClick={() => setReqSort(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
             >
                <ArrowUpDown size={16} />
                {reqSort === 'desc' ? 'Mais Recentes' : 'Mais Antigas'}
             </button>
           </div>

           <div className="grid gap-4">
              {filteredRequests.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-lg border border-dashed text-gray-500">
                  Nenhuma solicitação de colação de grau encontrada.
                </div>
              ) : (
                filteredRequests.map(req => (
                  <div key={req.id} className="bg-white rounded-lg shadow-sm border p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                       <div className="flex items-center gap-2 mb-1">
                         <span className="font-bold text-lg text-gray-800">{req.studentName}</span>
                         <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">ID: {req.studentId}</span>
                       </div>
                       <div className="text-gray-600 text-sm">
                         Curso: <strong>{req.course}</strong>
                       </div>
                       <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <Calendar size={14}/> Solicitado em: {new Date(req.date).toLocaleDateString()}
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              req.status === 'Deferido' ? 'bg-green-100 text-green-800' :
                              req.status === 'Indeferido' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                          }`}>
                              {req.status}
                          </span>
                       </div>
                     </div>
                     
                     {/* Show buttons ONLY for Coordinator */}
                     {user.role === UserRole.COORDINATOR && req.status === 'Pendente' && (
                       <div className="flex gap-2 shrink-0">
                         <button 
                          onClick={() => handleGradAction(req.id, 'Indeferido')}
                          className="px-4 py-2 border border-red-200 text-red-700 hover:bg-red-50 rounded-md text-sm font-medium transition-colors"
                         >
                           Indeferir
                         </button>
                         <button 
                          onClick={() => handleGradAction(req.id, 'Deferido')}
                          className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md text-sm font-medium transition-colors shadow-sm"
                         >
                           Deferir Colação
                         </button>
                       </div>
                     )}
                  </div>
                ))
              )}
           </div>
         </>
       )}
    </div>
  );
}

// 2. Student Portal
const StudentPortal = ({ user, onNavigateToNotifications }: { user: User, onNavigateToNotifications: () => void }) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'requests' | 'info'>('courses');
  const [requests, setRequests] = useState<EnrollmentRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [events, setEvents] = useState<AcademicEvent[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [highlightedRequestId, setHighlightedRequestId] = useState<string | null>(null);
  const [generatedDocs, setGeneratedDocs] = useState<AcademicDoc[]>([]);

  // Conflict Modal State
  const [conflictData, setConflictData] = useState<{ newCourse: Course, conflictingReq: EnrollmentRequest } | null>(null);

  // Recommendation Modal State
  const [recModalOpen, setRecModalOpen] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);

  // Filters
  const [semesterFilter, setSemesterFilter] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'passed' | 'not_passed'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  
  // New Filters
  const [dayFilter, setDayFilter] = useState<'all' | 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | '19:00' | '20:50'>('all');

  useEffect(() => {
    setRequests(enrollmentService.getRequestsByStudent(user.id));
    setNotifications([...enrollmentService.getNotifications(user.id)]); 
    setEvents(enrollmentService.getEvents());
    
    // Fetch docs for Info tab
    const docs = enrollmentService.getDocumentsByStudent(user.id);
    setGeneratedDocs(docs.filter(d => d.status === 'Gerado' || d.status === 'Arquivado'));
  }, [user.id, refreshTrigger]);

  const handleEnroll = (course: Course) => {
    // 1. Basic Validation (Pre-reqs, slots, etc.) - Dry Run
    const activeRequests = enrollmentService.getRequestsByStudent(user.id).filter(r => r.status !== RequestStatus.CANCELLED);
    const validation = enrollmentService.validateRequest(user, course, activeRequests);
    
    if (!validation.isValid) {
        alert(validation.message);
        return;
    }

    // 2. Conflict Check
    const conflict = enrollmentService.checkConflictForStudent(user.id, course);
    if (conflict.hasConflict && conflict.conflictingReq) {
        setConflictData({ newCourse: course, conflictingReq: conflict.conflictingReq });
        return;
    }

    // 3. Create Request (No conflict)
    performEnrollment(course);
  };

  const performEnrollment = (course: Course) => {
    const result = enrollmentService.createRequest(user, course);
    setRefreshTrigger(prev => prev + 1);
    
    if (result.status === RequestStatus.PENDING) {
      setActiveTab('requests');
      setHighlightedRequestId(result.id);
      setTimeout(() => setHighlightedRequestId(null), 2500);
    } else {
      alert(`Solicitação rejeitada automaticamente: ${result.justification}`);
    }
  };

  const handleSwapRequests = () => {
    if (conflictData) {
        // Cancel old
        enrollmentService.cancelRequest(conflictData.conflictingReq.id);
        // Create new
        performEnrollment(conflictData.newCourse);
        // Close modal
        setConflictData(null);
    }
  };

  const handleCancel = (e: React.MouseEvent, reqId: string, courseName: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm(`Tem certeza que deseja cancelar a solicitação para ${courseName}?`)) {
      // 1. Perform action in Service (Source of Truth)
      enrollmentService.cancelRequest(reqId);
      
      // 2. Immediate State Update (Optimistic/Sync)
      // Fetch the updated list directly from service to ensure UI consistency
      const freshRequests = enrollmentService.getRequestsByStudent(user.id);
      setRequests([...freshRequests]); // SPREAD to ensure new reference for React
      
      // 3. Trigger global refresh for other widgets (like notifications)
      setRefreshTrigger(prev => prev + 1);
    }
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Get fresh source of truth directly from service
    const currentRequests = enrollmentService.getRequestsByStudent(user.id);
    const pending = currentRequests.filter(r => r.status === RequestStatus.PENDING);

    if (pending.length === 0) {
        alert("Não há solicitações pendentes para limpar.");
        return;
    }

    if (window.confirm(`Isso cancelará ${pending.length} solicitações em análise. Deseja continuar?`)) {
        // 2. Perform actions
        pending.forEach(req => enrollmentService.cancelRequest(req.id));
        
        // 3. Immediate State Update
        // Force a completely new array reference and fetch to ensure UI update
        const freshRequests = enrollmentService.getRequestsByStudent(user.id);
        setRequests([...freshRequests]); // SPREAD to ensure new reference
        
        // 4. Trigger Global Refresh
        setRefreshTrigger(prev => prev + 1);
    }
  };

  const handleGenerateRecommendations = () => {
      // 1. Get Candidates: Valid, not enrolled, pre-reqs met
      const candidates = MOCK_COURSES.filter(c => {
          const activeRequests = requests.filter(r => r.status !== RequestStatus.CANCELLED);
          const validation = enrollmentService.validateRequest(user, c, activeRequests);
          return validation.isValid; 
      }).sort((a, b) => a.semester - b.semester);

      const toEnroll: Course[] = [];

      // 2. Greedy selection
      for (const course of candidates) {
          // Check conflict against ACTIVE requests (Approved/Pending)
          const conflictWithActive = enrollmentService.checkConflictForStudent(user.id, course).hasConflict;
          if (conflictWithActive) continue;

          // Check conflict against ALREADY SELECTED recommendations
          const conflictWithSelection = toEnroll.some(selected => 
              enrollmentService.hasTimeConflict(selected.schedule, course.schedule)
          );
          
          if (!conflictWithSelection) {
              toEnroll.push(course);
          }
      }

      if (toEnroll.length === 0) {
          alert("Não foram encontradas disciplinas disponíveis sem conflito de horário.");
      } else {
          setRecommendedCourses(toEnroll);
          setRecModalOpen(true);
      }
  };

  const confirmRecommendations = () => {
      recommendedCourses.forEach(course => {
          enrollmentService.createRequest(user, course);
      });
      setRecModalOpen(false);
      
      // Force update
      const freshRequests = enrollmentService.getRequestsByStudent(user.id);
      setRequests([...freshRequests]);
      setRefreshTrigger(prev => prev + 1);
      
      setActiveTab('requests');
  };

  const handleExport = () => {
    const text = enrollmentService.exportHistory(user);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico_${user.id}.txt`;
    a.click();
  };

  const handleEventClick = (event: AcademicEvent) => {
    if (event.courseId) {
        const course = MOCK_COURSES.find(c => c.id === event.courseId);
        if (course) {
            setSelectedCourse(course);
        }
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter Logic
  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSem = semesterFilter === 'all' || course.semester === semesterFilter;
    const matchesName = course.name.toLowerCase().includes(searchFilter.toLowerCase()) || course.code.toLowerCase().includes(searchFilter.toLowerCase());
    
    const isPassed = user.passedCourses?.includes(course.id);
    let matchesStatus = true;
    if (statusFilter === 'passed') matchesStatus = !!isPassed;
    if (statusFilter === 'not_passed') matchesStatus = !isPassed;

    // New Filters
    const matchesDay = dayFilter === 'all' || course.schedule.includes(dayFilter);
    const matchesTime = timeFilter === 'all' || course.schedule.includes(timeFilter);

    return matchesSem && matchesName && matchesStatus && matchesDay && matchesTime;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.APPROVED: return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><CheckCircle size={12}/> Aprovada</span>;
      case RequestStatus.REJECTED: return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><XCircle size={12}/> Rejeitada</span>;
      case RequestStatus.SYSTEM_REJECTED: return <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><AlertCircle size={12}/> Rej. Sistema</span>;
      case RequestStatus.CANCELLED: return <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><Ban size={12}/> Cancelada</span>;
      default: return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full flex items-center gap-1 w-fit"><Clock size={12}/> Em Análise</span>;
    }
  };

  // Helper to Render Schedule Grid
  const renderSchedule = () => {
    const relevantRequests = requests.filter(r => 
        r.status === RequestStatus.APPROVED || r.status === RequestStatus.PENDING
    );
    
    const days = ['Seg', 'Ter', 'Qua', 'Qui'];
    const timeSlots = ['19:00', '20:50']; 

    const eadCourses: EnrollmentRequest[] = [];
    
    const gridData: Record<string, Record<string, EnrollmentRequest | null>> = {};
    days.forEach(day => {
        gridData[day] = {};
        timeSlots.forEach(time => {
            gridData[day][time] = null;
        });
    });

    // Smart Parsing for Hybrid Courses
    relevantRequests.forEach(req => {
        // A course can be BOTH in the grid AND in the EAD row if it is hybrid
        const scheduleParts = req.courseSchedule.split('/');
        let isMappedToGrid = false;

        scheduleParts.forEach(part => {
            const trimmed = part.trim();
            const dayMatch = days.find(d => trimmed.startsWith(d));
            
            if (dayMatch) {
               if (trimmed.includes('19:00')) {
                   gridData[dayMatch]['19:00'] = req;
                   isMappedToGrid = true;
               } else if (trimmed.includes('20:50')) {
                   gridData[dayMatch]['20:50'] = req;
                   isMappedToGrid = true;
               }
            }
        });

        // Check for EAD or Friday component for the bottom row
        if (req.courseSchedule.includes('EAD') || req.courseSchedule.includes('Sex')) {
             if (!eadCourses.find(c => c.id === req.id)) eadCourses.push(req);
        }
    });

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Layout size={20} className="text-primary"/>
                    Meu Quadro de Horários
                </h3>
                <div className="flex gap-2">
                    <button 
                        type="button"
                        onClick={(e) => handleClearAll(e)}
                        className="text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded text-xs font-bold hover:bg-red-100 flex items-center gap-1"
                    >
                        <Trash2 size={14}/> Limpar Solicitações
                    </button>
                    <button 
                        type="button"
                        onClick={handleGenerateRecommendations}
                        className="text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded text-xs font-bold hover:bg-indigo-100 flex items-center gap-1"
                    >
                        <Sparkles size={14}/> Sugestão Inteligente
                    </button>
                </div>
            </div>
            
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr>
                            <th className="p-2 border bg-gray-100 text-gray-500 w-24">Horário</th>
                            {days.map(day => (
                                <th key={day} className="p-2 border bg-gray-50 text-gray-700">{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time, idx) => (
                            <tr key={time}>
                                <td className="p-3 border font-bold text-gray-600 bg-gray-50 text-center">
                                    {time}
                                    <span className="block text-xs font-normal text-gray-400">
                                        {idx === 0 ? '1º Horário' : '2º Horário'}
                                    </span>
                                </td>
                                {days.map(day => {
                                    const course = gridData[day][time];
                                    const isPending = course?.status === RequestStatus.PENDING;
                                    return (
                                        <td key={`${day}-${time}`} className={`p-2 border h-20 align-middle text-center ${course ? (isPending ? 'bg-amber-50 cursor-pointer hover:bg-amber-100' : 'bg-blue-50 cursor-pointer hover:bg-blue-100') + ' transition-colors' : ''}`} onClick={() => {
                                            if (course) {
                                                const c = MOCK_COURSES.find(mc => mc.id === course.courseId);
                                                if (c) setSelectedCourse(c);
                                            }
                                        }}>
                                            {course ? (
                                                <div>
                                                    <span className={`font-bold text-xs md:text-sm leading-tight block ${isPending ? 'text-amber-900' : 'text-blue-900'}`}>
                                                        {course.courseName}
                                                    </span>
                                                    <span className={`text-[10px] ${isPending ? 'text-amber-600' : 'text-blue-600'}`}>
                                                        {isPending ? 'Em Análise' : 'Presencial'}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-300 text-xs italic">-</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        {/* EAD / Friday ROW */}
                        <tr>
                            <td className="p-3 border font-bold text-purple-700 bg-purple-50 text-center text-xs">
                                Sexta Feira / EAD
                            </td>
                            <td colSpan={4} className="p-2 border bg-purple-50/30">
                                {eadCourses.length > 0 ? (
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {eadCourses.map(c => {
                                            const isPending = c.status === RequestStatus.PENDING;
                                            return (
                                                <div 
                                                    key={c.id} 
                                                    onClick={() => {
                                                        const co = MOCK_COURSES.find(mc => mc.id === c.courseId);
                                                        if (co) setSelectedCourse(co);
                                                    }}
                                                    className={`bg-white border px-3 py-1.5 rounded-full text-xs font-bold shadow-sm cursor-pointer transition-colors flex items-center gap-1 ${
                                                        isPending ? 'border-amber-200 text-amber-800 hover:bg-amber-50' : 'border-purple-200 text-purple-800 hover:bg-purple-100'
                                                    }`}
                                                >
                                                    <Globe size={12}/> {c.courseName} {isPending && '(Análise)'}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <span className="text-gray-400 text-xs italic block text-center">Nenhuma disciplina na Sexta/EAD matriculada.</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {relevantRequests.length === 0 && (
                <div className="mt-4 text-center text-gray-500 italic text-sm">
                    Você ainda não possui matrículas aprovadas ou em análise.
                </div>
            )}
        </div>
    );
  };

  const renderMural = () => {
    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Megaphone size={20} className="text-amber-500"/>
                Mural Acadêmico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.length === 0 ? (
                    <div className="col-span-full text-center py-4 text-gray-500 text-sm">Nenhum aviso no mural.</div>
                ) : (
                    events.map(event => (
                        <div 
                            key={event.id} 
                            onClick={() => handleEventClick(event)}
                            className={`p-4 rounded-lg border shadow-sm transition-all ${event.courseId ? 'cursor-pointer hover:shadow-md hover:border-blue-300' : ''} ${event.type === 'NOTICE' ? 'bg-yellow-50 border-yellow-100' : 'bg-blue-50 border-blue-100'}`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${event.type === 'NOTICE' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'}`}>
                                    {event.type === 'NOTICE' ? 'Aviso' : 'Palestra'}
                                </span>
                                <span className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <h4 className="font-bold text-gray-800 text-sm mb-1">{event.title}</h4>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                            <div className="flex items-center gap-1 text-[10px] font-medium text-gray-500">
                                <UserIcon size={10}/> {event.author}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
  };

  const renderInfoMenu = () => (
    <div className="space-y-6">
      {/* Aviso Importante Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
        <h3 className="text-red-600 font-bold mb-2">Aviso Importante</h3>
        <p className="text-gray-700 text-sm">
          Verifique pré-requisitos antes de solicitar. <br/>
          Horários com conflito são bloqueados automaticamente.
        </p>
      </div>

       {/* Atalhos Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="font-bold text-gray-800 mb-4">Atalhos</h3>
        <div className="space-y-3">
          <button 
            onClick={onNavigateToNotifications}
            className="w-full text-left px-4 py-3 border rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-primary transition-colors hover:border-primary flex justify-between items-center group"
          >
            <span>Notificações</span>
            <span className={`text-white text-[10px] px-2 py-0.5 rounded-full ${unreadCount > 0 ? 'bg-red-500' : 'bg-gray-400'}`}>
              {unreadCount} Novas
            </span>
          </button>
          <button className="w-full text-left px-4 py-3 border rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-primary transition-colors hover:border-primary">
            Calendário Acadêmico
          </button>
          <button 
            onClick={handleExport}
            className="w-full text-left px-4 py-3 border rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:text-primary transition-colors hover:border-primary"
          >
            Exportar Histórico Completo
          </button>
        </div>
      </div>

       {/* Documentos Gerados (Info Tab) */}
       {generatedDocs.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-green-500">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileCheck size={18} className="text-green-600"/> 
              Documentos de Conclusão
            </h3>
            <div className="space-y-2">
               {generatedDocs.map(doc => (
                 <div key={doc.id} className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-100">
                    <span className="text-sm font-semibold text-gray-800">{doc.type}</span>
                    <button 
                      onClick={() => alert(`Iniciando download de: ${doc.type}`)}
                      className="text-green-700 hover:text-green-900"
                    >
                      <Download size={18}/>
                    </button>
                 </div>
               ))}
            </div>
          </div>
        )}

      {/* Contatos Card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="font-bold text-gray-800 mb-4">Contatos Úteis</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
            <div className="bg-blue-100 p-2 rounded-full text-blue-600">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">SECRETARIA</p>
              <p className="text-sm text-gray-800">sec@univ.edu.br</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
             <div className="bg-green-100 p-2 rounded-full text-green-600">
              <MessageCircle size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">WHATSAPP</p>
              <p className="text-sm text-gray-800">(11) 99999-0000</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Card (Accordion) */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="font-bold text-gray-800 mb-4">Perguntas Frequentes (FAQ)</h3>
        <div className="space-y-3">
          <FAQItem 
            question="Como solicitar a Matrícula?" 
            answer="Vá até a aba 'Disciplinas Disponíveis', utilize os filtros para encontrar a disciplina desejada e clique no botão 'Solicitar' nos cards disponíveis (verdes)." 
          />
          <FAQItem 
            question="Como contatar alguém responsável?" 
            answer="Utilize a seção de contatos acima para falar com a secretaria ou coordenação via e-mail ou WhatsApp." 
          />
          <FAQItem 
            question="Como saber os requisitos da matrícula?" 
            answer="Em cada card de disciplina, os pré-requisitos estão listados logo abaixo do nome. Você também pode clicar em 'Detalhes' para ver a lista completa." 
          />
          <FAQItem 
            question="Como saber se a solicitação foi aceita?" 
            answer="Acompanhe o status na aba 'Minhas Solicitações' e fique atento às notificações no menu de Ajuda." 
          />
          <FAQItem 
            question="Como cancelo uma solicitação?" 
            answer="Na aba 'Minhas Solicitações', clique no botão 'Cancelar' ao lado da disciplina desejada. Isso liberará sua solicitação para que você possa tentar novamente." 
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 relative">
      {/* Modal Overlay */}
      {selectedCourse && (
        <CourseDetailsModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      )}

      {/* Conflict Modal */}
      <ConflictResolutionModal 
        isOpen={!!conflictData} 
        onClose={() => setConflictData(null)} 
        onSwap={handleSwapRequests}
        newCourse={conflictData?.newCourse || null}
        conflictingReq={conflictData?.conflictingReq || null}
      />

      {/* Recommendation Preview Modal */}
      <RecommendationPreviewModal 
        isOpen={recModalOpen}
        onClose={() => setRecModalOpen(false)}
        onConfirm={confirmRecommendations}
        recommendedCourses={recommendedCourses}
      />

      {/* 1. Schedule Grid (Always Visible) */}
      {renderSchedule()}

      {/* 2. Academic Mural (Always Visible) */}
      {renderMural()}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm p-2 flex overflow-x-auto gap-2">
        <button onClick={() => setActiveTab('courses')} className={`flex-1 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'courses' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
          Disciplinas Disponíveis
        </button>
        <button onClick={() => setActiveTab('requests')} className={`flex-1 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'requests' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
          Minhas Solicitações
        </button>
        <button onClick={() => setActiveTab('info')} className={`relative flex-1 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'info' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
          Info & Ajuda
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 md:top-2 md:right-2 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'courses' && (
        <>
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
            
            {/* Top Row: Search and Semester/Status */}
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col md:flex-row gap-2">
                  <select 
                    value={semesterFilter} 
                    onChange={(e) => setSemesterFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="all">Semestre: Todos</option>
                    <option value={1}>1º Semestre</option>
                    <option value={2}>2º Semestre</option>
                    <option value={3}>3º Semestre</option>
                    <option value={4}>4º Semestre</option>
                    <option value={5}>5º Semestre</option>
                    <option value={6}>6º Semestre</option>
                  </select>

                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="all">Situação: Todas</option>
                    <option value="not_passed">Pendente / Não Cursada</option>
                    <option value="passed">Já Cursada</option>
                  </select>

                  {/* New Filters */}
                  <select 
                    value={dayFilter} 
                    onChange={(e) => setDayFilter(e.target.value as any)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="all">Dia: Todos</option>
                    <option value="Seg">Segunda</option>
                    <option value="Ter">Terça</option>
                    <option value="Qua">Quarta</option>
                    <option value="Qui">Quinta</option>
                    <option value="Sex">Sexta</option>
                  </select>

                  <select 
                    value={timeFilter} 
                    onChange={(e) => setTimeFilter(e.target.value as any)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  >
                    <option value="all">Horário: Todos</option>
                    <option value="19:00">19:00 (1º Hor)</option>
                    <option value="20:50">20:50 (2º Hor)</option>
                  </select>
              </div>
            </div>

            {/* Bottom Row: Search */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
                placeholder="Buscar disciplina por nome ou código..." 
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {filteredCourses.length === 0 ? (
               <div className="col-span-full text-center py-10 text-gray-500 bg-white rounded-lg border border-dashed">
                 Nenhuma disciplina encontrada com os filtros atuais.
               </div>
            ) : filteredCourses.map(course => {
              const validation = enrollmentService.validateRequest(user, course, requests);
              // Find if there is an active request (Pending or Approved)
              // Or a Cancelled/Rejected request history
              const activeRequest = requests.find(r => r.courseId === course.id && (r.status === RequestStatus.APPROVED || r.status === RequestStatus.PENDING));
              // Also find REJECTED requests to show Conflict Status
              const rejectedRequest = requests.find(r => r.courseId === course.id && r.status === RequestStatus.REJECTED);

              const approvedRequests = requests.filter(r => r.status === RequestStatus.APPROVED);
              const conflictWithApproved = approvedRequests.find(r => 
                enrollmentService.hasTimeConflict(r.courseSchedule, course.schedule)
              );

              const isPassed = user.passedCourses?.includes(course.id);
              
              // --- CARD LOGIC ---
              const preReqsMet = !validation.missingPreReqs;
              
              let cardTheme = {
                borderColor: 'border-l-success', // Green default
                bannerColor: 'bg-green-300', 
                bannerText: 'Pré-requisitos cumpridos',
                bannerTextColor: 'text-green-900',
                buttonColor: 'bg-[#0060B6] hover:bg-blue-800 text-white',
                buttonText: 'Solicitar',
                badgeColor: 'bg-success',
                badgeText: 'Disponível',
                disabled: false,
                isApproved: false,
                containerClass: 'bg-white'
              };

              // State 0: APPROVED (Enrollment Confirmed) - HIGHEST PRIORITY
              if (activeRequest && activeRequest.status === RequestStatus.APPROVED) {
                 cardTheme = {
                  borderColor: 'border-l-emerald-600',
                  bannerColor: 'bg-emerald-600',
                  bannerText: 'Matrícula Confirmada',
                  bannerTextColor: 'text-white',
                  buttonColor: 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default',
                  buttonText: 'Cursando',
                  badgeColor: 'bg-emerald-600',
                  badgeText: 'Matriculado',
                  disabled: true,
                  isApproved: true,
                  containerClass: 'bg-emerald-50 opacity-95'
                };
              }
              // State 1: Locked (Red)
              else if (!preReqsMet) {
                cardTheme = {
                  borderColor: 'border-l-danger',
                  bannerColor: 'bg-red-100',
                  bannerText: 'Pré-requisitos pendentes',
                  bannerTextColor: 'text-red-800',
                  buttonColor: 'bg-gray-200 text-gray-400 cursor-not-allowed',
                  buttonText: 'Bloqueada',
                  badgeColor: 'bg-danger',
                  badgeText: 'Indisponível',
                  disabled: true,
                  isApproved: false,
                  containerClass: 'bg-white'
                };
              } 
              // State 1.5: Locked (Amber) - Schedule Conflict (AFTER COORDINATOR REJECTION OR IF CONFLICTS WITH APPROVED)
              else if ((rejectedRequest && rejectedRequest.justification?.toLowerCase().includes('conflito')) || (conflictWithApproved && !activeRequest)) {
                 cardTheme = {
                  borderColor: 'border-l-warning', // Amber
                  bannerColor: 'bg-amber-100',
                  bannerText: conflictWithApproved ? `Conflito com ${conflictWithApproved.courseName}` : rejectedRequest?.justification || 'Conflito de Horário',
                  bannerTextColor: 'text-amber-800',
                  buttonColor: 'bg-gray-100 text-gray-400 cursor-not-allowed',
                  buttonText: 'Bloqueada',
                  badgeColor: 'bg-warning',
                  badgeText: 'Conflito',
                  disabled: true,
                  isApproved: false,
                  containerClass: 'bg-white'
                };
              }
              // State 2: Requested/Analysis (Blue)
              else if (activeRequest && activeRequest.status === RequestStatus.PENDING) {
                 cardTheme = {
                  borderColor: 'border-l-accent',
                  bannerColor: 'bg-blue-300',
                  bannerText: 'Pré-requisitos em análise',
                  bannerTextColor: 'text-blue-900',
                  buttonColor: 'bg-accent text-white shadow-sm',
                  buttonText: 'Solicitada',
                  badgeColor: 'bg-accent',
                  badgeText: 'Solicitada',
                  disabled: true,
                  isApproved: false,
                  containerClass: 'bg-white'
                };
              }
              // State 3: Already Passed (Gray)
              else if (isPassed) {
                 cardTheme = {
                  borderColor: 'border-l-gray-400',
                  bannerColor: 'bg-gray-200',
                  bannerText: 'Disciplina Concluída',
                  bannerTextColor: 'text-gray-800',
                  buttonColor: 'bg-gray-100 text-gray-400',
                  buttonText: 'Concluída',
                  badgeColor: 'bg-gray-400',
                  badgeText: 'Concluída',
                  disabled: true,
                  isApproved: false,
                  containerClass: 'bg-white'
                };
              }

              // Pre-req text builder
              const preReqText = course.preReqs.length > 0
                ? course.preReqs.map(id => MOCK_COURSES.find(c => c.id === id)?.name.split(' ')[0]).join(', ')
                : 'Sem requisitos';

              return (
                <div key={course.id} className={`${cardTheme.containerClass} rounded-md shadow-md border-t border-r border-b border-gray-200 border-l-[6px] ${cardTheme.borderColor} flex flex-col overflow-hidden transition-all hover:shadow-lg`}>
                  {/* Top Content */}
                  <div className="p-5 flex flex-col items-center text-center space-y-2">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{course.name}</h3>
                    
                    <p className="text-xs text-gray-500">
                      Pré: {preReqText} • {course.schedule}
                    </p>
                    
                    <p className="text-sm text-gray-500 font-medium">
                      {course.professor} • Vagas: {course.slots}
                    </p>
                  </div>

                  {/* Banner */}
                  <div className={`w-11/12 mx-auto py-1.5 ${cardTheme.bannerColor} bg-opacity-90 rounded-sm text-center mb-4`}>
                     <span className={`text-xs font-bold ${cardTheme.bannerTextColor}`}>
                       {cardTheme.bannerText}
                     </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto px-5 pb-5 flex items-center justify-between gap-2">
                    {/* Left Button */}
                    <button 
                      onClick={() => !cardTheme.disabled && handleEnroll(course)}
                      disabled={cardTheme.disabled}
                      className={`px-5 py-1.5 rounded text-sm font-bold shadow-sm transition-colors ${cardTheme.buttonColor}`}
                    >
                      {cardTheme.buttonText}
                    </button>

                    {/* Middle Button */}
                    <button 
                      onClick={() => setSelectedCourse(course)}
                      className="border border-gray-200 bg-white text-gray-600 px-3 py-1.5 rounded text-sm font-bold hover:bg-gray-50"
                    >
                      Detalhes
                    </button>

                    {/* Right Badge */}
                    <span className={`${cardTheme.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded-full`}>
                      {cardTheme.badgeText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'requests' && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-700 uppercase font-medium border-b">
                <tr>
                  <th className="px-4 py-3">Disciplina</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      Nenhuma solicitação ativa.
                    </td>
                  </tr>
                ) : (
                  requests.map(req => ( // Already sorted
                    <tr 
                      key={req.id} 
                      className={`transition-colors duration-1000 ${
                        req.status === RequestStatus.CANCELLED ? 'bg-gray-50 opacity-60' :
                        highlightedRequestId === req.id ? 'bg-blue-100' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-3 font-medium">
                        {req.courseName}
                        <div className="text-xs text-gray-500">{req.courseSchedule}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(req.requestedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(req.status)}
                      </td>
                      <td className="px-4 py-3">
                        {req.status === RequestStatus.PENDING && (
                          <button 
                            type="button"
                            onClick={(e) => handleCancel(e, req.id, req.courseName)}
                            className="text-red-600 hover:text-red-800 text-xs font-semibold flex items-center gap-1 border border-red-200 px-2 py-1 rounded hover:bg-red-50"
                          >
                            <Trash2 size={12} /> Cancelar
                          </button>
                        )}
                        {(req.status === RequestStatus.REJECTED || req.status === RequestStatus.SYSTEM_REJECTED) && (
                          <span className="text-xs text-gray-400 italic">{req.justification}</span>
                        )}
                        {req.status === RequestStatus.APPROVED && (
                           <span className="text-xs text-emerald-600 font-medium flex items-center gap-1"><CheckCircle size={10}/> Matriculado</span>
                        )}
                         {req.status === RequestStatus.CANCELLED && (
                           <span className="text-xs text-gray-400 italic">Encerrada pelo aluno</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'info' && renderInfoMenu()}
    </div>
  );
};

// 3. Coordinator Portal
const CoordinatorPortal = () => {
  const [pendingRequests, setPendingRequests] = useState<EnrollmentRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [selectedReqForAction, setSelectedReqForAction] = useState<string | null>(null);
  
  // Filters
  const [semesterFilter, setSemesterFilter] = useState<'all' | number>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    setPendingRequests(enrollmentService.getAllPendingRequests());
  }, []);

  const handleApprove = (reqId: string) => {
    try {
      enrollmentService.updateStatus(reqId, RequestStatus.APPROVED);
      setPendingRequests([...enrollmentService.getAllPendingRequests()]);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const openRejectionModal = (reqId: string) => {
    setSelectedReqForAction(reqId);
    setRejectionModalOpen(true);
  };

  const confirmRejection = (reason: string) => {
    if (selectedReqForAction) {
      enrollmentService.updateStatus(selectedReqForAction, RequestStatus.REJECTED, reason);
      setPendingRequests([...enrollmentService.getAllPendingRequests()]); // Ensure refresh
      setRejectionModalOpen(false);
      setSelectedReqForAction(null);
    }
  };

  const filteredRequests = pendingRequests
    .filter(req => {
      // 1. Text Search
      const textMatch = req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        req.courseName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Semester Filter
      if (semesterFilter === 'all') return textMatch;
      const course = MOCK_COURSES.find(c => c.id === req.courseId);
      return textMatch && (course?.semester === semesterFilter);
    })
    .sort((a, b) => {
      // 3. Date Sort
      const dateA = new Date(a.requestedAt).getTime();
      const dateB = new Date(b.requestedAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="space-y-6">
       <RejectionModal 
          isOpen={rejectionModalOpen} 
          onClose={() => setRejectionModalOpen(false)} 
          onConfirm={confirmRejection} 
       />

       <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Análise de Matrículas</h2>
            <p className="text-sm text-gray-600">Solicitações pré-validadas pelo sistema.</p>
          </div>
          
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-3 items-center bg-gray-50 p-3 rounded-md border border-gray-200">
             {/* Search */}
             <div className="relative w-full md:flex-1">
               <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
               <input 
                type="text" 
                placeholder="Buscar aluno ou disciplina..." 
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
             
             {/* Filters */}
             <div className="flex gap-2 w-full md:w-auto">
                <div className="relative">
                  <Filter size={14} className="absolute left-2.5 top-3 text-gray-500 pointer-events-none" />
                  <select 
                    value={semesterFilter}
                    onChange={(e) => setSemesterFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-primary focus:border-primary appearance-none cursor-pointer hover:bg-gray-50 h-full"
                  >
                    <option value="all">Todos Semestres</option>
                    <option value={1}>1º Semestre</option>
                    <option value={2}>2º Semestre</option>
                    <option value={3}>3º Semestre</option>
                    <option value={4}>4º Semestre</option>
                    <option value={5}>5º Semestre</option>
                    <option value={6}>6º Semestre</option>
                  </select>
                </div>

                <button 
                  onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                  title="Ordenar por Data"
                >
                  <ArrowUpDown size={14} />
                  {sortOrder === 'desc' ? 'Mais Recentes' : 'Mais Antigas'}
                </button>
             </div>
          </div>
       </div>

       <div className="grid gap-4">
         {filteredRequests.length === 0 ? (
           <div className="p-12 text-center bg-white rounded-lg border border-dashed border-gray-300">
             <CheckCircle className="mx-auto text-green-500 mb-2" size={48} />
             <p className="text-gray-500 font-medium">Nenhuma solicitação pendente com os filtros atuais.</p>
           </div>
         ) : (
           filteredRequests.map(req => (
             <div key={req.id} className="bg-white rounded-lg shadow-sm border p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-300">
               <div>
                 <div className="flex items-center gap-2 mb-1">
                   <span className="font-bold text-lg text-gray-800">{req.studentName}</span>
                   <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">ID: {req.studentId}</span>
                 </div>
                 <div className="text-gray-600">
                   Solicita matrícula em <strong className="text-primary">{req.courseName}</strong>
                 </div>
                 <div className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1"><Clock size={14}/> {req.courseSchedule}</span>
                    <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(req.requestedAt).toLocaleDateString()}</span>
                 </div>
               </div>
               
               <div className="flex gap-2 shrink-0">
                 <button 
                  onClick={() => openRejectionModal(req.id)}
                  className="px-4 py-2 border border-red-200 text-red-700 hover:bg-red-50 rounded-md text-sm font-medium transition-colors"
                 >
                   Rejeitar
                 </button>
                 <button 
                  onClick={() => handleApprove(req.id)}
                  className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md text-sm font-medium transition-colors shadow-sm"
                 >
                   Aprovar
                 </button>
               </div>
             </div>
           ))
         )}
       </div>
    </div>
  );
};

// 4. Secretary Portal (New View)
const SecretaryPortal = () => {
  const [docs, setDocs] = useState<AcademicDoc[]>([]);

  useEffect(() => {
    setDocs(enrollmentService.getAllDocuments());
  }, []);

  const handleStatusChange = (id: string, newStatus: 'Gerado' | 'Arquivado') => {
    enrollmentService.updateDocStatus(id, newStatus);
    setDocs([...enrollmentService.getAllDocuments()]); // Force refresh
    alert(`Documento ${newStatus === 'Gerado' ? 'gerado/assinado' : 'arquivado'} com sucesso.`);
  };

  const pendingCount = docs.filter(d => d.status === 'Pendente').length;
  const processedCount = docs.filter(d => d.status !== 'Pendente').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-yellow-500">
          <div className="flex items-center justify-between">
             <div>
               <p className="text-sm text-gray-500 font-bold uppercase">Documentos Pendentes</p>
               <h3 className="text-3xl font-bold text-gray-800">{pendingCount}</h3>
             </div>
             <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
               <FileText size={24}/>
             </div>
          </div>
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
             <div>
               <p className="text-sm text-gray-500 font-bold uppercase">Arquivados / Gerados</p>
               <h3 className="text-3xl font-bold text-gray-800">{processedCount}</h3>
             </div>
             <div className="bg-green-100 p-3 rounded-full text-green-600">
               <Briefcase size={24}/>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
           <h3 className="font-bold text-gray-700">Lista de Documentos</h3>
           <span className="text-xs bg-white border px-2 py-1 rounded text-gray-500">Exibindo apenas alunos ativos</span>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 uppercase font-medium border-b">
            <tr>
              <th className="px-6 py-3">Aluno</th>
              <th className="px-6 py-3">Tipo de Documento</th>
              <th className="px-6 py-3">Data Solicitação</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {docs.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Nenhum documento encontrado.</td></tr>
            ) : docs.map(doc => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{doc.studentName}</td>
                <td className="px-6 py-4">{doc.type}</td>
                <td className="px-6 py-4 text-gray-500">{new Date(doc.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    doc.status === 'Gerado' ? 'bg-green-100 text-green-800' :
                    doc.status === 'Arquivado' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {doc.status === 'Pendente' && (
                    <button 
                      onClick={() => handleStatusChange(doc.id, 'Gerado')}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                      title="Gerar/Assinar Documento"
                    >
                      <FileText size={16}/> Gerar/Assinar
                    </button>
                  )}
                  {doc.status === 'Gerado' && (
                    <button 
                      onClick={() => handleStatusChange(doc.id, 'Arquivado')}
                      className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1"
                      title="Arquivar Processo"
                    >
                      <Archive size={16}/> Arquivar
                    </button>
                  )}
                  {doc.status === 'Arquivado' && <span className="text-gray-400">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



type ViewState = 'dashboard' | 'profile' | 'completion' | 'notifications';

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Poll for notifications (Simple simulation)
  useEffect(() => {
    if (currentUser) {
        const checkNotes = () => {
            const notes = enrollmentService.getNotifications(currentUser.id);
            setUnreadNotifications(notes.filter(n => !n.read).length);
        };
        const interval = setInterval(checkNotes, 2000);
        checkNotes();
        return () => clearInterval(interval);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  // Helper to determine dashboard title based on view
  const getHeaderTitle = () => {
    if (currentView === 'profile') return 'Meu Perfil';
    if (currentView === 'completion') return 'Conclusão de Curso';
    if (currentView === 'notifications') return 'Notificações';

    switch(currentUser.role) {
      case UserRole.COORDINATOR: return 'Área do Coordenador';
      case UserRole.SECRETARY: return 'Gestão de Secretaria';
      default: return 'Matrícula Online';
    }
  };

  const getHeaderDesc = () => {
    if (currentView === 'profile') return 'Gerencie suas informações pessoais e de segurança.';
    if (currentView === 'notifications') return 'Acompanhe as atualizações e mensagens do sistema.';
    if (currentView === 'completion') {
      return currentUser.role === UserRole.STUDENT 
        ? 'Acompanhe seu progresso e pendências para formatura.' 
        : 'Gestão de prováveis formandos e colação de grau.';
    }

     switch(currentUser.role) {
      case UserRole.COORDINATOR: return 'Gerencie e valide as solicitações de matrícula pendentes.';
      case UserRole.SECRETARY: return 'Painel administrativo de documentos acadêmicos.';
      default: return 'Consulte disciplinas e realize sua solicitação de forma rápida.';
    }
  }

  // Render logic
  const renderMainContent = () => {
    if (currentView === 'profile') return <UserProfile user={currentUser} />;
    if (currentView === 'completion') return <CompletionView user={currentUser} />;
    if (currentView === 'notifications') return <NotificationsView user={currentUser} />;

    // Dashboard Views
    if (currentUser.role === UserRole.COORDINATOR) return <CoordinatorPortal />;
    if (currentUser.role === UserRole.SECRETARY) return <SecretaryPortal />;
    return <StudentPortal user={currentUser} onNavigateToNotifications={() => setCurrentView('notifications')} />;
  };

  const NavItem = ({ view, icon, label }: { view: ViewState, icon: React.ReactNode, label: string }) => (
    <button 
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full text-left px-3 py-2 rounded font-medium flex items-center gap-2 border-l-4 transition-all ${
        currentView === view 
          ? 'bg-gray-800 text-white border-accent' 
          : 'text-gray-400 hover:text-white border-transparent hover:bg-gray-800/50'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar / Mobile Header */}
      <div className="bg-secondary text-white md:w-64 flex-shrink-0 flex flex-col">
        <div className="p-4 flex items-center gap-3 border-b border-gray-700">
          <div className="bg-primary text-white p-2 rounded-lg font-bold text-xl tracking-tighter">
            SGM
          </div>
          <div>
            <div className="font-bold text-lg leading-none">Gestão de Matrícula</div>
            <div className="text-xs text-blue-300 font-medium mt-0.5">
               {currentUser.role === UserRole.STUDENT ? 'Portal do Aluno' :
                currentUser.role === UserRole.COORDINATOR ? 'Portal Coordenação' : 'Portal Secretaria'}
            </div>
          </div>
          <button 
            className="md:hidden ml-auto text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </button>
        </div>
        
        <div className={`flex-1 p-4 space-y-2 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
           <div className="mb-8">
             <div className="text-xs text-gray-400 uppercase font-semibold mb-2">Usuário Logado</div>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg font-bold">
                 {currentUser.name.charAt(0)}
               </div>
               <div className="overflow-hidden">
                 <div className="truncate font-medium">{currentUser.name}</div>
                 <div className="text-xs text-gray-400 truncate">{currentUser.role}</div>
               </div>
             </div>
           </div>

           <nav className="space-y-1">
             <div className="text-xs text-gray-500 font-bold uppercase mb-2 px-1">Menu Principal</div>
             
             <NavItem 
               view="dashboard"
               icon={currentUser.role === UserRole.COORDINATOR ? <CheckCircle size={18}/> : currentUser.role === UserRole.SECRETARY ? <FileText size={18}/> : <BookOpen size={18}/>}
               label={currentUser.role === UserRole.COORDINATOR ? 'Painel de Análise' : currentUser.role === UserRole.SECRETARY ? 'Documentos' : 'Portal do Aluno'}
             />

             <NavItem 
               view="profile"
               icon={<UserIcon size={18}/>}
               label="Meu Perfil"
             />

             
               <NavItem 
                 view="completion"
                 icon={<GraduationCap size={18}/>}
                 label="Conclusão de Curso"
               />
             
           </nav>
        </div>

        <div className={`p-4 border-t border-gray-700 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          <button 
            onClick={() => {
              setCurrentUser(null);
              setCurrentView('dashboard');
            }}
            className="w-full flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 flex justify-between items-start">
             <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {getHeaderTitle()}
                </h1>
                <p className="text-gray-500 mt-1">
                {getHeaderDesc()}
                </p>
             </div>
             
             {/* Notification Bell */}
             <div className="relative cursor-pointer" onClick={() => setCurrentView('notifications')}>
                 <Bell size={24} className={`transition-colors ${currentView === 'notifications' ? 'text-primary fill-current' : 'text-gray-600 hover:text-gray-800'}`}/>
                 {unreadNotifications > 0 && (
                     <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white animate-pulse">
                         {unreadNotifications}
                     </span>
                 )}
             </div>
          </header>

          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

