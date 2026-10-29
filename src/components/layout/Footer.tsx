import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, ShieldCheck, Sparkles, RotateCcw } from 'lucide-react';
import { CAMPUS_METADATA } from '../../data/collegeData';

export const Footer: React.FC = () => {
  const { setActiveTab, resetDemoData } = useApp();

  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-slate-900 dark:text-white tracking-tight text-sm">
                CAMPUSMATE | AITS
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                Official Student Portal
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-md">
              Apex Institute of Technology & Sciences centralized student services gateway. Comprehensive grievance resolution, digital attendance records, academic announcements, and 24/7 AI-assisted student support.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-lg border border-blue-200/60 dark:border-blue-800/60">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-blue-600" />
              <span>{CAMPUS_METADATA.accreditation}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Quick Portals
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('assistant')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Ask CampusMate AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('complaints')}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Track Grievances
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('faqs')}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Campus FAQ Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('notices')}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Announcements & Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Department Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Helpline */}
          <div className="space-y-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Campus Support Desk
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              24/7 Security & Health Center: <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">+1 (555) 234-5699</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Technical Support: <span className="font-mono text-blue-600 dark:text-blue-400">ithelpdesk@aits.edu</span>
            </p>
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors mt-1"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              Reset Stored Records
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} CampusMate AI • Apex Institute of Technology & Sciences
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">Engine: Gemini 3.8 Flash</span>
            <span className="font-mono">Runtime: Node/Express + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
