import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  User,
  ArrowRight,
  ClipboardList,
  Bell,
  BookOpen,
  Lock,
  Mail,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_STUDENT_PROFILE } from '../../data/collegeData';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
];

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Information Technology & AI',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical & Mechatronics',
  'Civil & Environmental Engineering',
  'Biotechnology & Bioinformatics',
  'Management & Business Studies',
];

const SEMESTERS = [
  '1st Semester (Freshman)',
  '2nd Semester (Freshman)',
  '3rd Semester (Sophomore)',
  '4th Semester (Sophomore)',
  '5th Semester (Junior)',
  '6th Semester (Junior)',
  '7th Semester (Senior)',
  '8th Semester (Senior)',
];

export const LoginView: React.FC = () => {
  const { login } = useApp();

  const [mode, setMode] = useState<'custom' | 'quick'>('custom');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [semester, setSemester] = useState(SEMESTERS[3]);
  const [avatar, setAvatar] = useState(AVATAR_PRESETS[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid college email is required';
    if (!rollNo.trim()) newErrors.rollNo = 'Student Roll number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    login(
      {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        rollNo: rollNo.trim().toUpperCase(),
        department,
        semester,
        avatar,
        theme: 'light',
        emailNotifications: true,
        complaintUpdates: true,
        aiConciseMode: false,
      },
      'student'
    );
  };

  const handleQuickStudentLogin = () => {
    login(INITIAL_STUDENT_PROFILE, 'student');
  };

  const handleQuickAdminLogin = () => {
    login(
      {
        id: 'usr_admin_01',
        name: 'Dr. Evelyn Vance',
        email: 'examcell@aits.edu',
        rollNo: 'STAFF-ADMIN-01',
        department: 'Examination Cell & Academic Operations',
        semester: 'Administrative Staff',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        role: 'admin',
        theme: 'light',
        emailNotifications: true,
        complaintUpdates: true,
        aiConciseMode: true,
      },
      'admin'
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-radial from-blue-50 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-12 animate-in fade-in zoom-in-95 duration-250">
        {/* Left Informational Showcase (5 columns) */}
        <div className="md:col-span-5 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient light glow */}
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-md">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-heading font-extrabold text-xl text-white tracking-tight">
                  CAMPUSMATE<span className="text-blue-300"> AI</span>
                </h1>
                <p className="text-[11px] text-blue-200 font-medium">Your Campus, One Click Away</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-700/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Grounded Gemini Assistant</h3>
                  <p className="text-[11px] text-blue-100/80 leading-relaxed">
                    Get instant answers on exam attendance, fees, library books, and campus rules.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-700/60 flex items-center justify-center shrink-0 mt-0.5">
                  <ClipboardList className="w-4 h-4 text-indigo-200" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Grievance Tracking Desk</h3>
                  <p className="text-[11px] text-blue-100/80 leading-relaxed">
                    Submit classroom, Wi-Fi, electricity, or cleanliness issues with live SLA updates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-700/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="w-4 h-4 text-indigo-200" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Circulars & Emergency Desks</h3>
                  <p className="text-[11px] text-blue-100/80 leading-relaxed">
                    Access real-time notice alerts, calendar timetables, and direct department contacts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-blue-200 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              Apex Institute of Technology & Sciences
            </span>
            <p className="text-[10px] text-blue-200/70 leading-relaxed">
              Official centralized student services, digital grievances, and academic records portal.
            </p>
          </div>
        </div>

        {/* Right Sign-In Form (7 columns) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  Student Portal Access
                </h2>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Academic Year 2026-27
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your student credentials to personalize your portal, submit campus grievances, and track updates.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('custom')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'custom'
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Register / Enter Details
              </button>
              <button
                type="button"
                onClick={() => setMode('quick')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  mode === 'quick'
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Sample Profiles
              </button>
            </div>

            {/* Mode 1: Fast One-Click Sign-In */}
            {mode === 'quick' ? (
              <div className="space-y-3.5 pt-1 animate-in fade-in duration-200">
                <div
                  onClick={handleQuickStudentLogin}
                  className="p-4 rounded-2xl border-2 border-blue-600/60 dark:border-blue-500/60 bg-blue-50/50 dark:bg-blue-950/30 hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={INITIAL_STUDENT_PROFILE.avatar}
                      alt={INITIAL_STUDENT_PROFILE.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {INITIAL_STUDENT_PROFILE.name}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Student Role
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {INITIAL_STUDENT_PROFILE.department}
                      </p>
                      <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                        {INITIAL_STUDENT_PROFILE.rollNo}
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div
                  onClick={handleQuickAdminLogin}
                  className="p-4 rounded-2xl border border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                      alt="Dr. Evelyn Vance"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-500/40"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                          Dr. Evelyn Vance
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                          Staff Operations Desk
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Controller of Examinations & Operations
                      </p>
                      <span className="text-[11px] font-mono text-amber-700 dark:text-amber-400">
                        STAFF-ADMIN-01
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ) : (
              /* Mode 2: Custom Student Input */
              <form onSubmit={handleCustomSubmit} className="space-y-3.5 pt-1 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="e.g. Maya Lin"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                    {errors.name && <p className="text-[10px] text-rose-500 mt-0.5">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Roll Number *
                    </label>
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => {
                        setRollNo(e.target.value);
                        if (errors.rollNo) setErrors((prev) => ({ ...prev, rollNo: '' }));
                      }}
                      placeholder="e.g. AITS-2025-IT018"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    />
                    {errors.rollNo && <p className="text-[10px] text-rose-500 mt-0.5">{errors.rollNo}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Campus Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="e.g. student@aits.edu"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Semester
                    </label>
                    <select
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    >
                      {SEMESTERS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Choose Profile Avatar
                  </label>
                  <div className="flex items-center gap-2">
                    {AVATAR_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatar(p)}
                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                          avatar === p ? 'border-blue-600 ring-2 ring-blue-500/30 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={p} alt="Preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Enter Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center">
            Student profile and submissions are securely stored to your local browser session.
          </div>
        </div>
      </div>
    </div>
  );
};
