import React, { useRef } from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const InvoicePrintModal = () => {
  const { activeActionModal, setActiveActionModal, modalPayload, currentPersona } = usePortal();

  if (activeActionModal !== 'invoice_print' || !modalPayload) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex flex-col h-[90vh] max-h-[850px] w-full max-w-3xl rounded-3xl border border-white/15 bg-white text-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3.5 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Tax Invoice Document
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                modalPayload.status === 'Paid'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {modalPayload.status.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => setActiveActionModal(null)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Page */}
        <div className="flex-1 overflow-y-auto p-8 font-sans text-xs">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="h-7 w-7 rounded-lg bg-[#6C4CC4] flex items-center justify-center text-white font-bold text-sm">
                  T
                </div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Tenspick</h1>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">From Spark to Scale</p>
              <p className="text-[11px] text-slate-500 mt-2">
                Tenspick Technologies LLP<br />
                Indiranagar, Bangalore 560038, Karnataka<br />
                GSTIN: 29AABCT1928K1ZG • contact@tenspick.com
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-bold text-slate-900">{modalPayload.invoiceNumber}</h2>
              <p className="text-slate-500 text-[11px]">Date: {modalPayload.issueDate}</p>
              <p className="text-slate-500 text-[11px]">Due Date: {modalPayload.dueDate}</p>
              {modalPayload.paidAt && (
                <div className="mt-2 inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Settled on {modalPayload.paidAt}</span>
                </div>
              )}
            </div>
          </div>

          {/* Billed To */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Billed To (Client):
              </span>
              <p className="font-bold text-slate-800 text-sm">{currentPersona.company}</p>
              <p className="text-slate-600 mt-0.5">{currentPersona.name} ({currentPersona.title})</p>
              <p className="text-slate-500 mt-1">GSTIN: {currentPersona.gstNumber || '29ABCDE1234F1Z5'}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Project Reference:
              </span>
              <p className="font-bold text-slate-800 text-sm">{modalPayload.projectName}</p>
              <p className="text-slate-600 mt-0.5">Project ID: {modalPayload.projectId}</p>
              <p className="text-slate-500 mt-1">Billing Milestone: {modalPayload.type}</p>
            </div>
          </div>

          {/* Line items table */}
          <table className="w-full text-left border-collapse mb-6">
            <thead>
              <tr className="border-b border-slate-300 text-slate-500 text-[11px] font-bold uppercase">
                <th className="py-2.5">Description</th>
                <th className="py-2.5 text-center">Qty</th>
                <th className="py-2.5 text-right">Rate</th>
                <th className="py-2.5 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modalPayload.items?.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 font-medium text-slate-800">{item.description}</td>
                  <td className="py-3 text-center text-slate-600">{item.quantity}</td>
                  <td className="py-3 text-right font-mono text-slate-600">₹{item.rate.toLocaleString()}</td>
                  <td className="py-3 text-right font-mono font-semibold text-slate-800">₹{item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2 text-right">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{modalPayload.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>CGST (9%):</span>
                <span className="font-mono">₹{(modalPayload.gstAmount / 2).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>SGST (9%):</span>
                <span className="font-mono">₹{(modalPayload.gstAmount / 2).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 border-t border-slate-300 pt-2 text-sm">
                <span>Total Amount Due:</span>
                <span className="font-mono text-[#6C4CC4]">₹{modalPayload.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Terms & Payment Instructions */}
          <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-500 space-y-1">
            <p><strong>Payment Instructions:</strong> Direct UPI transfer to <code>tenspick@icici</code> or NEFT to HDFC Bank A/c 50200088921443 (IFSC: HDFC0001234).</p>
            <p><strong>Note:</strong> Intellectual Property rights and final production credentials transfer upon 100% invoice settlement as per Tenspick IP Handover Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

