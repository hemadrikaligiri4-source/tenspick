import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X, Lock } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const ApprovalModal = () => {
  const {
    activeActionModal,
    setActiveActionModal,
    modalPayload,
    approveDeliverable,
    currentPersona,
  } = usePortal();

  const [approvalNotes, setApprovalNotes] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  if (activeActionModal !== 'approve' || !modalPayload) return null;

  const handleConfirmApproval = () => {
    approveDeliverable(modalPayload.id, approvalNotes);
    setActiveActionModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/30 bg-[#0d121c] p-6 shadow-2xl">
        <button
          onClick={() => setActiveActionModal(null)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Sign & Approve Deliverable</h3>
            <p className="text-xs text-emerald-400 font-medium">
              Legally binding acceptance record (Protects both parties)
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 mb-4 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Deliverable Name:</span>
            <span className="font-semibold text-white truncate max-w-[240px]">
              {modalPayload.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Version:</span>
            <span className="font-mono text-purple-300 font-bold">{modalPayload.version}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Signing Approver:</span>
            <span className="font-medium text-slate-200">
              {currentPersona.name} ({currentPersona.title || 'Client Authorized Signatory'})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Recorded Timestamp:</span>
            <span className="font-mono text-slate-300">{new Date().toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Optional Sign-off Remarks / Notes:
          </label>
          <textarea
            value={approvalNotes}
            onChange={(e) => setApprovalNotes(e.target.value)}
            placeholder="e.g., Verified on staging with test orders. Everything looks ready for production!"
            className="w-full h-20 rounded-xl bg-slate-950 border border-white/10 p-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none resize-none"
          />
        </div>

        <div className="flex items-start gap-2.5 mb-5 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-slate-300">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-0.5 rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-0"
          />
          <label htmlFor="terms" className="cursor-pointer">
            I confirm that I have reviewed this deliverable and grant official approval to conclude this stage of work in accordance with the Tenspick Revision and Handover Policy.
          </label>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setActiveActionModal(null)}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            disabled={!agreedToTerms}
            onClick={handleConfirmApproval}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:brightness-110 disabled:opacity-50 transition"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Confirm & Record Approval</span>
          </button>
        </div>
      </div>
    </div>
  );
};

