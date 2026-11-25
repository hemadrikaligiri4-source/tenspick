import React, { useState } from 'react';
import {
  UserCog,
  Building2,
  Users,
  Bell,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Mail,
  Phone,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const ProfileSettingsView = () => {
  const { currentPersona, addToast } = usePortal();

  const [company, setCompany] = useState(currentPersona.company);
  const [name, setName] = useState(currentPersona.name);
  const [phone, setPhone] = useState(currentPersona.phone || '+1 (555) 382-9901');
  const [gstNumber, setGstNumber] = useState(currentPersona.gstNumber || '29ABCDE1234F1Z5');
  const [billingAddress, setBillingAddress] = useState('100 Innovation Parkway, Suite 400, Austin, TX 78701');

  // Team invitations
  const [invitedMembers, setInvitedMembers] = useState([
    { name: 'David Chen', email: 'david.chen@acmecorp.io', role: 'Product Marketing', canApprove: false },
    { name: 'Rachel Vance', email: 'rachel.vance@acmecorp.io', role: 'Operations Lead', canApprove: true },
  ]);

  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberCanApprove, setNewMemberCanApprove] = useState(false);

  // Notification Preferences
  const [notifyOnUpload, setNotifyOnUpload] = useState(true);
  const [notifyOnWhatsApp, setNotifyOnWhatsApp] = useState(true);
  const [notifyWeeklyDigest, setNotifyWeeklyDigest] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    addToast('Profile Saved', 'Your company and contact details have been updated.', 'success');
  };

  const handleInviteMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;

    setInvitedMembers([
      ...invitedMembers,
      {
        name: newMemberName,
        email: newMemberEmail,
        role: 'Client Team Member',
        canApprove: newMemberCanApprove,
      },
    ]);
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberCanApprove(false);
    addToast('Invitation Dispatched', `Invite link emailed to ${newMemberEmail}.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
            Section 9 & 10: Settings
          </span>
          <span className="text-xs text-slate-400">Account & Permissions Management</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
          Profile, Team Access & Notifications
        </h1>
        <p className="text-xs text-slate-300">
          Manage your organization details, invite colleagues with approval privileges, and set notification channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Profile Form & Team Invitations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Details Form */}
          <form
            onSubmit={handleSaveProfile}
            className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md space-y-4 text-xs"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="h-4 w-4 text-purple-400" />
              <span>Company & Primary Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company Legal Name:</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Primary Signatory Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contact Phone / WhatsApp:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tax ID / GST Number:</label>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Registered Billing Address:</label>
              <textarea
                rows={2}
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 p-2.5 text-white focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="rounded-xl bg-purple-600 px-5 py-2 font-bold text-white hover:bg-purple-500 transition shadow-lg shadow-purple-600/30"
              >
                Save Organization Profile
              </button>
            </div>
          </form>

          {/* Team Members & Approval Rights (Section 2) */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md space-y-4 text-xs">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span>Client Team Members & Approval Permissions</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Invite colleagues to view project progress, comment on deliverables, or grant them full sign-off authority.
              </p>
            </div>

            {/* Existing team list */}
            <div className="space-y-2.5">
              {invitedMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-950/60 p-3 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-white">{member.name}</h4>
                    <span className="text-[11px] text-slate-400">{member.email} • {member.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                        member.canApprove
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-white/10'
                      }`}
                    >
                      {member.canApprove ? 'Can Sign & Approve' : 'View & Comment Only'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Invite New Member Form */}
            <form onSubmit={handleInviteMember} className="border-t border-white/10 pt-4 space-y-3">
              <span className="font-bold text-white block">Invite Colleague to Client Space:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Colleague Full Name"
                  className="rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
                <input
                  type="email"
                  required
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={newMemberCanApprove}
                    onChange={(e) => setNewMemberCanApprove(e.target.checked)}
                    className="rounded border-white/20 bg-slate-950 text-purple-600 focus:ring-0"
                  />
                  <span>Grant Formal Approval & Sign-Off Rights</span>
                </label>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 font-bold text-white hover:bg-purple-500 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Send Invitation</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right 1 Col: Notification Preferences & Security */}
        <div className="space-y-6">
          {/* Notification Preferences */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bell className="h-4 w-4 text-purple-400" />
              <span>Notification Preferences</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyOnUpload}
                  onChange={(e) => setNotifyOnUpload(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-slate-950 text-purple-600 focus:ring-0"
                />
                <div>
                  <span className="font-semibold text-white block">Email on Deliverable Upload</span>
                  <p className="text-[11px] text-slate-400">Receive instant alerts when Tenspick publishes new mockups or staging links.</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyOnWhatsApp}
                  onChange={(e) => setNotifyOnWhatsApp(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-slate-950 text-emerald-500 focus:ring-0"
                />
                <div>
                  <span className="font-semibold text-white block">WhatsApp Approval Alerts</span>
                  <p className="text-[11px] text-slate-400">Receive priority WhatsApp pings when an item awaits your approval.</p>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyWeeklyDigest}
                  onChange={(e) => setNotifyWeeklyDigest(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-slate-950 text-purple-600 focus:ring-0"
                />
                <div>
                  <span className="font-semibold text-white block">Weekly Sprint Digest</span>
                  <p className="text-[11px] text-slate-400">Comprehensive recap of milestone progress and upcoming week goals.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Security & 2FA */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Security & 2FA</span>
            </h3>

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-3.5 space-y-1">
              <span className="font-bold text-emerald-300 block">Two-Factor OTP Authentication</span>
              <p className="text-[11px] text-slate-300">
                Active: One-time login codes sent to registered email & phone before critical sign-offs.
              </p>
            </div>

            <button
              onClick={() => addToast('Password Reset', 'Password reset instructions sent to your email.', 'info')}
              className="w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 font-semibold text-slate-200 transition"
            >
              Change Account Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

