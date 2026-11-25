import React, { useState } from 'react';
import {
  Sparkles,
  BarChart3,
  CheckCircle2,
  MessageSquareDiff,
  ArrowRight,
  ArrowLeft,
  X,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const OnboardingModal = () => {
  const { onboardingOpen, setOnboardingOpen, completeOnboarding } = usePortal();
  const [step, setStep] = useState(1);

  if (!onboardingOpen) return null;

  const stepsContent = [
    {
      step: 1,
      badge: 'Step 1 of 3: Visibility',
      title: 'Where to See Your Project Progress',
      subtitle: 'Real-time transparency from Discover and Define to Launch and Grow.',
      icon: BarChart3,
      iconColor: 'from-blue-500 to-indigo-600',
      description:
        'Never wonder where your project stands. Your portal dashboard gives you a live percentage progress bar, upcoming milestone delivery dates, active revision counters, and an unfiltered activity log of every file uploaded or updated by Tenspick.',
      highlights: [
        'Live milestone roadmap: Discover & Define, Design & Build, Launch & Grow',
        'Transparent revision tracker: clear record of revisions included vs. used',
        'Action Required alert box: instant view of any item awaiting your feedback',
      ],
    },
    {
      step: 2,
      badge: 'Step 2 of 3: Deliverables & Approvals',
      title: 'How to Review & Approve Deliverables',
      subtitle: 'What exactly will you receive from Tenspick? Everything in one place.',
      icon: CheckCircle2,
      iconColor: 'from-purple-500 to-violet-600',
      description:
        'All your project assets—from Figma mockups and staging links to mobile APK test builds, API specs, and final source code repositories—are published to the Deliverables hub. You can preview, test, and approve them with a single click.',
      highlights: [
        'Interactive live previews & in-image visual pin comments',
        'Legally binding digital approval records with timestamp and signature hash',
        'Downloadable assets with high-speed expiring secure cloud links',
      ],
    },
    {
      step: 3,
      badge: 'Step 3 of 3: Feedback & Communication',
      title: 'How to Give Feedback & Request Changes',
      subtitle: 'Say goodbye to scattered WhatsApp voice notes and lost email threads.',
      icon: MessageSquareDiff,
      iconColor: 'from-emerald-500 to-teal-600',
      description:
        'When you need adjustments, submit a structured Change Request ticket specifying the change type (Design, Content, Bug, or Functionality) and priority. Our team receives an instant alert and resolves it within guaranteed turnaround windows.',
      highlights: [
        'Structured change request tickets with auto-generated tracking IDs',
        '1-minute milestone check-in pulses to keep communication on track',
        'Direct PM WhatsApp button and video meeting scheduling at any time',
      ],
    },
  ];

  const currentStepData = stepsContent[step - 1];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#101320] p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={() => setOnboardingOpen(false)}
          className="absolute top-5 right-5 rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300">
            {currentStepData.badge}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Tenspick Client Space Guide
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Content Section */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr ${currentStepData.iconColor} shadow-xl shadow-purple-500/20 ring-1 ring-white/20`}
          >
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {currentStepData.title}
            </h3>
            <p className="text-xs text-purple-300 font-medium mt-0.5">
              {currentStepData.subtitle}
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
          {currentStepData.description}
        </p>

        {/* Highlights */}
        <div className="space-y-2 rounded-2xl bg-white/[0.03] border border-white/5 p-4 mb-6">
          {currentStepData.highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
          ) : (
            <button
              onClick={() => setOnboardingOpen(false)}
              className="text-xs text-slate-400 hover:text-white transition"
            >
              Skip tour
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C4CC4] to-[#825de0] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:brightness-110 transition"
            >
              <span>Next Step</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={completeOnboarding}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:brightness-110 transition"
            >
              <Sparkles className="h-4 w-4" />
              <span>Enter Tenspick Portal</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

