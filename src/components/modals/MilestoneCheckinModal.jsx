import React, { useState } from 'react';
import { Star, CheckCircle, Clock, X, HeartHandshake } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const MilestoneCheckinModal = () => {
  const {
    activeActionModal,
    setActiveActionModal,
    submitMilestoneCheckin,
    selectedProjectId,
    currentProject,
  } = usePortal();

  const [satisfaction, setSatisfaction] = useState(5);
  const [communicationClear, setCommunicationClear] = useState('Yes');
  const [timelineOnTrack, setTimelineOnTrack] = useState('Yes');
  const [worryNotes, setWorryNotes] = useState('');

  if (activeActionModal !== 'checkin') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMilestoneCheckin({
      projectId: selectedProjectId,
      milestoneName: currentProject?.milestones?.find((m) => m.status === 'In Progress')?.name || 'Current Milestone',
      satisfaction,
      communicationClear,
      timelineOnTrack,
      worryNotes,
    });
    setActiveActionModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-3xl border border-purple-500/30 bg-[#101322] p-6 shadow-2xl">
        <button
          onClick={() => setActiveActionModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/20">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">1-Minute Milestone Check-in</h3>
            <p className="text-xs text-purple-300 font-medium">
              Section 8.2 Pulse check for {currentProject?.name}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Question 1: Satisfaction */}
          <div>
            <label className="block font-semibold text-slate-200 mb-2">
              1. How satisfied are you with progress so far?
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setSatisfaction(star)}
                  className="p-1 text-slate-600 hover:scale-110 transition"
                >
                  <Star
                    className={`h-7 w-7 ${
                      star <= satisfaction
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-amber-400 text-sm">{satisfaction} / 5 Stars</span>
            </div>
          </div>

          {/* Question 2: Communication */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1.5">
              2. Is communication clear with your Tenspick team?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Yes', 'Somewhat', 'No'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setCommunicationClear(opt)}
                  className={`rounded-xl py-2 font-semibold border transition ${
                    communicationClear === opt
                      ? 'border-purple-500 bg-purple-950/60 text-purple-300 shadow'
                      : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Timeline */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1.5">
              3. Is the timeline on track with your expectations?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Yes', 'No'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setTimelineOnTrack(opt)}
                  className={`rounded-xl py-2 font-semibold border transition ${
                    timelineOnTrack === opt
                      ? 'border-purple-500 bg-purple-950/60 text-purple-300 shadow'
                      : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Any worries? */}
          <div>
            <label className="block font-semibold text-slate-200 mb-1.5">
              4. Anything worrying you? (Optional)
            </label>
            <textarea
              rows={2}
              value={worryNotes}
              onChange={(e) => setWorryNotes(e.target.value)}
              placeholder="Any questions on upcoming deadlines or features..."
              className="w-full rounded-xl bg-slate-950 border border-white/10 p-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
            />
          </div>

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
              className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:brightness-110 transition"
            >
              Submit 1-Min Check-in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

