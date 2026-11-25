import React, { useState } from 'react';
import {
  FolderGit2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';
import { ProjectDetailView } from './ProjectDetailView';

export const ProjectsView = () => {
  const { projects, selectedProjectId, setSelectedProjectId } = usePortal();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingDetail, setViewingDetail] = useState(false);

  // If viewing detail, show ProjectDetailView
  if (viewingDetail) {
    return <ProjectDetailView onBack={() => setViewingDetail(false)} />;
  }

  const statuses = ['All', 'In Progress', 'In Review', 'Completed'];

  const filteredProjects = projects.filter((proj) => {
    const matchesStatus = statusFilter === 'All' || proj.status === statusFilter;
    const matchesSearch =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
              Section 6: Projects
            </span>
            <span className="text-xs text-slate-400">({projects.length} Total Engagements)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            My Projects & Active Workspaces
          </h1>
          <p className="text-xs text-slate-300">
            Track milestones, deliverables, revisions, and the complete handover checklist.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="h-3.5 w-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name or ID..."
              className="rounded-xl bg-slate-900 border border-white/10 pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none w-56"
            />
          </div>

          <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl p-1 text-xs">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3 py-1 font-semibold transition ${
                  statusFilter === st
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => {
              setSelectedProjectId(proj.id);
              setViewingDetail(true);
            }}
            className="group cursor-pointer rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-purple-500/40 hover:bg-slate-900 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Card Top: ID and Status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-500/30">
                    {proj.id}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                      proj.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : proj.status === 'In Review'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* Title & Service */}
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                {proj.name}
              </h3>
              <p className="text-xs text-purple-400/90 font-medium mt-0.5">
                {proj.serviceType}
              </p>

              {/* Scope Summary */}
              <p className="text-xs text-slate-300 leading-relaxed mt-2.5 line-clamp-2">
                {proj.scope.summary}
              </p>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-[11px] font-semibold mb-1.5">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-mono text-purple-300">{proj.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-950 border border-white/10 overflow-hidden">
                  <div
                    style={{ width: `${proj.progress}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Meta: Dates, PM, Revisions */}
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500 block">Expected Delivery:</span>
                <span className="font-medium text-slate-200">{proj.expectedDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Project Manager:</span>
                <span className="font-medium text-slate-200">{proj.pm.name}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Revisions:</span>
                <span className="font-mono font-bold text-amber-300">
                  {proj.revisions.used}/{proj.revisions.included} Used
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

