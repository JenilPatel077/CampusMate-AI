import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ComplaintCategory, ComplaintPriority } from '../../types';
import { COMPLAINT_CATEGORIES, COMPLAINT_PRIORITIES } from '../../utils/complaints';
import { X, UploadCloud, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface ComplaintFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintFormModal: React.FC<ComplaintFormModalProps> = ({ isOpen, onClose }) => {
  const { addComplaint, setActiveTab } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('Internet/Wi-Fi');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState<ComplaintPriority>('Medium');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, attachment: 'File size must be under 10MB.' }));
        return;
      }
      setAttachment(file);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.attachment;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = addComplaint({
      title,
      category,
      location,
      priority,
      description,
      attachmentName: attachment ? attachment.name : undefined,
    });

    setIsSubmitting(false);

    if (!result.success && result.errors) {
      setErrors(result.errors);
    } else if (result.success && result.id) {
      setSubmittedId(result.id);
    }
  };

  const handleCloseAndReset = () => {
    setTitle('');
    setCategory('Internet/Wi-Fi');
    setLocation('');
    setPriority('Medium');
    setDescription('');
    setAttachment(null);
    setErrors({});
    setSubmittedId(null);
    onClose();
  };

  const handleViewInList = () => {
    handleCloseAndReset();
    setActiveTab('complaints');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 id="modal-title" className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              {submittedId ? 'Complaint Submitted' : 'Submit a Campus Complaint'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {submittedId
                ? 'Your grievance has been registered and assigned a unique tracker.'
                : 'Directly report facility, equipment, network, or cleanliness issues.'}
            </p>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedId ? (
          /* Submission Success State */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                Ticket Registered Successfully
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your complaint has been queued with initial status{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">Submitted</span>.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Complaint Reference ID
              </span>
              <span className="font-mono text-xl font-black text-blue-700 dark:text-blue-300">
                {submittedId}
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Save this reference code to track resolution progress or check with the helpdesk.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={handleViewInList}
                className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-semibold text-xs shadow-md transition-all"
              >
                View in My Complaints
              </button>
              <button
                type="button"
                onClick={handleCloseAndReset}
                className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-all"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          /* Complaint Form */
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            {/* Title */}
            <div>
              <label htmlFor="complaint-title" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Complaint Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="complaint-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                }}
                placeholder="e.g. Wi-Fi dropping intermittently in Turing Hall Lab 3"
                className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
                  errors.title
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 focus:ring-blue-600/20'
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2`}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Category & Priority Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="complaint-category" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  id="complaint-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                >
                  {COMPLAINT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="complaint-priority" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Priority Level
                </label>
                <select
                  id="complaint-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                >
                  {COMPLAINT_PRIORITIES.map((p) => (
                    <option key={p} value={p}>
                      {p} Priority
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="complaint-location" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Specific Location or Department <span className="text-rose-500">*</span>
              </label>
              <input
                id="complaint-location"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                }}
                placeholder="e.g. Babbage Block, 2nd Floor, Room CS-204"
                className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
                  errors.location
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 focus:ring-blue-600/20'
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2`}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.location}
                </p>
              )}
            </div>

            {/* Detailed Description */}
            <div>
              <label htmlFor="complaint-description" className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Detailed Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="complaint-description"
                rows={3}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
                }}
                placeholder="Describe what occurred, any equipment model numbers, steps to reproduce, or safety risks..."
                className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
                  errors.description
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 focus:ring-blue-600/20'
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 resize-none`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Optional Attachment */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Optional Attachment <span className="text-slate-400 font-normal">(Photo / Log / Screenshot)</span>
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">
                  <UploadCloud className="w-4 h-4 text-blue-600" />
                  <span>Choose Local File</span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf,.txt,.log"
                  />
                </label>
                {attachment ? (
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1.5 rounded-lg border border-blue-200/60 dark:border-blue-800">
                    <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate max-w-[200px]">{attachment.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachment(null)}
                      className="text-slate-400 hover:text-rose-600 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    No file selected (Local reference for prototype)
                  </span>
                )}
              </div>
              {errors.attachment && (
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">{errors.attachment}</p>
              )}
            </div>

            {/* Submit / Cancel Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleCloseAndReset}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold text-xs shadow-md shadow-blue-700/20 transition-all flex items-center gap-2"
              >
                {isSubmitting ? 'Registering Ticket...' : 'Submit Complaint'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
