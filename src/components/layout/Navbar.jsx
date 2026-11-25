import React, { useState } from 'react';
import {
  Sparkles,
  Bell,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Shield,
  User,
  LogOut,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  Search,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const Navbar = ({ onToggleSidebar }) => {
  const {
    currentPersona,
    switchPersona,
    PERSONAS,
    projects,
    selectedProjectId,
    setSelectedProjectId,
    currentProject,
    setOnboardingOpen,
    setActiveTab,
    invoices,
    deliverables,
    tickets,
  } = usePortal();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Compute pending actionable items
  const pendingDeliverables = deliverables.filter(
    (d) => d.status === 'Delivered' || d.status === 'Under Review'
  ).length;
  const pendingInvoices = invoices.filter((i) => i.status === 'Pending').length;
  const openTickets = tickets.filter((t) => t.status === 'Open').length;
  const totalNotifications = pendingDeliverables + pendingInvoices + openTickets;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0d0f17]/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left: Brand & Project Switcher */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
            title="Toggle Menu"
          >
            <Layers className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex cursor-pointer items-center gap-3 group"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#6C4CC4] via-[#8B5CF6] to-[#c084fc] shadow-lg shadow-purple-500/20 ring-1 ring-white/20 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-white text-lg">
                  Tenspick
                </span>
                <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-purple-300 uppercase border border-purple-500/30">
                  Client Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium">
                From Spark to Scale
              </p>
            </div>
          </div>

          {/* Project Quick Switcher */}
          <div className="hidden md:flex items-center ml-4 pl-4 border-l border-white/10">
            <div className="flex items-center gap-2 bg-slate-900/80 border border-white/10 rounded-lg px-3 py-1.5 text-xs">
              <span className="text-slate-400 font-medium">Active Project:</span>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer pr-2"
              >
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id} className="bg-slate-900 text-slate-100">
                    {proj.id} — {proj.name} ({proj.progress}%)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Actions: Persona Switcher, Contact, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Persona / Role Switcher - Critical for previewing any user perspective */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleDropdownOpen(!roleDropdownOpen);
                setNotifDropdownOpen(false);
                setProfileDropdownOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl bg-purple-950/40 border border-purple-500/30 px-2.5 py-1.5 text-xs text-purple-200 hover:bg-purple-900/50 hover:border-purple-400 transition"
              title="Switch user perspective to test all roles"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600/40 text-[10px] font-bold text-white uppercase">
                {currentPersona.role.slice(0, 2)}
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-semibold text-slate-200 text-[11px] leading-tight flex items-center gap-1.5">
                  {currentPersona.name}
                  <span className="rounded bg-purple-500/30 px-1 py-0.2 text-[9px] font-bold text-purple-300 uppercase">
                    {currentPersona.role.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-purple-300" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/15 bg-[#121522] p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                    Switch Persona / Role View
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Experience portal as client, team member, PM, or admin
                  </p>
                </div>
                <div className="mt-1 space-y-1">
                  {PERSONAS.map((persona) => (
                    <button
                      key={persona.id}
                      onClick={() => {
                        switchPersona(persona.id);
                        setRoleDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-xs transition ${
                        currentPersona.id === persona.id
                          ? 'bg-purple-600/20 text-white font-medium border border-purple-500/40'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <img
                        src={persona.avatar}
                        alt={persona.name}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-purple-500/30"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-200 truncate flex items-center justify-between">
                          <span>{persona.name}</span>
                          <span className="text-[10px] text-purple-300 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/20 uppercase font-mono">
                            {persona.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{persona.title} • {persona.company}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick WhatsApp Support Direct CTA */}
          <a
            href="https://wa.me/919876543210?text=Hi%20Tenspick%20Team%2C%20I%20have%20an%20inquiry%20regarding%20my%20client%20portal%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-900/60 transition"
            title="Chat directly with Tenspick PM on WhatsApp"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>WhatsApp PM</span>
          </a>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                setRoleDropdownOpen(false);
                setProfileDropdownOpen(false);
              }}
              className="relative rounded-xl border border-white/10 bg-slate-900/60 p-2 text-slate-300 hover:bg-white/5 hover:text-white transition"
              title="Notifications & Action Required"
            >
              <Bell className="h-4 w-4" />
              {totalNotifications > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white shadow-lg shadow-purple-500/50">
                  {totalNotifications}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/15 bg-[#121522] p-3 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Notifications & Alerts
                  </h4>
                  <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] text-purple-300 font-semibold">
                    {totalNotifications} Pending
                  </span>
                </div>
                <div className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                  {pendingDeliverables > 0 && (
                    <div
                      onClick={() => {
                        setActiveTab('deliverables');
                        setNotifDropdownOpen(false);
                      }}
                      className="cursor-pointer rounded-xl bg-purple-950/30 border border-purple-500/20 p-2.5 hover:bg-purple-900/40 transition"
                    >
                      <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{pendingDeliverables} Deliverables Under Review</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Client action needed: approve or request changes to advance milestone.
                      </p>
                    </div>
                  )}

                  {pendingInvoices > 0 && (
                    <div
                      onClick={() => {
                        setActiveTab('invoices');
                        setNotifDropdownOpen(false);
                      }}
                      className="cursor-pointer rounded-xl bg-amber-950/30 border border-amber-500/20 p-2.5 hover:bg-amber-900/40 transition"
                    >
                      <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                        <Shield className="h-3.5 w-3.5" />
                        <span>{pendingInvoices} Pending Invoices</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Milestone invoice pending clearance. Instant UPI & card payment available.
                      </p>
                    </div>
                  )}

                  {openTickets > 0 && (
                    <div
                      onClick={() => {
                        setActiveTab('support');
                        setNotifDropdownOpen(false);
                      }}
                      className="cursor-pointer rounded-xl bg-blue-950/30 border border-blue-500/20 p-2.5 hover:bg-blue-900/40 transition"
                    >
                      <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold">
                        <HelpCircle className="h-3.5 w-3.5" />
                        <span>{openTickets} Open Support Ticket</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        Assigned under active 24-hr SLA guarantee.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Onboarding Tour Trigger */}
          <button
            onClick={() => setOnboardingOpen(true)}
            className="rounded-xl border border-white/10 bg-slate-900/60 p-2 text-slate-300 hover:bg-white/5 hover:text-white transition"
            title="Launch 3-step Onboarding Guide"
          >
            <HelpCircle className="h-4 w-4" />
          </button>

          {/* User Profile Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setRoleDropdownOpen(false);
                setNotifDropdownOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-1 hover:border-purple-500/40 transition"
            >
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                className="h-7 w-7 rounded-lg object-cover ring-1 ring-purple-500/40"
              />
              <ChevronDown className="h-3 w-3 text-slate-400 mr-1 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/15 bg-[#121522] p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="font-semibold text-slate-100 text-xs">{currentPersona.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentPersona.email}</p>
                  <span className="inline-block mt-1 rounded bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-purple-300 uppercase">
                    {currentPersona.role}
                  </span>
                </div>
                <div className="mt-1 space-y-1">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/5"
                  >
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>Company & Profile Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setOnboardingOpen(true);
                      setProfileDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/5"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                    <span>Review 3-Step Guide</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('legal');
                      setProfileDropdownOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/5"
                  >
                    <Shield className="h-3.5 w-3.5 text-slate-400" />
                    <span>Terms, Privacy & Policies</span>
                  </button>
                  <div className="border-t border-white/10 pt-1">
                    <button
                      onClick={() => {
                        window.location.reload();
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Reset Demo Session</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

