import React, { useState } from 'react';
import { LifeBuoy, Send, X, Clock, AlertCircle } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const RaiseTicketModal = () => {
  const {
    activeActionModal,
    setActiveActionModal,
    createSupportTicket,
    selectedProjectId,
    currentProject,
  } = usePortal();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Bug'); // 'Bug', 'Small Change', 'General Inquiry'
  const [priority, setPriority] = useState('Medium'); // 'Low', 'Medium', 'High'
  const [description, setDescription] = useState('');

  if (activeActionModal !== 'ticket') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createSupportTicket({
      projectId: selectedProjectId,
      title,
      category,
      priority,
      description,
    });
    setActiveActionModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-3xl border border-blue-500/30 bg-[#0e1220] p-6 shadow-2xl">
        <button
          onClick={() => setActiveActionModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <LifeBuoy className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Raise Support Ticket</h3>
            <p className="text-xs text-blue-300 font-medium">
              Section 9 Guaranteed 24-hr SLA Response
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-200 mb-1">Issue Subject / Title:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., CSV export header offset in European locales"
              className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="Bug">Defect / Bug</option>
                <option value="Small Change">Small Post-Launch Change</option>
                <option value="Performance">Speed / Performance</option>
                <option value="Access">Credentials / Access Help</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-200 mb-1">Severity / Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="Low">Low (Minor visual issue)</option>
                <option value="Medium">Medium (Affects single workflow)</option>
                <option value="High">High (Critical production blocker)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-200 mb-1">
              Detailed Description & Steps to Reproduce:
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened, error messages, and browser/device used..."
              className="w-full rounded-xl bg-slate-950 border border-white/10 p-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="rounded-xl bg-blue-950/20 border border-blue-500/20 p-2.5 text-[11px] text-blue-200 flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-400 shrink-0" />
            <span>
              Covered under your active <strong>Warranty & Free Support Period</strong>. SLA response guaranteed within 24 hours.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveActionModal(null)}
              className="rounded-xl px-4 py-2 font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 font-bold text-white shadow-lg shadow-blue-600/30 hover:brightness-110"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

