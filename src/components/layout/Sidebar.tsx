import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Sparkles,
  LayoutDashboard,
  ClipboardList,
  Bell,
  FileQuestion,
  Contact2,
  ShieldAlert,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  X,
  User,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const {
    activeTab,
    setActiveTab,
    adminMode,
    setAdminMode,
    theme,
    setTheme,
    userProfile,
    sidebarCollapsed,
    toggleSidebar,
    sidebarHidden,
    toggleSidebarHidden,
    logout,
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assistant', label: 'Campus AI', icon: Sparkles, badge: 'Gemini' },
    { id: 'complaints', label: 'My Complaints', icon: ClipboardList },
    { id: 'notices', label: 'Notices & Events', icon: Bell },
    { id: 'faqs', label: 'FAQ Library', icon: FileQuestion },
    { id: 'contacts', label: 'Contacts', icon: Contact2 },
    { id: 'admin', label: 'Admin Desk', icon: ShieldAlert, isSpecial: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    onMobileClose();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // If sidebar is hidden on desktop and not in mobile drawer, render null
  if (sidebarHidden && !mobileOpen) {
    return null;
  }

  const sidebarContent = (
    <aside
      className={`h-full flex flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 select-none ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Brand Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`flex items-center gap-2.5 overflow-hidden text-left focus:outline-none ${
              sidebarCollapsed ? 'justify-center w-full' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-700/20 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-heading font-extrabold text-base tracking-tight text-slate-900 dark:text-white truncate">
                  CAMPUSMATE<span className="text-blue-600 dark:text-blue-400"> AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                  Your Campus, One Click Away
                </span>
              </div>
            )}
          </button>

          {/* Collapse/Hide Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle sidebar width"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1" aria-label="Sidebar Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'
                  }`}
                />
                {!sidebarCollapsed && (
                  <div className="flex-1 flex items-center justify-between text-left truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                        {item.badge}
                      </span>
                    )}
                    {item.id === 'admin' && adminMode && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Staff Admin Switch, Theme Toggle, Profile & Logout */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        {/* Staff Desk Mode Toggle */}
        {!sidebarCollapsed ? (
          <button
            onClick={() => {
              const next = !adminMode;
              setAdminMode(next);
              if (next) setActiveTab('admin');
            }}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold border transition-all ${
              adminMode
                ? 'bg-blue-100/90 text-blue-900 border-blue-300 dark:bg-blue-950/80 dark:text-blue-200 dark:border-blue-700 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className={`w-3.5 h-3.5 ${adminMode ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              <span>Staff Administration</span>
            </div>
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                adminMode ? 'bg-blue-600 dark:bg-blue-400 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            />
          </button>
        ) : (
          <button
            onClick={() => {
              const next = !adminMode;
              setAdminMode(next);
              if (next) setActiveTab('admin');
            }}
            title={adminMode ? 'Staff Administration: Active' : 'Switch to Staff Administration'}
            className={`w-full flex items-center justify-center p-2.5 rounded-xl border transition-all ${
              adminMode
                ? 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200'
                : 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </button>
        )}

        {/* Theme and Hide Toggle row */}
        <div className={`flex items-center gap-1.5 ${sidebarCollapsed ? 'flex-col' : 'justify-between'}`}>
          <button
            onClick={toggleTheme}
            className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                {!sidebarCollapsed && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-600" />
                {!sidebarCollapsed && <span>Dark Mode</span>}
              </>
            )}
          </button>

          {!sidebarCollapsed && (
            <button
              onClick={toggleSidebarHidden}
              className="p-2 rounded-xl text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Hide sidebar to full view"
            >
              Hide Bar
            </button>
          )}
        </div>

        {/* Student Profile Card & Logout */}
        <div
          className={`flex items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 ${
            sidebarCollapsed ? 'justify-center' : 'justify-between gap-2'
          }`}
        >
          <div
            onClick={() => handleNavClick('settings')}
            className={`flex items-center gap-2.5 cursor-pointer overflow-hidden ${
              sidebarCollapsed ? 'justify-center' : 'flex-1'
            }`}
            title="Open Profile & Settings"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500/30 shrink-0"
            />
            {!sidebarCollapsed && (
              <div className="truncate">
                <span className="text-xs font-bold text-slate-900 dark:text-white block truncate leading-tight">
                  {userProfile.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block truncate">
                  {userProfile.rollNo}
                </span>
              </div>
            )}
          </div>

          {!sidebarCollapsed && (
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Sign Out / Switch User"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-30">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={onMobileClose}
          />
          <div className="relative z-10 w-72 h-full shadow-2xl animate-in slide-in-from-left duration-250">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
