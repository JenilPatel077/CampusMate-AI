import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Contact } from '../../types';
import {
  Contact2,
  Search,
  Mail,
  Phone,
  MapPin,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Building2,
} from 'lucide-react';

export const ContactsView: React.FC = () => {
  const { contacts, addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredContacts = contacts.filter((contact) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      contact.department.toLowerCase().includes(q) ||
      contact.contactPerson.toLowerCase().includes(q) ||
      contact.designation.toLowerCase().includes(q) ||
      contact.email.toLowerCase().includes(q) ||
      contact.officeLocation.toLowerCase().includes(q)
    );
  });

  const handleCopyEmail = (contact: Contact) => {
    navigator.clipboard.writeText(contact.email);
    setCopiedId(contact.id);
    addToast(`Copied ${contact.email} to clipboard!`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              College Department Contacts
            </h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {contacts.length} Offices
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Directory of academic offices, examination cells, student welfare, IT helpdesk, and campus health center.
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by department name, official, email, or building..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
          />
        </div>
      </div>

      {/* Directory Grid */}
      {filteredContacts.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-12 text-center shadow-xs">
          <Contact2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            No contacts match your query
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Try searching for "Exam", "Library", "Accounts", or "Hostel".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-blue-200 dark:hover:border-blue-900 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800">
                      {contact.category}
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white pt-1">
                      {contact.department}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {contact.contactPerson}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{contact.designation}</span>
                </div>

                {/* Details list */}
                <div className="pt-2 space-y-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{contact.officeLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{contact.officeHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-blue-600 dark:text-blue-400 truncate">
                      {contact.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyEmail(contact)}
                  className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5"
                  title="Copy email address"
                >
                  {copiedId === contact.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
