import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Complaint, ComplaintStatus } from '../../types';
import {
  calculateComplaintStats,
  formatDateShort,
  COMPLAINT_STATUSES,
  filterComplaints,
} from '../../utils/complaints';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { ComplaintDetailModal } from '../complaints/ComplaintDetailModal';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  Eye,
  Edit3,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    complaints,
    updateComplaintStatus,
    selectedComplaintForDetail,
    setSelectedComplaintForDetail,
    adminMode,
    setAdminMode,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('In Progress');
  const [newNotes, setNewNotes] = useState('');

  const stats = calculateComplaintStats(complaints);
  const filtered = filterComplaints(complaints, searchQuery, statusFilter, categoryFilter);

  const openStatusEditor = (complaint: Complaint) => {
    setEditingComplaint(complaint);
    setNewStatus(complaint.status);
    setNewNotes(complaint.resolutionNotes || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingComplaint) return;
    updateComplaintStatus(editingComplaint.id, newStatus, newNotes.trim() || undefined);
    setEditingComplaint(null);
  };

  // Category breakdown data for SVG chart
  const categoryEntries = Object.entries(stats.categoryCounts).filter(([, count]) => count > 0);
  const maxCategoryCount = Math.max(...categoryEntries.map(([, c]) => c), 1);

  return (
    <div className="space-y-6">
      {/* Admin Operations Banner */}
      <div className="rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-700/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                Campus Operations & Grievance Administration
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                Staff Control Desk
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Authorized operations center. Triage student grievances, assign technicians, update turnaround timelines, and resolve campus service requests.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminMode(!adminMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              adminMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}
          >
            {adminMode ? 'Admin Mode: Active' : 'Enable Admin Mode'}
          </button>
        </div>
      </div>

      {/* High-level Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Grievances</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {stats.total}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Logged across all campus blocks</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Open Backlog</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">
            {stats.open}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {stats.submitted} Submitted • {stats.inProgress} In Progress
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Resolved Tickets</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
            {stats.resolved}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Inspected & closed</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Resolution Rate</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400">
            {stats.resolutionRate}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.resolutionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Lightweight SVG Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                Category Distribution
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Dynamic breakdown</span>
          </div>

          <div className="space-y-2.5 pt-1">
            {categoryEntries.map(([cat, count]) => {
              const percentage = Math.round((count / stats.total) * 100) || 0;
              const barWidth = Math.max(Math.round((count / maxCategoryCount) * 100), 10);

              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-medium">{cat}</span>
                    <span className="font-mono font-semibold text-slate-500">
                      {count} ticket{count > 1 ? 's' : ''} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution Visual Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-600" />
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                Operational Status Pipeline
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">Live SLA status</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-left">
              <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300">
                1. Submitted
              </span>
              <div className="font-heading font-extrabold text-2xl text-blue-800 dark:text-blue-200 mt-1">
                {stats.submitted}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Awaiting department triage</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-left">
              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300">
                2. Under Review
              </span>
              <div className="font-heading font-extrabold text-2xl text-amber-800 dark:text-amber-200 mt-1">
                {stats.underReview}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Supervisor assessing feasibility</p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-left">
              <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-300">
                3. In Progress
              </span>
              <div className="font-heading font-extrabold text-2xl text-indigo-800 dark:text-indigo-200 mt-1">
                {stats.inProgress}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Technician dispatched</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-left">
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">
                4. Resolved
              </span>
              <div className="font-heading font-extrabold text-2xl text-emerald-800 dark:text-emerald-200 mt-1">
                {stats.resolved}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Work completed & verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Searchable Admin Complaint Management Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden space-y-3 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Complaint Management Desk
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live status update controls. Changes immediately sync with the student view and dashboard metrics.
            </p>
          </div>

          {/* Table Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaints..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="All">All Statuses</option>
              {COMPLAINT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50">
                <th className="py-3 px-3 font-bold uppercase tracking-wider text-slate-500">ID</th>
                <th className="py-3 px-3 font-bold uppercase tracking-wider text-slate-500">Title & Location</th>
                <th className="py-3 px-3 font-bold uppercase tracking-wider text-slate-500">Student</th>
                <th className="py-3 px-3 font-bold uppercase tracking-wider text-slate-500">Category</th>
                <th className="py-3 px-3 font-bold uppercase tracking-wider text-slate-500">Priority</th>
                <th className="py-3 px-3 font-bold uppercase tracking-wider text-slate-500">Current Status</th>
                <th className="py-3 px-3 font-bold uppercase tracking-wider text-slate-500 text-right">
                  Manage Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-blue-700 dark:text-blue-400">
                    {item.id}
                  </td>
                  <td className="py-3 px-3 max-w-xs">
                    <div className="font-semibold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">{item.location}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                    <div>{item.studentName || 'Student'}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.studentRollNo}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <PriorityBadge priority={item.priority} size="sm" />
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <StatusBadge status={item.status} size="sm" />
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-right space-x-1.5">
                    {/* Live Status Changer Dropdown */}
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateComplaintStatus(item.id, e.target.value as ComplaintStatus)
                      }
                      className="px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                    <button
                      onClick={() => openStatusEditor(item)}
                      className="p-1 rounded text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Add Notes"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedComplaintForDetail(item)}
                      className="p-1 rounded text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status & Resolution Notes Editor Modal */}
      {editingComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-2">
              Update Status for {editingComplaint.id}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{editingComplaint.title}</p>

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Resolution Remarks & Field Actions
                </label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Technician Dev Patel dispatched. Switch port 14 rebooted, signal level restored to -52dBm."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingComplaint(null)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-600 text-white font-semibold text-xs rounded-lg"
                >
                  Save & Update Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <ComplaintDetailModal
        complaint={selectedComplaintForDetail}
        onClose={() => setSelectedComplaintForDetail(null)}
      />
    </div>
  );
};
