import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Complaint,
  ComplaintStatus,
  FAQ,
  Notice,
  Contact,
  UserProfile,
  ToastMessage,
} from '../types';
import {
  INITIAL_COMPLAINTS,
  INITIAL_FAQS,
  INITIAL_NOTICES,
  INITIAL_CONTACTS,
  INITIAL_STUDENT_PROFILE,
} from '../data/collegeData';
import { generateComplaintId, validateComplaint } from '../utils/complaints';

interface AppContextType {
  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Authentication & Session
  isAuthenticated: boolean;
  login: (profile: Partial<UserProfile>, role?: 'student' | 'admin') => void;
  logout: () => void;

  // Sidebar controls
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  sidebarHidden: boolean;
  setSidebarHidden: (hidden: boolean) => void;
  toggleSidebarHidden: () => void;

  // Student Profile & Settings
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Admin Demo Mode
  adminMode: boolean;
  setAdminMode: (enabled: boolean) => void;

  // Complaints
  complaints: Complaint[];
  addComplaint: (data: {
    title: string;
    category: Complaint['category'];
    description: string;
    location: string;
    priority: Complaint['priority'];
    attachmentName?: string;
  }) => { success: boolean; id?: string; errors?: Record<string, string> };
  updateComplaintStatus: (
    id: string,
    status: ComplaintStatus,
    resolutionNotes?: string
  ) => void;
  deleteComplaint: (id: string) => void;
  selectedComplaintForDetail: Complaint | null;
  setSelectedComplaintForDetail: (c: Complaint | null) => void;

  // Notices
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id' | 'publishDate'>) => void;

  // FAQs
  faqs: FAQ[];
  addFaq: (faq: Omit<FAQ, 'id'>) => void;

