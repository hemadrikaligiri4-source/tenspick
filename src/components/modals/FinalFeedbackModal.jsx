import React, { useState } from 'react';
import {
  Trophy,
  Star,
  CheckCircle2,
  X,
  ExternalLink,
  MessageSquare,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const FinalFeedbackModal = () => {
  const {
    activeActionModal,
    setActiveActionModal,
    submitFinalFeedback,
    selectedProjectId,
    currentProject,
    currentPersona,
  } = usePortal();

  // Ratings for all 8 categories from Section 8.3 of PDF
  const [ratings, setRatings] = useState({
    finalWorkQuality: 5,
    designCreativity: 5,
    meetingRequirements: 5,
    deliveryOnTime: 5,
    communicationResponsiveness: 5,
    teamProfessionalism: 5,
    valueForMoney: 5,
    easeOfUsingPortal: 5,
  });

  // Section C: NPS (0-10)
  const [npsScore, setNpsScore] = useState(10);

  // Section D: Open questions
  const [openAnswers, setOpenAnswers] = useState({
    whatDidYouLikeMost: '',
    whatCanWeImprove: '',
    anyIssuesFaced: '',
    additionalServicesInterested: '',
  });

  // Section E: Permissions and next steps
  const [permissions, setPermissions] = useState({
    canUseAsTestimonial: true,
    canShowLogo: true,
    googleReviewClicked: false,
    interestedInMaintenance: 'Yes', // 'Yes', 'No', 'Call me'
  });

  if (activeActionModal !== 'final_feedback') return null;

  const ratingLabels = [
    { key: 'finalWorkQuality', label: 'Quality of final work' },
    { key: 'designCreativity', label: 'Design & creativity' },
    { key: 'meetingRequirements', label: 'Meeting the requirements' },
    { key: 'deliveryOnTime', label: 'Delivery on time' },
    { key: 'communicationResponsiveness', label: 'Communication & responsiveness' },
    { key: 'teamProfessionalism', label: 'Team professionalism & behavior' },
    { key: 'valueForMoney', label: 'Value for money' },
    { key: 'easeOfUsingPortal', label: 'Ease of using the portal' },
  ];

  const handleRatingChange = (key, val) => {
    setRatings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFinalFeedback({
      projectId: selectedProjectId,
      projectName: currentProject?.name || 'Project',
      serviceType: currentProject?.serviceType || 'Custom Project',
      projectManager: currentProject?.pm?.name || 'Alex Rivera',
      ratings,
      npsScore,
      openAnswers,
      permissions,
    });
    setActiveActionModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex flex-col h-[92vh] max-h-[850px] w-full max-w-3xl rounded-3xl border border-purple-500/30 bg-[#0f1220] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-600/30 text-purple-300 border border-purple-500/30">
              <Trophy className="h-6 w-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Final Project Feedback Form</h3>
              <p className="text-xs text-purple-300 font-medium">
                Section 8.3 Post-Delivery Review & NPS Assessment
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveActionModal(null)}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Section A: Basic details */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Section A — Project Identification
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <span className="text-slate-400">Client / Signatory:</span>
                <p className="font-semibold text-white">{currentPersona.name}</p>
              </div>
              <div>
                <span className="text-slate-400">Company:</span>
                <p className="font-semibold text-white">{currentPersona.company}</p>
              </div>
              <div>
                <span className="text-slate-400">Project:</span>
                <p className="font-semibold text-purple-300 truncate">{currentProject?.name}</p>
              </div>
              <div>
                <span className="text-slate-400">Service Category:</span>
                <p className="text-slate-300">{currentProject?.serviceType}</p>
              </div>
              <div>
                <span className="text-slate-400">Assigned PM:</span>
                <p className="text-slate-300">{currentProject?.pm?.name}</p>
              </div>
            </div>
          </div>

          {/* Section B: Ratings (1-5 stars) */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Section B — Performance Ratings (1 to 5 Stars)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ratingLabels.map(({ key, label }) => (
                <div
                  key={key}
                  className="rounded-xl border border-white/5 bg-slate-950/60 p-3 flex items-center justify-between"
                >
                  <span className="font-medium text-slate-200">{label}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => handleRatingChange(key, s)}
                        className="p-0.5 hover:scale-125 transition"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            s <= ratings[key]
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section C: Net Promoter Score (0-10) */}
          <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                Section C — Net Promoter Score (NPS)
              </h4>
              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-200">
                Score: {npsScore} / 10 ({npsScore >= 9 ? 'Promoter 🌟' : npsScore >= 7 ? 'Passive' : 'Needs Follow-up'})
              </span>
            </div>
            <p className="text-slate-300">
              "How likely are you to recommend Tenspick to a founder friend or business colleague?"
            </p>
            <div className="flex items-center justify-between gap-1 overflow-x-auto py-1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setNpsScore(num)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold transition ${
                    npsScore === num
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 ring-2 ring-purple-400'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-medium">
              <span>0 = Not at all likely</span>
              <span>10 = Extremely likely</span>
            </div>
          </div>

          {/* Section D: Open questions */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Section D — Detailed Feedback & Insights
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  What did you like most about working with Tenspick?
                </label>
                <textarea
                  rows={2}
                  value={openAnswers.whatDidYouLikeMost}
                  onChange={(e) =>
                    setOpenAnswers({ ...openAnswers, whatDidYouLikeMost: e.target.value })
                  }
                  placeholder="e.g., Speed of delivery, high quality design, constant visibility in the portal..."
                  className="w-full rounded-xl bg-slate-950 border border-white/10 p-2.5 text-slate-200 placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  What can we improve for future collaborations?
                </label>
                <textarea
                  rows={2}
                  value={openAnswers.whatCanWeImprove}
                  onChange={(e) =>
                    setOpenAnswers({ ...openAnswers, whatCanWeImprove: e.target.value })
                  }
                  placeholder="Any process, communication, or feature suggestions..."
                  className="w-full rounded-xl bg-slate-950 border border-white/10 p-2.5 text-slate-200 placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Which additional service would you be interested in exploring?
                </label>
                <input
                  type="text"
                  value={openAnswers.additionalServicesInterested}
                  onChange={(e) =>
                    setOpenAnswers({ ...openAnswers, additionalServicesInterested: e.target.value })
                  }
                  placeholder="e.g., AI Automation, Mobile App, SEO Growth, Video Editing..."
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section E: Permissions and next steps */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
              Section E — Permissions & Next Steps
            </h4>

            <div className="space-y-2.5">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">
                  May we use your feedback as a testimonial on <strong>tenspick.com</strong>?
                </span>
                <input
                  type="checkbox"
                  checked={permissions.canUseAsTestimonial}
                  onChange={(e) =>
                    setPermissions({ ...permissions, canUseAsTestimonial: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-white/20 bg-slate-900 text-purple-600 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">
                  May we display your company logo on our client partner showcase?
                </span>
                <input
                  type="checkbox"
                  checked={permissions.canShowLogo}
                  onChange={(e) =>
                    setPermissions({ ...permissions, canShowLogo: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-white/20 bg-slate-900 text-purple-600 focus:ring-0"
                />
              </label>
            </div>

            {/* Google Review Direct Button */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div>
                <p className="font-semibold text-white">Leave a 5-Star Google Review</p>
                <p className="text-[11px] text-slate-400">
                  Takes 30 seconds and helps our team immensely!
                </p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPermissions({ ...permissions, googleReviewClicked: true })}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 font-bold text-amber-300 hover:bg-amber-500/30 transition"
              >
                <span>Write Review</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Maintenance plan interest */}
            <div className="pt-2 border-t border-white/10">
              <span className="block text-slate-300 mb-2 font-medium">
                Interested in an Annual Maintenance Plan (AMC) or upcoming sprint?
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['Yes', 'No', 'Call me'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() =>
                      setPermissions({ ...permissions, interestedInMaintenance: opt })
                    }
                    className={`rounded-xl py-2 font-semibold border transition ${
                      permissions.interestedInMaintenance === opt
                        ? 'border-purple-500 bg-purple-950/60 text-purple-300 shadow'
                        : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setActiveActionModal(null)}
              className="rounded-xl px-4 py-2.5 font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-6 py-2.5 font-bold text-white shadow-xl shadow-purple-600/30 hover:brightness-110 transition"
            >
              <Sparkles className="h-4 w-4" />
              <span>Submit Final Feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

