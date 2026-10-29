import { Complaint, ComplaintCategory, ComplaintPriority, ComplaintStatus } from '../types';

export const COMPLAINT_CATEGORIES: ComplaintCategory[] = [
  'Classroom',
  'Electricity',
  'Internet/Wi-Fi',
  'Cleanliness',
  'Water Supply',
  'Library',
  'Hostel',
  'Other',
];

export const COMPLAINT_STATUSES: ComplaintStatus[] = [
  'Submitted',
  'Under Review',
  'In Progress',
  'Resolved',
];

export const COMPLAINT_PRIORITIES: ComplaintPriority[] = ['Low', 'Medium', 'High', 'Urgent'];

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function generateComplaintId(existingComplaints: Complaint[]): string {
  const currentYear = new Date().getFullYear();
  let maxNum = 1000;

  for (const c of existingComplaints) {
    const match = c.id.match(/^CMP-(\d{4})-(\d+)$/);
    if (match) {
      const num = parseInt(match[2], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }

  const nextNum = maxNum + 1;
  return `CMP-${currentYear}-${nextNum}`;
}

export function validateComplaint(data: {
  title?: string;
  category?: string;
  description?: string;
  location?: string;
  priority?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const title = (data.title || '').trim();
  if (!title) {
    errors.title = 'Complaint title is required.';
  } else if (title.length < 5) {
    errors.title = 'Title must be at least 5 characters long.';
  } else if (title.length > 120) {
    errors.title = 'Title cannot exceed 120 characters.';
  }

  const category = data.category as ComplaintCategory;
  if (!category || !COMPLAINT_CATEGORIES.includes(category)) {
    errors.category = 'Please select a valid complaint category.';
  }

  const description = (data.description || '').trim();
  if (!description) {
    errors.description = 'Detailed description is required.';
  } else if (description.length < 15) {
    errors.description = 'Please provide more detail (at least 15 characters).';
  } else if (description.length > 2000) {
    errors.description = 'Description cannot exceed 2000 characters.';
  }

  const location = (data.location || '').trim();
  if (!location) {
    errors.location = 'Campus location or department is required.';
  } else if (location.length < 3) {
    errors.location = 'Location must be at least 3 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface ComplaintStats {
  total: number;
  open: number;
  submitted: number;
  underReview: number;
  inProgress: number;
  resolved: number;
  resolutionRate: number;
  categoryCounts: Record<ComplaintCategory, number>;
  priorityCounts: Record<ComplaintPriority, number>;
}

export function calculateComplaintStats(complaints: Complaint[]): ComplaintStats {
  const initialCategoryCounts: Record<ComplaintCategory, number> = {
    Classroom: 0,
    Electricity: 0,
    'Internet/Wi-Fi': 0,
    Cleanliness: 0,
    'Water Supply': 0,
    Library: 0,
    Hostel: 0,
    Other: 0,
  };

  const initialPriorityCounts: Record<ComplaintPriority, number> = {
    Low: 0,
    Medium: 0,
    High: 0,
    Urgent: 0,
  };

  const stats: ComplaintStats = {
    total: complaints.length,
    open: 0,
    submitted: 0,
    underReview: 0,
    inProgress: 0,
    resolved: 0,
    resolutionRate: 0,
    categoryCounts: { ...initialCategoryCounts },
    priorityCounts: { ...initialPriorityCounts },
  };

  for (const c of complaints) {
    // Status counts
    if (c.status === 'Resolved') {
      stats.resolved += 1;
    } else {
      stats.open += 1;
      if (c.status === 'Submitted') stats.submitted += 1;
      if (c.status === 'Under Review') stats.underReview += 1;
      if (c.status === 'In Progress') stats.inProgress += 1;
    }

    // Category count
    if (c.category in stats.categoryCounts) {
      stats.categoryCounts[c.category] += 1;
    } else {
      stats.categoryCounts.Other += 1;
    }

    // Priority count
    if (c.priority in stats.priorityCounts) {
      stats.priorityCounts[c.priority] += 1;
    }
  }

  stats.resolutionRate =
    stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0;

  return stats;
}

export function filterComplaints(
  complaints: Complaint[],
  query: string,
  statusFilter: string,
  categoryFilter: string
): Complaint[] {
  const q = query.trim().toLowerCase();

  return complaints.filter((c) => {
    // Search query matches ID, title, location, or description
    if (q) {
      const matchId = c.id.toLowerCase().includes(q);
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchLoc = c.location.toLowerCase().includes(q);
      const matchDesc = c.description.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchLoc && !matchDesc) return false;
    }

    // Status filter
    if (statusFilter && statusFilter !== 'All') {
      if (c.status !== statusFilter) return false;
    }

    // Category filter
    if (categoryFilter && categoryFilter !== 'All') {
      if (c.category !== categoryFilter) return false;
    }

    return true;
  });
}

export function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

export function formatDateShort(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return isoString;
  }
}
