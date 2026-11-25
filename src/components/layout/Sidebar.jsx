import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  PackageCheck,
  MessageSquareDiff,
  MessageSquare,
  Files,
  ReceiptText,
  LifeBuoy,
  CalendarCheck,
  UserCog,
  FileCheck2,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const {
    activeTab,
    setActiveTab,
    currentPersona,
    ROLES,
    deliverables,
    feedbackItems,
    invoices,
    tickets,
  } = usePortal();

  // Badges calculation
  const pendingDeliverables = deliverables.filter(
    (d) => d.status === 'Delivered' || d.status === 'Under Review'
  ).length;

  const activeChangesCount = feedbackItems.filter(
    (f) => f.status === 'In Progress' || f.status === 'Received'
  ).length;

  const pendingInvoicesCount = invoices.filter(
    (i) => i.status === 'Pending'
  ).length;

  const openTicketsCount = tickets.filter(
    (t) => t.status === 'Open'
  ).length;

  // 12 modules from PDF Requirements
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'projects', label: 'My Projects', icon: FolderGit2, badge: null },
    {
      id: 'deliverables',
      label: 'Deliverables',
      icon: PackageCheck,
      badge: pendingDeliverables > 0 ? `${pendingDeliverables} pending` : null,
      badgeColor: 'bg-purple-600/30 text-purple-300 border border-purple-500/40',
      highlight: true,
    },
    {
      id: 'feedback',
      label: 'Feedback & Changes',
      icon: MessageSquareDiff,
      badge: activeChangesCount > 0 ? activeChangesCount : null,
      badgeColor: 'bg-amber-600/30 text-amber-300 border border-amber-500/40',
    },
    { id: 'messages', label: 'Messages / Updates', icon: MessageSquare, badge: 'New' },
    { id: 'files', label: 'Files and Documents', icon: Files, badge: null },
    {
      id: 'invoices',
      label: 'Invoices & Payments',
      icon: ReceiptText,
      badge: pendingInvoicesCount > 0 ? `${pendingInvoicesCount} due` : null,
      badgeColor: 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40',
    },
    {
      id: 'support',
      label: 'Support Tickets',
      icon: LifeBuoy,
      badge: openTicketsCount > 0 ? openTicketsCount : null,
      badgeColor: 'bg-blue-600/30 text-blue-300 border border-blue-500/40',
    },
    { id: 'meetings', label: 'Meetings / Book Call', icon: CalendarCheck, badge: null },
    { id: 'profile', label: 'Profile and Settings', icon: UserCog, badge: null },
    { id: 'legal', label: 'Help, Terms & Privacy', icon: FileCheck2, badge: null },
  ];

  // Admin Panel Tab (Available for Admin and PM, or anyone inspecting)
  const isAdminOrPM =
    currentPersona.role === ROLES.ADMIN ||
    currentPersona.role === ROLES.PROJECT_MANAGER;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-white/10 bg-[#0c0e16]/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-3 space-y-1">
          {/* Main Navigation items */}
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Portal Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6C4CC4] to-[#825de0] text-white shadow-lg shadow-purple-600/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      item.badgeColor || 'bg-purple-500/20 text-purple-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Admin Panel Section */}
          <div className="pt-3 mt-3 border-t border-white/10">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center justify-between">
              <span>Tenspick Agency</span>
              <span className="text-[9px] bg-purple-900/60 px-1 rounded text-purple-300 border border-purple-500/30">
                Staff & Admin
              </span>
            </div>
            <button
              onClick={() => {
                setActiveTab('admin');
                onClose();
              }}
              className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-purple-900/60 text-purple-200 border border-purple-500/50 shadow-lg'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-purple-400" />
                <span>Admin & Operations</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>

        {/* Bottom Agency Support Card */}
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-b from-purple-950/40 to-slate-900/60 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-200">Tenspick Partner Support</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2.5">
            Dedicated Project Manager Alex Rivera is online.
          </p>
          <a
            href="mailto:contact@tenspick.com"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1.5 text-[11px] text-slate-300 hover:text-white font-medium transition"
          >
            <span>contact@tenspick.com</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </aside>
    </>
  );
};

