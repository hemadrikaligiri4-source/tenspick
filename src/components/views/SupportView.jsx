import React from 'react';
import {
  LifeBuoy,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const SupportView = () => {
  const { tickets, currentProject, setActiveActionModal } = usePortal();

  const projectTickets = tickets.filter(
    (t) => t.projectId === currentProject.id
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
              Section 9: Support & Warranty
            </span>
            <span className="text-xs text-slate-400">Guaranteed 24-hr SLA</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Support Tickets (After Delivery)
          </h1>
          <p className="text-xs text-slate-300">
            Raise bugs or request minor tweaks with guaranteed SLA response windows.
          </p>
        </div>

        <button
          onClick={() => setActiveActionModal('ticket')}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Raise Support Ticket</span>
        </button>
      </div>

      {/* Free Warranty Support Banner */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-slate-900/60 p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Complimentary Post-Launch Warranty Active
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Free bug-fixing and SLA technical maintenance included under your master agreement.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/60 border border-white/10 rounded-2xl px-4 py-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Warranty Days Remaining:</span>
            <span className="font-mono text-emerald-400 font-bold text-sm">
              47 Days of 90 Days
            </span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <span className="text-slate-400 block text-[10px]">Guaranteed SLA:</span>
            <span className="font-bold text-white">Within 24 Hours</span>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {projectTickets.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center text-slate-400">
            <LifeBuoy className="h-10 w-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-white">No active support tickets</p>
            <p className="text-xs mt-1">Click 'Raise Support Ticket' above if you need any technical assistance.</p>
          </div>
        ) : (
          projectTickets.map((tck) => (
            <div
              key={tck.id}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-blue-300 bg-blue-950 px-2.5 py-1 rounded-lg border border-blue-500/30">
                    #{tck.id}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                      tck.status === 'Resolved'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    }`}
                  >
                    {tck.status}
                  </span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-300 border border-white/10">
                    Category: {tck.category}
                  </span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-amber-300 border border-white/10 font-bold">
                    Priority: {tck.priority}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  <span>
                    {tck.status === 'Open' ? `SLA: ${tck.slaRemainingHours}h remaining` : 'Resolved'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{tck.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {tck.description}
                </p>
              </div>

              {/* Thread updates */}
              {tck.updates?.map((up, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-3.5 text-xs text-blue-200"
                >
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-white">{up.author} (Tenspick Dev Squad)</strong>
                    <span className="text-[10px] text-blue-300 font-mono">{up.timestamp}</span>
                  </div>
                  <p className="text-slate-200">{up.message}</p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

