import React from 'react';
import {
  Sparkles,
  AlertCircle,
  Clock,
  CheckCircle2,
  PackageCheck,
  MessageSquare,
  CreditCard,
  Video,
  LifeBuoy,
  Phone,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const DashboardView = () => {
  const {
    currentPersona,
    currentProject,
    projects,
    setSelectedProjectId,
    deliverables,
    invoices,
    tickets,
    messages,
    setActiveTab,
    setPreviewDeliverable,
    setActiveActionModal,
    setModalPayload,
    setOnboardingOpen,
  } = usePortal();

  // Pending actions waiting for client (Section 5)
  const pendingDeliverables = deliverables.filter(
    (d) => d.projectId === currentProject.id && (d.status === 'Delivered' || d.status === 'Under Review')
  );

  const pendingInvoices = invoices.filter(
    (i) => i.projectId === currentProject.id && i.status === 'Pending'
  );

  const pendingClientNeeds = currentProject.clientNeeds.filter(
    (n) => n.status === 'Pending'
  );

  // Latest uploaded deliverables
  const recentDeliverables = deliverables
    .filter((d) => d.projectId === currentProject.id)
    .slice(0, 3);

  // Recent messages
  const projectMessages = messages
    .filter((m) => m.projectId === currentProject.id)
    .slice(0, 2);

  // Next upcoming milestone
  const nextMilestone = currentProject.milestones.find((m) => m.status === 'In Progress') || currentProject.milestones[1];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* 1. Header Greeting with Client & Company Name */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#17142b] via-[#101324] to-[#0c0f1c] p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-1 text-xs font-bold text-purple-300">
                Tenspick Client Space
              </span>
              <span className="text-xs text-slate-400">
                • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {currentPersona.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Tracking your project with <strong className="text-purple-300">{currentPersona.company}</strong> from Spark to Scale.
            </p>
          </div>

          {/* Quick Buttons: Give Feedback, Raise Support Ticket, Book a Call */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveActionModal('checkin')}
              className="flex items-center gap-2 rounded-xl bg-purple-600/20 border border-purple-500/30 px-3.5 py-2 text-xs font-semibold text-purple-200 hover:bg-purple-600/30 hover:border-purple-400 transition"
              title="1-Minute Milestone Pulse Check"
            >
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span>Give Feedback</span>
            </button>

            <button
              onClick={() => setActiveActionModal('ticket')}
              className="flex items-center gap-2 rounded-xl bg-blue-600/20 border border-blue-500/30 px-3.5 py-2 text-xs font-semibold text-blue-200 hover:bg-blue-600/30 hover:border-blue-400 transition"
            >
              <LifeBuoy className="h-3.5 w-3.5 text-blue-400" />
              <span>Raise Ticket</span>
            </button>

            <button
              onClick={() => setActiveActionModal('meeting')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C4CC4] to-[#825de0] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-600/20 hover:brightness-110 transition"
            >
              <Video className="h-3.5 w-3.5" />
              <span>Book a Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Action Required Box (Section 5) */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-slate-900/60 p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Action Required</h3>
              <p className="text-[11px] text-amber-300">
                Items waiting for client review to keep your timeline on track
              </p>
            </div>
          </div>
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
            {pendingDeliverables.length + pendingInvoices.length + pendingClientNeeds.length} Pending Actions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Action 1: Pending Deliverable */}
          {pendingDeliverables.length > 0 ? (
            <div className="rounded-2xl border border-purple-500/30 bg-purple-950/30 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-purple-300 flex items-center gap-1.5">
                    <PackageCheck className="h-3.5 w-3.5" />
                    Deliverable Sign-Off
                  </span>
                  <span className="text-[10px] text-slate-400">Due {pendingDeliverables[0].dueDate}</span>
                </div>
                <h4 className="text-xs font-semibold text-white truncate">
                  {pendingDeliverables[0].name}
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                  {pendingDeliverables[0].notesFromTeam}
                </p>
              </div>
              <button
                onClick={() => setPreviewDeliverable(pendingDeliverables[0])}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-purple-600 py-2 text-xs font-bold text-white hover:bg-purple-500 transition shadow-md shadow-purple-600/30"
              >
                <span>Review & Approve ({pendingDeliverables[0].version})</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-400">All uploaded deliverables are approved!</div>
            </div>
          )}

          {/* Action 2: Pending Invoice */}
          {pendingInvoices.length > 0 ? (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/30 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5" />
                    Milestone Settlement
                  </span>
                  <span className="text-[10px] text-slate-400">Due {pendingInvoices[0].dueDate}</span>
                </div>
                <h4 className="text-xs font-semibold text-white truncate">
                  {pendingInvoices[0].invoiceNumber} — {pendingInvoices[0].type}
                </h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  Amount: <strong className="text-emerald-400 font-mono">₹{pendingInvoices[0].totalAmount.toLocaleString()}</strong> (incl. 18% GST)
                </p>
              </div>
              <button
                onClick={() => {
                  setModalPayload(pendingInvoices[0]);
                  setActiveActionModal('payment');
                }}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-md shadow-emerald-600/30"
              >
                <span>Instant Pay (UPI / Card)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-400">All current invoices settled in full!</div>
            </div>
          )}

          {/* Action 3: Client Content / Credentials needed */}
          {pendingClientNeeds.length > 0 ? (
            <div className="rounded-2xl border border-blue-500/30 bg-blue-950/30 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-blue-300 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    What We Need From You
                  </span>
                  <span className="text-[10px] text-slate-400">Due {pendingClientNeeds[0].dueDate}</span>
                </div>
                <h4 className="text-xs font-semibold text-white truncate">
                  {pendingClientNeeds[0].title}
                </h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  Category: {pendingClientNeeds[0].category}. Required to configure production environment.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2 text-xs font-bold text-white hover:bg-blue-500 transition shadow-md shadow-blue-600/30"
              >
                <span>Upload Asset / Share Access</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-400">No pending client assets required right now.</div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Active Project Progress & Milestones (Section 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Project Progress Card */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                  {currentProject.id}
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  {currentProject.status}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                {currentProject.name}
              </h2>
              <p className="text-xs text-slate-400">{currentProject.serviceType}</p>
            </div>

            <button
              onClick={() => setActiveTab('projects')}
              className="flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white transition"
            >
              <span>View Full Project Specs</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs font-semibold mb-2">
              <span className="text-slate-300">Overall Project Completion</span>
              <span className="font-mono text-purple-300 text-sm font-bold">
                {currentProject.progress}% Complete
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-950 border border-white/10 overflow-hidden p-0.5">
              <div
                style={{ width: `${currentProject.progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#6C4CC4] via-[#8B5CF6] to-[#c084fc] shadow-lg shadow-purple-600/50 transition-all duration-700"
              />
            </div>
          </div>

          {/* Milestone Timeline Steps (Discover & Define, Design & Build, Launch & Grow) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Process Roadmap
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentProject.milestones.map((ms, idx) => (
                <div
                  key={ms.id}
                  className={`rounded-2xl border p-3.5 transition ${
                    ms.status === 'Completed'
                      ? 'border-emerald-500/30 bg-emerald-950/20'
                      : ms.status === 'In Progress'
                      ? 'border-purple-500/40 bg-purple-950/30 shadow-lg shadow-purple-900/20'
                      : 'border-white/5 bg-white/[0.01] opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold font-mono text-[11px] text-slate-400">
                      Phase 0{idx + 1}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                        ms.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : ms.status === 'In Progress'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ms.status}
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white">{ms.name}</h5>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {ms.description}
                  </p>
                  <p className="text-[10px] text-purple-300/80 font-mono mt-2">
                    Target: {ms.dueDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Assigned PM Contact Person Card (Section 5) */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Assigned Contact Person
              </span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>

            <div className="flex items-center gap-3.5 mb-4">
              <img
                src={currentProject.pm.avatar}
                alt={currentProject.pm.name}
                className="h-14 w-14 rounded-2xl object-cover ring-2 ring-purple-500/40 shadow-lg shadow-purple-500/20"
              />
              <div>
                <h3 className="text-base font-bold text-white">{currentProject.pm.name}</h3>
                <p className="text-xs text-purple-300 font-medium">{currentProject.pm.role}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Tenspick Creative & Tech</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              "I oversee your milestone deliverables, team execution, and approvals. Reach out anytime via WhatsApp or book a sync call."
            </p>

            {/* Direct Contact links */}
            <div className="space-y-2 text-xs">
              <a
                href={`https://wa.me/${currentProject.pm.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-emerald-950/40 border border-emerald-500/30 p-2.5 text-emerald-300 hover:bg-emerald-900/50 transition font-medium"
              >
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>WhatsApp PM Direct</span>
                </div>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={() => setActiveActionModal('meeting')}
                className="w-full flex items-center justify-between rounded-xl bg-purple-950/40 border border-purple-500/30 p-2.5 text-purple-200 hover:bg-purple-900/50 transition font-medium"
              >
                <div className="flex items-center gap-2">
                  <Video className="h-3.5 w-3.5" />
                  <span>Schedule 1-on-1 Call</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Revision Counter Summary */}
          <div className="mt-4 pt-4 border-t border-white/10 text-xs flex items-center justify-between">
            <span className="text-slate-400">Revisions Used:</span>
            <span className="font-mono font-bold text-amber-300">
              {currentProject.revisions.used} of {currentProject.revisions.included} cycles
            </span>
          </div>
        </div>
      </div>

      {/* 4. Latest Deliverables Uploaded (Section 5) */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Latest Deliverables Uploaded
            </h3>
            <p className="text-xs text-slate-400">
              Click any deliverable to open interactive live preview, pin comments, or approve
            </p>
          </div>
          <button
            onClick={() => setActiveTab('deliverables')}
            className="flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white transition"
          >
            <span>Deliverables Hub ({deliverables.length})</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentDeliverables.map((del) => (
            <div
              key={del.id}
              onClick={() => setPreviewDeliverable(del)}
              className="group cursor-pointer rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition-all duration-200 hover:border-purple-500/40 hover:bg-slate-900 hover:-translate-y-1 shadow-lg"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-white/10 bg-black">
                <img
                  src={del.previewUrl}
                  alt={del.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase shadow-lg ${
                      del.status === 'Approved'
                        ? 'bg-emerald-600 text-white'
                        : del.status === 'Changes Requested'
                        ? 'bg-rose-600 text-white'
                        : 'bg-purple-600 text-white'
                    }`}
                  >
                    {del.status}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className="rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white font-mono border border-white/20">
                    {del.version}
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition truncate">
                {del.name}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {del.description}
              </p>

              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/5">
                <span>Uploaded: {del.uploadDate}</span>
                <span className="text-purple-400 font-semibold group-hover:underline">Preview & Action →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recent Messages or Updates from Tenspick Team (Section 5) */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Recent Updates & Sprint Notes
            </h3>
            <p className="text-xs text-slate-400">
              Direct communication from your project team
            </p>
          </div>
          <button
            onClick={() => setActiveTab('messages')}
            className="flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white transition"
          >
            <span>Open Messages Channel</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {projectMessages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border p-4 text-xs transition ${
                msg.isWeeklyUpdate
                  ? 'border-purple-500/30 bg-purple-950/20'
                  : 'border-white/5 bg-slate-950/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={msg.senderAvatar}
                    alt={msg.sender}
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-purple-500/30"
                  />
                  <span className="font-semibold text-slate-200">{msg.sender}</span>
                  {msg.isWeeklyUpdate && (
                    <span className="rounded bg-purple-500/30 px-1.5 py-0.5 text-[9px] font-bold text-purple-200 uppercase">
                      Weekly Progress Update
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
              </div>
              {msg.title && (
                <h5 className="font-bold text-white text-xs mb-1">{msg.title}</h5>
              )}
              <div className="text-slate-300 leading-relaxed whitespace-pre-line text-xs pl-8">
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

