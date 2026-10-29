import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  PanelLeft,
  Sparkles,
  ShieldAlert,
  Sun,
  Moon,
  ChevronDown,
  Settings,
  LogOut,
  PlusCircle,
  Bell,
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileSidebar }) => {
  const {
    activeTab,
    setActiveTab,
    adminMode,
    setAdminMode,
    theme,
    setTheme,
    userProfile,
    sidebarHidden,
    toggleSidebarHidden,
    logout,
  } = useApp();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getPageTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard':
        return 'Student Dashboard';
      case 'assistant':
        return 'CampusMate AI Assistant';
      case 'complaints':
        return 'My Complaints & Grievances';
      case 'notices':
        return 'Announcements & Campus Events';
      case 'faqs':
        return 'Campus FAQ Library';
      case 'contacts':
        return 'Department Directory';
      case 'admin':
        return 'Staff Operations Desk';
      case 'settings':
        return 'Portal Settings & Theme';
      default:
        return 'Dashboard';
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-20 w-full h-16 border-b border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left section: Sidebar unhide / hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Toggle when hidden */}
        {sidebarHidden && (
          <button
            onClick={toggleSidebarHidden}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100"
            title="Unhide Sidebar"
          >
            <PanelLeft className="w-4 h-4 text-blue-600" />
            <span>Show Menu</span>
          </button>
        )}

        {/* Breadcrumb title */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
            CampusMate
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">/</span>
          <h2 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 dark:text-white tracking-tight truncate">
            {getPageTitle(activeTab)}
          </h2>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Ask AI button if not on assistant page */}
        {activeTab !== 'assistant' && (
          <button
            onClick={() => setActiveTab('assistant')}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Ask AI</span>
          </button>
        )}

        {/* Staff Administration Switch */}
        <button
          onClick={() => {
            const nextMode = !adminMode;
            setAdminMode(nextMode);
            if (nextMode) setActiveTab('admin');
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            adminMode
              ? 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-700 shadow-xs'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}
          title="Switch to Staff Administration Desk"
        >
          <ShieldAlert className={`w-3.5 h-3.5 ${adminMode ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
          <span className="hidden sm:inline">Staff Desk</span>
          <span
            className={`w-2 h-2 rounded-full ${
              adminMode ? 'bg-blue-600 dark:bg-blue-400 animate-pulse' : 'bg-slate-400'
            }`}
          />
        </button>

        {/* Theme quick toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Student Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            aria-expanded={profileDropdownOpen}
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500/30"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {userProfile.rollNo}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{userProfile.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{userProfile.email}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                  {userProfile.department}
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Settings & Theme
                </button>
                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  Sign Out / Switch Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
