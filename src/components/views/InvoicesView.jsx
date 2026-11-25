import React from 'react';
import {
  ReceiptText,
  CreditCard,
  Printer,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const InvoicesView = () => {
  const {
    invoices,
    currentProject,
    setActiveActionModal,
    setModalPayload,
    currentPersona,
  } = usePortal();

  const projectInvoices = invoices.filter(
    (i) => i.projectId === currentProject.id
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
              Section 9: Invoices & Payments
            </span>
            <span className="text-xs text-slate-400">
              GST Tax Invoices & Instant UPI/Card Clearance
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Financials, Billing & Receipts
          </h1>
          <p className="text-xs text-slate-300">
            Quotation, advance, milestone, and final invoices with transparent 18% GST tax breakdown.
          </p>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {projectInvoices.map((inv) => (
          <div
            key={inv.id}
            className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple-500/30 transition"
          >
            {/* Invoice Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-500/30">
                  {inv.invoiceNumber}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                    inv.status === 'Paid'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}
                >
                  Status: {inv.status}
                </span>
                <span className="text-[11px] text-slate-400">
                  Issued: {inv.issueDate} • Due Date: {inv.dueDate}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{inv.type}</h3>

              <div className="text-xs text-slate-300 space-y-0.5">
                <p>
                  Subtotal: <span className="font-mono text-slate-200">₹{inv.amount.toLocaleString()}</span> + GST (18%): <span className="font-mono text-slate-200">₹{inv.gstAmount.toLocaleString()}</span>
                </p>
                {inv.paidAt && (
                  <p className="text-emerald-400 text-[11px] flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Settled on {inv.paidAt} via {inv.paymentMethod}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Total and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-right">
              <div>
                <span className="text-[11px] text-slate-400 block">Total Amount:</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  ₹{inv.totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setModalPayload(inv);
                    setActiveActionModal('invoice_print');
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white transition"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>View / Print</span>
                </button>

                {inv.status !== 'Paid' && (
                  <button
                    onClick={() => {
                      setModalPayload(inv);
                      setActiveActionModal('payment');
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:brightness-110 transition"
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>Instant Pay</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

