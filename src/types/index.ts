export type ComplaintCategory =
  | 'Classroom'
  | 'Electricity'
  | 'Internet/Wi-Fi'
  | 'Cleanliness'
  | 'Water Supply'
  | 'Library'
  | 'Hostel'
  | 'Other';

export type ComplaintStatus = 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved';

export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Complaint {
  id: string;
  title: string;
  category: ComplaintCategory;
  description: string;
  location: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  attachmentName?: string;
  resolutionNotes?: string;
  studentName?: string;
  studentRollNo?: string;
}

export type FaqCategory =
  | 'Admissions'
  | 'Examinations'
  | 'Fees'
  | 'Library'
  | 'Student Services'
  | 'General Information';

export interface FAQ {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
  tags: string[];
}

export type NoticeCategory =
  | 'Academic'
  | 'Examination'
  | 'Sports & Culture'
  | 'Administration'
  | 'Placement';

export type NoticeImportance = 'Urgent' | 'Important' | 'Normal';

export interface Notice {
  id: string;
  title: string;
  description: string;
  category: NoticeCategory;
  publishDate: string;
  eventDate?: string;
  importance: NoticeImportance;
  department: string;
  isEvent?: boolean;
  location?: string;
}

export interface Contact {
  id: string;
  department: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  officeLocation: string;
  officeHours: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: string[];
  isError?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  department: string;
  semester: string;
  avatar: string;
  role?: 'student' | 'admin';
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  complaintUpdates: boolean;
  aiConciseMode: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
