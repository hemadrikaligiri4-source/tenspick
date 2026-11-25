import React, { useState } from 'react';
import {
  PackageCheck,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Download,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Filter,
  Plus,
  ShieldCheck,
  MapPin,
  Clock,
  Layers,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const DeliverablesView = () => {
  const {
    deliverables,
    projects,
    selectedProjectId,
    setSelectedProjectId,
    currentProject,
    currentPersona,
    setPreviewDeliverable,
    setActiveActionModal,
    setModalPayload,
    serviceTemplates,
    ROLES,
  } = usePortal();

  const [statusFilter, setStatusFilter] = useState('All');
  const [activeCategoryTab, setActiveCategoryTab] = useState('project_deliverables'); // 'project_deliverables' | 'service_templates'

  const statuses = ['All', 'Under Review', 'Delivered', 'Changes Requested', 'Approved'];

  const projectDeliverables = deliverables.filter(
    (d) => d.projectId === currentProject.id
  );

  const filteredDeliverables = projectDeliverables.filter((d) => {
    if (statusFilter === 'All') return true;
    return d.status === statusFilter;
  });

  const canApprove =
    currentPersona.canApprove !== false &&
    (currentPersona.role === ROLES.CLIENT || currentPersona.role === ROLES.ADMIN);

  const isStaffOrAdmin =
    currentPersona.role === ROLES.PROJECT_MANAGER ||
    currentPersona.role === ROLES.ADMIN ||
    currentPersona.role === ROLES.TEAM_MEMBER;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
              Section 7: Deliverables Hub (Core Module)
            </span>
            <span className="text-xs text-slate-400">
              What exactly will I receive from Tenspick?
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Project Deliverables & Approval Center
          </h1>
          <p className="text-xs text-slate-300">
            Review live builds, preview prototypes, drop pin annotations, and record digital sign-offs.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {isStaffOrAdmin && (
            <button
              onClick={() => setActiveActionModal('upload_deliverable')}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Upload Deliverable</span>
            </button>
          )}

          {/* Toggle between Active Deliverables and Service Templates Guide */}
          <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveCategoryTab('project_deliverables')}
              className={`rounded-lg px-3 py-1 font-semibold transition ${
                activeCategoryTab === 'project_deliverables'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Active Items ({projectDeliverables.length})
            </button>
            <button
              onClick={() => setActiveCategoryTab('service_templates')}
              className={`rounded-lg px-3 py-1 font-semibold transition ${
                activeCategoryTab === 'service_templates'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Deliverables by Service Checklist
            </button>
          </div>
        </div>
      </div>

      {activeCategoryTab === 'project_deliverables' ? (
        <>
          {/* Status Filters Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 bg-slate-900/60 border border-white/10 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <span className="text-slate-400 mr-2 flex items-center gap-1">
                <Filter className="h-3 w-3" /> Filter by:
              </span>
              {statuses.map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`rounded-xl px-3 py-1 font-semibold transition ${
                    statusFilter === st
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400">
              Showing <strong className="text-white">{filteredDeliverables.length}</strong> items for{' '}
              <strong className="text-purple-300">{currentProject.id}</strong>
            </div>
          </div>

          {/* Deliverables List (Detailed cards matching Section 7.1) */}
          <div className="space-y-4">
            {filteredDeliverables.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center text-slate-400">
                <PackageCheck className="h-10 w-10 mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-white">No deliverables in this view</p>
                <p className="text-xs mt-1">Try selecting 'All' to see all project deliverables.</p>
              </div>
            ) : (
              filteredDeliverables.map((del) => (
                <div
                  key={del.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6 shadow-xl backdrop-blur-md transition hover:border-purple-500/30 space-y-4"
                >
                  {/* Top Bar of Deliverable */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                          {del.version}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                            del.status === 'Approved'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : del.status === 'Changes Requested'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          }`}
                        >
                          {del.status}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Uploaded: {del.uploadDate} • Target Due: {del.dueDate}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {del.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                        {del.description}
                      </p>
                    </div>

                    {/* Action Triggers */}
                    <div className="flex items-center gap-2 shrink-0">
                      {del.status !== 'Approved' && (
                        <>
                          <button
                            onClick={() => {
                              setModalPayload(del);
                              setActiveActionModal('change_request');
                            }}
                            className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-950/40 px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-900/50 transition"
                          >
                            <AlertTriangle className="h-3.5 w-3.5" />
                            <span>Request Changes</span>
                          </button>

                          <button
                            disabled={!canApprove}
                            onClick={() => {
                              setModalPayload(del);
                              setActiveActionModal('approve');
                            }}
                            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition shadow-lg ${
                              canApprove
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30 hover:brightness-110'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                            }`}
                            title={!canApprove ? 'Requires Main Client Role' : 'Approve'}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{canApprove ? 'Approve' : 'Approval Restricted'}</span>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setPreviewDeliverable(del)}
                        className="flex items-center gap-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 px-3.5 py-2 text-xs font-bold text-purple-200 hover:bg-purple-600/30 hover:border-purple-400 transition"
                      >
                        <Eye className="h-3.5 w-3.5 text-purple-400" />
                        <span>Interactive Preview & Pins</span>
                      </button>
                    </div>
                  </div>

                  {/* Notes from Tenspick Team (Section 7.1) */}
                  <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-3.5 text-xs">
                    <span className="font-bold text-purple-300 block mb-0.5">
                      Notes from the Tenspick Team (What was done, what to check):
                    </span>
                    <p className="text-slate-300 leading-relaxed">{del.notesFromTeam}</p>
                  </div>

                  {/* Bottom Meta & Comments snippet */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-3 border-t border-white/5">
                    <div className="flex items-center gap-4 text-slate-400">
                      {del.pinAnnotations?.length > 0 && (
                        <span className="flex items-center gap-1 text-purple-300 font-semibold">
                          <MapPin className="h-3.5 w-3.5" />
                          {del.pinAnnotations.length} Canvas Annotations
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5 text-slate-500" />
                        {del.comments?.length || 0} Comments
                      </span>
                      {del.approvedBy && (
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Approved by {del.approvedBy} on {del.approvedAt}
                        </span>
                      )}
                    </div>

                    <a
                      href={del.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white flex items-center gap-1 transition"
                    >
                      <span>Direct Asset URL</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        /* SECTION 7.2: Deliverables Checklist By Service (All 6 Services from PDF) */
        <div className="space-y-6">
          <div className="rounded-2xl bg-purple-950/20 border border-purple-500/30 p-4 text-xs text-purple-200">
            <strong>Standard Service Checklists (Section 7.2 of Requirements):</strong> Below is the exhaustive catalogue of every official deliverable Tenspick guarantees per service category.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(serviceTemplates).map(([serviceName, items]) => (
              <div
                key={serviceName}
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl space-y-4"
              >
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                  <h3 className="text-sm font-bold text-white">{serviceName}</h3>
                </div>

                <div className="space-y-2.5">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-white/5 bg-slate-950/60 p-3 text-xs"
                    >
                      <h4 className="font-bold text-purple-300 mb-0.5">{item.title}</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

