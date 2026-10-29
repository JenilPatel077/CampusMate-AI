import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Sun,
  Moon,
  Monitor,
  User,
  Bell,
  Sparkles,
  RotateCcw,
  Download,
  CheckCircle2,
  Save,
  Shield,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    theme,
    setTheme,
    resetDemoData,
    complaints,
    faqs,
    notices,
    addToast,
  } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [rollNo, setRollNo] = useState(userProfile.rollNo);
  const [department, setDepartment] = useState(userProfile.department);
  const [semester, setSemester] = useState(userProfile.semester);
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [emailNotifications, setEmailNotifications] = useState(userProfile.emailNotifications);
  const [complaintUpdates, setComplaintUpdates] = useState(userProfile.complaintUpdates);
  const [aiConciseMode, setAiConciseMode] = useState(userProfile.aiConciseMode);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      rollNo,
      department,
      semester,
      avatar,
      emailNotifications,
      complaintUpdates,
      aiConciseMode,
    });
  };

  const handleExportData = () => {
    const backup = {
      profile: userProfile,
      complaints,
      faqs,
      notices,
      exportDate: new Date().toISOString(),
      system: 'CampusMate AI Prototype',
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `campusmate_data_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Backup exported as JSON file.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
          Portal Settings & Preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize interface appearance, student identity profile, AI behaviors, and notification channels.
        </p>
      </div>

      {/* Theme & Appearance Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" />
            Appearance & Color Theme
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Choose light, dark, or system mode. Applies immediately across all views.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Light Theme Card */}
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between h-28 ${
              theme === 'light'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-blue-600' : 'text-slate-400'}`} />
              {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-white block">
                Light Mode
              </span>
              <span className="text-[11px] text-slate-500">Academic porcelain canvas</span>
            </div>
          </button>

          {/* Dark Theme Card */}
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between h-28 ${
              theme === 'dark'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-slate-400'}`} />
              {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-white block">
                Dark Mode
              </span>
              <span className="text-[11px] text-slate-500">Deep obsidian & slate navy</span>
            </div>
          </button>

          {/* System Theme Card */}
          <button
            type="button"
            onClick={() => setTheme('system')}
            className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col justify-between h-28 ${
              theme === 'system'
                ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <Monitor className={`w-5 h-5 ${theme === 'system' ? 'text-blue-600' : 'text-slate-400'}`} />
              {theme === 'system' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-white block">
                System Default
              </span>
              <span className="text-[11px] text-slate-500">Matches OS dark/light mode</span>
            </div>
          </button>
        </div>
      </div>

      {/* Student Profile Settings Form */}
      <form
        onSubmit={handleProfileSave}
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4"
      >
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Student Profile Information
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Used as signature on submitted complaints and personalized assistant queries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Student Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Campus Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Roll / Registration Number
            </label>
            <input
              type="text"
              required
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Department / Discipline
            </label>
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Semester / Academic Term
            </label>
            <input
              type="text"
              required
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Avatar Image URL
            </label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
            <div>
              <span className="font-semibold text-xs text-slate-900 dark:text-white block">
                Instant Ticket Status Notifications
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Show live status toast whenever an administrator reviews or resolves your complaint.
              </span>
            </div>
            <input
              type="checkbox"
              checked={complaintUpdates}
              onChange={(e) => setComplaintUpdates(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 cursor-pointer">
            <div>
              <span className="font-semibold text-xs text-slate-900 dark:text-white block">
                AI Concise Answer Mode
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Instruct CampusMate AI assistant to prioritize bullet-point responses over long paragraphs.
              </span>
            </div>
            <input
              type="checkbox"
              checked={aiConciseMode}
              onChange={(e) => setAiConciseMode(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-700/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Preferences</span>
          </button>
        </div>
      </form>

      {/* Portal Data & Storage Management Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-500" />
            Portal Data Management & Offline Storage
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Your grievance tickets and student preferences are securely retained in local storage for fast access.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Portal Data (JSON)</span>
          </button>

          <button
            type="button"
            onClick={resetDemoData}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50/60 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Restore Default Campus Records</span>
          </button>
        </div>
      </div>
    </div>
  );
};
