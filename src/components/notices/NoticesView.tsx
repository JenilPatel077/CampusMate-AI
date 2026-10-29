import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Notice, NoticeCategory, NoticeImportance } from '../../types';
import { formatDateShort } from '../../utils/complaints';
import {
  Bell,
  Calendar,
  Search,
  Filter,
  AlertCircle,
  Tag,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';

const NOTICE_CATEGORIES: ('All' | NoticeCategory)[] = [
  'All',
  'Academic',
  'Examination',
  'Placement',
  'Sports & Culture',
  'Administration',
];

export const NoticesView: React.FC = () => {
  const { notices } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | NoticeCategory>('All');
  const [onlyEvents, setOnlyEvents] = useState(false);

  const filteredNotices = notices.filter((notice) => {
    if (selectedCategory !== 'All' && notice.category !== selectedCategory) {
      return false;
    }

    if (onlyEvents && !notice.isEvent) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = notice.title.toLowerCase().includes(q);
      const inDesc = notice.description.toLowerCase().includes(q);
      const inDept = notice.department.toLowerCase().includes(q);
      if (!inTitle && !inDesc && !inDept) return false;
    }

    return true;
  });

  const upcomingEvents = notices.filter((n) => n.isEvent && n.eventDate);

  const getImportanceBadge = (importance: NoticeImportance) => {
    switch (importance) {
      case 'Urgent':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            Urgent
          </span>
        );
      case 'Important':
        return (
          <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
            Important
          </span>
        );
      case 'Normal':
      default:
        return (
          <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Notice
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              Announcements & Campus Events
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {notices.length} Live
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official circulars, exam schedules, hackathons, sports trials, and infrastructure advisories.
          </p>
        </div>
      </div>

      {/* Featured Upcoming Events Spotlight Carousel/Row */}
      {upcomingEvents.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Upcoming Event Spotlight
            </h2>
            <span className="text-[11px] text-slate-400">Chronological calendar dates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-blue-100 dark:border-blue-900/50 p-4.5 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
                      {event.category}
                    </span>
                    {getImportanceBadge(event.importance)}
                  </div>

                  <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <div className="flex items-center gap-1 font-semibold text-blue-700 dark:text-blue-400">
                    <Calendar className="w-3 h-3" />
                    <span>{event.eventDate ? formatDateShort(event.eventDate) : 'TBA'}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1 truncate max-w-[140px] text-slate-400">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars by keyword, exam, department, or date..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
            />
          </div>

          <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40 cursor-pointer select-none text-xs font-semibold text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={onlyEvents}
              onChange={(e) => setOnlyEvents(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Events Only</span>
          </label>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {NOTICE_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const count =
              cat === 'All' ? notices.length : notices.filter((n) => n.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cat}</span>
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

      {/* Notices Feed */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center shadow-xs">
          <Bell className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            No notices match your filters
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-5">
            Try adjusting your search keywords or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setOnlyEvents(false);
            }}
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {notice.category}
                  </span>
                  {getImportanceBadge(notice.importance)}
                  <span className="text-xs text-slate-400">
                    Dept: <span className="font-medium text-slate-600 dark:text-slate-300">{notice.department}</span>
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Posted: {formatDateShort(notice.publishDate)}</span>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {notice.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              {(notice.isEvent || notice.location) && (
                <div className="pt-2 flex items-center gap-4 text-xs font-medium text-blue-700 dark:text-blue-400 flex-wrap">
                  {notice.eventDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Event Date: {formatDateShort(notice.eventDate)}</span>
                    </div>
                  )}
                  {notice.location && (
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Venue: {notice.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
