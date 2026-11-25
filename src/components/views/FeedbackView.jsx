import React, { useState } from 'react';
import {
  MessageSquareDiff,
  Star,
  Trophy,
  HeartHandshake,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const FeedbackView = () => {
  const {
    feedbackItems,
    milestoneCheckins,
    finalFeedbacks,
    currentProject,
    currentPersona,
    setActiveActionModal,
    setModalPayload,
    deliverables,
  } = usePortal();

  const [activeTab, setActiveTab] = useState('change_requests'); // 'change_requests' | 'checkins' | 'final'

  // Filter change requests for current project
  const projectChangeRequests = feedbackItems.filter(
    (f) => f.projectId === currentProject.id
  );

  const projectCheckins = milestoneCheckins.filter(
    (c) => c.projectId === currentProject.id
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
              Section 8: Feedback Hub
            </span>
            <span className="text-xs text-slate-400">
              3 Distinct Feedback Cycles at the Right Time
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Feedback & Change Requests
          </h1>
          <p className="text-xs text-slate-300">
            Submit granular change requests, 1-minute milestone check-in pulses, and final project sign-off reviews.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveActionModal('checkin')}
            className="flex items-center gap-2 rounded-xl bg-purple-600/20 border border-purple-500/30 px-3.5 py-2 text-xs font-semibold text-purple-200 hover:bg-purple-600/30 transition"
          >
            <HeartHandshake className="h-4 w-4 text-purple-400" />
            <span>1-Min Milestone Check-in</span>
          </button>

          <button
            onClick={() => setActiveActionModal('final_feedback')}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C4CC4] to-[#825de0] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-600/20 hover:brightness-110 transition"
          >
            <Trophy className="h-4 w-4" />
            <span>Final Feedback & NPS</span>
          </button>
        </div>
      </div>

      {/* 3 Feedback Type Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('change_requests')}
          className={`rounded-2xl border p-4 text-left transition ${
            activeTab === 'change_requests'
              ? 'border-purple-500/50 bg-purple-950/40 shadow-lg shadow-purple-900/20 ring-1 ring-purple-500/30'
              : 'border-white/10 bg-slate-900/60 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-purple-300">Section 8.1</span>
            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-200">
              {projectChangeRequests.length} Tickets
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Deliverable Change Requests</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Structured requests logged with ticket IDs and priority status.
          </p>
        </button>

        <button
          onClick={() => setActiveTab('checkins')}
          className={`rounded-2xl border p-4 text-left transition ${
            activeTab === 'checkins'
              ? 'border-purple-500/50 bg-purple-950/40 shadow-lg shadow-purple-900/20 ring-1 ring-purple-500/30'
              : 'border-white/10 bg-slate-900/60 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-purple-300">Section 8.2</span>
            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-200">
              {projectCheckins.length} Pulses
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Milestone Check-ins</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Quick 1-minute satisfaction check and timeline verification.
          </p>
        </button>

        <button
          onClick={() => setActiveTab('final')}
          className={`rounded-2xl border p-4 text-left transition ${
            activeTab === 'final'
              ? 'border-purple-500/50 bg-purple-950/40 shadow-lg shadow-purple-900/20 ring-1 ring-purple-500/30'
              : 'border-white/10 bg-slate-900/60 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-purple-300">Section 8.3</span>
            <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-200">
              {finalFeedbacks.length} Completed
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Final Project Reviews</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            8-criterion rating matrix, Net Promoter Score, and testimonials.
          </p>
        </button>
      </div>

      {/* TAB 1: Change Request Tickets (Section 8.1) */}
      {activeTab === 'change_requests' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-amber-950/20 border border-amber-500/30 p-4 text-xs text-amber-200">
            <strong>How Revision Tracking Works:</strong> Every change request updates the project revision counter and generates a tracked ticket number with guaranteed team response within 24 to 48 hours.
          </div>

          <div className="space-y-3">
            {projectChangeRequests.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl backdrop-blur-md space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-500/30">
                      Ticket #{item.id}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                        item.status === 'Done'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      Status: {item.status}
                    </span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-300 border border-white/10">
                      Type: {item.changeType}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        item.priority === 'High'
                          ? 'bg-rose-950 text-rose-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Priority: {item.priority}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Logged: {item.createdAt}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400">
                    Target Deliverable:{' '}
                    <strong className="text-white">{item.deliverableName}</strong>
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed mt-1 bg-slate-950/60 p-3 rounded-xl border border-white/5">
                    "{item.comments}"
                  </p>
                </div>

                {item.resolutionNotes && (
                  <div className="rounded-xl border border-purple-500/20 bg-purple-950/20 p-2.5 text-xs text-purple-200">
                    <strong className="text-purple-300">Tenspick Resolution Note:</strong> {item.resolutionNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Milestone Check-ins (Section 8.2) */}
      {activeTab === 'checkins' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-purple-950/20 border border-purple-500/30 p-4 text-xs text-purple-200">
            <strong>1-Minute Pulse Checks:</strong> Submitted during active phases to gauge client satisfaction, communication clarity, and schedule alignment in real-time.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectCheckins.map((chk) => (
              <div
                key={chk.id}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{chk.milestoneName}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{chk.createdAt}</span>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s <= chk.satisfaction
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-bold text-amber-400 text-xs">
                    {chk.satisfaction}/5 Stars
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px]">Communication Clear?</span>
                    <span className="font-semibold text-emerald-400">{chk.communicationClear}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5">
                    <span className="text-slate-500 block text-[10px]">Timeline On Track?</span>
                    <span className="font-semibold text-emerald-400">{chk.timelineOnTrack}</span>
                  </div>
                </div>

                {chk.worryNotes && (
                  <p className="text-[11px] text-slate-300 italic bg-white/[0.02] p-2 rounded-xl">
                    "{chk.worryNotes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Final Project Reviews (Section 8.3) */}
      {activeTab === 'final' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/30 p-4 text-xs text-emerald-200">
            <strong>Final Handover Evaluations:</strong> 8-criterion quality assessment and Net Promoter Score (NPS) collected upon project delivery.
          </div>

          <div className="space-y-4">
            {finalFeedbacks.map((fb) => (
              <div
                key={fb.id}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{fb.projectName}</h3>
                    <p className="text-xs text-purple-300">
                      Evaluated by {fb.clientName} ({fb.company}) • PM: {fb.projectManager}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-500/30">
                      NPS Score: {fb.npsScore}/10
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{fb.submittedAt}</span>
                  </div>
                </div>

                {/* 8 Ratings Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {Object.entries(fb.ratings).map(([crit, val]) => (
                    <div
                      key={crit}
                      className="rounded-xl border border-white/5 bg-slate-950/60 p-2.5"
                    >
                      <span className="text-[10px] text-slate-400 block truncate capitalize">
                        {crit.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-white">{val} / 5</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Open Answers */}
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
                    <span className="text-purple-300 font-bold block mb-0.5">What did you like most?</span>
                    <p className="text-slate-300">{fb.openAnswers.whatDidYouLikeMost}</p>
                  </div>
                  {fb.openAnswers.whatCanWeImprove && (
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5">
                      <span className="text-slate-400 font-bold block mb-0.5">Suggestions for improvement:</span>
                      <p className="text-slate-300">{fb.openAnswers.whatCanWeImprove}</p>
                    </div>
                  )}
                </div>

                {/* Permissions badge */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] pt-3 border-t border-white/10 text-slate-400">
                  <span>
                    Testimonial Approved:{' '}
                    <strong className="text-emerald-400">{fb.permissions.canUseAsTestimonial ? 'Yes' : 'No'}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Logo Approved:{' '}
                    <strong className="text-emerald-400">{fb.permissions.canShowLogo ? 'Yes' : 'No'}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Maintenance Plan:{' '}
                    <strong className="text-purple-300">{fb.permissions.interestedInMaintenance}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

