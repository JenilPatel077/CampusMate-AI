import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateComplaintStats, formatDateShort } from '../../utils/complaints';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { ComplaintFormModal } from '../complaints/ComplaintFormModal';
import { ComplaintDetailModal } from '../complaints/ComplaintDetailModal';
import {
  Sparkles,
  ClipboardList,
  CheckCircle2,
  Calendar,
  FileQuestion,
  PlusCircle,
  Bell,
  Contact2,
  ArrowRight,
  Wifi,
  BookOpen,
  Home,
  FileText,
  PhoneCall,
  Search,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    userProfile,
    complaints,
    notices,
    faqs,
    setActiveTab,
    selectedComplaintForDetail,
    setSelectedComplaintForDetail,
  } = useApp();

  const [quickAiPrompt, setQuickAiPrompt] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Derive stats dynamically from live state
  const stats = calculateComplaintStats(complaints);
  const upcomingEvents = notices.filter((n) => n.isEvent && n.eventDate);
  const recentComplaints = complaints.slice(0, 4);
  const recentNotices = notices.slice(0, 3);

  const handleQuickAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAiPrompt.trim()) return;
    setActiveTab('assistant');
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcoming Banner & Student Profile Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Subtle background ambient circles */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-white/30 shadow-lg"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                  Student Portal
                </span>
                <span className="text-[11px] text-blue-200 font-mono">
                  {userProfile.rollNo}
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                Welcome back, {userProfile.name}!
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/90 font-medium">
                {userProfile.department} • {userProfile.semester}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 hover:bg-blue-50 font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-blue-700" />
              <span>Report Issue</span>
            </button>
            <button
              onClick={() => setActiveTab('assistant')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold text-xs backdrop-blur-md border border-indigo-400/40 shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Summary Metric Cards (Derived from data) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Open Complaints */}
        <div
          onClick={() => setActiveTab('complaints')}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Open Complaints
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">
            {stats.open}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            <span>{stats.inProgress} in active progress</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Resolved Complaints */}
        <div
          onClick={() => setActiveTab('complaints')}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Resolved Tickets
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
            {stats.resolved}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            <span>{stats.resolutionRate}% resolution rate</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Upcoming Events */}
        <div
          onClick={() => setActiveTab('notices')}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Upcoming Events
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {upcomingEvents.length}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            <span>Next: Mid-Term Timetable</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Available FAQs */}
        <div
          onClick={() => setActiveTab('faqs')}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Knowledge FAQs
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
              <FileQuestion className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400">
            {faqs.length}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            <span>Across 6 campus categories</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* 3. Prominent Ask CampusMate AI Section */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-white dark:from-indigo-950/30 dark:via-blue-950/20 dark:to-slate-900 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                Ask CampusMate AI
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Grounded factual queries regarding exam rules, fees, hostel leaves, Wi-Fi setups, or library circulation.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('assistant')}
            className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 flex items-center gap-1 self-start md:self-auto"
          >
            Open Full Chat Screen
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick prompt bar */}
        <form onSubmit={handleQuickAiSubmit} className="relative flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={quickAiPrompt}
            onChange={(e) => setQuickAiPrompt(e.target.value)}
            placeholder="Ask a question (e.g., 'What is the minimum attendance required for final exams?')..."
            className="w-full pl-10 pr-28 py-3 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 shadow-xs"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Ask</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick sample chips */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Try:
          </span>
          {[
            'Minimum attendance for exams?',
            'Central Library opening hours?',
            'Spring tuition fee deadline?',
            'Hostel night curfew rules?',
          ].map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuickAiPrompt(chip);
                setActiveTab('assistant');
              }}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 text-[11px] whitespace-nowrap shrink-0 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Quick Action Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <button
          onClick={() => setActiveTab('assistant')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-left transition-all shadow-xs group"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-xs text-slate-900 dark:text-white block">
            Ask a Question
          </span>
          <span className="text-[11px] text-slate-500">Gemini-backed assistance</span>
        </button>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-left transition-all shadow-xs group"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <PlusCircle className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-xs text-slate-900 dark:text-white block">
            Report an Issue
          </span>
          <span className="text-[11px] text-slate-500">Fast grievance redressal</span>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-left transition-all shadow-xs group"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Bell className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-xs text-slate-900 dark:text-white block">
            View Notices
          </span>
          <span className="text-[11px] text-slate-500">Official circulars & events</span>
        </button>

        <button
          onClick={() => setActiveTab('contacts')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-left transition-all shadow-xs group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
            <Contact2 className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-xs text-slate-900 dark:text-white block">
            College Contacts
          </span>
          <span className="text-[11px] text-slate-500">Deans, Exam cell, Helpdesk</span>
        </button>
      </div>

      {/* 5. Split Section: Recent Complaints & Upcoming Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Complaints Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Recent Grievance Submissions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track live progress of tickets logged across campus.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('complaints')}
              className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All ({complaints.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentComplaints.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No complaints submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                    <th className="py-2.5 px-3">Ticket ID</th>
                    <th className="py-2.5 px-3">Title</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentComplaints.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedComplaintForDetail(item)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-blue-700 dark:text-blue-400">
                        {item.id}
                      </td>
                      <td className="py-3 px-3 max-w-[200px]">
                        <div className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{item.location}</div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <StatusBadge status={item.status} size="sm" />
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-right text-slate-400">
                        {formatDateShort(item.updatedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Upcoming Notices and Events (1 Column) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Campus Notices
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Latest announcements</p>
            </div>
            <button
              onClick={() => setActiveTab('notices')}
              className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              See All
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => setActiveTab('notices')}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    {notice.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {formatDateShort(notice.publishDate)}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1 leading-snug">
                  {notice.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {notice.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Useful College Services Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white">
            Quick College Services & Access
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Frequently accessed campus digital utilities and administrative desks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center shrink-0">
              <Wifi className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Wi-Fi Access Portal</h4>
              <p className="text-[11px] text-slate-500">SSID: AITS-Secure-Student (3 devices quota)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Central Library Desk</h4>
              <p className="text-[11px] text-slate-500">Open 8am-10pm (24/7 during exam weeks)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center shrink-0">
              <Home className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Hostel Out-Pass</h4>
              <p className="text-[11px] text-slate-500">In-time curfew 9:30 PM (Digital pass req.)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Medical 24/7 Hotline</h4>
              <p className="text-[11px] text-slate-500">+1 (555) 234-5699 (Building G Ground Fl.)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ComplaintFormModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      <ComplaintDetailModal
        complaint={selectedComplaintForDetail}
        onClose={() => setSelectedComplaintForDetail(null)}
      />
    </div>
  );
};
