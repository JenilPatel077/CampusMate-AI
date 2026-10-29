import React, { useState } from 'react';
import { Complaint, ComplaintStatus } from '../../types';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { formatDateTime } from '../../utils/complaints';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  FileText,
  User,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface ComplaintDetailModalProps {
  complaint: Complaint | null;
  onClose: () => void;
}

export const ComplaintDetailModal: React.FC<ComplaintDetailModalProps> = ({
  complaint,
  onClose,
}) => {
  const { adminMode, updateComplaintStatus } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<ComplaintStatus | ''>('');
  const [adminNotes, setAdminNotes] = useState('');

  if (!complaint) return null;

  const steps: { status: ComplaintStatus; label: string; desc: string }[] = [
    {
      status: 'Submitted',
      label: 'Ticket Submitted',
      desc: 'Complaint logged in portal and ticket ID assigned.',
    },
    {
      status: 'Under Review',
      label: 'Under Review',
      desc: 'Department supervisor verifying grievance and location.',
    },
    {
      status: 'In Progress',
      label: 'In Progress',
      desc: 'Technician/staff dispatched to address issue.',
    },
    {
      status: 'Resolved',
      label: 'Resolved',
      desc: 'Inspection verified and issue marked complete.',
    },
  ];

  const getStepIndex = (status: ComplaintStatus) => {
    switch (status) {
      case 'Submitted':
        return 0;
      case 'Under Review':
        return 1;
      case 'In Progress':
        return 2;
      case 'Resolved':
        return 3;
      default:
        return 0;
    }
  };

  const currentStepIndex = getStepIndex(complaint.status);

  const handleAdminUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) return;
    updateComplaintStatus(
      complaint.id,
      selectedStatus,
      adminNotes.trim() ? adminNotes.trim() : complaint.resolutionNotes
    );
    setSelectedStatus('');
    setAdminNotes('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                {complaint.id}
              </span>
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>
            <h3 id="detail-title" className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
              {complaint.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="space-y-6 pt-5">
          {/* Status Progress Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Resolution Progress Timeline
            </h4>
            <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-2">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={step.status}
                    className={`relative p-3 rounded-xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 shadow-xs'
                        : isPassed
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {isPassed ? (
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'
                          }`}
                        />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-400 dark:border-slate-600" />
                      )}
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {step.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{complaint.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Submitted At</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {formatDateTime(complaint.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Activity</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {formatDateTime(complaint.updatedAt)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Submitted By</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {complaint.studentName || 'Student'} ({complaint.studentRollNo || 'AITS-Student'})
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Detailed Description
            </h4>
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {complaint.description}
            </div>
          </div>

          {/* Attachment info */}
          {complaint.attachmentName && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Attached Reference File
              </h4>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>{complaint.attachmentName}</span>
                <span className="text-[10px] text-slate-400 font-sans">(Local File Reference)</span>
              </div>
            </div>
          )}

          {/* Admin Resolution Remarks (if present) */}
          {complaint.resolutionNotes && (
            <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs">
              <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1">
                Department Notes & Resolution Remarks
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {complaint.resolutionNotes}
              </p>
            </div>
          )}

          {/* Demo Admin Live Status Update Panel */}
          {adminMode && (
            <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-700/80 bg-amber-50/70 dark:bg-amber-950/30 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Staff Authority: Update Ticket Status & Resolution
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-100 font-bold px-1.5 py-0.5 rounded">
                  Staff Desk
                </span>
              </div>
              <form onSubmit={handleAdminUpdate} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedStatus || complaint.status}
                    onChange={(e) => setSelectedStatus(e.target.value as ComplaintStatus)}
                    className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Submitted">Status: Submitted</option>
                    <option value="Under Review">Status: Under Review</option>
                    <option value="In Progress">Status: In Progress</option>
                    <option value="Resolved">Status: Resolved</option>
                  </select>
                  <input
                    type="text"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Optional administrative note or resolution summary..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Save Status
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
