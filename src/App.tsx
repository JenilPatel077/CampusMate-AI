import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LoginView } from './components/auth/LoginView';
import { DashboardView } from './components/dashboard/DashboardView';
import { AssistantView } from './components/assistant/AssistantView';
import { MyComplaintsView } from './components/complaints/MyComplaintsView';
import { FaqView } from './components/faqs/FaqView';
import { NoticesView } from './components/notices/NoticesView';
import { ContactsView } from './components/contacts/ContactsView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { SettingsView } from './components/settings/SettingsView';

const MainLayout: React.FC = () => {
  const { activeTab, isAuthenticated } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <LoginView />
        <ToastContainer />
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'assistant':
        return <AssistantView />;
      case 'complaints':
        return <MyComplaintsView />;
      case 'faqs':
        return <FaqView />;
      case 'notices':
        return <NoticesView />;
      case 'contacts':
        return <ContactsView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Left Collapsible & Hidable Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div
            key={activeTab}
            className="animate-in fade-in slide-in-from-bottom-1 duration-200"
          >
            {renderCurrentView()}
          </div>
        </main>

        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
