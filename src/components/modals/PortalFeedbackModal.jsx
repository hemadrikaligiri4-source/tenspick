import React, { useState } from 'react';
import { AlertCircle, Send, X, Sparkles } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const PortalFeedbackModal = () => {
  const { activeActionModal, setActiveActionModal, addToast, currentPersona } = usePortal();
  const [feedbackType, setFeedbackType] = useState('Suggestion');
  const [message, setMessage] = useState('');

  if (activeActionModal !== 'portal_feedback') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    addToast(
      'Portal Feedback Received',
      'Thank you! Your suggestion was recorded to help improve the Tenspick portal experience.',
      'success'
    );
    setActiveActionModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#101320] p-6 shadow-2xl">
        <button
          onClick={() => setActiveActionModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Feedback on the Portal Itself</h3>
            <p className="text-xs text-purple-300 font-medium">
              Section 8.4 Report a problem or suggest an improvement
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-200 mb-1.5">Feedback Type:</label>
            <div className="grid grid-cols-2 gap-2">
              {['Suggestion', 'Report a Bug'].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFeedbackType(type)}
                  className={`rounded-xl py-2 font-semibold border transition ${
                    feedbackType === type
                      ? 'border-purple-500 bg-purple-950/60 text-purple-300 shadow'
                      : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-200 mb-1.5">
              Your feedback / recommendation:
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What could we improve in the Tenspick client portal?"
              className="w-full rounded-xl bg-slate-950 border border-white/10 p-2.5 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
            />
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
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

