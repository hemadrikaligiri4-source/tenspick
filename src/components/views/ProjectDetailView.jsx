import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  User,
  Users,
  Layers,
  FileText,
  AlertTriangle,
  UploadCloud,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const ProjectDetailView = ({ onBack }) => {
  const {
    currentProject,
    currentPersona,
    deliverables,
    setActiveTab,
    setPreviewDeliverable,
    setActiveActionModal,
    setModalPayload,
    ROLES,
  } = usePortal();

  const [activeTab, setActiveTabLocal] = useState('scope'); // 'scope' | 'timeline' | 'needs' | 'handover' | 'activity'

  const projectDeliverables = deliverables.filter(
    (d) => d.projectId === currentProject.id
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl bg-slate-900/80 border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Projects</span>
        </button>
        <span className="text-slate-600">•</span>
        <span className="font-mono text-xs text-purple-400 font-bold">
          {currentProject.id}
        </span>
      </div>

      {/* Main Project Header Card (Section 6) */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#17142b] via-[#101324] to-[#0c0f1c] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-500/30">
                {currentProject.id}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                  currentProject.status === 'Completed'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                }`}
              >
                {currentProject.status}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {currentProject.name}
            </h1>
            <p className="text-xs sm:text-sm text-purple-300/90 font-medium">
              Service Type: {currentProject.serviceType}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-950/60 border border-white/10 rounded-2xl p-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Start Date:</span>
              <span className="font-semibold text-slate-200">{currentProject.startDate}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-slate-400 block text-[11px]">Expected Delivery:</span>
              <span className="font-semibold text-purple-300">{currentProject.expectedDate}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-slate-400 block text-[11px]">Revisions:</span>
              <span className="font-mono font-bold text-amber-300">
                {currentProject.revisions.used} of {currentProject.revisions.included} Used
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-300">Milestone Execution Progress</span>
            <span className="font-mono text-purple-300 text-sm font-bold">
              {currentProject.progress}% Completed
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-950 border border-white/10 overflow-hidden p-0.5">
            <div
              style={{ width: `${currentProject.progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#6C4CC4] via-[#8B5CF6] to-[#c084fc] shadow-lg shadow-purple-600/50"
            />
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs overflow-x-auto">
        {[
          { id: 'scope', label: 'Scope of Work & Features' },
          { id: 'timeline', label: 'Milestone Timeline' },
          { id: 'needs', label: `What We Need From You (${currentProject.clientNeeds.length})` },
          { id: 'handover', label: 'Final Handover Checklist (Section 7.4)' },
          { id: 'activity', label: 'Audit Activity Log' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabLocal(tab.id)}
            className={`rounded-xl px-4 py-2 font-semibold transition ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Scope of Work */}
      {activeTab === 'scope' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Agreed Scope of Work</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentProject.scope.summary}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Key Features & Agreed Deliverable Items:
              </h4>
              <div className="space-y-2">
                {currentProject.scope.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-slate-950/60 border border-white/5 p-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.status === 'Completed'
                            ? 'bg-emerald-400'
                            : item.status === 'In Progress'
                            ? 'bg-purple-400'
                            : 'bg-amber-400'
                        }`}
                      />
                      <span className="font-medium text-slate-200">{item.title}</span>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                        item.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : item.status === 'In Progress'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assigned Team Members */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Project Squad</h3>
            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={currentProject.pm.avatar}
                  alt={currentProject.pm.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-purple-500/40"
                />
                <div>
                  <h4 className="font-bold text-white text-xs">{currentProject.pm.name}</h4>
                  <p className="text-[11px] text-purple-300">{currentProject.pm.role}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Assigned Specialists:
              </span>
              {currentProject.teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-slate-950/60 p-2.5 text-xs flex justify-between items-center"
                >
                  <span className="font-semibold text-slate-200">{member.name}</span>
                  <span className="text-[11px] text-slate-400">{member.role}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Revision Policy:
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                {currentProject.revisions.policyNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Milestone Timeline */}
      {activeTab === 'timeline' && (
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">
              Process Roadmap: Discover & Define → Design & Build → Launch & Grow
            </h3>
            <p className="text-xs text-slate-400">
              Structured workflow ensuring high fidelity and predictable on-time delivery.
            </p>
          </div>

          <div className="space-y-4">
            {currentProject.milestones.map((ms, idx) => (
              <div
                key={ms.id}
                className={`rounded-2xl border p-5 transition ${
                  ms.status === 'Completed'
                    ? 'border-emerald-500/30 bg-emerald-950/20'
                    : ms.status === 'In Progress'
                    ? 'border-purple-500/40 bg-purple-950/30'
                    : 'border-white/5 bg-slate-950/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                      Phase 0{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">{ms.name}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono">
                      Due: {ms.dueDate} {ms.completedDate && `(Concluded on ${ms.completedDate})`}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                        ms.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : ms.status === 'In Progress'
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          : 'bg-slate-800 text-slate-400 border-white/5'
                      }`}
                    >
                      {ms.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {ms.description}
                </p>

                {/* Linked Deliverables count */}
                <div className="flex items-center justify-between text-xs pt-3 border-t border-white/5">
                  <span className="text-slate-400">
                    Linked Deliverables:{' '}
                    <strong className="text-white">
                      {projectDeliverables.filter((d) => d.milestoneId === ms.id).length} items
                    </strong>
                  </span>
                  <button
                    onClick={() => setActiveTab('deliverables')}
                    className="text-purple-300 hover:text-white font-semibold flex items-center gap-1"
                  >
                    <span>View Phase Deliverables</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: What We Need From You */}
      {activeTab === 'needs' && (
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">What We Need From You</h3>
            <p className="text-xs text-slate-400">
              Content, images, logo, login access, and milestone approvals (with due dates)
            </p>
          </div>

          <div className="space-y-3">
            {currentProject.clientNeeds.map((need) => (
              <div
                key={need.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-white/5 bg-slate-950/60 p-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white text-xs">{need.title}</span>
                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-purple-300 border border-white/10">
                      {need.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">Target Due Date: {need.dueDate}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      need.status === 'Received'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {need.status}
                  </span>

                  {need.status === 'Pending' && (
                    <button
                      onClick={() => setActiveTab('files')}
                      className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-500 transition"
                    >
                      <UploadCloud className="h-3.5 w-3.5" />
                      <span>Upload Asset</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Final Handover Checklist (Section 7.4 of PDF) */}
      {activeTab === 'handover' && (
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-purple-400" />
              <h3 className="text-base font-bold text-white">
                Final Handover Checklist (Section 7.4)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Everything verified before closing the engagement and unlocking the Final Feedback Form.
            </p>
          </div>

          <div className="space-y-3">
            {currentProject.handoverChecklist.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-lg border ${
                      item.checked
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        : 'border-white/20 text-slate-600'
                    }`}
                  >
                    {item.checked ? <CheckCircle2 className="h-4 w-4" /> : <div className="h-2 w-2 rounded-full bg-slate-600" />}
                  </div>
                  <span className={`font-medium ${item.checked ? 'text-slate-200' : 'text-slate-400'}`}>
                    {item.item}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase rounded px-2 py-0.5 ${
                    item.checked
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.checked ? 'Completed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>

          {currentProject.status === 'Completed' ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-emerald-300 text-xs">Project Completed & Signed Off</h4>
                <p className="text-[11px] text-slate-300">
                  All deliverables approved, credentials transferred, and warranty period active.
                </p>
              </div>
              <button
                onClick={() => setActiveActionModal('final_feedback')}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:brightness-110"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Open Final Feedback Form</span>
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-slate-400 italic">
              When all deliverables are approved, the project moves to Completed and the final feedback form opens automatically.
            </p>
          )}
        </div>
      )}

      {/* TAB 5: Activity Log */}
      {activeTab === 'activity' && (
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Project Activity Log</h3>
            <p className="text-xs text-slate-400">
              Who uploaded or changed what, and when (Dispute protection & full transparency)
            </p>
          </div>

          <div className="space-y-2.5">
            {currentProject.activityLog.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/60 p-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                  <div>
                    <span className="font-bold text-white">{log.user}: </span>
                    <span className="text-slate-300">{log.action}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

