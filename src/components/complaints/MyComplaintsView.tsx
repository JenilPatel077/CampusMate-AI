import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ComplaintCategory, ComplaintStatus } from '../../types';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { formatDateShort, filterComplaints, COMPLAINT_CATEGORIES } from '../../utils/complaints';
import { ComplaintFormModal } from './ComplaintFormModal';
import { ComplaintDetailModal } from './ComplaintDetailModal';
import {
  Search,
  Filter,
  PlusCircle,
  ClipboardList,
  ChevronRight,
  RefreshCw,
  Eye,
} from 'lucide-react';

export const MyComplaintsView: React.FC = () => {
  const { complaints, selectedComplaintForDetail, setSelectedComplaintForDetail } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const filteredComplaints = filterComplaints(
    complaints,
    searchQuery,
    selectedStatus,
    selectedCategory
  );

  const statuses: ('All' | ComplaintStatus)[] = [
    'All',
    'Submitted',
    'Under Review',
    'In Progress',
    'Resolved',
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              My Complaints & Grievances
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {complaints.length} Records
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track status updates, resolution notes, and maintenance schedules across campus facilities.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-blue-700/20 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Issue</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Complaint ID (e.g. CMP-2026-1042), title, or location..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              {COMPLAINT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none" role="tablist">
          {statuses.map((status) => {
            const isActive = selectedStatus === status;
            const count =
              status === 'All'
                ? complaints.length
                : complaints.filter((c) => c.status === status).length;

            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                role="tab"
                aria-selected={isActive}
              >
                <span>{status}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-blue-900/40 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Complaints List / Table */}
      {filteredComplaints.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <ClipboardList className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {complaints.length === 0 ? 'No Complaints Submitted Yet' : 'No Matching Complaints Found'}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-5">
            {complaints.length === 0
              ? 'Have an issue with classroom projectors, library Wi-Fi, or electricity? Submit your first ticket now.'
              : 'Try clearing your search query or switching your status filter to "All".'}
          </p>
          {complaints.length === 0 ? (
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold text-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Submit a Complaint
            </button>
          ) : (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('All');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50">
                  <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    ID
                  </th>
                  <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Title & Location
                  </th>
                  <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Category
                  </th>
                  <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Priority
                  </th>
                  <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                  <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Date
                  </th>
                  <th className="py-3.5 px-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredComplaints.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedComplaintForDetail(item)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {item.location}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <PriorityBadge priority={item.priority} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={item.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">
                      <div>Sub: {formatDateShort(item.createdAt)}</div>
                      <div className="text-[10px] text-slate-400">Upd: {formatDateShort(item.updatedAt)}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedComplaintForDetail(item);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {filteredComplaints.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedComplaintForDetail(item)}
                className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                    {item.id}
                  </span>
                  <StatusBadge status={item.status} size="sm" />
                </div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {item.location}
                </div>
                <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px]">
                      {item.category}
                    </span>
                    <PriorityBadge priority={item.priority} size="sm" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complaint Modals */}
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
