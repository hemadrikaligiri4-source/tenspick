import React, { useState } from 'react';
import { AlertTriangle, Send, X, Paperclip, Calendar, Flag, Sparkles } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const ChangeRequestModal = () => {
  const {
    activeActionModal,
    setActiveActionModal,
    modalPayload,
    requestChanges,
    selectedProjectId,
    currentProject,
    currentPersona,
  } = usePortal();

  const [decision, setDecision] = useState('Request changes'); // 'Request changes' | 'Approve with minor changes'
  const [comments, setComments] = useState('');
  const [changeType, setChangeType] = useState('Design'); // 'Design', 'Content', 'Functionality', 'Bug', 'Other'
  const [priority, setPriority] = useState('Medium'); // 'Low', 'Medium', 'High'
  const [referenceLink, setReferenceLink] = useState('');

  if (activeActionModal !== 'change_request' || !modalPayload) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comments.trim()) return;

    requestChanges({
      deliverableId: modalPayload.id,
      comments: referenceLink ? `${comments} (Reference link: ${referenceLink})` : comments,
      changeType,
      priority,
    });

    setActiveActionModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-3xl border border-amber-500/30 bg-[#0f121d] p-6 shadow-2xl overflow-hidden">
        <button
          onClick={() => setActiveActionModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/20">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Submit Change Request</h3>
            <p className="text-xs text-amber-400 font-medium">
              Section 8.1 Deliverable Feedback Ticket
            </p>
          </div>
        </div>

        {/* Auto-filled Item Info */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-3.5 mb-4 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Target Deliverable:</span>
            <span className="font-semibold text-white truncate max-w-[280px]">
              {modalPayload.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Current Revision:</span>
            <span className="text-purple-300 font-semibold font-mono">
              {currentProject?.revisions?.used || 0} of {currentProject?.revisions?.included || 3} used
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Decision */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Decision:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Request Changes', val: 'Request changes' },
                { label: 'Approve with Minor Changes', val: 'Approve with minor changes' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => setDecision(opt.val)}
                  className={`rounded-xl p-2.5 text-xs font-semibold border transition ${
                    decision === opt.val
                      ? 'border-amber-500 bg-amber-950/40 text-amber-300 shadow-md'
                      : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type of Change & Priority Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Type of Change:
              </label>
              <select
                value={changeType}
                onChange={(e) => setChangeType(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="Design">Design (Visual, colors, typography)</option>
                <option value="Content">Content (Text, copy, images)</option>
                <option value="Functionality">Functionality (Logic, flow)</option>
                <option value="Bug">Bug (Defect, layout glitch)</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Urgency Priority:
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="Low">Low (Standard iteration)</option>
                <option value="Medium">Medium (Needed before milestone end)</option>
                <option value="High">High (Critical blocker)</option>
              </select>
            </div>
          </div>

          {/* Detailed Comments */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Specific Feedback / What should be adjusted?
            </label>
            <textarea
              required
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Describe exactly what needs revision, which screens or sections, and your desired outcome..."
              className="w-full rounded-xl bg-slate-950 border border-white/10 p-3 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
            />
          </div>

          {/* Reference Link / Attachments */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Reference Link / Loom / Figma Screen URL (Optional):
            </label>
            <div className="relative">
              <input
                type="url"
                value={referenceLink}
                onChange={(e) => setReferenceLink(e.target.value)}
                placeholder="https://loom.com/share/... or reference link"
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none pl-8"
              />
              <Paperclip className="h-3.5 w-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Turnaround notice */}
          <div className="rounded-xl bg-purple-950/20 border border-purple-500/20 p-2.5 text-[11px] text-purple-200">
            Expected response date: <strong className="text-white">Within 24–48 hours</strong>. An official Ticket Number will be generated with live status tracking.
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveActionModal(null)}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-amber-600/30 hover:brightness-110 transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Change Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

