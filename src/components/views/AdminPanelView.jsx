import React, { useState } from 'react';
import {
  ShieldCheck,
  BarChart3,
  Users,
  PackageCheck,
  Star,
  Receipt,
  FileCheck2,
  Download,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const AdminPanelView = () => {
  const {
    adminMetrics,
    projects,
    deliverables,
    feedbackItems,
    testimonials,
    togglePublishTestimonial,
    finalFeedbacks,
    serviceTemplates,
    setActiveActionModal,
    addToast,
  } = usePortal();

  const [adminTab, setAdminTab] = useState('analytics'); // 'analytics' | 'inbox' | 'testimonials' | 'templates' | 'audit'

  // Filter feedback items with rating <= 3 stars for urgent personal follow-up (Section 8.3)
  const lowRatingAlerts = finalFeedbacks.filter(
    (f) => Object.values(f.ratings).some((r) => Number(r) <= 3) || f.alertTriggered
  );

  const handleExportCSV = () => {
    addToast('Audit Log Exported', 'CSV report compiled with complete project activity logs.', 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
              Section 10: Tenspick Agency Admin
            </span>
            <span className="text-xs text-slate-400">Operations & Executive Oversight</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Agency Operations & Client Intelligence
          </h1>
          <p className="text-xs text-slate-300">
            Monitor client satisfaction, publish verified testimonials to tenspick.com, and manage deliverable templates.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition"
        >
          <Download className="h-4 w-4" />
          <span>Export Audit Log (CSV/PDF)</span>
        </button>
      </div>

      {/* KPI Stats Cards (Section 10 of PDF) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Avg Client Rating
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-xl font-bold font-mono text-white">
              {adminMetrics.averageRating} / 5.0
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Net Promoter Score
          </span>
          <div className="mt-1">
            <span className="text-xl font-bold font-mono text-emerald-400">
              +{adminMetrics.nps} NPS
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            On-Time Delivery
          </span>
          <div className="mt-1">
            <span className="text-xl font-bold font-mono text-purple-300">
              {adminMetrics.onTimeDeliveryRate}%
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Pending Approvals
          </span>
          <div className="mt-1">
            <span className="text-xl font-bold font-mono text-amber-400">
              {adminMetrics.pendingApprovalsCount} Items
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Active Revisions
          </span>
          <div className="mt-1">
            <span className="text-xl font-bold font-mono text-blue-400">
              {adminMetrics.activeRevisionsCount} Cycles
            </span>
          </div>
        </div>
      </div>

      {/* Admin Subtabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs overflow-x-auto">
        {[
          { id: 'analytics', label: 'Active Projects Overview' },
          { id: 'inbox', label: `Feedback Inbox (${feedbackItems.length})` },
          { id: 'testimonials', label: `Testimonials Publisher (${testimonials.length})` },
          { id: 'templates', label: 'Service Deliverable Templates' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id)}
            className={`rounded-xl px-4 py-2 font-semibold transition ${
              adminTab === tab.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Projects Overview */}
      {adminTab === 'analytics' && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
            <h3 className="text-sm font-bold text-white mb-4">
              All Client Engagements & Health Status
            </h3>

            <div className="divide-y divide-white/5">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-purple-300">
                        {proj.id}
                      </span>
                      <span className="font-bold text-white text-xs">{proj.name}</span>
                      <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                        {proj.serviceType}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      PM: {proj.pm.name} • Start: {proj.startDate} • Expected: {proj.expectedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="w-32">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${proj.progress}%` }}
                          className="h-full bg-purple-500 rounded-full"
                        />
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                        proj.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Unified Feedback Inbox (Section 10) */}
      {adminTab === 'inbox' && (
        <div className="space-y-4">
          {/* Low rating alert banner */}
          {lowRatingAlerts.length > 0 && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/30 p-4 text-xs text-rose-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span>
                  <strong>Client Follow-up Alert:</strong> {lowRatingAlerts.length} client submission requires personal outreach (Section 8.3 rule).
                </span>
              </div>
              <button
                onClick={() => addToast('Follow-up Dispatched', 'Alex Rivera assigned for personal client sync.', 'info')}
                className="rounded-lg bg-rose-600 px-3 py-1 font-bold text-white hover:bg-rose-500"
              >
                Assign Follow-Up
              </button>
            </div>
          )}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Central Client Feedback Stream</h3>

            <div className="space-y-3">
              {feedbackItems.map((fb) => (
                <div
                  key={fb.id}
                  className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-purple-300 font-bold">#{fb.id}</span>
                      <span className="font-semibold text-white">{fb.clientName}</span>
                      <span className="text-slate-400">on {fb.deliverableName}</span>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                        fb.status === 'Done'
                          ? 'bg-emerald-950 text-emerald-300'
                          : 'bg-amber-950 text-amber-300'
                      }`}
                    >
                      {fb.status}
                    </span>
                  </div>
                  <p className="text-slate-300 bg-white/[0.02] p-2 rounded-lg">
                    "{fb.comments}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Testimonials Manager (Section 10 of PDF) */}
      {adminTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-purple-950/20 border border-purple-500/30 p-4 text-xs text-purple-200">
            <strong>Website Testimonial Publishing Engine:</strong> Review client feedback where permissions were granted in Section 8.3 and toggle publishing directly to <strong>tenspick.com</strong> with 1 click.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                        test.published
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-white/5'
                      }`}
                    >
                      {test.published ? 'Live on tenspick.com' : 'Draft / Unpublished'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={test.avatar}
                      alt={test.clientName}
                      className="h-8 w-8 rounded-full object-cover ring-1 ring-purple-500/30"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{test.clientName}</h4>
                      <p className="text-[10px] text-slate-400">{test.role} • {test.company}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePublishTestimonial(test.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      test.published
                        ? 'bg-rose-950 text-rose-300 hover:bg-rose-900'
                        : 'bg-purple-600 text-white hover:bg-purple-500'
                    }`}
                  >
                    {test.published ? 'Unpublish' : 'Publish to Website'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Deliverable Checklist Templates (Section 10 & 7.2) */}
      {adminTab === 'templates' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-900/40 border border-white/10 p-4 text-xs text-slate-300">
            <strong>Standard Service Checklists:</strong> Ensures every new project kick-off starts with the exact agreed deliverable templates.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(serviceTemplates).map(([name, list]) => (
              <div
                key={name}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-xs font-bold text-white">{name}</h4>
                  <span className="text-[10px] text-purple-300 font-mono">
                    {list.length} Items Template
                  </span>
                </div>
                <div className="space-y-1.5">
                  {list.slice(0, 4).map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                      <span>{it.title}</span>
                    </div>
                  ))}
                  {list.length > 4 && (
                    <span className="text-[10px] text-slate-500 block pl-3.5">
                      + {list.length - 4} more standard deliverables...
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