  // Contacts
  contacts: Contact[];

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  AUTH: 'campusmate_auth_v1',
  COMPLAINTS: 'campusmate_complaints_v1',
  FAQS: 'campusmate_faqs_v1',
  NOTICES: 'campusmate_notices_v1',
  PROFILE: 'campusmate_profile_v1',
  ADMIN_MODE: 'campusmate_admin_mode_v1',
  THEME: 'campusmate_theme_v1',
  SIDEBAR_COLLAPSED: 'campusmate_sidebar_collapsed_v1',
  SIDEBAR_HIDDEN: 'campusmate_sidebar_hidden_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Authentication session state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH);
      return savedAuth !== null ? savedAuth === 'true' : false; // Prompt student sign-in / registration on first visit
    } catch {
      return false;
    }
  });

  // Sidebar collapse & hide state
  const [sidebarCollapsed, setSidebarCollapsedState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED) === 'true';
    } catch {
      return false;
    }
  });

  const [sidebarHidden, setSidebarHiddenState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SIDEBAR_HIDDEN) === 'true';
    } catch {
      return false;
    }
  });

  const [adminMode, setAdminModeState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_MODE) === 'true';
    } catch {
      return false;
    }
  });

  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark' | 'system' | null;
      return saved || 'light';
    } catch {
      return 'light';
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  const setSidebarCollapsed = (collapsed: boolean) => {
    setSidebarCollapsedState(collapsed);
    try {
      localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, String(collapsed));
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const setSidebarHidden = (hidden: boolean) => {
    setSidebarHiddenState(hidden);
    try {
      localStorage.setItem(STORAGE_KEYS.SIDEBAR_HIDDEN, String(hidden));
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleSidebarHidden = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const login = (profile: Partial<UserProfile>, role: 'student' | 'admin' = 'student') => {
    const updated = {
      ...userProfile,
      ...profile,
      role,
    };
    setUserProfile(updated);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    if (role === 'admin') {
      setAdminModeState(true);
      setActiveTab('admin');
      addToast(`Welcome Administrator ${updated.name}! Staff Operations Desk loaded.`, 'success');
    } else {
      setAdminModeState(false);
      setActiveTab('dashboard');
      addToast(`Welcome back, ${updated.name}!`, 'success');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'false');
    } catch (e) {
      console.warn(e);
    }
    addToast('You have signed out of CampusMate AI.', 'info');
  };

  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
      return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
    } catch {
      return INITIAL_COMPLAINTS;
    }
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
      return saved ? JSON.parse(saved) : INITIAL_NOTICES;
    } catch {
      return INITIAL_NOTICES;
    }
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : INITIAL_FAQS;
    } catch {
      return INITIAL_FAQS;
    }
  });

  const [contacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [selectedComplaintForDetail, setSelectedComplaintForDetail] = useState<Complaint | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn('Failed to save theme preference', e);
    }
  }, [theme]);

  // Persist complaints
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
    } catch (e) {
      console.warn('Failed to save complaints', e);
    }
  }, [complaints]);

  // Persist notices
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
    } catch (e) {
      console.warn('Failed to save notices', e);
    }
  }, [notices]);

  // Persist FAQs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
    } catch (e) {
      console.warn('Failed to save faqs', e);
    }
  }, [faqs]);

  // Persist Profile
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Failed to save profile', e);
    }
  }, [userProfile]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    setUserProfile((prev) => ({ ...prev, theme: newTheme }));
  };

  const setAdminMode = (enabled: boolean) => {
    setAdminModeState(enabled);
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_MODE, String(enabled));
    } catch (e) {
      console.warn(e);
    }
    if (enabled) {
      addToast('Staff Administration Desk active: You can now review and resolve campus grievance tickets.', 'info');
    } else {
      addToast('Switched back to Student Portal view.', 'info');
    }
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 4.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    addToast('Profile preferences updated successfully.', 'success');
  };

  const addComplaint = (data: {
    title: string;
    category: Complaint['category'];
    description: string;
    location: string;
    priority: Complaint['priority'];
    attachmentName?: string;
  }) => {
    const validation = validateComplaint(data);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const newId = generateComplaintId(complaints);
    const now = new Date().toISOString();

    const newComplaint: Complaint = {
      id: newId,
      title: data.title.trim(),
      category: data.category,
      description: data.description.trim(),
      location: data.location.trim(),
      priority: data.priority,
      status: 'Submitted',
      createdAt: now,
      updatedAt: now,
      attachmentName: data.attachmentName || undefined,
      studentName: userProfile.name,
      studentRollNo: userProfile.rollNo,
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    addToast(`Complaint submitted successfully! Reference ID: ${newId}`, 'success');
    return { success: true, id: newId };
  };

  const updateComplaintStatus = (
    id: string,
    status: ComplaintStatus,
    resolutionNotes?: string
  ) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = {
            ...c,
            status,
            updatedAt: new Date().toISOString(),
            resolutionNotes:
              resolutionNotes !== undefined ? resolutionNotes : c.resolutionNotes,
          };
          if (selectedComplaintForDetail?.id === id) {
            setSelectedComplaintForDetail(updated);
          }
          return updated;
        }
        return c;
      })
    );
    addToast(`Complaint ${id} status updated to "${status}".`, 'success');
  };

  const deleteComplaint = (id: string) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
    if (selectedComplaintForDetail?.id === id) {
      setSelectedComplaintForDetail(null);
    }
    addToast(`Complaint ${id} removed.`, 'info');
  };

  const addNotice = (data: Omit<Notice, 'id' | 'publishDate'>) => {
    const newNotice: Notice = {
      ...data,
      id: `not-${Date.now().toString(36)}`,
      publishDate: new Date().toISOString().split('T')[0],
    };
    setNotices((prev) => [newNotice, ...prev]);
    addToast('New announcement posted successfully.', 'success');
  };

  const addFaq = (data: Omit<FAQ, 'id'>) => {
    const newFaq: FAQ = {
      ...data,
      id: `faq-${Date.now().toString(36)}`,
    };
    setFaqs((prev) => [newFaq, ...prev]);
    addToast('FAQ submitted and added to knowledge library.', 'success');
  };

  const resetDemoData = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPLAINTS);
      localStorage.removeItem(STORAGE_KEYS.FAQS);
      localStorage.removeItem(STORAGE_KEYS.NOTICES);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
    } catch (e) {
      console.warn(e);
    }
    setComplaints(INITIAL_COMPLAINTS);
    setFaqs(INITIAL_FAQS);
    setNotices(INITIAL_NOTICES);
    setUserProfile(INITIAL_STUDENT_PROFILE);
    setSelectedComplaintForDetail(null);
    addToast('All campus records have been reset to university defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isAuthenticated,
        login,
        logout,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        sidebarHidden,
        setSidebarHidden,
        toggleSidebarHidden,
        userProfile,
        updateUserProfile,
        theme,
        setTheme,
        adminMode,
        setAdminMode,
        complaints,
        addComplaint,
        updateComplaintStatus,
        deleteComplaint,
        selectedComplaintForDetail,
        setSelectedComplaintForDetail,
        notices,
        addNotice,
        faqs,
        addFaq,
        contacts,
        toasts,
        addToast,
        removeToast,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
